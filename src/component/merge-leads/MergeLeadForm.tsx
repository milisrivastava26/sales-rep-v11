import React from "react";
import { Formik, Form, Field, FormikErrors, useFormikContext } from "formik";
import MergeLeadContact from "./MergeLeadContact";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { getApByCareerId } from "../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { getCityRowWiseByStateId } from "../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";

type InputFieldType = {
  id: number;
  name: string;
  label: string;
  type: string;
  isRequired? : boolean;
  options?: { label: string; value: string | number }[];
};

type SectionType = {
  id: number;
  heading: string;
  inputFields:
    | InputFieldType[]
    | {
        heading: string;
        inputFields: InputFieldType[];
      }[];
};

type Props = {
  formInputsForLeadMerge: SectionType[];
  initialValues: Record<string, any>;
  validationSchema: any;
  onSubmit: (values: any) => void;
  setError: (e: any) => void;
  error: boolean;
  formikRef: any;
};

const RenderField = ({
  field,
  namePrefix = "",
}: {
  field: InputFieldType;
  namePrefix?: string;
}) => {
  const { responseForCategory } = useSelector(
    (state: RootState) => state.getAllCategory
  );
  const { responseForAdmitType } = useSelector(
    (state: RootState) => state.getAllAdmitType
  );
  const { responseForState } = useSelector(
    (state: RootState) => state.getAllStatesData
  );
  const { responseForAcademicCareer } = useSelector(
    (state: RootState) => state.getAllAcademicCareer
  );
  const { academicProgramDataByCareerId } = useSelector(
    (state: RootState) => state.getAllAcademicProgramByCareer
  );
  const { CityRowWiseDataByStateId } = useSelector(
    (state: RootState) => state.getCityRowWiseByStateId
  );
  const { responseForLeadSource } = useSelector(
    (state: RootState) => state.leadSourceValues
  );

  const name = namePrefix ? `${namePrefix}.${field.name}` : field.name;
  const { setFieldValue } = useFormikContext<any>();
  let options: any = [];

  switch (name) {
    case "categoryName":
      options = responseForCategory || [];
      break;
    case "admitTypeName":
      options = responseForAdmitType || [];
      break;
    case "address[0].coreStateId":
      options = responseForState || [];
      break;
    case "address[1].coreStateId":
      options = responseForState || [];
      break;
    case "academicCareerId":
      options = responseForAcademicCareer || [];
      break;
    case "academicProgramId":
      options = academicProgramDataByCareerId || [];
      break;
    case "address[0].coreCityId":
      options = CityRowWiseDataByStateId[0] || [];
      break;
    case "address[1].coreCityId":
      options = CityRowWiseDataByStateId[1] || [];
      break;
    case "leadSourceId":
      options = responseForLeadSource;
      break;
    default:
      options = field.options || [];
  }

  switch (field.type) {
    case "select":
      return (
        <Field name={name}>
          {({ field: formikField }: any) => (
            <select
              {...formikField}
              className="mt-1 block w-full border p-1 rounded"
              onChange={(e) => {
                const value = e.target.value;
                formikField.onChange(e); // update Formik state

                setFieldValue(name, value); // make sure value is set
                if (name === "academicCareerId" && value) {
                  store.dispatch(getApByCareerId(value));
                } else if (name === "address[0].coreStateId" && value) {
                  store.dispatch(
                    getCityRowWiseByStateId({
                      stateId: value,
                      index: 0,
                    })
                  );
                } else if (name === "address[1].coreStateId" && value) {
                  store.dispatch(
                    getCityRowWiseByStateId({
                      stateId: value,
                      index: 1,
                    })
                  );
                }
              }}
            >
              <option value="">Select</option>
              {options?.map((option: any) => (
                <option
                  key={option.value || option.id}
                  value={option.value || option.id}
                >
                  {option.label || option.name}
                </option>
              ))}
            </select>
          )}
        </Field>
      );

    case "radio":
      return (
        <div className="flex gap-4 mt-1">
          {options?.map((option: any) => (
            <label key={option.value} className="flex items-center gap-1">
              <Field type="radio" name={name} value={option.value} />
              {option.label}
            </label>
          ))}
        </div>
      );

    default:
      return (
        <Field
          name={name}
          type={field.type}
          className="mt-1 block w-full border p-1 rounded"
          disabled={name==="address[0].country" || name==="address[1].country" || name==="leadCaptureId"}
        />
      );
  }
};

const MergeLeadForm: React.FC<Props> = ({
  formInputsForLeadMerge,
  initialValues,
  validationSchema,
  onSubmit,
  setError,
  error,
  formikRef
}) => {
    const { isLoading } = useSelector(
      (state: RootState) => state.mergeLead
    );
  return (
    <Formik
    innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => {

        return (
          <Form className="space-y-3">
            {formInputsForLeadMerge.map((section) => (
              <div key={section.id}>
                <h2 className="text-base text-gray-700 font-semibold mb-2 px-4 py-1">
                  {section.heading}
                </h2>

                {Array.isArray(section.inputFields) &&
                "heading" in section.inputFields[0] ? (
                  // Nested address sections
                  section.inputFields.map((group: any) => {
                    const addressTypeKey = group.heading.toUpperCase();
                    const addressIndex = Array.isArray(values.address)
                      ? values.address.findIndex(
                          (addr: any) => addr.addressType === addressTypeKey
                        )
                      : -1;

                    return (
                      <div key={group.heading} className="mb-3">
                        <h3 className="text-md font-medium text-gray-700 mb-2 px-4">
                          {group.heading}
                        </h3>
                        <div className="grid gap-2 px-4">
                          {group.inputFields.map((field: InputFieldType) => (
                            <div key={field.id}>
                              <label className="block text-sm font-medium text-gray-700">
                                {field.label} {field.isRequired && <span className="text-red-500 text-lg">*</span>}
                              </label>
                              <RenderField
                                field={field}
                                namePrefix={`address[${addressIndex}]`}
                              />
                              {(
                                errors?.address as
                                  | FormikErrors<any>[]
                                  | undefined
                              )?.[addressIndex]?.[field.name] &&
                                (touched?.address as any[] | undefined)?.[
                                  addressIndex
                                ]?.[field.name] && (
                                  <div className="text-red-500 text-sm">
                                    {
                                      (errors?.address as any[])[
                                        addressIndex
                                      ]?.[field.name]
                                    }
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : section.heading === "Contact Details" ? (
                  <div className="grid gap-2 px-4">
                    <MergeLeadContact
                      values={{ contact: [], ...values }}
                      error={error}
                      setError={setError}
                      
                    />
                  </div>
                ) : (
                  <div className="grid gap-2 px-4">
                    {(section.inputFields as InputFieldType[]).map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700">
                          {field.label} {field.isRequired && <span className="text-red-500 text-lg">*</span>}
                        </label>
                        <RenderField field={field} />
                        {errors?.[field.name] && touched?.[field.name] && (
                          <div className="text-red-500 text-sm">
                            {(errors as any)[field.name]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end mr-5">
            <button
              type="submit"
              disabled={isLoading}
              className={` ${isLoading? "bg-opacity-50 cursor-pointer" : ""} my-6 px-4 py-1.5 bg-blue-600 text-white rounded`}
            >
              Merge
            </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MergeLeadForm;

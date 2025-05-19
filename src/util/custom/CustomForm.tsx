import { RootState } from "../../store";
import { useSelector } from "react-redux";
import SelectInput from "./FormInputs/SelectInput";
import ButtonInput from "./FormInputs/ButtonInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { inputsType } from "../../types/manage-leads/manage-leads-type";

interface FormType {
  inputData: any;
  btnText: string;
  tabName?: string;
  isMode?: string;
  initialValues: any;
  validationSchema?: any;
  isReadOnly?: boolean;
  btnType: string | any;
  isEditing?: boolean;
  isEnableForAction: boolean;
  onGetCity?: (e: any) => void;
  onGetAcademicProgram?: (e: any) => void;
  onSaveAndAddHandler?: (data: any) => void;
  onIsPhoneExist?: (phone: number | string) => void;
}

const CustomForm: React.FC<FormType> = ({
  isMode,
  btnText,
  btnType,
  isEditing,
  inputData,
  onGetCity,
  initialValues,
  validationSchema,
  isEnableForAction,
  onGetAcademicProgram,
  onSaveAndAddHandler,
}) => {
  const {
    isLoading: isLoadingForCareer,
    responseForAcademicCareerQuickadd: careerOptions,
  } = useSelector((state: RootState) => state.getAllAcademicCareerForQuickadd);
  const {
    isLoading: isLoadingForProgram,
    academicProgramDataByCareerId: programOptions,
  } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);
  const { responseForLeadSource: LeadSourceOptions } = useSelector(
    (state: RootState) => state.getAllLeadSource
  );
  const { responseForState: StateOptions } = useSelector(
    (state: RootState) => state.getAllStatesData
  );
  const { currentCoreCityData } = useSelector(
    (state: RootState) => state.getAllCityDataByStateId
  );


  const { isLoading: isLoadingForquickAdd } = useSelector(
    (state: RootState) => state.addLeadCaptureByQuickAddForm
  );

  const { responseForCampus } = useSelector((state: RootState) => state.getAllActiveCampus);
  const { isLoading: isLoadingFoCampusSave } = useSelector((state: RootState) => state.saveCampusInterestedIn);

  const {
    isLoading: isLoadingForUpdateLeadProperties,
  } = useSelector((state: RootState) => state.LeadPropertiesUpdate);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        const updatedValues = { ...values };
        inputData.forEach((field: any) => {
          if (!updatedValues[field.name]) {
            updatedValues[field.name] = ""; // Provide default if undefined
          }
        });

        onSaveAndAddHandler?.({ values: updatedValues, actions });
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full" autoComplete="off">
          <div
            className={`grid ${isMode === "personalDetails"
              ? "grid-cols-1 gap-1"
              : "grid-cols-2 gap-4"
              }`}
          >
            {inputData.map((field: inputsType) => {
              return (
                <div key={field.id} className="w-full">
                  <label htmlFor={field.name} className="block mb-1 font-medium">
                    {field.label}:
                    {field.isrequired && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {field.type === "select" ? (
                    <SelectInput
                      nameForSelect={field.name}
                      options={
                        field.label === "Academic Career" ||
                          field.label === "Career"
                          ? careerOptions
                          : field.name === "academicProgramId"
                            ? programOptions
                            : field.label === "Lead Source"
                              ? LeadSourceOptions
                              : field.label === "State"
                                ? StateOptions
                                : field.label === "City"
                                  ? currentCoreCityData
                                  : field.name === "coreCampusId" ?
                                    responseForCampus :
                                    []
                      }
                      isLoading={
                        field.label === "Academic Career"
                          ? isLoadingForCareer
                          : field.name === "academicProgramId"
                            ? isLoadingForProgram
                            : false
                      }
                      isModeFor="quickAddForm"
                      style={` ${isMode === "personalDetails" && !isEditing
                        ? "bg-transparent py-0.5"
                        : "bg-gray-100  border border-gray-200  py-1"
                        } px-2 outline-none focus:border-gray-400 focus:bg-gray-50 focus:outline-none rounded-md w-full max-w-full `}
                      onGetCity={onGetCity}
                      onGetAcademicProgram={onGetAcademicProgram}
                      onChangeHandlerForSelectedValue={(value) =>
                        setFieldValue(field.name, value)
                      }
                      value={values[field.name]}
                      cndtVal={field.label}
                      secondCndtName="Academic Career"
                      thirdCndtName="State"
                      isReadOnly={
                        (field.isReadOnly ?? false) ||
                        (isMode === "personalDetails" && !isEditing)
                      }
                    />
                  )

                    // : field.name === "phone" ? (
                    //   //  Custom phone input with onBlur validation
                    //   <PhoneInput
                    //     name={field.name}
                    //     onIsPhoneExist={onIsPhoneExist}
                    //     response={isNumberExists}
                    //     isMode={isMode}
                    //   />
                    // )

                    : (
                      <Field
                        name={field.name}
                        type={field.type}
                        as={field.type === "textarea" ? "textarea" : "input"}
                        className={` ${(isMode === "personalDetails" && !isEditing) ||
                          field.isReadOnly
                          ? "bg-transparent py-0.5 text-gray-700"
                          : "border border-gray-200 bg-gray-100 py-1"
                          } w-full px-2 rounded-md focus:outline-none focus:border-gray-400`}
                        disabled={
                          (isMode === "personalDetails" && !isEditing) ||
                          field.isReadOnly
                        }
                      />
                    )}
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              )
            })}
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end mt-5">
              <ButtonInput
                btnType={btnType}
                isEnableForAction={isEnableForAction}
                btnText={
                  btnText
                }
                isDisabled={
                  isMode === "quckAdd"
                    ? isLoadingForquickAdd
                    : isMode === "personalDetails" ? isLoadingFoCampusSave || isLoadingForUpdateLeadProperties : false
                }
                style={`bg-blue-700 px-5 py-2 rounded text-white text-base font-medium`}
              />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default CustomForm;

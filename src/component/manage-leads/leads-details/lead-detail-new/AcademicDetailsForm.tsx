import { ErrorMessage, Field, Form, Formik } from "formik";
import { mainSubjectOptionForTenth, mainSubjectOptionForTwelfth, resultStatusOptions, typesForSectionOptions } from "../../../../data/manage-leads/create-leads-data";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import { RxCheck, RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { selectStyles } from "../../../../data/lead-details-data-new/leadAcademic-data";
import { onSetEnableForDiplomaInputFields, onSetEnableForTwefthInputFields, onSetEnableForUGInputFields } from "../../../../store/ui/ui-slice";
import { useEffect } from "react";
import { getLeadAcademicDetailsById } from "../../../../store/lead-attribute-update/get-leadAcademicDetails-slice";
import { useParams } from "react-router-dom";
import { getUgAdditionalDetailsById } from "../../../../store/lead-academicDetailsForUG/get-ugAdditionalDetails-slice";

interface FormType {
  btnText: string;
  btnType: string | any;
  tabName?: string;
  inputData: any;
  initialValues: any;
  validationSchema: any;
  isReadOnly?: boolean;
  onSaveAndAddHandler?: (data: any) => void;
  isEnableForAction: boolean;
  isEnableForTwelfth: boolean;
  isEnableForDiploma: boolean;
  isEnableForUg: boolean;
  isEditing: boolean;
  setEditing: (e: any) => void;
  isDisabledForTwelfthMarks: boolean;
  setIsDisabledForTwelfthMarks: (e: any) => void;
  setIsDisabledForDiplomaMarks: (e: any) => void;
  isDisabledForDiplomaMarks: boolean;
  isDisabledForUgMarks: boolean;
  setIsDisabledForUgMarks: (e: any) => void;
  handleCheckboxChange: (e: any) => void;
  showUGDetails: boolean;
  setIsDisabledForUgAdditionalMarks: (e: any) => void;
  isDisabledForUgAdditionalMarks: boolean;
}

const AcademicInfoForm: React.FC<FormType> = ({
  btnType,
  initialValues,
  validationSchema,
  inputData,
  isEnableForAction,
  onSaveAndAddHandler,
  isEnableForTwelfth,
  isEnableForDiploma,
  isEnableForUg,
  isEditing,
  setEditing,
  setIsDisabledForTwelfthMarks,
  isDisabledForTwelfthMarks,
  isDisabledForDiplomaMarks,
  setIsDisabledForDiplomaMarks,
  setIsDisabledForUgMarks,
  isDisabledForUgMarks,
  showUGDetails,
  handleCheckboxChange,
  isDisabledForUgAdditionalMarks,
  setIsDisabledForUgAdditionalMarks
}) => {
  const { leadCaptureId } = useParams();
  const { responseForTwelfthBoard: TwelfthBoardOptions } = useSelector((state: RootState) => state.getAllTwelfthBoardData);
  const { isLoading: isLoadingForTwelfthMarketingScheme, responseForTenthMarkingScheme: TwelfthMarketingSchemeOptions } = useSelector(
    (state: RootState) => state.getAllTenthMarkingSchemeData
  );
  const { isLoading: isLoadingForTenthBoard, responseForTenthBoard: tenthBoardOptions } = useSelector((state: RootState) => state.getAllTenthBoardData);
  const { isLoading: isLoadingForTenthScheme, responseForTenthMarkingScheme: tenthSchemeOptions } = useSelector((state: RootState) => state.getAllTenthMarkingSchemeData);

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const academicCareerId = activeEnquiry[0]?.academicCareerId;
  const academicProgramId = activeEnquiry[0]?.academicProgramId;

  const llmProgramId = [95, 96, 97, 98];

  useEffect(() => {
    if (academicCareerId == 3) {
      store.dispatch(onSetEnableForUGInputFields());
    }
  }, [responseOfLeadEnquiryDetailsById])

  const handleChange = (fieldName: string, selectedOption: any, setFieldValue: any) => {

    if (fieldName === "tenth_plus_2_type" && selectedOption?.value === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    }

    else if (fieldName === "tenth_plus_2_type" && selectedOption?.value === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }

    if (fieldName === "coreTwelfthResultStatus" && selectedOption?.value === "AWAITED") {
      setFieldValue("TwelfthMarksOrGrade", "N/A");
      setFieldValue("twelfthMarksScored", "N/A")
      setIsDisabledForTwelfthMarks(true)
    }
    else if (fieldName === "coreTwelfthResultStatus" && selectedOption?.value === "DECLARED") {
      setIsDisabledForTwelfthMarks(false);
      setFieldValue("TwelfthMarksOrGrade", "");
      setFieldValue("twelfthMarksScored", "");
    }

    if (fieldName === "coreDiplomaResultStatus" && selectedOption?.value === "AWAITED") {
      setFieldValue("coreDiplomaMarks", "N/A");
      setFieldValue("diplomaMarksScored", "N/A");
      setIsDisabledForDiplomaMarks(true)
    }
    else if (fieldName === "coreDiplomaResultStatus" && selectedOption?.value === "DECLARED") {
      setIsDisabledForDiplomaMarks(false);
      setFieldValue("diplomaMarksScored", "");
      setFieldValue("coreDiplomaMarks", "");
    }
    if (fieldName === "coreUgResultStatus" && selectedOption?.value === "AWAITED") {
      setFieldValue("coreUgMarks", "N/A");
      setFieldValue("ugMarksScored", "N/A");
      setIsDisabledForUgMarks(true)
    }
    else if (fieldName === "coreUgResultStatus" && selectedOption?.value === "DECLARED") {
      setIsDisabledForUgMarks(false);
      setFieldValue("ugMarksScored", "");
      setFieldValue("coreUgMarks", "");
    }

    if (fieldName === "additionalUgResultStatus" && selectedOption?.value === "AWAITED") {
      setFieldValue("additionalUgMarks", "N/A");
      setFieldValue("additionalUgMarksScored", "N/A");
      setIsDisabledForUgAdditionalMarks(true)
    }
    else if (fieldName === "additionalUgResultStatus" && selectedOption?.value === "DECLARED") {
      setIsDisabledForUgAdditionalMarks(false);
      setFieldValue("additionalUgMarksScored", "");
      setFieldValue("additionalUgMarks", "");
    }
    setFieldValue(fieldName, selectedOption?.value)
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const updatedValues = { ...values };
        inputData.forEach((group: any) => {
          group.inputFields.forEach((field: any) => {
            if (!updatedValues[field.name]) {
              updatedValues[field.name] = ""; // Provide default if undefined
            }
          });
        });

        onSaveAndAddHandler?.({ values: updatedValues, actions });
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <>
            <Form className="w-full" autoComplete="off">
              {isEditing && (
                <div className="flex justify-end mb-10 gap-4 items-center absolute top-[8px] right-4">
                  <button type="button" className=" py-1.5 font-medium rounded" onClick={() => {
                    setEditing(false); store.dispatch(getLeadAcademicDetailsById(leadCaptureId)); store.dispatch(getUgAdditionalDetailsById(leadCaptureId));
                  }}>
                    <RxCross2 size={22} color="red" />
                  </button>
                  <ButtonInput style=" py-1.5 font-medium rounded" icon={<RxCheck size={24} color="green" />} btnType={btnType} isEnableForAction={isEnableForAction} />
                </div>
              )}

              {inputData.map((section: any) => {
                if (section.heading === "Twelfth" && isEnableForTwelfth === false) {
                  return null;
                }

                if (section.heading === "Diploma" && isEnableForDiploma === false) {
                  return null; // Hide the "Diploma"
                }

                if (section.heading === "UG" && isEnableForUg === false) {
                  return null;
                }
                if (section.heading === "Additional UG Details" && !showUGDetails) {
                  return null;
                }
                return (
                  <div key={section.id} className="mb-6">
                    <h2 className="font-medium text-base mb-4 bg-[#e2d1ba] px-6 py-1.5 rounded-full inline-block">{section.heading || section.groupLabel}</h2>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                      {section.inputFields.map((field: any, index: number) => {
                        return (
                          <div key={index} className="w-full">
                            {field.type === "select" ? (
                              <>
                                <label htmlFor={field.name} className="block mb-1 ml-1.5 text-gray-700 font-medium">
                                  {field.label}
                                  {field.isrequired && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <Select
                                  name={field.name}
                                  id={field.name}
                                  isClearable
                                  options={
                                    field.label === "10 plus 2 type"
                                      ? typesForSectionOptions
                                      : field.label === "10th Board"
                                        ? tenthBoardOptions
                                        : field.label === "10th Marking Scheme"
                                          ? tenthSchemeOptions
                                          : field.label === "12th Board"
                                            ? TwelfthBoardOptions
                                            : field.label === "12th Marking Scheme"
                                              ? TwelfthMarketingSchemeOptions
                                              : field.label === "12th Result Status" || field.label === "UG Result Status" || field.label === "Diploma Result Status"
                                                ? resultStatusOptions
                                                : field.name === "tenthMainSubject" ?
                                                  mainSubjectOptionForTenth :
                                                  field.name === "twelfthMainSubject" ?
                                                    mainSubjectOptionForTwelfth :
                                                    []
                                  }
                                  isDisabled={!isEditing}
                                  isLoading={
                                    field.label === "10th Board"
                                      ? isLoadingForTenthBoard
                                      : field.label === "10th Marking Scheme"
                                        ? isLoadingForTenthScheme
                                        : field.label === "12th Marking Scheme"
                                          ? isLoadingForTwelfthMarketingScheme
                                          : false
                                  }
                                  classNamePrefix="react-select"
                                  className="w-full"
                                  value={
                                    (
                                      field.label === "10 plus 2 type"
                                        ? typesForSectionOptions
                                        : field.label === "10th Board"
                                          ? tenthBoardOptions
                                          : field.label === "10th Marking Scheme"
                                            ? tenthSchemeOptions
                                            : field.label === "12th Board"
                                              ? TwelfthBoardOptions
                                              : field.label === "12th Marking Scheme"
                                                ? TwelfthMarketingSchemeOptions
                                                : field.label === "12th Result Status" || field.label === "UG Result Status" || field.label === "Diploma Result Status"
                                                  ? resultStatusOptions
                                                  : field.name === "tenthMainSubject" ?
                                                    mainSubjectOptionForTenth :
                                                    field.name === "twelfthMainSubject" ?
                                                      mainSubjectOptionForTwelfth :
                                                      []
                                    ).find((opt: any) => opt.value === values[field.name])
                                  }
                                  onChange={(selectedOption: any) => handleChange(field.name, selectedOption, setFieldValue)}
                                  styles={selectStyles}

                                />

                              </>
                            ) : field.type === "checkbox" ? (
                              <>
                                <label className="flex items-center">
                                  <input className="mr-1" type={field.type} name={field.name} />
                                  {field.label}
                                </label>
                              </>
                            ) : (
                              <>
                                <label htmlFor={field.name} className="block mb-1 ml-1.5 text-gray-700 font-medium">
                                  {field.label}
                                  {field.isrequired && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                <Field
                                  name={field.name}
                                  disabled={!isEditing || ((field.name === "TwelfthMarksOrGrade" || field.name === "twelfthMarksScored") && isDisabledForTwelfthMarks) || ((field.name === "coreDiplomaMarks" || field.name === "diplomaMarksScored") && isDisabledForDiplomaMarks) || ((field.name === "coreUgMarks" || field.name === "ugMarksScored") && isDisabledForUgMarks) || ((field.name === "additionalUgMarks" || field.name === "additionalUgMarksScored") && isDisabledForUgAdditionalMarks)}
                                  type={field.type}
                                  as={field.type === "textarea" ? "textarea" : "input"}
                                  className={`w-full ${isEditing ? "border border-gray-200" : "border border-gray-200 bg-gray-100"
                                    }  px-2 py-1 rounded-md focus:outline-none focus:border-gray-400`}
                                />
                              </>
                            )}
                            {isEditing && <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* checkbox for addtional UG details */}
              {llmProgramId.includes(academicProgramId) && <div className="mt-5">
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    disabled={!isEditing}
                    checked={showUGDetails}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium">Add Additional UG Details</span>
                </label>
              </div>}
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AcademicInfoForm;

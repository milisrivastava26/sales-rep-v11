import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AcademicSection from "./AcademicSection";
import { handleSelectChange } from "./helpers";
import CompetitiveExamForm from "./CompetitiveExamForm";
import store, { RootState } from "../../../../../store";
import { onSetEnableForUGInputFields, showPgDialog } from "../../../../../store/ui/ui-slice";
import { RxCheck, RxCross2 } from "react-icons/rx";
import ButtonInput from "../../../../../util/custom/FormInputs/ButtonInput";
import { getLeadAcademicDetailsById } from "../../../../../store/academic/get-lead-academicDetails-slice";

interface FormType {
  inputData: any;
  initialValues: any;
  validationSchema: any;
  onSaveAndAddHandler?: (data: any) => void;

  isDisabledForTenthPercentage: boolean;
  setIsDisabledForTenthPercentage: (v: boolean) => void;

  isDisabledForTwelfthPercentage: boolean;
  setIsDisabledForTwelfthPercentage: (v: boolean) => void;

  isDisabledForDiplomaPercentage: boolean;
  setIsDisabledForDiplomaPercentage: (v: boolean) => void;

  isDisabledForUgPercentage: boolean;
  setIsDisabledForUgPercentage: (v: boolean) => void;

  isDisabledForPgPercentage: boolean;
  setIsDisabledForPgPercentage: (v: boolean) => void;

  isEditing: boolean;
  setEditing: (v: boolean) => void;
}

const AcademicDetailsForm: React.FC<FormType> = ({
  initialValues,
  validationSchema,
  inputData,
  onSaveAndAddHandler,

  // ⭐ all new props
  isDisabledForTenthPercentage,
  setIsDisabledForTenthPercentage,

  isDisabledForTwelfthPercentage,
  setIsDisabledForTwelfthPercentage,

  isDisabledForDiplomaPercentage,
  setIsDisabledForDiplomaPercentage,

  isDisabledForUgPercentage,
  setIsDisabledForUgPercentage,

  isDisabledForPgPercentage,
  setIsDisabledForPgPercentage,
  isEditing,
  setEditing
}) => {

  const { isLoading: isLoadngForSaveDetails } = useSelector(
    (state: RootState) => state.LeadAcademicDetailsUpdate
  );

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];


  const academicCareerId = activeEnquiry[0]?.academicCareerId;

  // ⭐ Auto-enable PG dialog + UG for career = 3
  useEffect(() => {
    if (academicCareerId === 3) {
      store.dispatch(onSetEnableForUGInputFields());
      store.dispatch(showPgDialog());
    }
  }, [academicCareerId]);

  const { leadCaptureId } = useParams();


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        const updatedValues = { ...values };

        inputData.forEach((group: any) =>
          group.inputFields.forEach((field: any) => {
            if (!updatedValues[field.name]) {
              updatedValues[field.name] = "";
            }
          })
        );

        onSaveAndAddHandler?.({ values: updatedValues, actions });
      }}
    >
      {({ values, setFieldValue }) => {


        return (
          <Form className="w-full" autoComplete="off">

            {isEditing && <div className="flex justify-end mb-10 gap-4 items-center absolute top-[8px] right-4">
              <button
                type="button"
                className=" py-1.5 font-medium rounded"
                onClick={() => {
                  setEditing(false);
                  store.dispatch(getLeadAcademicDetailsById(leadCaptureId));

                }}
              >
                <RxCross2 size={22} color="red" />
              </button>

              <ButtonInput
                style=" py-1.5 font-medium rounded"
                isDisabled={isLoadngForSaveDetails}
                icon={<RxCheck size={24} color="green" />}
                btnType={"submit"}
                isEnableForAction={true}
              />
            </div>}
            {inputData.map((section: any) => (
              <AcademicSection
                key={section.id}
                section={section}
                values={values}
                setFieldValue={setFieldValue}
                // context={{ appeared: initialValues.appeared }}
                handleChange={(name: string, option: any) =>
                  handleSelectChange(
                    name,
                    option,
                    setFieldValue,

                    setIsDisabledForTenthPercentage,
                    setIsDisabledForTwelfthPercentage,
                    setIsDisabledForDiplomaPercentage,
                    setIsDisabledForUgPercentage,
                    setIsDisabledForPgPercentage
                  )
                }
                disableState={{
                  isDisabledForTenthPercentage,
                  isDisabledForTwelfthPercentage,
                  isDisabledForDiplomaPercentage,
                  isDisabledForUgPercentage,
                  isDisabledForPgPercentage,
                }}
                disableSetters={{
                  setIsDisabledForTenthPercentage,
                  setIsDisabledForTwelfthPercentage,
                  setIsDisabledForDiplomaPercentage,
                  setIsDisabledForUgPercentage,
                  setIsDisabledForPgPercentage,
                }}
                isEditing={isEditing}
              />
            ))}

            {!isDisabledForTenthPercentage && (
              <CompetitiveExamForm
                values={values}
                setFieldValue={setFieldValue}
                isEditing={isEditing}
              />
            )}

            {/* Footer Buttons */}
            {/* <div className="flex justify-end gap-x-5 mt-5">
              <button
                type="button"
                onClick={onBackPageHandler}
                className="bg-[#d581a1] text-white font-semibold px-4 py-2 rounded-md"
              >
                Back to dashboard
              </button>

              <button
                type="submit"
                disabled={isLoadngForSaveDetails}
                className={`bg-blue-500 ${
                  isLoadngForSaveDetails
                    ? "bg-opacity-50 cursor-not-allowed"
                    : ""
                } text-white font-semibold px-4 py-2 rounded-md`}
              >
                Save
              </button>
            </div> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AcademicDetailsForm;

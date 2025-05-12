import { Form, Formik } from "formik";
import ButtonInput from "../../../../util/custom/FormInputs/ButtonInput";
import { RxCheck, RxCross2 } from "react-icons/rx";
import InterestShownTable from "./InterestShownTable";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { resetgetEnquiryChangeWarningResponse } from "../../../../store/lead-merge/get-enquiryChangeWarning-by-captureId-and-EnquiryId-slice";
import { getLeadEnquiryDetailsById } from "../../../../store/lead-attribute-update/get-leadEnquiryDetails-slice";
import { useParams } from "react-router-dom";

interface TabFormType {
  tabName?: string;
  isReadOnly?: boolean;
  isModeUpdate?: boolean;
  initialValues: any;
  validationschema: any;
  onSaveAndAddHandler: any;
  btnText: string;
  btnType: string | any;
  isEnableForAction: boolean;
  isEditing: boolean;
  isRowAdded: boolean;
  setEditing: (e: any) => void;
  setIsRowAdded: (e: any) => void;
}

const InterestShownForm: React.FC<TabFormType> = ({
  initialValues,
  validationschema,
  onSaveAndAddHandler,
  btnType,
  isEnableForAction,
  isEditing,
  setEditing,
  setIsRowAdded,
  isRowAdded,
}) => {
  const { isError, isLoading, getEnquiryChangeWarningResponse } = useSelector((state: RootState) => state.getEnquiryChangeWarning);
  const { isLoading: isLoadingForChangeEnquiry } = useSelector((state: RootState) => state.changeLeadEnquiryStatus);

  const handleOk = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    store.dispatch(resetgetEnquiryChangeWarningResponse());
  };

  let toastContainer: any;
  const formikRef = useRef<any>(null);

  useEffect(() => {
    if (isLoading === true) {
      toastContainer = toast.loading("Loading");
    } else if (isError !== null) {
      toastContainer = toast.error("Please try again later!");
    } else {
      toast.dismiss(toastContainer);
    }
  }, [isLoading]);

  const { leadCaptureId } = useParams();

  return (
    <div className={`w-full`}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationschema}
        onSubmit={(values, actions) => {
          const updatedValues = { ...values };

          onSaveAndAddHandler?.({ values: updatedValues, actions });
        }}
      >
        {({ values }) => (
          <Form className="">
            {getEnquiryChangeWarningResponse && (
              <Modal
                open={getEnquiryChangeWarningResponse}
                title="⚠️ Warning: Data Rollback Alert! ⚠️"
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={[
                  <button
                    key="cancel"
                    onClick={handleCancel}
                    style={{
                      backgroundColor: "#f44336", // Custom red color for cancel
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      border: "none",
                      marginRight: "15px",
                    }}
                  >
                    Cancel
                  </button>,
                  <button
                    key="ok"
                    onClick={handleOk}
                    disabled={isLoadingForChangeEnquiry}
                    style={{
                      backgroundColor: "#4CAF50", // Custom green color for OK
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    Proceed
                  </button>,
                ]}
              >
                <p className="py-4 text-justify">
                  Changing the <b>default enquiry </b> now will <b>undo all awarded scholarships</b>, recalculate fee details, and <b>reset installment breakdown</b>
                </p>
                <p className="pb-2 text-justify">
                  🚨<b> Important:</b> The student's portal will be rolled back to the Offer Analysis step for the new enquiry.
                </p>
                <p>
                  💡 <b>Are you sure you want to proceed?</b>
                </p>
              </Modal>
            )}
            {isEditing && (
              <div className="flex justify-end mb-10 gap-4 items-center mt-5 absolute -top-[11px] right-4">
                <button
                  type="button"
                  className=" py-1.5 font-medium rounded"
                  onClick={() => {
                    setEditing(false);
                    store.dispatch(getLeadEnquiryDetailsById(leadCaptureId));
                  }}
                >
                  <RxCross2 size={22} color="red" />
                </button>

                <ButtonInput
                  style={` py-1.5 font-medium rounded ${getEnquiryChangeWarningResponse === true ? "cursor-not-allowed" : ""}`}
                  isDisabled={getEnquiryChangeWarningResponse === true || isLoadingForChangeEnquiry}
                  icon={<RxCheck size={24} color="green" />}
                  btnType={btnType}
                  isEnableForAction={isEnableForAction}
                />
              </div>
            )}

            <InterestShownTable values={values} isEditing={isEditing} setIsRowAdded={setIsRowAdded} isRowAdded={isRowAdded} />
            {/* Submit Button */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InterestShownForm;

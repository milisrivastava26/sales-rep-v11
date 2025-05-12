import React from "react";
import Search from "../../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../../util/custom/customSearchPagination/Pagination";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { StudentDocumentsColumn } from "./StudentDocumentsColumn";
import { CustomTableForDocs } from "../../../../util/custom/CustomTableForDocs";
import { Formik, Form, Field } from "formik";
import { getConfirmationForAllDocsById } from "../../../../store/student-documets/get-confirmation-all-docs-by-lead-id-slice";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";

const StudentDocuments: React.FC = () => {
  const { isLoading, StudentDocsByLeadCaptureIdResponse } = useSelector((state: RootState) => state.getStudentDocsByLeadCaptureIdResponse);
  const { leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);

  const DocumentReviewObject = !isLoading && leadApplicationStatusByLeadId.length !== 0 && leadApplicationStatusByLeadId.find((item: any) => item.name === "Document Review");
  const isAllDocsVerified = DocumentReviewObject && DocumentReviewObject.status; // Ensure DocumentReviewObject is not false before accessing status
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const { leadCaptureId } = useParams();

  const handleSubmit = (_values: { acknowledgment: boolean }, { resetForm }: { resetForm: () => void }) => {
    const payload = {
      leadCaptureId: leadCaptureId,
      leadEnquiryId: leadEnquiryId,
    };
    store.dispatch(getConfirmationForAllDocsById(payload));
    resetForm();
  };

  const validationSchema = Yup.object({
    acknowledgment: Yup.boolean().oneOf([true], "You must acknowledge the terms and conditions").required("Acknowledgment is required"),
  });

  return (
    <>
      {isLoading && <LoadingSpinner size={25} mainLoading={true} message={"Fetching Docs!"} centered={true} />}
      {!isLoading && StudentDocsByLeadCaptureIdResponse.length===0 &&  <Fallback isCenter={true} errorInfo="Documents not found" icon={emptyDataIcon} />}
      {!isLoading && StudentDocsByLeadCaptureIdResponse.length!==0 && (
        <>
          <div className="px-3 pt-[9px] flex justify-between gap-10 items-center">
            <Search />
            <Pagination />
          </div>
          <div className="px-3 pt-[9px] pb-[12px] overflow-x-auto">
            <CustomTableForDocs columns={StudentDocumentsColumn} data={StudentDocsByLeadCaptureIdResponse} isMode="documents" />
            <div className="mt-4">
              {isAllDocsVerified ? (
                <p className="text-green-600 font-semibold text-lg">All documents are verified.</p>
              ) : (
                <Formik initialValues={{ acknowledgment: false }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ errors, touched }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="inline-flex items-center">
                          <Field type="checkbox" name="acknowledgment" className="form-checkbox text-blue-600 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-gray-700">By clicking the checkbox, you agree that you have carefully and thoroughly examined the uploaded documents.</span>
                        </label>
                        {errors.acknowledgment && touched.acknowledgment && <p className="text-red-500 text-sm mt-1">{errors.acknowledgment}</p>}
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentDocuments;

import React, { useEffect } from "react";
import StudentDocuments from "./StudentDocuments";
import store, { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStudentDocsByCareerId } from "../../../../store/student-documets/get-studentDocs-byId-slice";
import { getAllDocUploadStatusByleadCaptureId } from "../../../../store/student-documets/get-all-doc-upload-status-by-leadCapture-id-slice";

const StudentDocumentsPage: React.FC = () => {
  const { isRun: isRunForVerify } = useSelector(
    (state: RootState) => state.verifyStudentDocsResponse
  );

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const careerId = activeEnquiry[0]?.academicCareerId;
  const programId = activeEnquiry[0]?.academicProgramId;

  const payload = {
    careerId: careerId,
    programId: programId
  }
  const { leadCaptureId } = useParams();
  

  useEffect(() => {
    store.dispatch(
      getStudentDocsByCareerId(payload));
      store.dispatch(getAllDocUploadStatusByleadCaptureId(leadCaptureId));
  }, [leadCaptureId, isRunForVerify]);

  return (
    <div>
      <StudentDocuments />
    </div>
  );
};

export default StudentDocumentsPage;

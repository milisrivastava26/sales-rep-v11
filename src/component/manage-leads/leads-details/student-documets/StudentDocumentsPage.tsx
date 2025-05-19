import React, { useEffect } from "react";
import StudentDocuments from "./StudentDocuments";
import { getStudentDocsByLeadCaptureId } from "../../../../store/student-documets/get-studentDocs-byId-slice";
import store, { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentDocumentsPage: React.FC = () => {
  const { isRun: isRunForVerify } = useSelector(
    (state: RootState) => state.verifyStudentDocsResponse
  );
  const { leadCaptureId } = useParams();
  useEffect(() => {
    store.dispatch(getStudentDocsByLeadCaptureId(leadCaptureId));
  }, [leadCaptureId, isRunForVerify]);

  return (
    <div>
      <StudentDocuments />
    </div>
  );
};

export default StudentDocumentsPage;

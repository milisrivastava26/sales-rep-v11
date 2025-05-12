import React from "react";
import { Tooltip } from "react-tooltip";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import store from "../../../../store";
import { verifyStudentDocs } from "../../../../store/student-documets/verify-studentDocs-slice";
import { StudentDocsType } from "../../../../types/manage-leads/student-docs-type";

// Define the props type explicitly
interface VerifyAndRejectButtonProps {
  row: {
    original: StudentDocsType;
  };
}

const VerifyAndRejectButton: React.FC<VerifyAndRejectButtonProps> = ({ row }) => {

  const recievedStatus = row.original.status;

  const handleVerifyAndReject = (leadDocAttachmentId: any, status: any) => {
    store.dispatch(verifyStudentDocs({ leadDocAttachmentId, status }));
  };

  return (
    <div className="flex items-center gap-x-5 cursor-pointer">
      {recievedStatus === "verified" || recievedStatus === "rejected" ? (
        <>{recievedStatus === "verified" ? <p className="text-green-500 ">Verified</p> : <p className="text-red-600">Rejected</p>}</>
      ) : (
        <>
          <span className="verify" onClick={() => handleVerifyAndReject(row.original.leadDocAttachmentId, "verified")}>
            <IoCheckboxOutline color="green" size="22" />
            <Tooltip anchorSelect=".verify" place="top-start" className="custom-tooltip">
              <div className="tooltip-content">
                Verify Document
                <br />
              </div>
            </Tooltip>
          </span>
          <span className="reject" onClick={() => handleVerifyAndReject(row.original.leadDocAttachmentId, "rejected")}>
            <CgCloseR color="red" size="19" />
            <Tooltip anchorSelect=".reject" place="top-start" className="custom-tooltip">
              <div className="tooltip-content">
                Reject Document
                <br />
              </div>
            </Tooltip>
          </span>
        </>
      )}
    </div>
  );
};

export default VerifyAndRejectButton;

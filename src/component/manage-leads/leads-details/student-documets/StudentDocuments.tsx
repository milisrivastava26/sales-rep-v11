import React, { useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import { Table, Tag, Tooltip } from "antd";
import PreviewDocument from "../../../../util/custom/PreviewDocument";
import gapAffidavit from "../../../../assets/sample-pdf/gap-certificate-affidavit-010725042947.pdf";
import antiRaggingStudent from "../../../../assets/sample-pdf/anti-ragging-by-student-191223122233.pdf";
import antiRaggingParent from "../../../../assets/sample-pdf/anti-ragging-by-parents-191223122255.pdf";
import medicalFitness from "../../../../assets/sample-pdf/medicalcertificate-191223122338.pdf";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { verifyStudentDocs } from "../../../../store/student-documets/verify-studentDocs-slice";
import toast from "react-hot-toast";
import { MdDownload } from "react-icons/md";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";
import { useParams } from "react-router-dom";
import { getConfirmationForAllDocsById } from "../../../../store/student-documets/get-confirmation-all-docs-by-lead-id-slice";
import submissionProcess from "../../../../assets/sample-pdf/online-anti-ragging-affidavit-submission-process-010725043218.pdf";

const StudentDocuments: React.FC = () => {
  const { leadCaptureId } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const { isLoading, studentDocsByCareerIdResponse } = useSelector((state: RootState) => state.getStudentDocsByCareerId);
  const { isLoading: isLoadingForVerify } = useSelector((state: RootState) => state.verifyStudentDocsResponse);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const role = userDetails?.authority;
  const isDocumentReviewer = role.includes("ROLE_DOCUMENT_REVIEWER");
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE")
    : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;

  const { leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);
  const { responseForAllDocStatus } = useSelector((state: RootState) => state.getAllDocStatusByLeadIdData);

  const DocumentReviewObject = !isLoading &&
    leadApplicationStatusByLeadId.length !== 0 &&
    leadApplicationStatusByLeadId.find((item: any) => item.name === "Document Review");

  const isAllDocsVerified = DocumentReviewObject && DocumentReviewObject.status;

  const allowedSampleFor = [
    "Gap Affidavit",
    "Anti-Ragging Affidavit By Student",
    "Anti-Ragging Affidavit By Parents/ Guardian",
    "Medical Fitness Certificate"
  ];

  const handleVerifyAndReject = (leadDocAttachmentId: any, status: any) => {
    if (!leadDocAttachmentId) {
      toast.error("Document has not been uploaded yet.");
    } else {
      store.dispatch(verifyStudentDocs({ leadDocAttachmentId, status }));
    }
  };

  const getPdf = (name: string) => {
    switch (name) {
      case "Gap Affidavit":
        return gapAffidavit;
      case "Anti-Ragging Affidavit By Student":
        return antiRaggingStudent;
      case "Anti-Ragging Affidavit By Parents/ Guardian":
        return antiRaggingParent;
      case "Medical Fitness Certificate":
        return medicalFitness;
      default:
        return "#";
    }
  };

  const handleSubmit = () => {
    if (!isChecked) return;
    store.dispatch(getConfirmationForAllDocsById({ leadCaptureId, leadEnquiryId }));
  };

  const columns = [
    {
      title: "Document",
      dataIndex: "name",
      key: "name",
      width: 420,
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium text-gray-800 text-[15px]">{text}</div>
          {text !== "Anti-Ragging Affidavits By Student & Parents/ Guardian" &&
            <div className="text-[13px] text-gray-500">{record.description}</div>}
          {allowedSampleFor.includes(text) &&
            <div className="text-[13px] text-gray-700">Download <a target="_blank" href={getPdf(text)} className="text-blue-600 underline">sample</a> for your reference</div>}
          {text === "Anti-Ragging Affidavits By Student & Parents/ Guardian" &&
            <div className="text-[13px] text-gray-700">
              <a className="text-blue-500 underline" href="https://www.antiragging.in/affidavit_registration_disclaimer.html" target="_blank">Fill Undertaking</a> on the official portal. To check process, <a className="text-blue-500 underline" href={submissionProcess} target="_blank">click here</a>.
            </div>}
        </div>
      ),
    },
    {
      title: "Required",
      dataIndex: "mandatory",
      key: "mandatory",
      width: 120,
      align: "center" as const,
      render: (mandatory: boolean) => (
        <p className={`text-xs ${mandatory ? "text-blue-700" : "text-gray-700"}`}>
          {mandatory ? "Mandatory" : "Optional"}
        </p>
      ),
    },
    {
      title: "Preview",
      key: "status",
      align: "center" as const,
      width: 150,
      render: (_: any, record: any) => {
        const match = responseForAllDocStatus?.find(
          (item: any) => item.coreCareerDocumentId === record.coreCareerDocumentsId
        );
        if (["submitted", "verified", "rejected"].includes(match?.status ?? "")) {
          return <PreviewDocument coreDocAttachmentTypeId={record.coreCareerDocumentsId} />;
        }
        return <Tag color="default" icon={<ExclamationCircleTwoTone twoToneColor="#faad14" />}>Not available</Tag>;
      },
    },
    {
      title: "Download",
      width: 120,
      align: "center" as const,
      render: (record: any) => {
        const match = responseForAllDocStatus?.find(
          (item: any) => item.coreCareerDocumentId === record.coreCareerDocumentsId
        );
        const handleDownload = () => {
          if (!match) return;
          store.dispatch(downloadDocForNotes({
            leadCaptureId,
            docName: match.fileName,
            docTypeId: match.coreCareerDocumentId
          }));
        };
        return (
          <div className="flex justify-center text-gray-700 cursor-pointer hover:text-blue-600" onClick={handleDownload}>
            <MdDownload className="text-xl" />
          </div>
        );
      }
    },
    {
      title: "Status",
      key: "status",
      align: "center" as const,
      width: 150,
      render: (_: any, record: any) => {
        const match = responseForAllDocStatus?.find(
          (item: any) => item.coreCareerDocumentId === record.coreCareerDocumentsId
        );

        return (
          <>
            {match?.status === "verified" && <p className="text-sm text-green-600">Verified</p>}
            {match?.status === "rejected" && <p className="text-sm text-red-600">Rejected</p>}
            {!["verified", "rejected"].includes(match?.status ?? "") &&
              <div className="flex gap-2 justify-center items-center">
                <Tooltip title="Verify Document" placement="top">
                  <button className="verify" disabled={isLoadingForVerify} onClick={() => handleVerifyAndReject(match?.leadDocAttachmentId, "verified")}>
                    <IoCheckboxOutline color="green" size="22" />
                  </button>
                </Tooltip>
                <Tooltip title="Reject Document" placement="top">
                  <button className="reject" disabled={isLoadingForVerify} onClick={() => handleVerifyAndReject(match?.leadDocAttachmentId, "rejected")}>
                    <CgCloseR color="red" size="19" />
                  </button>
                </Tooltip>
              </div>}
          </>
        );
      },
    }
  ];

  const filteredColumns = isDocumentReviewer
    ? columns
    : columns.filter(col => col.title !== "Status");


  return (
    <>
      {isLoading && <LoadingSpinner size={25} mainLoading={true} message="Fetching Docs!" centered={true} />}
      {!isLoading && studentDocsByCareerIdResponse.length === 0 && <Fallback isCenter={true} errorInfo="Documents not found" icon={emptyDataIcon} />}
      {!isLoading && studentDocsByCareerIdResponse.length !== 0 && (
        <div className="px-3 pt-[9px] pb-[30px] overflow-x-auto">
          <Table
            columns={filteredColumns}
            dataSource={studentDocsByCareerIdResponse}
            rowKey="name"
            pagination={false}
            bordered
            size="middle"
          />

          <div className="mt-6 p-4 border border-red-100 bg-red-50 rounded-md text-sm text-gray-700 leading-relaxed">
            <strong className="block text-red-700 mb-1">Note:</strong>
            <ol className="list-decimal list-inside space-y-1">
              <li>All the documents should be uploaded on <strong>NAD DigiLocker Portal</strong>.</li>
              <li>
                Students must submit all affidavits in original and bring two photocopies along with the
                originals of all other documents at the time of physical verification.
              </li>
            </ol>
          </div>

          {isDocumentReviewer &&
            <>
              {isAllDocsVerified ? (
                <p className="text-green-600 font-semibold mt-3 px-4">
                  All documents are verified, student moved for metriculation.
                </p>
              ) : (
                <div className="p-4">
                  <div className="flex items-center gap-4 w-fit">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      Proceed for Metriculation
                    </label>
                    <button
                      onClick={handleSubmit}
                      disabled={!isChecked}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-200 ${isChecked
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </>
          }
        </div>
      )}
    </>
  );
};

export default StudentDocuments;

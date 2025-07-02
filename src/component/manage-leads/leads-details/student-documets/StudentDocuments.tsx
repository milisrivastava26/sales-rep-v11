import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import { Table, Tag, Tooltip } from "antd";
import PreviewDocument from "../../../../util/custom/PreviewDocument";
import gapAffidavit from "../../../../assets/sample-pdf/updated-affidavit-format-gap-nios-191223122320.pdf";
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

const StudentDocuments: React.FC = () => {
  const {leadCaptureId} = useParams();
  const { isLoading, studentDocsByCareerIdResponse } = useSelector((state: RootState) => state.getStudentDocsByCareerId);
  const { isLoading: isLoadingForVerify } = useSelector(
      (state: RootState) => state.verifyStudentDocsResponse
    );

  const { responseForAllDocStatus } = useSelector((state: RootState) => state.getAllDocStatusByLeadIdData);

  const allowedSampleFor = ["Gap Affidavit", "Anti-Ragging Affidavit By Student", "Anti-Ragging Affidavit By Parents/ Guardian", "Medical Fitness Certificate"];

  const handleVerifyAndReject = (leadDocAttachmentId: any, status: any) => {

    if (leadDocAttachmentId === undefined) {
      toast.error("Document has not been uploaded yet.");
    }
    else {
      store.dispatch(verifyStudentDocs({ leadDocAttachmentId, status }));
    }
  };

  const getPdf = (name: string) => {
    if (name === "Gap Affidavit") {
      return gapAffidavit;
    }
    else if (name === "Anti-Ragging Affidavit By Student") {
      return antiRaggingStudent
    }
    else if (name === "Anti-Ragging Affidavit By Parents/ Guardian") {
      return antiRaggingParent
    }
    else if (name === "Medical Fitness Certificate") {
      return medicalFitness
    }
  }

  const columns = [
    {
      title: "Document",
      dataIndex: "name",
      key: "name",
      width: 420,
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium text-gray-800 text-[15px]">{text}</div>
          <div className="text-[13px] text-gray-500">{record.description}</div>
          {allowedSampleFor.includes(text) && <div className="text-[13px] text-gray-700">Download <a target="_blank"
            href={getPdf(text)} className="text-blue-600 underline underline-offset-2 pt-0.5">sample</a> for your reference</div>}
        </div>
      ),
    },
    {
      title: "Required",
      dataIndex: "mandatory",
      key: "mandatory",
      width: 120,
      align: "center" as const,
      render: (mandatory: boolean) =>
        mandatory ? (
          <p className="text-xs text-blue-700">
            Mandatory
          </p>
        ) : (
          <p className="text-xs text-gray-700">
            Optional
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

        if (match?.status === "submitted" || match?.status === "verified" || match?.status === "rejected") {
          return (
            <PreviewDocument coreDocAttachmentTypeId={record.coreCareerDocumentsId} />
          );
        }

        return (
          <Tag color="default" icon={<ExclamationCircleTwoTone twoToneColor="#faad14" />}>
            Not available
          </Tag>
        );
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
            {match?.status === "verified" && <p className="text-sm text-green-600 ">Verified</p>}
            {match?.status === "rejected" && <p className="text-sm text-red-600">Rejected</p>}
            {(match?.status !== "verified" && match?.status !== "rejected") && <div className="flex gap-2 justify-center items-center">
              <Tooltip
                title={
                  <div className="tooltip-content">
                    Verify Document
                    <br />
                  </div>
                }
                placement="top"
                overlayClassName="custom-tooltip"
              >
                <button className="verify" disabled={isLoadingForVerify} onClick={() => handleVerifyAndReject(match?.leadDocAttachmentId, "verified")}>
                  <IoCheckboxOutline color="green" size="22" />
                </button>
              </Tooltip>
              <Tooltip
                title={
                  <div className="tooltip-content">
                    Reject Document
                    <br />
                  </div>
                }
                placement="top"
                overlayClassName="custom-tooltip"
              >
                <button className="reject" disabled={isLoadingForVerify} onClick={() => handleVerifyAndReject(match?.leadDocAttachmentId, "rejected")}>
                  <CgCloseR color="red" size="19" />
                </button>
              </Tooltip>
            </div>}
          </>
        );
      },
    },

  ];

  return (
    <>
      {isLoading && <LoadingSpinner size={25} mainLoading={true} message={"Fetching Docs!"} centered={true} />}
      {!isLoading && studentDocsByCareerIdResponse.length === 0 && <Fallback isCenter={true} errorInfo="Documents not found" icon={emptyDataIcon} />}
      {!isLoading && studentDocsByCareerIdResponse.length !== 0 && (
        <>
          <div className="px-3 pt-[9px] pb-[30px] overflow-x-auto">
            <div className="">
              <Table
                columns={columns}
                dataSource={studentDocsByCareerIdResponse}
                rowKey="name"
                pagination={false}
                bordered
                size="middle"
              />
            </div>


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
          </div>
        </>
      )}
    </>
  );
};

export default StudentDocuments;

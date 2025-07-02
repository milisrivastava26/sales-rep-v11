import React, { useEffect, useState } from "react";
import { Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { resetViewState, viewDoc } from "../../store/view-document/view-document-slice";

interface PreviewDocumentProps {
  coreDocAttachmentTypeId: number | undefined;
}

const PreviewDocument: React.FC<PreviewDocumentProps> = ({
  coreDocAttachmentTypeId,
}) => {
  const dispatch = useDispatch();
  const {leadCaptureId} = useParams();
  const { isLoading, isError, isSuccess } = useSelector(
    (state: RootState) => state.viewDocument
  );
 
  const { responseForAllDocStatus } = useSelector(
    (state: RootState) => state.getAllDocStatusByLeadIdData
  );

  const obj = responseForAllDocStatus.find(
    (item: any) => item.coreCareerDocumentId === coreDocAttachmentTypeId
  );

  const name = obj?.fileName;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && fileUrl) {
      setIsModalOpen(true);
    }
  }, [isSuccess, fileUrl]);

  const handlePreview = () => {
    dispatch(
      viewDoc({
        leadCaptureId,
        docTypeId: coreDocAttachmentTypeId,
        docName: name
      }) as any
    )
      .unwrap()
      .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);
        setMimeType(blob.type);
      })
      .catch(() => {
        setFileUrl(null);
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    if (fileUrl) {
      window.URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    dispatch(resetViewState());
  };

  const isImage = mimeType?.startsWith("image/");
  const isPdf = mimeType === "application/pdf";

  return (
    <>
      <button
        onClick={handlePreview}
        className="px-4 py-2 text-blue-600 text-xl rounded-md hover:text-blue-700 transition"
        disabled={isLoading}
      >
        <Tag color="green" icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}>
          Preview
        </Tag>
      </button>

      <Modal
        title={`Document Preview`}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={1000}
      >
        {isError ? (
          <span className="text-red-500">Failed to load document</span>
        ) : fileUrl ? (
          isPdf ? (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-[80vh]"
            >
              <p>
                Your browser does not support PDFs.{" "}
                <a href={fileUrl} download={name || "document.pdf"}>
                  Download PDF
                </a>
              </p>
            </object>
          ) : isImage ? (
            <img
              src={fileUrl}
              alt="Document Preview"
              className="w-full h-auto rounded-md max-h-[80vh] object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-64">
              <span>No preview available for this file type</span>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-64">
            <span>Loading preview...</span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PreviewDocument;

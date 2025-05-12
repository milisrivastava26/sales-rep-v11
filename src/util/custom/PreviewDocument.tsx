import { Modal } from "antd";
import { useSelector } from "react-redux";
import { IoEyeSharp } from "react-icons/io5";
import store, { RootState } from "../../store";
import React, { useEffect, useState } from "react";
import { resetViewState, viewDoc } from "../../store/view-document/view-document-slice";

interface PreviewDocumentProps {
  name: string | undefined;
  leadCaptureId: number | undefined;
  coreDocAttachmentTypeId: number | undefined;
  coreDocAttachmentTypeName?: string | undefined;
}

const PreviewDocument: React.FC<PreviewDocumentProps> = ({ name, leadCaptureId, coreDocAttachmentTypeId, coreDocAttachmentTypeName }) => {
  const dispatch = store.dispatch;
  const { isLoading, isError, isSuccess } = useSelector((state: RootState) => state.viewDocument);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && fileUrl) {
      setIsModalOpen(true);
    }
  }, [isSuccess, fileUrl]);

  // Handle preview logic
  const handlePreview = () => {
    dispatch(
      viewDoc({
        leadCaptureId,
        docTypeId: coreDocAttachmentTypeId,
        docName: name,
      }) as any
    )
      .unwrap()
      .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);
      })
      .catch(() => {
        setFileUrl(null);
      });
  };

  // Close and revoke Blob URL to prevent memory leaks
  const handleClose = () => {
    setIsModalOpen(false);
    if (fileUrl) {
      window.URL.revokeObjectURL(fileUrl); // ✅ Revoke Blob URL
      setFileUrl(null);
    }
    dispatch(resetViewState());
  };

  const getFileType = (fileName: string): string => {
    const fileExtension = fileName?.split(".").pop()?.toLowerCase() || "";
    return fileExtension;
  };

  const fileType = getFileType(name || "");

  return (
    <>
      <button onClick={handlePreview} className="px-4 py-2 text-blue-600 text-xl rounded-md hover:text-blue-700 transition" disabled={isLoading}>
        <IoEyeSharp />
      </button>

      <Modal
        title={`Document Preview: ${coreDocAttachmentTypeName || name}`}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width={1000}
      >
        {isError ? (
          <span className="text-red-500">Failed to load document</span>
        ) : fileUrl ? (
          // ✅ Display PDF directly with Blob URL
          fileType === "pdf" ? (
            <object data={fileUrl} type="application/pdf" className="w-full h-[80vh]">
              <p>
                Your browser does not support PDFs.
                <a href={fileUrl} download={name}>
                  Download PDF
                </a>
              </p>
            </object>
          ) : ["jpg", "jpeg", "png", "gif", "webp"].includes(fileType) ? (
            // ✅ Display image
            <img src={fileUrl} alt="Document Preview" className="w-full h-auto rounded-md max-h-[80vh] object-contain" />
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

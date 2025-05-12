import store from "../../../../store";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";

interface typeForViewNotes {
  isMode?:string;
  loader: boolean;
  isModeForViewNotes: string | any;
  owner: string | undefined;
  description: string | undefined;
  leadDocAttachmentDTO: any;
  onDownloadDocForNotesHandler?: (
    leadCaptureId: string | number | undefined,
    docName: string | number | undefined,
    docTypeId: string | number | undefined
  ) => void;
}

const ViewNotes: React.FC<typeForViewNotes> = ({ loader, isModeForViewNotes,isMode, owner, description, leadDocAttachmentDTO }) => {
  const dispatch = store.dispatch;
  const showDescription: any = isMode === "notes" ? description : leadDocAttachmentDTO?.description;
  const downloadDoc = (leadCaptureId: string | number | undefined, docName: string | number | undefined, docTypeId: string | number | undefined) => {
    dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
  };

  // console.log("leadDocAttachmentDTO= ", leadDocAttachmentDTO)
  // // console.log("isModeForViewNotes= ", isModeForViewNotes)

  const showContent = (
    <div className="text-gray-500 text-sm pt-2 ml-[15px]">
      <div className="break-all" dangerouslySetInnerHTML={{ __html: showDescription }}></div>
      <div>
        <div
          className="text-blue-400 font-bold cursor-pointer"
          title="download your file"
          onClick={downloadDoc?.bind(
            {},
            leadDocAttachmentDTO?.leadCaptureId,
            leadDocAttachmentDTO?.name,
            leadDocAttachmentDTO?.coreDocAttachmentTypeId
          )}
        >
          {leadDocAttachmentDTO?.name}
        </div>
        {/* <a href={leadDocAttachmentDTO?.path} target="_blank" rel="noopener noreferrer">
          </a> */}
      </div>
      {  isMode === "Notes" &&  (
        <div className="flex gap-x-1 mt-2">
          <div className="flex gap-x-1 items-center">
            <p className="font-normal">Added By:</p>
            <span className="font-semibold">{owner}</span>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <>
      {isMode !== "Notes" && loader && <p>Loading....</p>}
      {isMode !== "Notes" && isModeForViewNotes !== "note" && leadDocAttachmentDTO && Object.keys(leadDocAttachmentDTO).length <= 0 && <p>data not found</p>}
      {isMode !== "Notes" && !loader && showContent}
      {isMode === "Notes"  && showContent}
    </>
  );
};

export default ViewNotes;

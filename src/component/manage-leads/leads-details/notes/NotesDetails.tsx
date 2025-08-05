import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import ProgressStep from "../activity-history/ProgressStep";
import { transformNotesData } from "../../../../util/actions/transformNotesData";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";
import {
  onDrawrOpenHandler,
  uiSliceAction,
} from "../../../../store/ui/ui-slice";
import { getLeadNotesByNoteId } from "../../../../store/notes/get-leadNote-by-leadNoteId-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";

const NotesDetails: React.FC = () => {
  const dispatch = store.dispatch;
  const { isLoading, responseForLeadScheduledNotes } = useSelector(
    (state: RootState) => state.getLeadScheduledNotes
  );
  const transformedTaskData = transformNotesData(responseForLeadScheduledNotes);
  // this function is used to called inside the ViewNotes component to avoid the propdrilling
  const downloadDoc = (
    leadCaptureId: string | number | undefined,
    docName: string | number | undefined,
    docTypeId: string | number | undefined
  ) => {
    store.dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
  };

  const handleEditClick = (leadNotesId: string | number) => {
    dispatch(onDrawrOpenHandler());
    dispatch(uiSliceAction.onGetHeaderTabIconsName("NotesEdit"));
    dispatch(getLeadNotesByNoteId(leadNotesId));
  };

  if (isLoading) {
    return (
      <LoadingSpinner
        centered={false}
        size={20}
        message="Loading Lead Notes"
        mainLoading={true}
      />
    );
  }

  if (!isLoading && transformedTaskData.length === 0) {
    return <Fallback errorInfo="No Notes Found !!" icon={emptyDataIcon} />;
  }

  return transformedTaskData.map((data: any, index: any) => {
    return (
      <div className="px-1 sm:px-3" key={index}>
        {/* <div className="text-sm font-medium text-gray-500 py-1 px-4">{data.group}</div> */}
        <div className="w-full pt-4">
          {data.data.map((step: any, index: any) => {
            return (
              <ProgressStep
                key={index}
                id={step?.leadScheduledTaskId}
                timestamp={step?.updatedAt}
                // date={step?.scheduledDate}
                title={step?.subject}
                //   icon={step?.iconName}
                //   isLast={index === data.tasks.length - 1}
                // createdBy={step?.updatedBy}
                isMode="Notes"
                description={step?.note}
                createdAt={step?.createdAt}
                owner={step?.updatedBy}
                leadDocAttachmentDTO={step?.leadDocAttachmentDTO}
                onDownloadDocForNotesHandler={downloadDoc}
                onHandleEditClick={handleEditClick}
                leadNotesId={step?.leadNotesId}
                createdBy={step?.createdBy}
              />
            );
          })}
          <p></p>
        </div>
      </div>
    );
  });
};

export default NotesDetails;

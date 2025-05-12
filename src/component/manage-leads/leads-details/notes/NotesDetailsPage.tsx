import React, { useEffect } from "react";
import NotesDetails from "./NotesDetails";
import { getLeadScheduledNotesValuesById } from "../../../../store/notes/get-leadScheduledNotes-by-CaptureId-slice";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const NotesDetailsPage: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isRun: isRunForCreateNote } = useSelector(
    (state: RootState) => state.addNewNotes
  );
  const { isRun: isRunForUpdateNote } = useSelector(
    (state: RootState) => state.leadNotesUpdate
  );

  useEffect(() => {
    store.dispatch(getLeadScheduledNotesValuesById(leadCaptureId));
  }, [isRunForCreateNote, isRunForUpdateNote]);
  return (
    <div>
      <NotesDetails />
    </div>
  );
};

export default NotesDetailsPage;

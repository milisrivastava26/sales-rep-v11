import React, { useEffect } from "react";
import TaskDetail from "./TaskDetails";
import store, { RootState } from "../../../../store";
import { getLeadScheduleTaskById } from "../../../../store/task/get-allLeadScheduleTaskById-slice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskDetailPage: React.FC = () => {
  const { leadCaptureId } = useParams();
  const dispatch = store.dispatch;
  const { isRun: isRunForUpdate } = useSelector(
    (state: RootState) => state.leadTaskUpdate
  );
  const { isRun: isRunForCompletionStatus } = useSelector(
    (state: RootState) => state.leadCompletionStatusUpdate
  );
  const { isRun: isRunForCreate } = useSelector(
    (state: RootState) => state.addNewLeadTask
  );



  useEffect(() => {
    dispatch(getLeadScheduleTaskById(leadCaptureId));
  }, [leadCaptureId, isRunForCreate, isRunForUpdate, isRunForCompletionStatus]);

  return (
    <div>
      <TaskDetail />
    </div>
  );
};

export default TaskDetailPage;

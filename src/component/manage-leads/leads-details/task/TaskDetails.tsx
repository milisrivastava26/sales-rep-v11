import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { transformTaskData } from "../../../../util/actions/transformTaskData";
import ProgressStep from "../activity-history/ProgressStep";
import { onDrawrOpenHandler, uiSliceAction } from "../../../../store/ui/ui-slice";
import { getLeadTaskDetailsByTaskIdValues } from "../../../../store/task/get-taskDetails-by-taskTypeId-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";

const TaskDetail: React.FC = () => {
  const dispatch = store.dispatch;
  // const { dropdown1, dropdown2 } = ActiveHistoryData[0];
  const { isLoading: isLoadingForTaskDetailsById, leadScheduleTaskDataById } = useSelector((state: RootState) => state.getLeadScheduleTaskDataById);

  // Transform the task data for (today, yesterday and month type) using the utility function
  const transformedTaskData = transformTaskData(leadScheduleTaskDataById);
  const handleEditClick = (id: number | string, coreTaskTypeId: string | number) => {
    dispatch(onDrawrOpenHandler());
    dispatch(uiSliceAction.onGetHeaderTabIconsName("taskEdit"));
    const leadScheduledTaskId = id;
    dispatch(
      getLeadTaskDetailsByTaskIdValues({
        leadScheduledTaskId,
        coreTaskTypeId,
      })
    );
  };


  if (!isLoadingForTaskDetailsById && transformedTaskData.length === 0) {
    return <Fallback errorInfo="No Tasks Found !!" icon={emptyDataIcon} />;
  }

  return (
    <>
      {isLoadingForTaskDetailsById && <LoadingSpinner size={20} mainLoading={false} message="Fetching Task Details!" centered={true} />}
      {!isLoadingForTaskDetailsById &&
        transformedTaskData.map((data: any, index: number) => (
          <div className="px-1 sm:px-3" key={index}>
            {/* <div className="text-sm font-medium text-gray-500 py-1">{data.key}</div> */}
            <div className="w-full py-4 bg-white px-4 mb-[12px]">
              {data.tasks.map((step: any, taskIndex: number) => (
                <ProgressStep
                  isMode="task"
                  key={taskIndex}
                  title={step?.subject}
                  status={step?.completed}
                  date={step?.scheduledDate}
                  createdBy={step?.createdBy}
                  createdAt={step?.createdAt}
                  id={step?.leadScheduledTaskId}
                  timestamp={step?.scheduledTime}
                  description={step?.taskDetails}
                  owner={step?.salesrpDetailsName}
                  onHandleEditClick={handleEditClick}
                  coreTaskTypeId={step?.coreTaskTypeId}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default TaskDetail;

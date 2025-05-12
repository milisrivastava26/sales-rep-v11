import { useSelector } from "react-redux";
import ProgressStep from "./ProgressStep";
import store, { RootState } from "../../../../store";
import { emptyDataIcon } from "../../../../data/savgIcons";
import Fallback from "../../../../util/custom/ui/Fallback";
import { activeHistoryStep1 } from "../../../../data/manage-leads/active-history-data";
import { transformActivityData } from "../../../../util/actions/transformActivityData";
import { onDrawrOpenHandler, uiSliceAction } from "../../../../store/ui/ui-slice";
import { getActivityDetailsByActionTrackIdValues } from "../../../../store/activity/get-activity-details-by-actionTrackId-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";

const ActiveHistory: React.FC = () => {
  const dispatch = store.dispatch;
  const { leadDetailsDataById, isLoading } = useSelector((state: RootState) => state.getleadDetailsDataById);

  if (!isLoading && leadDetailsDataById.length === 0) {
    return <Fallback errorInfo="No activity History Found !!" icon={emptyDataIcon} />;
  }

  const handleEditClick = (id: number | string) => {
    const actionTrackId = id;
    dispatch(getActivityDetailsByActionTrackIdValues(actionTrackId));
    dispatch(onDrawrOpenHandler());
    dispatch(uiSliceAction.onGetHeaderTabIconsName("ActivityEdit"));
  };
  // Transform the activity data for (today, yesterday and month type) using the utility function
  const transformedTaskData = transformActivityData(leadDetailsDataById);

  if (isLoading) {
      return (
        <LoadingSpinner
          centered={false}
          size={20}
          message="Loading Activity History"
          mainLoading={true}
        />
      );
    }

  return (
    <>
      {transformedTaskData.map((data: any, index: number) => (
        <div className="" key={index}>
          {/* <div className="text-sm font-medium text-gray-500 py-1">{data.key}</div> */}
          <div className="w-full py-4 bg-white mb-[12px]">
            {data.activities.map((step: any, taskIndex: number) => (
              <ProgressStep
                key={taskIndex}
                id={step?.actionTrackId}
                timestamp={step?.actionTimestamp}
                title={step?.actionName}
                icon={step?.iconName}
                isLast={index === activeHistoryStep1.length - 1}
                createdBy={step?.createdBy}
                isMode="activity"
                onHandleEditClick={handleEditClick}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveHistory;

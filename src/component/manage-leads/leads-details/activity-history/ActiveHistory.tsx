import { useSelector } from "react-redux";
import ProgressStep from "./ProgressStep";
import store, { RootState } from "../../../../store";
import { emptyDataIcon } from "../../../../data/savgIcons";
import Fallback from "../../../../util/custom/ui/Fallback";
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

      <div className="">
        {leadDetailsDataById.map((item: any, index: number) => {
          return (
            <div key={index} className="bg-white mb-8 py-2">
              {item.activities.map((step: any, index: number) => {
                return (
                  <div key={index}>
                    <ProgressStep
                      key={index}
                      id={step?.actionTrackId}
                      timestamp={step?.actionTimestamp}
                      title={step?.actionName}
                      icon={step?.iconName}
                      createdBy={step?.createdBy}
                      isMode="activity"
                      onHandleEditClick={handleEditClick}
                    />
                  </div>
                )
              })

              }
            </div>
          )
        })

        }
      </div>
    </>
  );
};

export default ActiveHistory;

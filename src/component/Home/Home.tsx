import PieChart from "./PieChart";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "./CustomTable";
import store, { RootState } from "../../store";
import TopHomeHeader from "./top/TopHomeHeader";
import VerticalBarChart from "./VerticalBarChart";
// import HorizontalBarChart from "./HorizontalBarChart";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import OverdueLeadColumn from "./column/OverdueLeadColumn";
import UntouchedLeadColumn from "./column/UntouchedLeadColumn";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { fetchLeadReports } from "../../store/home/get-followUp-details-slice";
import { getUntouchedLeadsByUsername } from "../../store/dashboard/get-untouchedLeadsByUsername-slice";
import { getTotalPendingTasksByUsername } from "../../store/dashboard/get-totalPendingTasksByUsername-slice";
import { getTodayPendingTasksByUsername } from "../../store/dashboard/get-todayPendingTasksByUsername-slice";
import { getPreviousPendingTasksByUsername } from "../../store/dashboard/get-previousPendingTasksByUsername-slice";
import { getTodayUntouchedLeadDetailsByUsername } from "../../store/dashboard/get-todayUntouchedLeadDetailsByUsername-slice";
import { getPreviousUntouchedLeadDetailsByUsername } from "../../store/dashboard/get-previousUntouchedLeadDetailsByUsername-slice";
import { getLeadsCareerCountByUsername } from "../../store/dashboard/get-leadsCareerCountByUsername-slice";
import { getLeadsSourceCountByUsername } from "../../store/dashboard/get-leadsSourceCountByUsername-slice";
import { getLeadsCountStatusByUsername } from "../../store/dashboard/get-leadsCountStatusByUsername-slice";

const Home: React.FC = () => {
  const dispatch = store.dispatch;
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  // Pie chat
  const { isLoading: CrrCntLoder, responseOfGetLeadsCareerCount } = useSelector(
    (state: RootState) => state.getLeadsCareerCountData
  );

  // Donut Chart
  const { isLoading: SrcCntLoder, responseOfGetLeadsSourceCount } = useSelector(
    (state: RootState) => state.getLeadsSourceCountData
  );
  const { isLoading: StsCntLoder, responseOfGetLeadsCountStatus } = useSelector(
    (state: RootState) => state.getLeadsCountStatusData
  );

  const { isLoading: unTloader, responseOfGetTodayUntouchedLeadDetails } =
    useSelector((state: RootState) => state.getTodayUntouchedLeadDetailsData);
  const { isLoading: prevloader, responseOfGetPreviousUntouchedLeadDetails } =
    useSelector((state: RootState) => state.getPreviousUntouchedLeadDetailData);

  const isApiCalled = useRef(false);
  useEffect(() => {
    const today = new Date();
    const { fullName } = userDetails;
    const formattedDate = today.toISOString().split("T")[0];
    if (isApiCalled.current === false) {
      dispatch(
        fetchLeadReports({
          taskTypeId: 2,
          taskNames: ["Follow-Up", "Meeting"],
          date: formattedDate,
        })
      );
      if (fullName) {
        dispatch(getUntouchedLeadsByUsername(fullName));
        dispatch(getTotalPendingTasksByUsername(fullName));
        dispatch(getTodayPendingTasksByUsername(fullName));
        dispatch(getPreviousPendingTasksByUsername(fullName));
        dispatch(getTodayUntouchedLeadDetailsByUsername(fullName));
        dispatch(getPreviousUntouchedLeadDetailsByUsername(fullName));
        dispatch(getLeadsCareerCountByUsername(fullName));
        dispatch(getLeadsSourceCountByUsername(fullName));
        dispatch(getLeadsCountStatusByUsername(fullName));
      }
    }
    isApiCalled.current = true;
  }, [userDetails]);

  return (
    <div className="w-full min-h-[calc(100vh-56px)]  bg-gray-50">
      <div className="mt-2 px-3">
        <TopHomeHeader />
      </div>
      {/* Table Rendering*/}
      <div className="auto-grid-card_2 !mt-3  px-3 sm:px-6">
        <div className="w-full bg-white shadow-md h-96 rounded-md overflow-auto">
          <h3 className="bg-[#ECF4FC] text-base font-semibold text-gray-800 sticky top-0 z-10 p-3">
            Today Scheduled Task
          </h3>
          {unTloader && (
            <LoadingSpinner
              centered={false}
              size={20}
              message="loading.."
              mainLoading={true}
            />
          )}
          {!unTloader && responseOfGetTodayUntouchedLeadDetails.length <= 0 && (
            <Fallback
              isCenter={true}
              errorInfo="Data not found"
              icon={emptyDataIcon}
            />
          )}
          {!unTloader && responseOfGetTodayUntouchedLeadDetails.length > 0 && (
            <CustomTable
              columns={UntouchedLeadColumn}
              data={responseOfGetTodayUntouchedLeadDetails || []}
            />
          )}
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md overflow-auto">
          <h3 className="bg-[#ECF4FC] text-base font-semibold text-gray-800 sticky top-0 z-10 p-3">
            Overdue Tasks Pending for Closer
          </h3>
          {prevloader && (
            <LoadingSpinner
              centered={false}
              size={20}
              message="loading.."
              mainLoading={true}
            />
          )}
          {!prevloader &&
            responseOfGetPreviousUntouchedLeadDetails.length <= 0 && (
              <Fallback
                isCenter={true}
                errorInfo="Data not found"
                icon={emptyDataIcon}
              />
            )}
          {!prevloader &&
            responseOfGetPreviousUntouchedLeadDetails.length > 0 && (
              <CustomTable
                columns={OverdueLeadColumn}
                data={responseOfGetPreviousUntouchedLeadDetails || []}
              />
            )}
        </div>
      </div>
      {/* Chart's Rendering */}
      <div className="auto-grid-card !mt-3 !mb-5 px-3 sm:px-6">
        <div className="w-full bg-white shadow-md rounded-md flex flex-col gap-3 items-center h-96  overflow-y-auto">
          <h3 className="w-full bg-[#ECF4FC] text-base font-semibold text-gray-800 sticky top-0 z-10 p-3">
            Leads Distribution by Career
          </h3>
          {CrrCntLoder && (
            <LoadingSpinner
              centered={false}
              size={20}
              message="loading.."
              mainLoading={true}
            />
          )}
          {!CrrCntLoder &&
            Object.keys(responseOfGetLeadsCareerCount ?? {}).length <= 0 && (
              <Fallback
                isCenter={true}
                errorInfo="Data not found"
                icon={emptyDataIcon}
              />
            )}
          {!CrrCntLoder &&
            Object.keys(responseOfGetLeadsCareerCount ?? {}).length > 0 && (
              <VerticalBarChart
                responseData={responseOfGetLeadsCareerCount ?? {}}
              />
            )}
        </div>
        <div className="w-full bg-white shadow-md h-96 rounded-md flex flex-col items-center  overflow-hidden">
          <h3 className="w-full bg-[#ECF4FC] text-base font-semibold text-gray-800 sticky top-0 z-10 p-3">
            Leads Distribution by Source
          </h3>

          {SrcCntLoder && (
            <LoadingSpinner
              centered={false}
              size={20}
              message="loading.."
              mainLoading={true}
            />
          )}
          {!SrcCntLoder &&
            Object.keys(responseOfGetLeadsSourceCount ?? {}).length <= 0 && (
              <Fallback
                isCenter={true}
                errorInfo="Data not found"
                icon={emptyDataIcon}
              />
            )}
          {!SrcCntLoder &&
            Object.keys(responseOfGetLeadsSourceCount ?? {}).length > 0 && (
              <PieChart sourceResponse={responseOfGetLeadsSourceCount ?? {}} />
            )}
        </div>

        <div className="w-full bg-white shadow-md rounded-md flex flex-col gap-3 items-center h-96  overflow-y-auto">
          <h3 className="w-full bg-[#ECF4FC] text-base font-semibold text-gray-800 sticky top-0 z-10 p-3">
            Leads Distribution by Application Status
          </h3>

          {StsCntLoder && (
            <LoadingSpinner
              centered={false}
              size={20}
              message="loading.."
              mainLoading={true}
            />
          )}
          {!StsCntLoder &&
            Object.keys(responseOfGetLeadsCountStatus ?? {}).length <= 0 && (
              <Fallback
                isCenter={true}
                errorInfo="Data not found"
                icon={emptyDataIcon}
              />
            )}
          {!CrrCntLoder &&
            Object.keys(responseOfGetLeadsCountStatus ?? {}).length > 0 && (
              <VerticalBarChart
                responseData={responseOfGetLeadsCountStatus ?? {}}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;

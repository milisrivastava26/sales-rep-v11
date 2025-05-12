import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import UntouchedLeadColumn from "../../Home/column/UntouchedLeadColumn";
import Search from "../../../util/custom/customSearchPagination/Search";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { getTodayUntouchedLeadDetailsByUsername } from "../../../store/dashboard/get-todayUntouchedLeadDetailsByUsername-slice";

const Follow_Up: React.FC = () => {
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { fullName } = userDetails;
  useEffect(() => {
    store.dispatch(getTodayUntouchedLeadDetailsByUsername(fullName));
  }, [store.dispatch]);
  const { isLoading, responseOfGetTodayUntouchedLeadDetails } = useSelector(
    (state: RootState) => state.getTodayUntouchedLeadDetailsData
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Today's Follow Up" isMode="followUp" />

      <div className="flex justify-between items-center gap-10 mt-3">
        <Search />
        <Pagination />
      </div>

      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto my-5">
        {isLoading && (
          <LoadingSpinner
            centered={false}
            mainLoading={false}
            message="Loading todays's follow up"
            size={20}
          />
        )}

        {!isLoading && responseOfGetTodayUntouchedLeadDetails.length === 0 && (
          <Fallback
            isCenter={true}
            errorInfo="Data not found"
            icon={emptyDataIcon}
          />
        )}
        {responseOfGetTodayUntouchedLeadDetails.length !== 0 && !isLoading && (
          <CustomDetailsTable
            columns={UntouchedLeadColumn}
            data={responseOfGetTodayUntouchedLeadDetails}
            isMode="followUp"
          />
        )}
      </div>
    </>
  );
};

export default Follow_Up;

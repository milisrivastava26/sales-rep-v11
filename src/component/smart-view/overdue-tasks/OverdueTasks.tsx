import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { useSelector } from "react-redux";
import { getPreviousUntouchedLeadDetailsByUsername } from "../../../store/dashboard/get-previousUntouchedLeadDetailsByUsername-slice";
import UntouchedLeadColumn from "../../Home/column/UntouchedLeadColumn";


const OverdueTasks: React.FC = () => {
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { fullName } = userDetails;
  useEffect(() => {
    store.dispatch(getPreviousUntouchedLeadDetailsByUsername(fullName));
  }, [store.dispatch]);

const { isLoading, responseOfGetPreviousUntouchedLeadDetails } =
    useSelector((state: RootState) => state.getPreviousUntouchedLeadDetailData);

  return (
    <>
      {/* overdue header data */}
      <CustomTabHeader heading="Overdue Tasks" isMode="overdueTask" />

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
            message="Loading overdue tasks"
            size={20}
          />
        )}
        {responseOfGetPreviousUntouchedLeadDetails.length !== 0 &&
          !isLoading && (
            <CustomDetailsTable
              columns={UntouchedLeadColumn}
              data={responseOfGetPreviousUntouchedLeadDetails}
              isMode="overdueTask"
            />
          )}
      </div>
    </>
  );
};

export default OverdueTasks;

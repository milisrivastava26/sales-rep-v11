import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import Search from "../../../util/custom/customSearchPagination/Search";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { getCounsellingDetailsByUsername } from "../../../store/dashboard/get-counselling-details-slice";
import { WalkinAndCounsellingColumn } from "../WalkinAndCounsellingColumn";

const Counselling: React.FC = () => {

  useEffect(() => {
    store.dispatch(getCounsellingDetailsByUsername());
  }, [store.dispatch]);

  const { isLoading, responseOfGetCounsellingDetails } = useSelector(
    (state: RootState) => state.getCounsellingDetails
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Counselling" isMode="counselling" />

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
            message="Loading counselling details"
            size={20}
          />
        )}

        {!isLoading && responseOfGetCounsellingDetails.length === 0 && (
          <Fallback
            isCenter={true}
            errorInfo="Data not found"
            icon={emptyDataIcon}
          />
        )}
        {responseOfGetCounsellingDetails.length !== 0 && !isLoading && (
          <CustomDetailsTable
            columns={WalkinAndCounsellingColumn}
            data={responseOfGetCounsellingDetails}
            isMode="followUp"
          />
        )}
      </div>
    </>
  );
};

export default Counselling;

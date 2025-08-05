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
import { getWalkinDetailsByUsername } from "../../../store/dashboard/get-walkin-details-slice";
import { WalkinAndCounsellingColumn } from "../WalkinAndCounsellingColumn";

const Walkin: React.FC = () => {
  useEffect(() => {
    store.dispatch(getWalkinDetailsByUsername());
  }, [store.dispatch]);

  const { isLoading, responseOfGetWalkinDetails } = useSelector(
    (state: RootState) => state.getWalkinDetails
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Walk-in" isMode="walkin" />

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
            message="Loading walkin details"
            size={20}
          />
        )}

        {!isLoading && responseOfGetWalkinDetails.length === 0 && (
          <Fallback
            isCenter={true}
            errorInfo="Data not found"
            icon={emptyDataIcon}
          />
        )}
        {responseOfGetWalkinDetails.length !== 0 && !isLoading && (
          <CustomDetailsTable
            columns={WalkinAndCounsellingColumn}
            data={responseOfGetWalkinDetails}
            isMode="followUp"
          />
        )}
      </div>
    </>
  );
};

export default Walkin;

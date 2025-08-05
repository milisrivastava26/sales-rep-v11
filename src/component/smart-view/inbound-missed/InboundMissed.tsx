
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { useSelector } from "react-redux";
import { getAllInboundMissedCallDetailsByStatus } from "../../../store/smart-view/get-inboundMissed-call-by-status-slice";
import { MissedColumn } from "../MissedColumn";

const InboundMissed:React.FC = () => {
  useEffect(() => {
    store.dispatch(getAllInboundMissedCallDetailsByStatus());
  }, [store.dispatch]);

  const { inboundMissedCallDetailsByStatusResponse, isLoading } = useSelector(
    (state: RootState) => state.getAllInboundMissedCallDetailsByStatus
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Missed Inbound Call" isMode="missed"/>

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
            message="Loading missed Calls"
            size={20}
          />
        )}
        {inboundMissedCallDetailsByStatusResponse.length !== 0 &&!isLoading && (
          <CustomDetailsTable
            columns={MissedColumn}
            data={inboundMissedCallDetailsByStatusResponse}
            isMode="inboundCalls"
          />
        )}
      </div>
    </>
  );
};

export default InboundMissed;

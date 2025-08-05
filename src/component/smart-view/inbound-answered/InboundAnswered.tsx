import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import { getAllInboundAnsweredCallDetailsByStatus } from "../../../store/smart-view/get-inboundAnswered-call-detailsby-status-slice";
import { useSelector } from "react-redux";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { inboundAnsweredColumn } from "../InboundAnsweredColumn";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";

const InboundAnswered: React.FC = () => {
  useEffect(() => {
    store.dispatch(getAllInboundAnsweredCallDetailsByStatus());
  }, [store.dispatch]);

  const { inboundAnsweredCallDetailsByStatusResponse, isLoading } = useSelector(
    (state: RootState) => state.getAllInboundAnsweredCallDetailsByStatus
  );
  return (
    <>
      {/* InBoundHeaderDataaaa */}
      <CustomTabHeader heading="Answered Inbound Calls" isMode="answered" />

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
            message="Loading answered Calls"
            size={20}
          />
        )}
        {inboundAnsweredCallDetailsByStatusResponse.length !== 0 &&
          !isLoading && (
            <CustomDetailsTable
              columns={inboundAnsweredColumn}
              data={inboundAnsweredCallDetailsByStatusResponse}
              isMode="inboundCalls"
            />
          )}
      </div>
    </>
  );
};

export default InboundAnswered;

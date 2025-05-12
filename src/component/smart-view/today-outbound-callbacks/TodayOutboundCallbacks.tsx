
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { useSelector } from "react-redux";
import { getTodayOutboundCallbacks } from "../../../store/smart-view/get-todayOutboundCallbacks-slice";
import { todayOutboundCallbacks } from "./TodayOutboundColumn";


const TodayOutboundCallbacks:React.FC = () => {
  useEffect(() => {
    store.dispatch(getTodayOutboundCallbacks());
  }, [store.dispatch]);

  const { todayOutboundCallbacksResponse, isLoading } = useSelector(
    (state: RootState) => state.getTodayOutboundCallbacks
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Today's Outbound Callbacks" isMode="todayOutboundCallbacks"/>

      <div className="flex justify-between items-center gap-10 mt-3">
        <Search />
        <Pagination />
      </div>
      {/* loader */}

      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto my-5">
        {isLoading && (
          <LoadingSpinner
            centered={false}
            mainLoading={false}
            message="Loading today's outbound Calls"
            size={20}
          />
        )}
        {todayOutboundCallbacksResponse.length !== 0 &&!isLoading && (
          <CustomDetailsTable
            columns={todayOutboundCallbacks}
            data={todayOutboundCallbacksResponse}
            isMode="inboundCalls"
          />
        )}
      </div>
    </>
  );
};

export default TodayOutboundCallbacks;

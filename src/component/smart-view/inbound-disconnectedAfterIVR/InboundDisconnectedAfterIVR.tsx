import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import { useEffect } from "react";
import { getAllInboundDisconnectedAfterIVRCallDetailsByStatus } from "../../../store/smart-view/get-inbound-DisconnectedAfterIVR-byStatus-slice";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { MissedColumn } from "../MissedColumn";

const InboundDisconnectedAfterIVR = () => {
  useEffect(() => {
    store.dispatch(getAllInboundDisconnectedAfterIVRCallDetailsByStatus());
  }, [store.dispatch]);

  const { InboundDisconnectedAfterIVRCallDetailsByStatusResponse, isLoading } =
    useSelector(
      (state: RootState) => state.getInboundDisconnectedAfterIVRCallDetails
    );
  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Inbound Call Disconnected After IVR" isMode="disconnectedAfterIVR"/>

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
            message="Loading disconnected after IVR Calls"
            size={20}
          />
        )}
        {InboundDisconnectedAfterIVRCallDetailsByStatusResponse.length !==
          0 &&!isLoading && (
          <CustomDetailsTable
            columns={MissedColumn}
            data={InboundDisconnectedAfterIVRCallDetailsByStatusResponse}
            isMode="inboundCalls"
          />
        )}
      </div>
    </>
  );
};

export default InboundDisconnectedAfterIVR;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import Search from "../../../util/custom/customSearchPagination/Search";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { getAllInboundDisconnectedAtIVRCallDetailsByStatus } from "../../../store/smart-view/get-inbound-DisconnectedAtIVR-byStatus-slice";
import { MissedColumn } from "../MissedColumn";

const InboundDisconnectedAtIVR = () => {
  
  useEffect(() => {
    store.dispatch(getAllInboundDisconnectedAtIVRCallDetailsByStatus());
  }, [store.dispatch]);

  const { InboundDisconnectedAtIVRCallDetailsByStatusResponse, isLoading } = useSelector(
    (state: RootState) => state.getInboundDisconnectedAtIVRCallDetails
  );

  return (
    <>
      {/* InBoundHeaderData */}
      <CustomTabHeader heading="Inbound Call Disconnected At IVR" isMode="disconnectedAtIVR" />

      <div className="flex justify-between items-center gap-10 mt-3">
        <Search />
        <Pagination />
      </div>

      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto my-5">
        {isLoading && <LoadingSpinner centered={false} mainLoading={false} message="Loading disconnected at IVR Calls" size={20} />}
        {InboundDisconnectedAtIVRCallDetailsByStatusResponse.length !== 0 && !isLoading && (
          <CustomDetailsTable columns={MissedColumn} data={InboundDisconnectedAtIVRCallDetailsByStatusResponse} isMode="inboundCalls" />
        )}
      </div>
    </>
  );
};

export default InboundDisconnectedAtIVR;

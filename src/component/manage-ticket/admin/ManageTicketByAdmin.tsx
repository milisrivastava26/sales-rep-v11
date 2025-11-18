import React, { useEffect } from "react";
import ManageTicketFilter from "../ManageTicketFilter";
import store, { RootState } from "../../../store";
import { getAllTicketsForAdmin } from "../../../store/manage-ticket/get-TicketLeadsData-forAdmin-slice";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import { useSelector } from "react-redux";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { resetTicketLeadsResponse } from "../../../store/manage-ticket/get-leadTicketData-slice";
import { manageTicketColumnForAdmin } from "./ManageTicketColumnForAdmin";

const ManageTicketByAdmin: React.FC = () => {
  useEffect(() => {
    const initalPayload = {
      typeId: null,
      subTypeId: null,
      status: null,
      isAssigned: null,
      fromDate: null,
      toDate: null,
    };

    store.dispatch(getAllTicketsForAdmin(initalPayload));
  }, []);

  const { isLoading, ticketLeadsData } = useSelector(
    (state: RootState) => state.getTicketLeadsDataForAdmin
  );

  const onSubmit = (values: any) => {
    store.dispatch(resetTicketLeadsResponse());
    store.dispatch(getAllTicketsForAdmin(values));
  };

  return (
    <div className="my-4 mx-3 sm:mx-5 px-3 py-3 sm:px-6 sm:py-6 shadow-md rounded-md bg-white">
      <div className="flex gap-x-1 justify-between items-center">
        <h3 className="text-base sm:text-[22px] font-medium">Manage Ticket</h3>
      </div>

      <div className="my-5">
        <div className="flex justify-between items-center gap-10 my-5">
          <Search />
          <Pagination />
        </div>
        <ManageTicketFilter onSubmit={onSubmit} />

        <div className="mt-5">
          <div className="overflow-x-auto">
            <CustomDetailsTable
              columns={manageTicketColumnForAdmin}
              data={ticketLeadsData}
              isMode="manageTicketForAdmin"
            />
          </div>

          {/* ✅ Loading / No Data State (Just below the table) */}
          <div className="flex justify-center items-center py-6">
            {isLoading ? (
              <div className="flex flex-col items-center text-gray-600">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-sm">Loading tickets...</span>
              </div>
            ) : !isLoading && ticketLeadsData?.length === 0 ? (
              <div className="text-gray-500 text-sm">No tickets found.</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTicketByAdmin;

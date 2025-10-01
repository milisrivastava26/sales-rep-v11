import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { TicketLeadsColumn } from "./ManageTicketColumn";
import Search from "../../util/custom/customSearchPagination/Search";
import Pagination from "../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

const ManageTicket: React.FC = () => {
  const { isLoading, ticketLeadsData } = useSelector((state: RootState) => state.getLeadTicketData);

  return (
    <div className="bg-white rounded-lg overflow-x-auto m-6">
      <div className="p-6">
        <h3 className="text-base sm:text-[22px] font-medium mb-2">Manage Tickets</h3>
        <hr />
        <div className="flex justify-between gap-10 items-center my-5">
          <Search />
          <Pagination />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner centered={false} mainLoading={true} message="Loading..." size={20} />
          </div>
        ) : ticketLeadsData && Array.isArray(ticketLeadsData) && ticketLeadsData.length > 0 ? (
          <CustomDetailsTable data={ticketLeadsData} columns={TicketLeadsColumn} isMode="ManageTicket" />
        ) : (
          <div className="flex justify-center items-center py-10">
            <span className="text-gray-500 text-sm">No tickets found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTicket;

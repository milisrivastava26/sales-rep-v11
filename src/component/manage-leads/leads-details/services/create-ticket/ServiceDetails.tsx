import React from "react";
import { CustomDetailsTable } from "../../../../../util/custom/leadsFormat/CustomDetailsTable";
import { ServiceTicketsColumn } from "../ServiceTicketColumns";
import { RootState } from "../../../../../store";
import { useSelector } from "react-redux";
import Search from "../../../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../../../util/custom/customSearchPagination/Pagination";
import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";

const ServiceDetails: React.FC = () => {
  const { raisedTicketsByLead, isLoading } = useSelector((state: RootState) => state.getAllRaisedTickets);

  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingSpinner centered={false} size={20} message="Loading Ticket Details.." mainLoading={true} />
      </div>
    );
  }

  if (!isLoading && raisedTicketsByLead.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-gray-500 text-sm">No tickets found.</span>
      </div>
    );
  }

  return (
    <div className=" overflow-x-auto">
      <div className="flex justify-between gap-10 items-center my-5">
        <Search />
        <Pagination />
      </div>
      <CustomDetailsTable columns={ServiceTicketsColumn} data={raisedTicketsByLead} isMode="ticketDetails" />
    </div>
  );
};

export default ServiceDetails;

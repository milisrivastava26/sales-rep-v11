import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import CreateTicket from './CreateTicket';
import Search from '../../../../util/custom/customSearchPagination/Search';
import Pagination from '../../../../util/custom/customSearchPagination/Pagination';
import { CustomDetailsTable } from '../../../../util/custom/leadsFormat/CustomDetailsTable';
import { ServiceTicketsColumn } from './ServiceTicketColumns';
import store, { RootState } from '../../../../store';
import { getRaisedTicketsByLeadCaptureId } from '../../../../store/tickets/get-all-raised-tickets-slice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TicketDetails from './TicketDetails';

const Tickets: React.FC = () => {
  const [isCreateTicket, setIsCreateTicket] = useState(false);
  const { leadCaptureId } = useParams();
  const { ticketNumber } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    store.dispatch(getRaisedTicketsByLeadCaptureId(leadCaptureId));
  }, []);

  const { isLoading, raisedTicketsByLead } = useSelector(
    (state: RootState) => state.getAllRaisedTickets
  );

  return (
    <div className="bg-white p-6">

      {(!isCreateTicket && ticketNumber === "") && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-medium text-lg">All Tickets</h1>

            <button
              onClick={() => setIsCreateTicket(true)}
              className="text-white font-medium flex gap-2 items-center px-4 rounded-lg py-1.5 bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              <FaPlus /> New Ticket
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="w-full py-10 flex justify-center items-center">
              <span className="text-blue-600 font-medium animate-pulse text-lg">
                Loading tickets...
              </span>
            </div>
          )}

          {/* No Tickets Found */}
          {!isLoading && raisedTicketsByLead?.length === 0 && (
            <div className="w-full py-10 flex flex-col items-center text-gray-500">
              <img
                src="/no-data.svg"
                alt="No Tickets"
                className="w-32 h-32 opacity-70 mb-3"
              />
              <p className="text-lg font-medium">No tickets found</p>
              <p className="text-sm">Try creating a new ticket.</p>
            </div>
          )}

          {/* Table Data */}
          {!isLoading && raisedTicketsByLead?.length > 0 && (
            <div className="overflow-x-auto">
              <div className="flex justify-between gap-10 items-center my-5">
                <Search />
                <Pagination />
              </div>

              <CustomDetailsTable
                columns={ServiceTicketsColumn}
                data={raisedTicketsByLead}
                isMode="ticketDetails"
              />
            </div>
          )}
        </>
      )}

      {isCreateTicket && <CreateTicket setIsCreateTicket={setIsCreateTicket} />}
      {!isCreateTicket && ticketNumber !== "" && <TicketDetails />}
    </div>
  );
};

export default Tickets;

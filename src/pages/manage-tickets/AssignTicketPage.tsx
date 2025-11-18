import React, { useEffect } from "react";
import AssignTicket from "../../component/manage-ticket/admin/AssignTicket";
import store, { RootState } from "../../store";
import {
  getTicketDetailsByTicketNumber,
  resetTicketDetails,
} from "../../store/tickets/get-ticket-details-by-ticketNumber-slice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GiveSolution from "../../component/manage-ticket/ticketResolver/give-solution/GiveSolution";
import { getAllDepartments } from "../../store/tickets/get-all-department-slice";

const AssignTicketPage: React.FC = () => {
  const { ticketNumber } = useParams<string>();

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  // safely extract authority (default to empty array)
  const authority = userDetails?.authority || [];

  // derive roles safely
  const isAdmin = authority.includes("ROLE_ADMIN");
  const isTicketResolver = authority.includes("ROLE_TICKET_RESOLVER");

  useEffect(() => {
    if (ticketNumber) {
      store.dispatch(getAllDepartments());
      store.dispatch(resetTicketDetails());
      store.dispatch(getTicketDetailsByTicketNumber(ticketNumber));
    }
  }, [ticketNumber]);

  return (
    <div>
      {isAdmin && <AssignTicket />}
      {isTicketResolver && <GiveSolution />}
    </div>
  );
};

export default AssignTicketPage;

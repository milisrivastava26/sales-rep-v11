import React from "react";
import CreateTicket from "./create-ticket/CreateTicket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import GiveSolution from "./give-solution/GiveSolution";

const Service: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const roles = userDetails?.authority || [];

  const isTicketResolver = roles.includes("ROLE_TICKET_RESOLVER");

  return (
    <div>
      {!isTicketResolver && <CreateTicket />}
      {isTicketResolver && <GiveSolution />}
    </div>
  );
};

export default Service;

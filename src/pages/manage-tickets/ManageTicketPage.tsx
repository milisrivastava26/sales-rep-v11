import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import ManageTicketByTicketResolver from "../../component/manage-ticket/ticketResolver/ManageTicketByTicketResolver";
import ManageTicketByAdmin from "../../component/manage-ticket/admin/ManageTicketByAdmin";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { Outlet } from "react-router-dom";
import useForLocation from "../../hooks/useForLocation";

const ManageTicketPage: React.FC = () => {
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const { currentURL } = useForLocation();

  // safely extract authority (default to empty array)
  const authority = userDetails?.authority || [];

  // derive roles safely
  const isAdmin = authority.includes("ROLE_ADMIN");
  const isTicketResolver = authority.includes("ROLE_TICKET_RESOLVER");

  // optionally, show a loading state until userDetails is populated
  if (!userDetails || Object.keys(userDetails).length === 0) {
    return (
      <div>
        <LoadingSpinner
          centered={true}
          mainLoading={true}
          message="Loading..."
          size={25}
        />
      </div>
    );
  }

  return (
    <div>
      {isTicketResolver && (
        <>
          {currentURL === "/manage-ticket" && <ManageTicketByTicketResolver />}
          <Outlet />
        </>
      )}
      {isAdmin && (
        <>
          {currentURL === "/manage-ticket" && <ManageTicketByAdmin />}
          <Outlet />
        </>
      )}
    </div>
  );
};

export default ManageTicketPage;

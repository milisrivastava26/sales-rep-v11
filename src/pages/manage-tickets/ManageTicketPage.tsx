import React, { useEffect } from "react";
import ManageTicket from "../../component/manage-ticket/ManageTicket";
import store, { RootState } from "../../store";
import { getTicketLeadsDataByUsername } from "../../store/manage-ticket/get-leadTicketData-slice";
import { useSelector } from "react-redux";

const ManageTicketPage: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);

  useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      const userName = userDetails.email;
      if (userName !== undefined) {
        store.dispatch(getTicketLeadsDataByUsername(userName));
      }
    }
  }, [userDetails]);

  return (
    <div>
      <ManageTicket />
    </div>
  );
};

export default ManageTicketPage;

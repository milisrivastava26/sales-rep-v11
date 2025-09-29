import React, { useEffect } from "react";
import ServiceDetails from "../create-ticket/ServiceDetails";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../../store";
import { getRaisedTicketsByLeadCaptureId } from "../../../../../store/tickets/get-all-raised-tickets-slice";
import { useSelector } from "react-redux";
import SolutionDetails from "./SolutionDetails";
import { resetGiveSolution } from "../../../../../store/tickets/give-solution-slice";
import { setLeadServiceTicketId, setViewTicketId } from "../../../../../store/ui/ui-slice";

const GiveSolution: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { viewTicketId } = useSelector((state: RootState) => state.ui);
  const { isLoading, solution } = useSelector((state: RootState) => state.giveSolution);

  useEffect(() => {
    store.dispatch(getRaisedTicketsByLeadCaptureId(leadCaptureId));
  }, [leadCaptureId]);

  useEffect(() => {
    if (!isLoading && solution !== null) {
      store.dispatch(getRaisedTicketsByLeadCaptureId(leadCaptureId));
      store.dispatch(resetGiveSolution());
      store.dispatch(setViewTicketId(""));
      store.dispatch(setLeadServiceTicketId(0));
    }
  }, [solution]);

  return (
    <div className="bg-white pb-20 px-3">
      <div className=" h-[50px] flex items-center px-4 bg-blue-100">
        <h1 className="text-lg font-semibold">Service Management</h1>
      </div>

      {viewTicketId === "" && <h1 className="text-lg text-gray-700 mt-2 px-1">All Tickets</h1>}

      {viewTicketId === "" && <ServiceDetails />}
      {viewTicketId !== "" && <SolutionDetails />}
    </div>
  );
};

export default GiveSolution;

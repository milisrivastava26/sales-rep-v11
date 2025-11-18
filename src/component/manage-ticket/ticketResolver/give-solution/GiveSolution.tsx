import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import SolutionDetails from "./SolutionDetails";
import { resetGiveSolution } from "../../../../store/tickets/give-solution-slice";

const GiveSolution: React.FC = () => {
  const { isLoading, solution } = useSelector(
    (state: RootState) => state.giveSolution
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && solution !== null) {
      store.dispatch(resetGiveSolution());
      navigate("/manage-ticket");
      sessionStorage.setItem("leadServiceTicketId", "");
    }
  }, [solution]);

  return (
    <div className="pb-20 px-3 mt-5">
      <SolutionDetails />
    </div>
  );
};

export default GiveSolution;

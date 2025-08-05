import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { OfferAnalysisColumn } from "../manage-leads/leads-details/offer-analysis/OfferAnalysisColumn";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { getAllDiscountReason } from "../../store/scholarship-get/get-all-discountReason-slice";
import DeclinedInstallmentAnalysis from "./DeclinedInstallmentAnalysis";

// import AdjustEnquiry from "./AdjustEnquiry";

// Interface to define props for the OfferAnalysis component
interface OfferAnalysisProps {
  handleLockOffer: () => void; // Function to handle locking the offer
  ongetLeadOfferHistory: any; // Function to get lead offer history
}

const DeclinedOfferAnalysis: React.FC<OfferAnalysisProps> = ({ ongetLeadOfferHistory }) => {
  // Retrieve necessary data from the Redux store
  const { isLoading: isLoadingForLeadOfferByLeadId, getLeadOfferByLeadIdResponse } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
  const { isLoading: isLoadingForLeadOfferDetails } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);


  useEffect(() => {
    store.dispatch(getAllDiscountReason());
  }, [store.dispatch]);
  return (
    <>
      {/* Show loading spinner while fetching fee calculation details */}
      {/* {isLoadingForFeeCalculation && <LoadingSpinner size={35} mainLoading={true} message="Fetching Details.." centered={true} />} */}
      {/* Main content section */}

      <div className="py-3 px-3">
        {/* Offer analysis table */}
        {getLeadOfferByLeadIdResponse.length > 0 && (
          <div cred-500ame="bg-white rounded-md p-5 w-full">
            <div className="w-full overflow-x-auto">
              <CustomDetailsTable columns={OfferAnalysisColumn} data={getLeadOfferByLeadIdResponse} onRowClick={ongetLeadOfferHistory} />
            </div>
          </div>
        )}
        <div>

          {/* loading spinnner for the table data */}

          {isLoadingForLeadOfferDetails && isLoadingForLeadOfferByLeadId && <LoadingSpinner centered={false} mainLoading={false} message="Loading Fee Data" size={25} />}

            <DeclinedInstallmentAnalysis />

        </div>
      </div>
    </>
  );
};

export default DeclinedOfferAnalysis;

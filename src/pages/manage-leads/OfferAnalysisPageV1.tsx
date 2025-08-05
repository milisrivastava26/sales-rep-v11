import React, { useEffect, useState } from "react";
import AllOffers from "../../component/manage-leads/leads-details/offer-analysis/grant-offer/AllOffers";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../store";
import { getLeadOfferByLeadId } from "../../store/offer-analysis/get-lead-offers-by-leadId-slice";
import { useSelector } from "react-redux";
import OfferEvaluationForm from "../../component/manage-leads/leads-details/offer-analysis/grant-offer/OfferEvaluationForm";
import FeeEvaluation from "../../component/manage-leads/leads-details/offer-analysis/grant-offer/FeeEvaluation";
import { getLeadPreviousPaymentByLeadId } from "../../store/offer-analysis/get-leadPreviousPayments-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { resetResponseForGetFeeDetailsV2 } from "../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
import { resetLeadOfferHistoryByOfferIdResponse } from "../../store/offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";
import { resetResponseForScholarshipPercentageDiscount } from "../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import { resetResponseForNewInstallmentDetails } from "../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";

const OfferAnalysisPageV1: React.FC = () => {
  const { leadCaptureId } = useParams();
  const [isNewOffer, setIsNewOffer] = useState(false);

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const { isRun: isRunForLockOffer } = useSelector(
    (state: RootState) => state.lockLeadOffer
  );

  const { getLeadOfferByLeadIdResponse } = useSelector(
    (state: RootState) => state.getLeadOfferByLeadId
  );

  const { isLoading: isLoadingForOfferHistory } = useSelector(
    (state: RootState) => state.leadOfferHistoryByOfferId
  );

  const { isRun: isRunForVoidOffer } = useSelector((state: RootState) => state.EscalateLeadOffer);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;

  useEffect(() => {
    const payload = {
      leadCaptureId: leadCaptureId,
      leadEnquiryId: leadEnquiryId,
    };

    store.dispatch(resetResponseForGetFeeDetailsV2());
    store.dispatch(resetResponseForNewInstallmentDetails());
    store.dispatch(getLeadOfferByLeadId(payload));
    store.dispatch(getLeadPreviousPaymentByLeadId(leadCaptureId));
  }, [leadCaptureId, isRunForLockOffer, isRunForVoidOffer]);

  // condition to check if the status of all the offer given is void
  const isAllOfferStatusVoid = Array.isArray(getLeadOfferByLeadIdResponse)
    ? getLeadOfferByLeadIdResponse.every((item: any) => item.status === "void")
    : false;

  const handleNewOffer = () => {
    store.dispatch(resetResponseForNewInstallmentDetails());
    store.dispatch(resetResponseForScholarshipPercentageDiscount())
    store.dispatch(resetResponseForGetFeeDetailsV2());
    store.dispatch(resetLeadOfferHistoryByOfferIdResponse());
    setIsNewOffer(true)
  }

  return (
    <div>
      <AllOffers setIsNewOffer={setIsNewOffer} />

      {/* check if there is no offer by leadOffer length or if all the offer given is void */}
      {(getLeadOfferByLeadIdResponse.length === 0 || isAllOfferStatusVoid) && (
        <div className="flex justify-end mr-5 mt-3">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md"
            onClick={handleNewOffer}
          >
            Add New Offer
          </button>
        </div>
      )}
      {isLoadingForOfferHistory && (
        <LoadingSpinner
          size={35}
          mainLoading={true}
          message="Loading offer history"
          centered={false}
        />
      )}
      {!isLoadingForOfferHistory && (
        <OfferEvaluationForm
          isNewOffer={isNewOffer}
        />
      )}
      <FeeEvaluation
        isNewOffer={isNewOffer}
        isAllOfferStatusVoid={isAllOfferStatusVoid}
      />
    </div>
  );
};

export default OfferAnalysisPageV1;

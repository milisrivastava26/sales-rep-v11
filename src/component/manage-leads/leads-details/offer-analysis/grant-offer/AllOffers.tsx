import React from "react";
import { CustomDetailsTable } from "../../../../../util/custom/leadsFormat/CustomDetailsTable";
import { OfferAnalysisColumn } from "../OfferAnalysisColumn";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { leadOfferHistoryByOfferId, resetLeadOfferHistoryByOfferIdResponse } from "../../../../../store/offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";
import { useParams } from "react-router-dom";
import { resetResponseForScholarshipPercentageDiscount } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
import { getAllScholarshipOption } from "../../../../../store/scholarship-get/get-all-scholarshipData-slice";


interface propsType {
  setIsNewOffer: (e: any) => void;
}

const AllOffers: React.FC<propsType> = ({ setIsNewOffer }) => {
  const { leadCaptureId } = useParams();

  const { isLoading, getLeadOfferByLeadIdResponse } = useSelector(
    (state: RootState) => state.getLeadOfferByLeadId
  );

  // ✅ Moved OUTSIDE the function
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );

  const ongetLeadOfferHistory = (selectedRowData: any) => {

    if (!selectedRowData) return;
    setIsNewOffer(false)

    const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
      ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
      : [];

    const leadEnquiryId = activeEnquiry[0]?.leadEnquiryId;

    const { offerId } = selectedRowData;
    store.dispatch(resetResponseForScholarshipPercentageDiscount())
    store.dispatch(resetLeadOfferHistoryByOfferIdResponse());
    if (offerId && offerId !== null && leadEnquiryId) {
      store.dispatch(
        leadOfferHistoryByOfferId({ offerId, leadCaptureId, leadEnquiryId })
      );
      store.dispatch(getAllScholarshipOption({ leadCaptureId, leadEnquiryId, offerId }))

    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {getLeadOfferByLeadIdResponse.length > 0 && (
        <div className="bg-white rounded-md p-3 w-full">
          <div className="w-full overflow-x-auto">
            <CustomDetailsTable
              columns={OfferAnalysisColumn}
              data={getLeadOfferByLeadIdResponse}
              onRowClick={ongetLeadOfferHistory}
              isMode="offerAnalysis"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOffers;

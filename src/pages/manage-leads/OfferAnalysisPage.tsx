// import React, { useEffect, useState } from "react";

// import OfferAnalysis from "../../component/manage-leads/leads-details/offer-analysis/OfferAnalysis";

// import store, { RootState } from "../../store";

// import { useSelector } from "react-redux";

// import { getFeeCalculationByProgramId } from "../../store/offer-analysis/get-FeeCalculation-byProgramId-slice";

// import { useParams } from "react-router-dom";

// import { getLeadOfferByLeadId } from "../../store/offer-analysis/get-lead-offers-by-leadId-slice";

// import {
//   leadOfferHistoryByOfferId,
//   resetLeadOfferHistoryByOfferIdResponse,
// } from "../../store/offer-analysis/find-leadOfferHistory-by-offerId-and-leadCaptureId-slice";

// import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";

// import { resetPackageDealByLeadCaptureIdResponse } from "../../store/package-deal/get-package-deal-by-programId-leadCaptureId-slice";

// import useForLocation from "../../hooks/useForLocation";

// import { getAllScholarshipOption } from "../../store/scholarship-get/get-all-scholarshipData-slice";

// import { getLeadPreviousPaymentByLeadId } from "../../store/offer-analysis/get-leadPreviousPayments-slice";

// import { resetResponseForGetFeeDetailsV2 } from "../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";

// import { resetResponseForNewInstallmentDetails } from "../../store/leadFeeDetailsV2/get-newInstallmentDetails-slice";

// import VoidOfferAnalysis from "../../component/manage-leads/leads-details/offer-analysis/VoidOfferAnalysis";
// import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
// import { OfferAnalysisColumn } from "../../component/manage-leads/leads-details/offer-analysis/OfferAnalysisColumn";
// import { setLockOfferStatus } from "../../store/ui/ui-slice";
// import { getMaxCurrentOfferStatus } from "../../store/void-offer/get-maxCurrentOfferStatus-by-enquiryId-slice";

// const OfferAnalysisPage: React.FC = () => {
//   const dispatch = store.dispatch;

//   const { leadCaptureId } = useParams();

//   const { getOfferAndInstallmentPayload: lockLeadOfferData } = useSelector(
//     (state: RootState) => state.ui
//   );

//   const { isLoading } = useSelector(
//     (state: RootState) => state.findLeadScholarshipDetails
//   );

//   const { isLoading: isLoadingForStatus, leadApplicationStatusByLeadId } =
//     useSelector(
//       (state: RootState) => state.getLeadApplicationStatusDataByLeadId
//     );

//   const { responseOfLeadEnquiryDetailsById } = useSelector(
//     (state: RootState) => state.getLeadEnquiryDetailsDataById
//   );

//   const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
//     ? responseOfLeadEnquiryDetailsById.filter(
//         (item: any) => item.status === "ACTIVE"
//       )
//     : [];

//   const leadEnquiryId = activeEnquiry[0].leadEnquiryId;

//   const [offerId, setOfferId] = useState(null);

//   // const [offerLockStatus, setOfferLockStatus] = useState("");

//   const [leadStatus, setLeadStatus] = useState<string>("");

//   const { currentURL } = useForLocation();

//   const { isRun: isrunForLockOffer } = useSelector(
//     (state: RootState) => state.lockLeadOffer
//   );

//   const { isRun: isRunForEscalateLeadOffer } = useSelector(
//     (state: RootState) => state.EscalateLeadOffer
//   );

//   const registrationFeeObject =
//     !isLoadingForStatus &&
//     leadApplicationStatusByLeadId.length !== 0 &&
//     leadApplicationStatusByLeadId.find(
//       (item: any) => item.name === "Registration Fee"
//     );

//   useEffect(() => {
//     store.dispatch(getMaxCurrentOfferStatus(leadEnquiryId));
//   }, [leadEnquiryId]);

//   useEffect(() => {
//     store.dispatch(resetLeadOfferHistoryByOfferIdResponse());

//     store.dispatch(resetResponseForGetFeeDetailsV2());
//   }, [currentURL]);

//   const [displayOfferAnalysis, setDisplayOfferAnalysis] = useState(false);
//   const { getLeadOfferByLeadIdResponse } = useSelector(
//     (state: RootState) => state.getLeadOfferByLeadId
//   );

//   useEffect(() => {
//     const shouldDisplayOfferAnalysis = !!(
//       registrationFeeObject && registrationFeeObject.status === true
//     );

//     setDisplayOfferAnalysis(shouldDisplayOfferAnalysis);
//   }, [leadApplicationStatusByLeadId]);

//   const programId = activeEnquiry[0]?.academicProgramId;

//   // effect to fetch the fee details at the first time when sales rep will lock the offer at very first after the scholarship step from student has been completed

//   useEffect(() => {
//     if (programId !== undefined && leadCaptureId !== undefined) {
//       store.dispatch(
//         getFeeCalculationByProgramId({ programId, leadCaptureId })
//       );
//     }

//     const payload = {
//       leadCaptureId: leadCaptureId,

//       leadEnquiryId: leadEnquiryId,
//     };

//     store.dispatch(getLeadOfferByLeadId(payload));
//   }, [programId, leadCaptureId, isrunForLockOffer, isRunForEscalateLeadOffer]);

//   // function to dispatch the lead offer lock

//   const handleLockOffer = () => {
//     if (Object.keys(lockLeadOfferData).length > 0) {
//       // store.dispatch(lockLeadOffer(lockLeadOfferData));
//     } else {
//       console.error("leadScholarId is undefined or invalid");
//     }
//   };

//   // funnction to get the offerId in case of history (if lead has any offer history)

//   const ongetLeadOfferHistory = (selectedRowData: any) => {
//     if (!selectedRowData) {
//       return;
//     }

//     const { offerId, leadStatus } = selectedRowData;

//     store.dispatch(setLockOfferStatus(leadStatus));

//     if (offerId !== undefined && leadCaptureId !== undefined) {
//       setOfferId(offerId);

//       setLeadStatus(leadStatus);

//       dispatch(resetPackageDealByLeadCaptureIdResponse());
//     }
//   };

//   useEffect(() => {
//     store.dispatch(getLeadPreviousPaymentByLeadId(leadCaptureId));
//   }, [leadCaptureId]);

//   // effect to fetch the lead offer history when offerId changes on click and on first load

//   useEffect(() => {
//     if (offerId !== null) {
//       store.dispatch(
//         leadOfferHistoryByOfferId({ offerId, leadCaptureId, leadEnquiryId })
//       );
//     }

//     if (leadStatus !== "") {
//       const payload = {
//         leadCaptureId: leadCaptureId,
//         leadEnquiryId: leadEnquiryId,
//         offerId: offerId,
//       };

//       store.dispatch(getAllScholarshipOption(payload));
//     }
//   }, [leadStatus, offerId, leadCaptureId, isRunForEscalateLeadOffer]);

//   useEffect(() => {
//     store.dispatch(resetResponseForNewInstallmentDetails());
//   }, [leadCaptureId]);

//   return (
//     <div>
//       {(isLoading) && (
//         <LoadingSpinner
//           centered={false}
//           mainLoading={false}
//           message="Loading"
//           size={25}
//         />
//       )}

//       {/* offer analysis table */}

//       {getLeadOfferByLeadIdResponse.length > 0 && (
//         <div className="bg-white rounded-md p-3 w-full">
//           <div className="w-full overflow-x-auto">
//             <CustomDetailsTable
//               columns={OfferAnalysisColumn}
//               data={getLeadOfferByLeadIdResponse}
//               onRowClick={ongetLeadOfferHistory}
//             />
//           </div>
//         </div>
//       )}

//       {/* if is not loading for scholarship details response call the offer analysis componemt */}

//       {!isLoading && displayOfferAnalysis && leadStatus !== "void" && (
//         <OfferAnalysis
//           handleLockOffer={handleLockOffer}
//           ongetLeadOfferHistory={ongetLeadOfferHistory}
//         />
//       )}

//       {leadStatus === "void" && (
//         <VoidOfferAnalysis
//           handleLockOffer={handleLockOffer}
//           ongetLeadOfferHistory={ongetLeadOfferHistory}
//         />
//       )}
//     </div>
//   );
// };

// export default OfferAnalysisPage;

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import store, { RootState } from "../../../../store";
// import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
// import { CustomDetailsTable } from "../../../../util/custom/leadsFormat/CustomDetailsTable";
// import { OfferAnalysisColumn } from "./OfferAnalysisColumn";
// import HistoryInstallmentAndOfferAnalysis from "./HistoryInstallmentAndOfferAnalysis";
// import InstallmentAndOfferAnalysisNew from "./re-calculate/InstallmentAndOfferAnalysisNew";
// import Scholarship from "./re-calculate/Scholarship";
// import { getAllDiscountReason } from "../../../../store/scholarship-get/get-all-discountReason-slice";
// // import AdjustEnquiry from "./AdjustEnquiry";

// // Interface to define props for the OfferAnalysis component
// interface OfferAnalysisProps {
//   handleLockOffer: () => void; // Function to handle locking the offer
//   ongetLeadOfferHistory: any; // Function to get lead offer history
// }

// const OfferAnalysis: React.FC<OfferAnalysisProps> = ({ ongetLeadOfferHistory }) => {
//   // Retrieve necessary data from the Redux store
//   const { isLoading: isLoadingForLeadOfferByLeadId, getLeadOfferByLeadIdResponse } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
//   const { isLoading: isLoadingForLeadOfferDetails, leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
//   const { isLoading: IsLoadingForFeeDetailsV2, FeeDetailsV2Response } = useSelector((state: RootState) => state.getFeeDetailsV2);
//   const { isLoading: isLoadingForLeadScholarship } = useSelector((state: RootState) => state.getAllScholarshipOption);
//   const { isLoading: isLoadingForPackageDeal, packageDealByLeadCaptureIdResponse } = useSelector((state: RootState) => state.packageDealByLeadCaptureId);
//   const { isLoading: isLoadingForPreviousPayment } = useSelector((state: RootState) => state.getLeadPreviousPaymentByLeadId);

//   useEffect(() => {
//     store.dispatch(getAllDiscountReason());
//   }, [store.dispatch]);
//   return (
//     <>
//       {/* Show loading spinner while fetching fee calculation details */}
//       {/* {isLoadingForFeeCalculation && <LoadingSpinner size={35} mainLoading={true} message="Fetching Details.." centered={true} />} */}
//       {/* Main content section */}

//       <div className=" px-3">
//         {/* Offer analysis table */}
//         {/* {getLeadOfferByLeadIdResponse.length > 0 && (
//           <div cred-500ame="bg-white rounded-md p-5 w-full">
//             <div className="w-full overflow-x-auto">
//               <CustomDetailsTable columns={OfferAnalysisColumn} data={getLeadOfferByLeadIdResponse} onRowClick={ongetLeadOfferHistory} />
//             </div>
//           </div>
//         )} */}
//         {/* {isLoadingForPreviousPayment && <LoadingSpinner centered={false} mainLoading={false} message="Loading Previous enquiry fee details" size={25} />}
//         {!isLoadingForPreviousPayment && getLeadPreviousPaymentByLeadIdResponse !== null && getLeadPreviousPaymentByLeadIdResponse!==0 && <AdjustEnquiry />} */}

//         {/* Scholarship and general info sections */}
//         <div>
//           {/* {isEnablePackageDeal && (
//               <div className="mt-4">
//                 <ReCalculateInput />
//               </div>
//             )} */}

//           {/* scholarship none section */}

//           {(isLoadingForLeadScholarship || isLoadingForPreviousPayment) && <LoadingSpinner centered={false} mainLoading={false} message="Loading Scholarship Data" size={25} />}
//           {!isLoadingForLeadOfferDetails && !isLoadingForLeadOfferByLeadId && !isLoadingForLeadScholarship && !isLoadingForPreviousPayment && <Scholarship />}

//           {/* when scholarship is not selected as nove of the above then rest will come  */}

//           {/* loading spinnner for the table data */}

//           {isLoadingForLeadOfferDetails && isLoadingForLeadOfferByLeadId && <LoadingSpinner centered={false} mainLoading={false} message="Loading Fee Data" size={25} />}

//           {/* Installment and offer analysis section in case of status submitted and when the table doesn't have any rows that is when leadOfferHistoryByOfferIdResponse length is 0 then we will call the installment section with first fee details data  */}
//           {/* this component will be called when first time the student has locked its scholarship option and sales rep have to give the student a offer */}
//           {!isLoadingForLeadOfferDetails &&
//             !isLoadingForLeadOfferByLeadId &&
//             leadOfferHistoryByOfferIdResponse === null &&
//             ((Object.keys(FeeDetailsV2Response).length !== 0 && !IsLoadingForFeeDetailsV2) ||
//               (!isLoadingForPackageDeal && Object.keys(packageDealByLeadCaptureIdResponse).length !== 0)) &&
//             getLeadOfferByLeadIdResponse.length === 0 && <InstallmentAndOfferAnalysisNew />}

//           {/* History Installment and offer analysis section in case of status submitted, declined and accepted and when the table has rows that is when leadOfferHistoryByOfferIdResponse length is not 0 then we will call the history installment section with lead offer history data  */}

//           {/* this component will be called when student has rejected the offer and autority has confirmed to reissue the offer the in this component sales rep can again give some offer to student] */}
//           {!isLoadingForLeadOfferDetails &&
//             !isLoadingForLeadOfferByLeadId &&
//             leadOfferHistoryByOfferIdResponse !== null &&
//             getLeadOfferByLeadIdResponse.length !== 0 && <HistoryInstallmentAndOfferAnalysis />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default OfferAnalysis;

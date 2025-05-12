// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import store, { RootState } from "../../../../store";
// import { useParams } from "react-router-dom";
// import FeeDetails from "./FeeDetails";
// import { lockLeadOffer } from "../../../../store/offer-details/lead-offer-lock-slice";
// import { transformHistoryInstallmentTypePayload } from "../../../../util/actions/transformHistoryInstallmentPayload";
// import { EscalateLeadOffer } from "../../../../store/offer-analysis/eccalate-leadOffer-slice";
// import DownloadFeeAndInstallmentDetails from "./DownloadFeeAndInstallmentDetails";
// import { mergeDetailsOfScholarshipAndInstallment } from "../../../../util/actions/mergeDetailsOfScholarshipAndInstallment";
// import dayjs from "dayjs";
// import { Modal } from "antd";
// import { resetResponseForGetFeeDetailsV2 } from "../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";

// const HistoryInstallmentAndOfferAnalysis: React.FC = () => {
//   const { leadOfferHistoryByOfferIdResponse } = useSelector(
//     (state: RootState) => state.leadOfferHistoryByOfferId
//   );
//   const { responseForAllScholarshipOptions } = useSelector(
//     (state: RootState) => state.getAllScholarshipOption
//   );
//   const { responseOfLeadEnquiryDetailsById } = useSelector(
//     (state: RootState) => state.getLeadEnquiryDetailsDataById
//   );
//   const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
//     ? responseOfLeadEnquiryDetailsById.filter(
//         (item: any) => item.status === "ACTIVE"
//       )
//     : [];
//   const leadEnquiryId =
//     activeEnquiry.length > 0 ? activeEnquiry[0].leadEnquiryId : null;
//   const { userDetails } = useSelector(
//     (state: RootState) => state.getLoggedInUserData
//   );
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const { leadCaptureId } = useParams();
//   const { isLoading: isLoadingForEscalateOffer } = useSelector(
//     (state: RootState) => state.EscalateLeadOffer
//   );
//   const [receiptData, setReceiptData] = useState<any>("");
//   const [openVoidModal, setOpenVoidModal] = useState(false);

//   const PrintOfferHandler = () => {
//     setReceiptData(true);
//     setTimeout(() => {
//       const printContent =
//         document.getElementById("print-contenttt")?.innerHTML;

//       if (!printContent) return;

//       if (printContent) {
//         const iframe = document.createElement("iframe");
//         iframe.style.position = "absolute";
//         iframe.style.width = "0";
//         iframe.style.height = "0";
//         iframe.style.border = "none";
//         document.body.appendChild(iframe);

//         const iframeWindow = iframe.contentWindow;
//         if (!iframeWindow) {
//           document.body.removeChild(iframe);
//           return;
//         }

//         const iframeDoc = iframeWindow.document;
//         iframeDoc.open();
//         iframeDoc.write(`
//           <html>
//             <head>
//               <title>Receipt</title>
//             </head>
//             <body>${printContent}</body>
//           </html>
//         `);
//         iframeDoc.close();

//         iframe.onload = () => {
//           iframeWindow.focus();
//           iframeWindow.print();

//           // Clean up after printing
//           setTimeout(() => {
//             document.body.removeChild(iframe);
//           }, 500);
//         };
//       }
//     }, 500);
//   };

//   const scholarshipAndInstallmentData = mergeDetailsOfScholarshipAndInstallment(
//     responseForAllScholarshipOptions,
//     leadOfferHistoryByOfferIdResponse
//   );

//   const handleLockOffer = () => {
//     setIsButtonDisabled(true);

//     const finalInstallmentPayload = transformHistoryInstallmentTypePayload(
//       leadOfferHistoryByOfferIdResponse,
//       leadCaptureId,
//       leadEnquiryId,
//       responseForAllScholarshipOptions
//     );
//     store.dispatch(lockLeadOffer(finalInstallmentPayload));
//   };

//   const handleEscalate = () => {
//     const EscalateLeadOfferData = {
//       leadFeeDetailsId: leadOfferHistoryByOfferIdResponse.leadFeeDetailsId,
//       leadScholarshipDetailsSalesRepId:
//         responseForAllScholarshipOptions.leadScholarshipDetailsSalesRepId,
//       leadOfferId: leadOfferHistoryByOfferIdResponse.leadOfferId,
//       leadCaptureId: leadCaptureId,
//       status: "declined",
//       leadEnquiryId: leadEnquiryId,
//     };

//     store.dispatch(EscalateLeadOffer(EscalateLeadOfferData));
//   };

//   const handleOk = () => {
//     const EscalateLeadOfferData = {
//       leadFeeDetailsId: leadOfferHistoryByOfferIdResponse.leadFeeDetailsId,
//       leadScholarshipDetailsSalesRepId:
//         responseForAllScholarshipOptions.leadScholarshipDetailsSalesRepId,
//       leadOfferId: leadOfferHistoryByOfferIdResponse.leadOfferId,
//       leadCaptureId: leadCaptureId,
//       status: "void",
//       leadEnquiryId: leadEnquiryId,
//     };

//     store.dispatch(EscalateLeadOffer(EscalateLeadOfferData));
//     store.dispatch(resetResponseForGetFeeDetailsV2());
//   };

//   return (
//     <>
//       <div className="bg-white rounded-md mt-4">
//         <div className=" w-full handle-table-box p-5">
//           {/* Fee-Details Section  */}
//           <FeeDetails />
//           {/* Installment Section */}
//           <div className="w-full mt-5 lg:mt-0 ">
//             <div className="h-[calc(100%-40px)]">
//               <div className="w-full px-3">
//                 <div className="w-full overflow-x-auto ">
//                   {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails &&
//                     leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails
//                       .length !== 0 &&
//                     leadOfferHistoryByOfferIdResponse.status !==
//                       "submitted" && (
//                       <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">
//                         Installment Details
//                       </h2>
//                     )}
//                   <table
//                     className="text-sm"
//                     border={1}
//                     style={{ width: "100%", textAlign: "left" }}
//                   >
//                     {/* <thead>
//                     {/* show the existing installment in case of status re-issues, accept and declined */}
//                     {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails &&
//                       leadOfferHistoryByOfferIdResponse
//                         .leadFeeInstallmentDetails.length !== 0 &&
//                       leadOfferHistoryByOfferIdResponse.status !==
//                         "submitted" && (
//                         <>
//                           <thead>
//                             <tr className="w-full">
//                               <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
//                                 Installment Number
//                               </th>
//                               <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
//                                 Due Date
//                               </th>
//                               <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
//                                 Amount(Rs)
//                               </th>
//                               <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
//                                 Balance(Rs)
//                               </th>
//                               <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">
//                                 Status
//                               </th>
//                               {/* {leadOfferHistoryByOfferIdResponse.status === "submitted" && <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Actions</th>} */}
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.map(
//                               (item: any) => (
//                                 <tr key={item.leadFeeInstallmentDetailsId}>
//                                   <td className="px-1 py-1 text-nowrap border">
//                                     {item.installmentSeq}
//                                   </td>
//                                   <td className="px-1 py-1 text-nowrap border">
//                                     {dayjs(item.dueDate).format("YYYY-MM-DD")}
//                                   </td>
//                                   <td className="px-1 py-1 text-nowrap border">
//                                     {item.installmentAmount.toFixed(2)}
//                                   </td>
//                                   <td className="px-1 py-1 text-nowrap border">
//                                     {item.balance.toFixed(2)}
//                                   </td>
//                                   <td className="px-1 py-1 text-nowrap border">
//                                     {item.status}
//                                   </td>
//                                 </tr>
//                               )
//                             )}
//                           </tbody>
//                         </>
//                       )}
//                   </table>
//                 </div>
//                 {/* {validationErrors.length > 0 && (
//                 <ul className=" text-red-600  px-3 pb-2">
//                   {validationErrors.map((error, index) => (
//                     <li key={index}>{error}</li>
//                   ))}
//                 </ul>
//               )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end pb-5 px-5">
//           {leadOfferHistoryByOfferIdResponse.status === "submitted" && (
//             <>
//               <button
//                 className={`bg-blue-600 text-white px-4 py-2 rounded bottom-[16px] right-[16px]`}
//                 onClick={handleLockOffer}
//                 disabled={isButtonDisabled}
//               >
//                 Lock Offer
//               </button>
//             </>
//           )}
//           {(leadOfferHistoryByOfferIdResponse.status === "validated" ||
//             leadOfferHistoryByOfferIdResponse.status === "accept" ||
//             leadOfferHistoryByOfferIdResponse.status === "declined") && (
//             <button
//               className={` bg-blue-600 text-white px-4 py-2 mr-2 rounded bottom-[16px] right-[16px] `}
//               onClick={PrintOfferHandler}
//             >
//               Print Offer
//             </button>
//           )}

//           {leadOfferHistoryByOfferIdResponse.status === "validated" && (
//             <button
//               className={` bg-red-600 text-white px-4 py-2 rounded bottom-[16px] right-[16px] ${
//                 userDetails?.authority?.includes("ROLE_AUTHORITY")
//                   ? "hidden"
//                   : ""
//               }`}
//               disabled={isLoadingForEscalateOffer}
//               onClick={handleEscalate}
//             >
//               Escalate
//             </button>
//           )}

//           {leadOfferHistoryByOfferIdResponse.status === "validated" && (
//             <button
//               className={` bg-gray-500 text-white ml-2 px-6 py-2 rounded bottom-[16px] right-[16px]`}
//               // disabled={}
//               onClick={() => setOpenVoidModal(true)}
//             >
//               Void
//             </button>
//           )}
//         </div>
//       </div>
//       <div id="print-contenttt" style={{ display: "none" }}>
//         {receiptData && (
//           <DownloadFeeAndInstallmentDetails
//             data={scholarshipAndInstallmentData}
//           />
//         )}
//       </div>

//       <Modal
//         title="Void Offer"
//         open={openVoidModal}
//         onOk={handleOk}
//         onCancel={() => setOpenVoidModal(false)}
//         centered
//       >
//         <p>Are you sure you want to void the offer?</p>
//       </Modal>
//     </>
//   );
// };

// export default HistoryInstallmentAndOfferAnalysis;

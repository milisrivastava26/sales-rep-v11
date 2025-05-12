// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Formik, Field, Form } from "formik";
// import store, { RootState } from "../../../../../store";
// import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";
// import {
//   getInitialValuesForScholarship,
//   getValidationSchemaForScholarship,
// } from "../../../../../data/scholarship-form-data";
// import { getScholarshipPercentageDiscountBySlabId } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
// import { getScholarSchemeByCategId } from "../../../../../store/scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
// import { getScholarSlabBySchemeId } from "../../../../../store/scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";

// interface ScholarshipFormProps {
//   responseForAllScholarshipCateg: any;
//   onScholershipCategory: (val: any) => void;
//   onScholershipScheme: (val: any) => void;
//   onAction: any;
//   setGrantAdditionalDiscount: (e: any) => void;
//   grantAdditionaDiscount: boolean;
//   isDisabled: boolean;
// }

// interface FormValues {
//   scholarshipCategory: any;
//   scholarshipScheme: any;
//   scholarshipSlab: any;
//   additionalDiscount: any;
//   discountReason: any;
//   adjustedAmount: any;
//   adjustedPercentage: any;
// }

// const ScholarshipForm: React.FC<ScholarshipFormProps> = ({
//   responseForAllScholarshipCateg,
//   onScholershipCategory,
//   onScholershipScheme,
//   onAction,
//   grantAdditionaDiscount,
//   setGrantAdditionalDiscount,
//   isDisabled,
// }) => {
//   const {lockOfferStatus} = useSelector((state:RootState) => state.ui);
//   const { isLoading: isLoadingFor, scholarSchemeByCategId } = useSelector(
//     (state: RootState) => state.getAllScholarshipSchemeByCategoryId
//   );
//   const { isLoading: isLoadingForSlab, scholarSlabBySchemeId } = useSelector(
//     (state: RootState) => state.getAllScholarshipSlabBySchemeId
//   );
//   const {
//     scholarshipPercentageDiscountBySlabId,
//     isLoading: isLoadingForDiscountPercentage,
//   } = useSelector(
//     (state: RootState) => state.getScholarshipPercentageDiscountBySlabId
//   );
//   const {
//     isLoading: isloadingForDiscountReason,
//     responseForAllDiscountReason,
//   } = useSelector((state: RootState) => state.getAllDiscountReason);
//   const {
//     isLoading: isLoadingForLeadOfferByLeadId,
//     getLeadOfferByLeadIdResponse,
//   } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
//   const {
//     isLoading: isLoadingForLeadOfferDetails,
//     leadOfferHistoryByOfferIdResponse,
//   } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
//   const { responseForAllScholarshipOptions } = useSelector(
//     (state: RootState) => state.getAllScholarshipOption
//   );
//   const {
//     isLoading: isLoadingForPreviousPayment,
//     getLeadPreviousPaymentByLeadIdResponse,
//   } = useSelector((state: RootState) => state.getLeadPreviousPaymentByLeadId);

//   const [isPreviousEnquiryChecked, setIsPreviousEnquiryChecked] =
//     useState(true);

//   const isFirstTimeOffer =
//     (!isLoadingForLeadOfferDetails &&
//       !isLoadingForLeadOfferByLeadId &&
//       leadOfferHistoryByOfferIdResponse === null &&
//       getLeadOfferByLeadIdResponse.length === 0) ||
//       lockOfferStatus === "void";

//   useEffect(() => {
//     if (
//       leadOfferHistoryByOfferIdResponse.additionalDiscount !== null &&
//       leadOfferHistoryByOfferIdResponse.additionalDiscount !== "" &&
//       leadOfferHistoryByOfferIdResponse.additionalDiscount !== 0 &&
//       !isFirstTimeOffer
//     ) {
//       setGrantAdditionalDiscount(true);
//     }
//   }, [leadOfferHistoryByOfferIdResponse]);

//   const initialValueForView = {
//     scholarshipCategory: responseForAllScholarshipOptions.scholarshipCategoryId,
//     scholarshipScheme: responseForAllScholarshipOptions.scholarshipSchemeId,
//     scholarshipSlab: responseForAllScholarshipOptions.coreScholarshipSlabId,
//     additionalDiscount: leadOfferHistoryByOfferIdResponse.additionalDiscount,
//     discountReason: leadOfferHistoryByOfferIdResponse.additionalDiscountReason,
//     adjustedAmount: leadOfferHistoryByOfferIdResponse.adjustedAmount || "",
//     adjustedPercentage:
//       leadOfferHistoryByOfferIdResponse.adjustedPercentage || "",
//   };

//   useEffect(() => {
//     if (Object.keys(responseForAllScholarshipOptions).length !== 0) {
//       store.dispatch(
//         getScholarSchemeByCategId(
//           responseForAllScholarshipOptions.scholarshipCategoryId
//         )
//       );
//       store.dispatch(
//         getScholarSlabBySchemeId(
//           responseForAllScholarshipOptions.scholarshipSchemeId
//         )
//       );
//     }
//   }, [responseForAllScholarshipOptions]);

//   const initialValue =
//     (!isLoadingForLeadOfferDetails &&
//       !isLoadingForLeadOfferByLeadId &&
//       leadOfferHistoryByOfferIdResponse === null &&
//       getLeadOfferByLeadIdResponse.length === 0) ||
//       lockOfferStatus === "void"
//       ? getInitialValuesForScholarship(getLeadPreviousPaymentByLeadIdResponse)
//       : initialValueForView;

//   const checkIsEnableForEvaluation = (obj: Record<string, any>): boolean => {
//     const keysToCheck = [
//       "scholarshipCategory",
//       "scholarshipScheme",
//       "scholarshipSlab",
//     ]; // Define keys inside the function
//     return Object.entries(obj)
//       .filter(([key]) => keysToCheck.includes(key)) // Filter only the required keys
//       .every(
//         ([, value]) => value !== "" && value !== null && value !== undefined
//       );
//   };

//   const handleEvaluate = (values: any) => {
//     const slabId = values.scholarshipSlab;

//     store.dispatch(getScholarshipPercentageDiscountBySlabId(slabId));
//     // setIsEvaluated(true);
//   };

//   const handleCheckboxChange = () => {
//     setIsPreviousEnquiryChecked(!isPreviousEnquiryChecked);
//   };

//   // const isPageLoading = isLoadingForSlab || isLoadingFor;

//   const isEnableForPreviousEnquiryValidation =
//     !isLoadingForPreviousPayment &&
//     getLeadPreviousPaymentByLeadIdResponse !== null &&
//     getLeadPreviousPaymentByLeadIdResponse !== 0;

//   return (
//     <div className={` mx-auto`}>
//       {/* {isPageLoading && (
//         <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
//         initialValues={initialValue as typeof initialValuesForScholarshipWithAdjustedPercentage}
//         </div>
//       )} */}
//       <Formik<FormValues>
//         // initialValues={responseForApplicationStatus[4].status === true ? initialValuesForUpdateScholarship : initialValuesForScholarship}
//         initialValues={initialValue}
//         validationSchema={getValidationSchemaForScholarship(
//           grantAdditionaDiscount,
//           isEnableForPreviousEnquiryValidation
//         )}
//         validateOnBlur={true}
//         validateOnChange={true}
//         onSubmit={async (values) => {
//           onAction(values);
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           setFieldValue,
//           setTouched,
//           resetForm,
//         }) => {
//           const isEnableForEvaluation = checkIsEnableForEvaluation(values);

//           useEffect(() => {
//             if (isDisabled) {
//               resetForm();
//               setGrantAdditionalDiscount(false);
//             }
//           }, [isDisabled]);

//           useEffect(() => {
//             if (grantAdditionaDiscount === false && isFirstTimeOffer) {
//               setFieldValue("additionalDiscount", "");
//               setFieldValue("discountReason", "");
//             }
//           }, [values, grantAdditionaDiscount]);

//           useEffect(() => {
//             if (isPreviousEnquiryChecked) {
//               // setEnteredAmount(100);
//               setFieldValue("adjustedPercentage", 100);
//             } else {
//               setFieldValue("adjustedPercentage", 0);
//             }
//             // setTouched({ adjustedPercentage: true });
//           }, [isPreviousEnquiryChecked]);

//           return (
//             <Form>
//               <div className="rounded-md  relative">
//                 {!isLoadingForPreviousPayment &&
//                   getLeadPreviousPaymentByLeadIdResponse !== null &&
//                   getLeadPreviousPaymentByLeadIdResponse !== 0 && (
//                     <div className="bg-white py-2 rounded-md px-4">
//                       <h1 className="text-xl text-blue-500 font-semibold mb-4">
//                         Payments till date
//                       </h1>
//                       <div className="flex gap-2 mb-2">
//                         <label>Amount:</label>
//                         <Field
//                           type="text"
//                           name="adjustedAmount"
//                           value={getLeadPreviousPaymentByLeadIdResponse ?? ""}
//                           disabled={true}
//                           className="border-b cursor-not-allowed border-gray-400"
//                         />
//                       </div>

//                       <div className="flex gap-2 mb-2">
//                         <input
//                           disabled={!isFirstTimeOffer}
//                           type="checkbox"
//                           name="previousEnquiry"
//                           checked={isPreviousEnquiryChecked}
//                           onChange={handleCheckboxChange}
//                         />
//                         <label htmlFor="previousEnquiry">
//                           Adjust previous enquiry pay
//                         </label>
//                       </div>

//                       <div className="flex gap-2 mb-2">
//                         <label>Percentage Adjusted:</label>
//                         <Field
//                           type="text"
//                           name="adjustedPercentage"
//                           disabled={!isFirstTimeOffer}
//                           className={`border border-gray-400 px-2 rounded`}
//                           onChange={(e: any) =>
//                             setFieldValue("adjustedPercentage", e.target.value)
//                           }
//                         />
//                       </div>
//                       {touched?.adjustedPercentage &&
//                         typeof errors?.adjustedPercentage === "string" && (
//                           <div className="text-red-500 text-sm">
//                             {errors.adjustedPercentage}
//                           </div>
//                         )}
//                     </div>
//                   )}

//                 <div className="py-2 px-4 my-4 bg-white rounded-md">
//                   <div className=" border-slate-200 ">
//                     <h2 className="text-xl font-semibold text-[#3b82f6]">
//                       Evaluate scholarship eligibility
//                     </h2>
//                   </div>
//                   <div className=" py-2 gap-64 flex md:flex-row flex-cols">
//                     <div>
//                       {/* Scholarship Category */}
//                       <div className="w-full flex flex-col">
//                         <label className="text-gray-700 mb-1">
//                           Scholarship Category
//                         </label>
//                         <Field
//                           as="select"
//                           name="scholarshipCategory"
//                           className={` w-full border rounded-md px-2 py-1 ${
//                             isDisabled || !isFirstTimeOffer
//                               ? "cursor-not-allowed border-slate-200 focus:outline-none focus:border-slate-300"
//                               : "cursor-pointer border-slate-500 focus:outline-none focus:border-slate-500"
//                           }`}
//                           disabled={isDisabled || !isFirstTimeOffer}
//                           onChange={(e: any) => {
//                             const value = e.target.value;
//                             // store.dispatch(resetResponseForScholarshipPercentageDiscount());
//                             onScholershipCategory(value);
//                             setFieldValue("scholarshipCategory", value);
//                             setFieldValue("scholarshipScheme", "");
//                             setFieldValue("scholarshipSlab", "");
//                             setTouched({
//                               scholarshipCategory: false,
//                               scholarshipScheme: false,
//                               scholarshipSlab: false,
//                             });
//                           }}
//                         >
//                           <option value="">--Select--</option>
//                           {responseForAllScholarshipCateg.map(
//                             (item: any, i: number) => (
//                               <option value={item.value} key={i}>
//                                 {item.label}
//                               </option>
//                             )
//                           )}
//                         </Field>
//                         {touched.scholarshipCategory &&
//                           errors.scholarshipCategory &&
//                           typeof errors.scholarshipCategory === "string" &&
//                           !isDisabled && (
//                             <div className="text-red-500 text-sm">
//                               {errors.scholarshipCategory}
//                             </div>
//                           )}
//                       </div>

//                       {/* Scholarship Scheme */}

//                       <div className="mt-2">
//                         {!isLoadingFor && (
//                           <div className="w-full flex flex-col">
//                             <label
//                               className={`${
//                                 isDisabled ? "text-gray-800" : "text-gray-700"
//                               } mb-1`}
//                             >
//                               Scholarship Scheme
//                             </label>
//                             <Field
//                               as="select"
//                               name="scholarshipScheme"
//                               className={` w-full border rounded-md px-2 py-1 ${
//                                 isDisabled || !isFirstTimeOffer
//                                   ? "cursor-not-allowed border-slate-200 focus:outline-none focus:border-slate-300"
//                                   : "cursor-pointer border-slate-500 focus:outline-none focus:border-slate-500"
//                               }`}
//                               disabled={isDisabled || !isFirstTimeOffer}
//                               onChange={(e: any) => {
//                                 const value = e.target.value;
//                                 setFieldValue("scholarshipScheme", value);
//                                 onScholershipScheme(value);
//                               }}
//                             >
//                               <option value="">--Select--</option>
//                               {scholarSchemeByCategId.map(
//                                 (item: any, i: number) => (
//                                   <option value={item.value} key={i}>
//                                     {item.label}
//                                   </option>
//                                 )
//                               )}
//                             </Field>
//                             {touched.scholarshipScheme &&
//                               errors.scholarshipScheme &&
//                               typeof errors.scholarshipScheme === "string" &&
//                               !isDisabled && (
//                                 <div className="text-red-500 text-sm">
//                                   {errors.scholarshipScheme}
//                                 </div>
//                               )}
//                           </div>
//                         )}
//                       </div>

//                       {/* Scholarship Slab */}

//                       <div className="mt-2">
//                         {/* {isLoadingForSlab && <p>Loading....</p>} */}
//                         {!isLoadingForSlab && (
//                           <div className="w-full flex flex-col">
//                             <label
//                               className={`${
//                                 isDisabled ? "text-gray-800" : "text-gray-700"
//                               } mb-1`}
//                             >
//                               Scholarship Slab
//                             </label>
//                             <Field
//                               as="select"
//                               name="scholarshipSlab"
//                               className={` w-full border rounded-md px-2 py-1 ${
//                                 isDisabled || !isFirstTimeOffer
//                                   ? "cursor-not-allowed border-slate-200 focus:outline-none focus:border-slate-300"
//                                   : "cursor-pointer border-slate-500 focus:outline-none focus:border-slate-500"
//                               }`}
//                               disabled={isDisabled || !isFirstTimeOffer}
//                               onChange={(e: any) => {
//                                 const value = e.target.value;
//                                 //   store.dispatch(resetResponseForScholarshipPercentageDiscount());
//                                 setFieldValue("scholarshipSlab", value);
//                               }}
//                             >
//                               <option value="">--Select--</option>
//                               {scholarSlabBySchemeId.map(
//                                 (item: any, i: number) => (
//                                   <option value={item.value} key={i}>
//                                     {item.label}
//                                   </option>
//                                 )
//                               )}
//                             </Field>
//                             {touched.scholarshipSlab &&
//                               errors.scholarshipSlab &&
//                               typeof errors.scholarshipSlab === "string" &&
//                               !isDisabled && (
//                                 <div className="text-red-500 text-sm">
//                                   {errors.scholarshipSlab}
//                                 </div>
//                               )}
//                           </div>
//                         )}
//                       </div>

//                       <>
//                         <div
//                           className={` ${
//                             !isLoadingForDiscountPercentage
//                               ? "justify-end"
//                               : "justify-between"
//                           } ${
//                             Object.keys(scholarshipPercentageDiscountBySlabId)
//                               .length > 0
//                               ? "justify-between"
//                               : "justify-end"
//                           } flex items-center`}
//                         >
//                           {isLoadingForDiscountPercentage && (
//                             <LoadingSpinner
//                               centered={false}
//                               mainLoading={false}
//                               message="Loading You discount Percentage"
//                               size={20}
//                             />
//                           )}

//                           {!isLoadingForDiscountPercentage &&
//                             Object.keys(scholarshipPercentageDiscountBySlabId)
//                               .length > 0 && (
//                               <div className="mt-2  font-medium">
//                                 You are eligible for:{" "}
//                                 {
//                                   scholarshipPercentageDiscountBySlabId.percentageDiscount
//                                 }
//                                 {scholarshipPercentageDiscountBySlabId.name}
//                               </div>
//                             )}
//                         </div>

//                         <div className=" flex my-3">
//                           <button
//                             type="button"
//                             onClick={() => handleEvaluate(values)}
//                             className={`bg-blue-500 text-white px-4 py-1.5 rounded-md mr-2 ${
//                               isEnableForEvaluation
//                                 ? "cursor-pointer "
//                                 : "cursor-not-allowed bg-opacity-50 "
//                             } `}
//                             disabled={!isEnableForEvaluation}
//                           >
//                             Evaluate
//                           </button>
//                         </div>
//                       </>
//                     </div>

//                     <div>
//                       <div className="flex gap-2">
//                         <input
//                           type="checkbox"
//                           name="grantAdditionalDiscount"
//                           disabled={isDisabled || !isFirstTimeOffer}
//                           checked={grantAdditionaDiscount}
//                           onChange={() => {
//                             setGrantAdditionalDiscount(!grantAdditionaDiscount);
//                           }}
//                         />
//                         <label
//                           className={`${
//                             isDisabled ? "text-gray-800" : "text-gray-700"
//                           } mb-1`}
//                           htmlFor="grantAdditionalDiscount"
//                         >
//                           Grant Additional Discount
//                         </label>
//                       </div>
//                       {grantAdditionaDiscount && (
//                         <>
//                           <div className="mt-2">
//                             <label
//                               className={`${
//                                 isDisabled || !isFirstTimeOffer
//                                   ? "text-gray-800"
//                                   : "text-gray-700"
//                               } mb-1`}
//                             >
//                               Additional Discount
//                             </label>
//                             <Field
//                               name="additionalDiscount"
//                               type="text"
//                               disabled={isDisabled || !isFirstTimeOffer}
//                               className={` w-full border rounded-md px-2 py-1 ${
//                                 isDisabled
//                                   ? "cursor-not-allowed border-slate-200 focus:outline-none focus:border-slate-300"
//                                   : "border-slate-500 focus:outline-none focus:border-slate-500"
//                               }`}
//                             />
//                             {touched.additionalDiscount &&
//                               !isDisabled &&
//                               typeof errors.additionalDiscount === "string" && (
//                                 <div className="text-red-500 text-sm">
//                                   {errors.additionalDiscount}
//                                 </div>
//                               )}
//                           </div>

//                           <div className="mt-2">
//                             {/* {isLoadingForSlab && <p>Loading....</p>} */}
//                             {!isloadingForDiscountReason && (
//                               <div className="w-full flex flex-col">
//                                 <label
//                                   className={`${
//                                     isDisabled || !isFirstTimeOffer
//                                       ? "text-gray-800"
//                                       : "text-gray-700"
//                                   } mb-1`}
//                                 >
//                                   Discount Reason
//                                 </label>
//                                 <Field
//                                   as="select"
//                                   name="discountReason"
//                                   className={` w-full border rounded-md px-2 py-1 ${
//                                     isDisabled || !isFirstTimeOffer
//                                       ? "cursor-not-allowed border-slate-200 focus:outline-none focus:border-slate-300"
//                                       : "cursor-pointer border-slate-500 focus:outline-none focus:border-slate-500"
//                                   }`}
//                                   disabled={isDisabled || !isFirstTimeOffer}
//                                   onChange={(e: any) => {
//                                     const value = e.target.value;
//                                     setFieldValue("discountReason", value);
//                                   }}
//                                 >
//                                   <option value="">--Select--</option>
//                                   {responseForAllDiscountReason.map(
//                                     (item: any, i: number) => (
//                                       <option value={item.value} key={i}>
//                                         {item.label}
//                                       </option>
//                                     )
//                                   )}
//                                 </Field>
//                                 {touched.discountReason &&
//                                   !isDisabled &&
//                                   typeof errors.discountReason === "string" && (
//                                     <div className="text-red-500 text-sm">
//                                       {errors.discountReason}
//                                     </div>
//                                   )}
//                               </div>
//                             )}
//                           </div>
//                         </>
//                       )}
//                     </div>

//                     {/* <div className="block">
//                     <CustomUploadInput />
//                   </div> */}

//                     {/* Lock & Evaluate Button */}
//                   </div>
//                   <div className="flex items-center justify-end border-slate-200 py-3">
//                     {((Object.keys(scholarshipPercentageDiscountBySlabId)
//                       .length > 0 &&
//                       !isLoadingForDiscountPercentage &&
//                       !isLoadingForLeadOfferDetails &&
//                       !isLoadingForLeadOfferByLeadId &&
//                       Object.keys(leadOfferHistoryByOfferIdResponse).length ===
//                         0 &&
//                       getLeadOfferByLeadIdResponse.length === 0) ||
//                       (lockOfferStatus === "void" &&
//                         Object.keys(scholarshipPercentageDiscountBySlabId)
//                           .length > 0 &&
//                         !isLoadingForDiscountPercentage)) && (
//                       <div className="flex justify-end ">
//                         <button
//                           type="submit"
//                           className="bg-green-600 text-white px-4 py-1.5 rounded-md"
//                         >
//                           Calculate Fees
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default ScholarshipForm;

// import React, { useEffect, useState } from "react";
// import ScholarshipForm from "./ScholarshipForm";
// import store, { RootState } from "../../../../../store";
// import { getAllScholarshipCategory } from "../../../../../store/scholarship-get/get-all-scholarship-category-slice";
// import { useSelector } from "react-redux";
// import { getScholarSlabBySchemeId } from "../../../../../store/scholarship-get/get-all-scholarshipSlab-by-schemeId-slice";
// import { getScholarSchemeByCategId } from "../../../../../store/scholarship-get/get-all-scholarshipScheme-by-categoryId-slice";
// import { useParams } from "react-router-dom";
// import { getFeeDetailsV2 } from "../../../../../store/leadFeeDetailsV2/get-lead-feeDetailsV2-slice";
// import { resetResponseForScholarshipPercentageDiscount } from "../../../../../store/scholarship-get/get-scholarshipPercentageDiscount-by-slabId-slice";
// import { onSetScholarshipData } from "../../../../../store/ui/ui-slice";

// // interface previousEnquiryPayType {
// //   adjustedPercentage: number;
// //   adjustedAmount: number;
// // }

// const Scholarship: React.FC = () => {
//   const dispatch = store.dispatch;
//   const { leadCaptureId } = useParams();
//   const { responseForAllScholarshipCateg } = useSelector((state: RootState) => state.getAllActiveScholarCategory);
//   const { scholarshipPercentageDiscountBySlabId } = useSelector((state: RootState) => state.getScholarshipPercentageDiscountBySlabId);
//   const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
//   // const { previousEnquiryPay } = useSelector((state: RootState) => state.ui) as unknown as { previousEnquiryPay: previousEnquiryPayType };

//   const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
//   const programId = activeEnquiry[0].academicProgramId;

//   const [grantAdditionaDiscount, setGrantAdditionalDiscount] = useState(false);
//   // state for handle packagedeal checkbox
//   // const [isEnablePackageDeal, setIsEnablePackageDeal] = useState(false);
//   // const [isEnableScholarshipEvaluation, setIsEnableScholarshipEvaluation] = useState(true);

//   // const enableOfferGrantHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const isChecked = e.target.checked;
//   //   setIsEnablePackageDeal(isChecked);
//   //   setIsEnableScholarshipEvaluation(!isChecked);

//   //   dispatch(resetPackageDealByLeadCaptureIdResponse());
//   //   dispatch(resetResponseForScholarshipPercentageDiscount());
//   // };

//   // const enableScholarshipEvaluationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const isChecked = e.target.checked;
//   //   setIsEnableScholarshipEvaluation(isChecked);
//   //   setIsEnablePackageDeal(!isChecked);

//   //   dispatch(resetPackageDealByLeadCaptureIdResponse());
//   //   dispatch(resetResponseForScholarshipPercentageDiscount());
//   // };

//   const scholershipCategory = (value: any) => {
//     const categoryId = value;
//     if (categoryId !== undefined) {
//       dispatch(getScholarSchemeByCategId(categoryId));
//     }
//   };

//   const scholershipScheme = (val: any) => {
//     const categoryId = val;
//     if (categoryId !== undefined) {
//       dispatch(getScholarSlabBySchemeId(categoryId));
//     }
//   };

//   const handleModalOk = (values: any) => {
//     const payload = {
//       leadCaptureId: leadCaptureId,
//       scholarshipApplicableOn: scholarshipPercentageDiscountBySlabId.applicableOn,
//       percentageDiscount: scholarshipPercentageDiscountBySlabId.percentageDiscount,
//       coreAcademicProgramId: programId,
//       discountReason: values.discountReason,
//       additionalDiscount: values.additionalDiscount,
//       adjustedPercentage: values.adjustedPercentage,
//       adjustedAmount: values.adjustedAmount,
//     };

//     store.dispatch(onSetScholarshipData(values));
//     store.dispatch(getFeeDetailsV2(payload));
//     dispatch(resetResponseForScholarshipPercentageDiscount());
//   };
//   useEffect(() => {
//     dispatch(getAllScholarshipCategory());
//   }, [dispatch]);

  
//   return (
//     <div className="mt-5 w-full">
//       <ScholarshipForm
//         responseForAllScholarshipCateg={responseForAllScholarshipCateg}
//         onAction={handleModalOk}
//         onScholershipScheme={scholershipScheme}
//         onScholershipCategory={scholershipCategory}
//         grantAdditionaDiscount={grantAdditionaDiscount}
//         setGrantAdditionalDiscount={setGrantAdditionalDiscount}
//         isDisabled={false}
//       />
     
//     </div>
//   );
// };

// export default Scholarship;

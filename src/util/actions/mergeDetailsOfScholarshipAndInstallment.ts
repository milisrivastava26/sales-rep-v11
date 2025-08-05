export const mergeDetailsOfScholarshipAndInstallment = (responseForAllScholarshipOptions: any, leadOfferHistoryByOfferIdResponse: any) => {
  // Mapping scholarship details from the response
  const generalInfo = {
    "Lead id": responseForAllScholarshipOptions.leadCaptureId,
    Name: leadOfferHistoryByOfferIdResponse.name,
    Email: leadOfferHistoryByOfferIdResponse.email,
    "Phone No": leadOfferHistoryByOfferIdResponse.phone,
    "Academic Career": leadOfferHistoryByOfferIdResponse.career,
    Program: leadOfferHistoryByOfferIdResponse.program,
    Counsellor: responseForAllScholarshipOptions.owner,
  };
  const scholarshipData = {
    "Scholarship Category Name": responseForAllScholarshipOptions.scholarshipCategoryDescription,
    "Scholarship Scheme Name": responseForAllScholarshipOptions.scholarshipSchemeDescription,
    "Scholarship Slab Name": responseForAllScholarshipOptions.scholarshipSlabDescription,
    "Percentage Discount": `${responseForAllScholarshipOptions.percentageDiscount} %`,
    "Applicable on": responseForAllScholarshipOptions.applicableOn == "S" ? "Semester Tution Fee" : "Yearly Tution Fee",
  };

  // Fee details extraction from leadOfferHistoryByOfferIdResponse
  const feeData = {
    "Program Tuition Fee ": `₹ ${leadOfferHistoryByOfferIdResponse.yearlyTuitionFee}`,
    "Other Fee": `₹ ${leadOfferHistoryByOfferIdResponse.yearlyOtherFee}`,
    "Total Course Fee": `₹ ${leadOfferHistoryByOfferIdResponse.yearlyCourseFee}`,
    "Additional Discount": `₹ ${leadOfferHistoryByOfferIdResponse.additionalDiscount}`,
    "Special Discount": `₹ ${leadOfferHistoryByOfferIdResponse.specialDiscount || 0}`,
    "Total Discount": `₹ ${leadOfferHistoryByOfferIdResponse.totalDiscount}`,
    "Fee Payable After Discount": `₹ ${leadOfferHistoryByOfferIdResponse.yearlyCourseFee - leadOfferHistoryByOfferIdResponse.totalDiscount}`,
    "Adjusted Fee": `₹ ${leadOfferHistoryByOfferIdResponse.adjustedAmount}`,
    "Net Fee": `₹ ${leadOfferHistoryByOfferIdResponse.netFee}`,
  };

  // Installment details extraction
  const installmentData = leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails || [];

  // Return an array of three objects (Scholarship, Fee, and Installments)
  return [generalInfo, scholarshipData, feeData, { installmentData }];
};

export function transformHistoryInstallmentTypePayload(feeResponse: any, leadCaptureId: any, leadEnquiryId: any, responseForAllScholarshipOptions: any) {
  // Map API response keys to final payload schema keys

  const mappedfeeResponse = {
    leadScholarshipDetailsSalesRepId: responseForAllScholarshipOptions.leadScholarshipDetailsSalesRepId || "",
    yearlyTuitionFee: feeResponse.yearlyTuitionFee,
    yearlyOtherFee: feeResponse.yearlyOtherFee,
    yearlyCourseFee: feeResponse.yearlyCourseFee,
    discountPercentage: feeResponse.discountPercentage,
    scholarshipDiscount: feeResponse.scholarshipDiscount,
    specialDiscount: feeResponse.specialDiscount,
    totalDiscount: feeResponse.totalDiscount,
    netFee: feeResponse.netFee,
    status: "validated", // Assuming this is constant
    applicableOn: feeResponse.scholarshipApplicableOn || "S",
    // Default "S" if not provided
    leadEnquiryId: leadEnquiryId,
    additionalDiscount: feeResponse.additionalDiscount || 0,
    additionalDiscountReason: feeResponse.additionalDiscountReason || "",
    adjustedAmount: feeResponse.adjustedAmount || 0,
  };

  const scholarshipResponse = {
    leadScholarshipDetailsSalesRepDTO: {
      leadCaptureId: leadCaptureId || null,
      coreScholarshipSlabId: responseForAllScholarshipOptions.coreScholarshipSlabId,
      scholarshipSchemeId: responseForAllScholarshipOptions.scholarshipSchemeId,
      scholarshipCategoryId: responseForAllScholarshipOptions.scholarshipCategoryId,
      leadEnquiryId: leadEnquiryId,
      applicableOn: responseForAllScholarshipOptions.applicableOn || "S",
    },
  };

  // Construct the final payload
  const finalPayload = {
    leadFeeDetailsDTO: {
      leadCaptureId: leadCaptureId || null,
      leadFeeInstallmentDetails: [], // Using the form payload for installments
      ...mappedfeeResponse, // Merged mapped API response
    },
    ...scholarshipResponse,
  };

  return finalPayload;
}

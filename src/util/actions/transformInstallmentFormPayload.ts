import dayjs from "dayjs";

export function transformInstallmentTypePayload(
  feeResponse: any,
  leadCaptureId: any,
  leadEnquiryId: any,
  scholarshipData: any,
  scholarshipDetailsId: any,
  installments: any,
  packageDeal: any,
) {
  const transformedInstallments = installments.map((item: any) => ({
    ...item,
    installmentSeq: item.installmentSequence,
    dueDate: dayjs(item.dueDate).format("YYYY-MM-DD"),
  }));

  // Map API response keys to final payload schema keys
  const mappedfeeResponse = {
    leadScholarshipDetailsSalesRepId: scholarshipDetailsId || "",
    yearlyTuitionFee: feeResponse.programTuitionFee,
    yearlyOtherFee: feeResponse.otherFee,
    yearlyCourseFee: feeResponse.totalCourseFee,
    discountPercentage: feeResponse.percentageDiscount,
    scholarshipDiscount: feeResponse.applicableDiscount,
    specialDiscount: packageDeal || 0,
    totalDiscount: feeResponse.totalDiscount,
    netFee: feeResponse.courseFeeAfterDiscount,
    status: "validated", // Assuming this is constant
    applicableOn: feeResponse.scholarshipApplicableOn || "S",
    // Default "S" if not provided
    leadEnquiryId: leadEnquiryId,
    additionalDiscount: feeResponse.additionalDiscount || 0,
    additionalDiscountReason: scholarshipData.discountReason || "",
    adjustedAmount: feeResponse.adjustedAmount || 0,
  };

  const scholarshipResponse = {
    leadScholarshipDetailsSalesRepDTO: {
      leadCaptureId: leadCaptureId || null,
      coreScholarshipSlabId: scholarshipData.scholarshipSlab || 74,
      scholarshipSchemeId: scholarshipData.scholarshipScheme || 24,
      scholarshipCategoryId: scholarshipData.scholarshipCategory || 7,
      leadEnquiryId: leadEnquiryId,
      applicableOn: feeResponse.scholarshipApplicableOn || "S",
    },
  };

  // Construct the final payload
  const finalPayload = {
    leadFeeDetailsDTO: {
      leadCaptureId: leadCaptureId || null,
      leadFeeInstallmentDetails: transformedInstallments, // Using the form payload for installments
      ...mappedfeeResponse, // Merged mapped API response
    },
    ...scholarshipResponse,
  };

  return finalPayload;
}

export function transformDeclinedInstallmentTypePayload(
  feeResponse: any,
  leadCaptureId: any,
  leadEnquiryId: any,
  scholarshipDetailsId: any,
  installments: any,
  packageDeal: string
) {
  const transformedInstallments = installments.map((item: any) => ({
    ...item,
    installmentSeq: item.installmentSequence,
    dueDate: dayjs(item.dueDate).format("YYYY-MM-DD"),
  }));

  // Map API response keys to final payload schema keys
  const mappedfeeResponse = {
    leadScholarshipDetailsSalesRepId: scholarshipDetailsId || "",
    yearlyTuitionFee: feeResponse.programTuitionFee,
    yearlyOtherFee: feeResponse.otherFee,
    yearlyCourseFee: feeResponse.totalCourseFee,
    discountPercentage: feeResponse.percentageDiscount,
    scholarshipDiscount: feeResponse.applicableDiscount,
    specialDiscount: Number(packageDeal),
    totalDiscount: Number(packageDeal),
    netFee: feeResponse.courseFeeAfterDiscount - Number(packageDeal),
    status: "validated", // Assuming this is constant
    applicableOn: feeResponse.scholarshipApplicableOn || "S",
    // Default "S" if not provided
    leadEnquiryId: leadEnquiryId,
    additionalDiscount: feeResponse.additionalDiscount || 0,
    additionalDiscountReason: "",
    adjustedAmount: feeResponse.adjustedAmount || 0,
  };

  const scholarshipResponse = {
    leadScholarshipDetailsSalesRepDTO: {
      leadCaptureId: leadCaptureId || null,
      coreScholarshipSlabId: "74",
      scholarshipSchemeId: "24",
      scholarshipCategoryId: "7",
      leadEnquiryId: leadEnquiryId,
      applicableOn: feeResponse.scholarshipApplicableOn || "S",
    },
  };

  // Construct the final payload
  const finalPayload = {
    leadFeeDetailsDTO: {
      leadCaptureId: leadCaptureId || null,
      leadFeeInstallmentDetails: transformedInstallments, // Using the form payload for installments
      ...mappedfeeResponse, // Merged mapped API response
    },
    ...scholarshipResponse,
  };

  return finalPayload;
}

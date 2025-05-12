export function transformApiResponse(response: any) {
  const FeeDetailsData = [
    {
      id: 1,
      title: "Program Tution Fee (Yearly)",
      value: response.programTuitionFee,
    },
    {
      id: 2,
      title: "Other Fee",
      value: response.otherFee,
    },
    {
      id: 3,
      title: "Total Course Fee",
      value: response.totalCourseFee,
    },
    {
      id: 4,
      title: "Applicable Scholarship",
      value: `${response.percentageDiscount}% Discount on ${
        response.scholarshipApplicableOn === "S"
          ? "Semester Tuition Fee"
          : "Yearly Tuition Fee"
      }`,
    },
    {
      id: 5,
      title: "Discount",
      value:
        response.applicableDiscount < 1
          ? response.packageDealAmount
          : response.applicableDiscount,
    },
    {
      id: 6,
      title: "Additional Discount",
      value:
        response.additionalDiscount === null ? 0 : response.additionalDiscount,
    },
    // {
    //   id: 7,
    //   title: "Special Discount",
    //   value:
    //     response.specialDiscount === null ? 0 : response.specialDiscount || 0,
    // },
    // {
    //   id: 8,
    //   title: "Total Previous Discount",
    //   value: response.totalDiscount - response.applicableDiscount - response.additionalDiscount,
    // },
    {
      id: 9,
      title: "Total Discount",
      value: response.totalDiscount,
    },
    {
      id: 10,
      title: "Fee Payable After Discount",
      value: response.totalCourseFee - response.totalDiscount,
    },
    {
      id: 11,
      title: "Adjusted Fee",
      value: response.adjustedAmount || 0,
    },
    {
      id: 12,
      title: "Net Fee",
      value: response.courseFeeAfterDiscount,
    },
  ];

  return FeeDetailsData;
}

export function transformDeclinedFeeResponse(response: any, packageDeal: any) {
  const FeeDetailsData = [
    {
      id: 1,
      title: "Program Tution Fee (Yearly)",
      value: response.programTuitionFee,
    },
    {
      id: 2,
      title: "Other Fee",
      value: response.otherFee,
    },
    {
      id: 3,
      title: "Total Course Fee",
      value: response.totalCourseFee,
    },
    {
      id: 4,
      title: "Applicable Scholarship",
      value: `${response.percentageDiscount}% Discount on ${
        response.scholarshipApplicableOn === "S"
          ? "Semester Tuition Fee"
          : "Yearly Tuition Fee"
      }`,
    },
    {
      id: 5,
      title: "Scholarship Discount",
      value:
        response.applicableDiscount === null ? 0 : response.applicableDiscount,
    },
    {
      id: 6,
      title: "Additional Discount",
      value:
        response.additionalDiscount === null ? 0 : response.additionalDiscount,
    },
    {
      id: 7,
      title: "Special Discount",
      value: packageDeal || 0,
    },
    // {
    //   id: 8,
    //   title: "Total Previous Discount",
    //   value: response.totalDiscount - response.applicableDiscount - response.additionalDiscount,
    // },
    {
      id: 9,
      title: "Total Discount",
      value: packageDeal || 0,
    },
    {
      id: 10,
      title: "Fee Payable After Discount",
      value: response.totalCourseFee - response.totalDiscount - packageDeal,
    },
    {
      id: 11,
      title: "Adjusted Fee",
      value: response.adjustedAmount || 0,
    },
    {
      id: 12,
      title: "Net Fee",
      value: response.courseFeeAfterDiscount - packageDeal,
    },
  ];

  return FeeDetailsData;
}

// export function formatNumber(num: any) {
//   return Number(num).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

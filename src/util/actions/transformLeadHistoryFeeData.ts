export function transformLeadHistoryFeeData(response: any) {
  const FeeDetailsData = [
    {
      id: 1,
      title: "Program Tution Fee (Yearly)",
      value: response.yearlyTuitionFee,
    },
    {
      id: 2,
      title: "Other Fee",
      value: response.yearlyOtherFee,
    },
    {
      id: 3,
      title: "Total Course Fee",
      value: response.yearlyCourseFee,
    },
    {
      id: 4,
      title: "Applicable Scholarship",
      value: `${response.discountPercentage}% Discount on ${response.applicableOn === "S" ? "Semester Tuition Fee" : "Yearly Tuition Fee"}`,
    },
    {
      id: 5,
      title: "Discount",
      value: response.scholarshipDiscount < 1 ? response.packageDealAmount : response.scholarshipDiscount ,
    },
    {
      id: 6,
      title: "Additional Discount",
      value: response.additionalDiscount === null ? 0 : response.additionalDiscount,
    },
    // {
    //   id: 7,
    //   title: "Special Discount",
    //   value: response.specialDiscount === null ? 0 : response.specialDiscount,
    // },

    // {
    //   id: 8,
    //   title: "Total Previous Discount",
    //   value: response.totalDiscount - response.scholarshipDiscount - response.specialDiscount,
    // },

    {
      id: 9,
      title: "Total Discount",
      value: response.totalDiscount,
    },
    {
      id: 10,
      title: "Fee Payable After Discount",
      value: response.yearlyCourseFee - response.totalDiscount,
    },
    {
      id: 11,
      title: "Adjusted Fee",
      value: response.adjustedAmount || 0,
    },
    {
      id: 12,
      title: "Net Fee",
      value: response.netFee,
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

import * as Yup from "yup";

export const getInitialValuesForScholarship = (amount: any) => {
  let initialValues = {
    scholarshipCategory: "",
    scholarshipScheme: "",
    scholarshipSlab: "",
    additionalDiscount: 0,
    discountReason: "",
    adjustedAmount: amount || 0,
    adjustedPercentage: 100,
  };
  return initialValues;
};

export const transformScholarshipInitialValues = (leadHistoryData: any) => {
  const initialValues = {
    scholarshipCategory: leadHistoryData.coreScholarshipCategoryId,
    scholarshipScheme: leadHistoryData.coreScholarshipSchemeId,
    scholarshipSlab: leadHistoryData.coreScholarshipSlabId,
    additionalDiscount: leadHistoryData.coreScholarshipCategoryId !==9 ? leadHistoryData.additionalDiscount : 0,
    discountReason: "",
    adjustedPercentage: leadHistoryData.adjustedPercentage,
    adjustedAmount: leadHistoryData.adjustedAmount,
  };

  return initialValues;
};

export const validationSchemaForScholarship = () => {
  let schema: Record<string, any> = {
    scholarshipCategory: Yup.string().required(
      "Please select a Scholarship Category."
    ),
    scholarshipScheme: Yup.string().required(
      "Please select a Scholarship Scheme."
    ),
    scholarshipSlab: Yup.string().required("Please select a Scholarship Slab."),
    adjustedAmount: Yup.number()
      .typeError("Adjusted Amount must be a number")
      .positive("Adjusted Amount must be a positive number"),

    adjustedPercentage: Yup.number()
      .typeError("Adjusted Percentage must be a number")
      .integer("Adjusted Percentage must be a whole number")
      .min(0, "Adjusted Percentage cannot be less than 0")
      .max(100, "Adjusted Percentage cannot be greater than 100")
      .required("Adjusted Percentage is required."),
    additionalDiscount: Yup.number()
      .typeError("Additional Discount must be a number")
      .integer("Additional Discount must be a whole number")
      .min(0, "Additional Discount cannot be less than 0")
      .max(5000, "Additional Discount cannot be greater than 5000")
      .required("Additional Discount is required."),
  };

  return Yup.object(schema);
};

import * as Yup from "yup";

export const getValidationSchemaForScholarship = (isEnableForadditionalDiscount: boolean, isPreviousEnquiryChecked: boolean) => {
  let schema: Record<string, any> = {
    scholarshipCategory: Yup.string().required("Please select a Scholarship Category."),
    scholarshipScheme: Yup.string().required("Please select a Scholarship Scheme."),
    scholarshipSlab: Yup.string().required("Please select a Scholarship Slab."),
  };

  if (isEnableForadditionalDiscount) {
    schema.discountReason = Yup.string().required("Please select a Discount Reason.");
    schema.additionalDiscount = Yup.number()
      .typeError("Additional Discount must be a number")
      .max(5000, "Additional Discount cannot be greater than 5000")
      .positive("Additional Discount must be a positive number")
      .required("Additional Discount is required.");
  }

  if (isPreviousEnquiryChecked) {
    schema.adjustedAmount = Yup.number().typeError("Adjusted Amount must be a number").positive("Adjusted Amount must be a positive number");

    schema.adjustedPercentage = Yup.number()
      .typeError("Adjusted Percentage must be a number")
      .min(0, "Adjusted Percentage cannot be less than 0")
      .max(100, "Adjusted Percentage cannot be greater than 100")
      .required("Adjusted Percentage is required.");
  }

  return Yup.object(schema);
};

export const getInitialValuesForScholarship = (amount: any) => {
  let initialValues = {
    scholarshipCategory: "",
    scholarshipScheme: "",
    scholarshipSlab: "",
    additionalDiscount: 0,
    discountReason: "",
    adjustedAmount: amount || 0,
    adjustedPercentage: 0,
  };
  return initialValues;
};

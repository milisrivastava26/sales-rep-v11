import * as Yup from "yup";

interface BiographicalInfo {
  name: string;
  email: string;
  phone: string;
  careerId: string;
  programId: string;
  leadSourceId: string;
  stateId: string;
  cityId: string;
  categoryId: string;
  admitTypeId: string;
  gender: string;
  fatherName: string;
  motherName: string;
  dob: string;
  leadDemographicDetailsDTO: {
    leadCaptureId: any;
    nationality: any;
    bloodGroup: any;
    fatherOccupation: any;
    fatherDesignation: any;
    fatherAnnualIncome: any;
    motherOccupation: any;
    motherDesignation: any;
    motherAnnualIncome: any;
  };
}

export const biographicalFormInput = [
  {
    id: 8,
    name: "categoryId",
    label: "Category",
    type: "select",
    isrequired: true,
  },
  {
    id: 9,
    name: "admitTypeId",
    label: "Admit Type",
    type: "select",
    isrequired: true,
  },
  {
    id: 10,
    name: "gender",
    label: "Gender",
    type: "select",
    isrequired: true,
  },
  {
    id: 13,
    type: "date",
    name: "dob",
    label: "Date of Birth",
    isrequired: true,
  },
  {
    id: 14,
    name: "nationality",
    label: "Nationality",
    type: "text",
    isrequired: true,
  },
  {
    id: 15,
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    isrequired: false,
  },
  {
    id: 11,
    name: "fatherName",
    label: "Father's Name",
    type: "text",
    isrequired: true,
  },
  {
    id: 16,
    name: "fatherOccupation",
    label: "Father's Occupation",
    type: "text",
    isrequired: false,
  },
  {
    id: 17,
    name: "fatherDesignation",
    label: "Father's Designation (if any)",
    type: "text",
    isrequired: false,
  },
  {
    id: 18,
    name: "fatherAnnualIncome",
    label: "Father's Gross Annual Salary Income",
    type: "number",
    isrequired: false,
  },
  {
    id: 12,
    name: "motherName",
    label: "Mother's Name",
    type: "text",
    isrequired: true,
  },
  {
    id: 19,
    name: "motherOccupation",
    label: "Mother's Occupation",
    type: "text",
    isrequired: false,
  },
  {
    id: 20,
    name: "motherDesignation",
    label: "Mother's Designation (if any)",
    type: "text",
    isrequired: false,
  },
  {
    id: 21,
    name: "motherAnnualIncome",
    label: "Mother's Gross Annual Salary Income",
    type: "number",
    isrequired: false,
  },
];

export const getInitialValuesForBiographicalInfo = (
  data: BiographicalInfo,
  leadCaptureId: number | undefined | string
) => {
  const dobResponse = data.dob || "";
  let initialValues = {
    categoryId: data.categoryId || "",
    admitTypeId: data.admitTypeId || "",
    gender: data.gender || "",
    dob: dobResponse ? new Date(dobResponse).toISOString().split("T")[0] : "",
    nationality: data.leadDemographicDetailsDTO?.nationality,
    bloodGroup: data.leadDemographicDetailsDTO?.bloodGroup,

    fatherName: data.fatherName || "",
    fatherOccupation: data.leadDemographicDetailsDTO?.fatherOccupation,
    fatherDesignation: data.leadDemographicDetailsDTO?.fatherDesignation,
    fatherAnnualIncome: data.leadDemographicDetailsDTO?.fatherAnnualIncome,

    motherName: data.motherName || "",
    motherOccupation: data.leadDemographicDetailsDTO?.motherOccupation,
    motherDesignation: data.leadDemographicDetailsDTO?.motherDesignation,
    motherAnnualIncome: data.leadDemographicDetailsDTO?.motherAnnualIncome,

    leadCaptureId: leadCaptureId,
  };

  return initialValues;
};

export const validationSchemaForBiographicalInfo = Yup.object({
  categoryId: Yup.string().required("Category is required"),
  admitTypeId: Yup.string().required("Admit Type is required"),
  gender: Yup.string().required("Gender is required"),

  dob: Yup.string()
    .required("Date of birth is required")
    .test("not-future", "Date of birth cannot be a future date", (value) => {
      const today = new Date();
      const dob = new Date(value);
      return dob <= today;
    }),

  nationality: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .required("Nationality is required"),

  fatherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .required("Father's Name is required"),

  fatherOccupation: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .nullable(),

  fatherDesignation: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .nullable(),

  fatherAnnualIncome: Yup.number()
    .typeError("Father's Annual Income must be a number")
    .min(0, "Income cannot be negative")
    .nullable(),

  motherName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .required("Mother's Name is required"),

  motherOccupation: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .nullable(),

  motherDesignation: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only characters are allowed")
    .nullable(),

  motherAnnualIncome: Yup.number()
    .typeError("Mother's Annual Income must be a number")
    .min(0, "Income cannot be negative")
    .nullable(),

  bloodGroup: Yup.string()
    .matches(/^(A|B|AB|O)[+-]$/, "Invalid blood group")
    .nullable(),
});

export const transformBiographicalPayload = (
  values: any,
  leadEnquiryId: any,
  leadCaptureId: any
) => {
  const payload = {
    categoryId: values.categoryId,
    admitTypeId: values.admitTypeId,
    gender: values.gender,
    dob: values.dob,
    fatherName: values.fatherName,
    motherName: values.motherName,
    leadCaptureId,
    leadEnquiryId,

    leadDemographicDetailsDTO: {
      motherOccupation: values.motherOccupation,
      motherDesignation: values.motherDesignation,
      motherAnnualIncome: values.motherAnnualIncome,
      fatherOccupation: values.fatherOccupation,
      fatherDesignation: values.fatherDesignation,
      fatherAnnualIncome: values.fatherAnnualIncome,
      nationality: values.nationality,
      bloodGroup: values.bloodGroup,
      leadCaptureId,
    },
  };

  return payload;
};

export const bloodGroupOptions = [
  { id: 1, name: "A+", value: "A+" },
  { id: 2, name: "A-", value: "A-" },
  { id: 3, name: "B+", value: "B+" },
  { id: 4, name: "B-", value: "B-" },
  { id: 5, name: "AB+", value: "AB+" },
  { id: 6, name: "AB-", value: "AB-" },
  { id: 7, name: "O+", value: "O+" },
  { id: 8, name: "O-", value: "O-" },
];

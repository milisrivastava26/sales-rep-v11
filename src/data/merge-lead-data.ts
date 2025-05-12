import * as Yup from "yup";

export const validationSchemaForMergeLead = Yup.object().shape({
  leadCaptureId: Yup.string().required("Please check a primary lead captureId"),

  name: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z\s_]+$/,
      "Only alphabets, spaces, and underscores are allowed"
    )
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),

  email: Yup.string().email("Invalid email").required("Required"),

  fatherName: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z\s_]+$/,
      "Only alphabets, spaces, and underscores are allowed"
    )
    .min(2, "Father's Name must be at least 2 characters")
    .max(50, "Father's Name must not exceed 50 characters"),

  motherName: Yup.string()
    .trim()
    .matches(
      /^[A-Za-z\s_]+$/,
      "Only alphabets, spaces, and underscores are allowed"
    )
    .min(2, "Mother's Name must be at least 2 characters")
    .max(50, "Mother's Name must not exceed 50 characters"),

  dob: Yup.date().nullable(),

  categoryName: Yup.string().nullable(),
  admitTypeName: Yup.string().nullable(),

  academicProgramId: Yup.string().required("Required"),
  academicCareerId: Yup.string().required("Required"),
  leadSourceId: Yup.string().required("Required"),

  contact: Yup.array()
    .of(
      Yup.object().shape({
        contactName: Yup.string()
          .trim()
          .matches(
            /^[A-Za-z\s_]+$/,
            "Only alphabets, spaces, and underscores are allowed"
          )
          .min(2, "Name must be at least 2 characters")
          .max(50, "Name must not exceed 50 characters")
          .required("Contact Name is required"),

        contactRelation: Yup.string().required("Required"),
        contactNumber: Yup.string()
          .required("Contact number is required")
          .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits"),

        primary: Yup.boolean(),
      })
    )
    .test(
      "at-least-one-primary",
      "At least one contact must be marked as primary",
      (contacts) => contacts?.some((c) => c.primary === true)
    ),

  // Permanent Address
  permanentAddress: Yup.object().shape({
    addressLine1: Yup.string().nullable(),
    addressLine2: Yup.string().nullable(),
    country: Yup.string().nullable(),
    coreStateId: Yup.string().nullable(),
    coreCityId: Yup.string().nullable(),
    pin: Yup.string()
      .matches(/^\d{6}$/, "Pin must be 6 digits")
      .nullable(),
  }),

  // Correspondence Address
  correspondenceAddress: Yup.object().shape({
    addressLine1: Yup.string().nullable(),
    addressLine2: Yup.string().nullable(),
    country: Yup.string().nullable(),
    coreStateId: Yup.string().nullable(),
    coreCityId: Yup.string().nullable(),
    pin: Yup.string()
      .matches(/^\d{6}$/, "Pin must be 6 digits")
      .nullable(),
  }),
});

export const formInputsForLeadMerge = [
  {
    id: 0,
    heading: "Primary Details",
    inputFields: [
      {
        id: 0,
        name: "leadCaptureId",
        label: "Lead Capture Id",
        type: "text",
        isRequired: true
      },
      {
        id: 1,
        name: "name",
        label: "Name",
        type: "text",
        isRequired: true
      },
      {
        id: 2,
        name: "email",
        label: "Email",
        type: "text",
        isRequired: true
      },
    ],
  },
  {
    id: 1,
    heading: "Additional Details",
    inputFields: [
      {
        id: 4,
        name: "categoryName",
        label: "Category",
        type: "select",
        isRequired: false
      },
      {
        id: 5,
        name: "admitTypeName",
        label: "Admit Type",
        type: "select",
        isRequired: false
      },
      {
        id: 6,
        name: "fatherName",
        label: "Father's Name",
        type: "text",
        isRequired: false
      },
      {
        id: 7,
        name: "motherName",
        label: "Mother's Name",
        type: "text",
        isRequired: false
      },
      {
        id: 8,
        name: "dob",
        label: "Date of Birth",
        type: "date",
        isRequired: false
      },
    ],
  },
  {
    id: 2,
    heading: "Contact Details",
    inputFields: [
      {
        id: 9,
        name: "contactName",
        label: "Contact Name",
        type: "text",
        isRequired: true
      },
      {
        id: 10,
        name: "contactRelation",
        label: "Contact Relation",
        type: "select",
        isRequired: true
      },
      {
        id: 11,
        name: "contactNumber",
        label: "Contact Number",
        type: "text",
        isRequired: true
      },
      {
        id: 12,
        name: "primary",
        label: "Is Primary Contact?",
        type: "radio",
        isRequired: true
      },
    ],
  },
  {
    id: 3,
    heading: "Address Details",
    inputFields: [
      {
        heading: "Permanent",
        inputFields: [
          {
            id: 13,
            name: "addressLine1",
            label: "Address Line 1",
            type: "text",
            isRequired: false
          },
          {
            id: 14,
            name: "addressLine2",
            label: "Address Line 2",
            type: "text",
            isRequired: false
          },
          {
            id: 15,
            name: "country",
            label: "Country",
            type: "text",
            isRequired: false
          },
          {
            id: 16,
            name: "coreStateId",
            label: "State",
            type: "select",
            isRequired: false
          },
          {
            id: 17,
            name: "coreCityId",
            label: "City",
            type: "select",
            isRequired: false
          },
          {
            id: 18,
            name: "pin",
            label: "PIN Code",
            type: "text",
            isRequired: false
          },
        ],
      },
      {
        heading: "Correspondence",
        inputFields: [
          {
            id: 19,
            name: "addressLine1",
            label: "Address Line 1",
            type: "text",
            isRequired: false
          },
          {
            id: 20,
            name: "addressLine2",
            label: "Address Line 2",
            type: "text",
            isRequired: false
          },
          {
            id: 21,
            name: "country",
            label: "Country",
            type: "text",
            isRequired: false
          },
          {
            id: 22,
            name: "coreStateId",
            label: "State",
            type: "select",
            isRequired: false
          },
          {
            id: 23,
            name: "coreCityId",
            label: "City",
            type: "select",
            isRequired: false
          },
          {
            id: 24,
            name: "pin",
            label: "PIN Code",
            type: "text",
            isRequired: false
          },
        ],
      },
    ],
  },
  {
    id: 4,
    heading: "Enquiry Details",
    inputFields: [
      {
        id: 26,
        name: "academicCareerId",
        label: "Career",
        type: "select",
        isRequired: true
      },
      {
        id: 25,
        name: "academicProgramId",
        label: "Program",
        type: "select",
        isRequired: true
      },

      {
        id: 27,
        name: "leadSourceId",
        label: "Lead Source",
        type: "select",
        isRequired: true
      },
    ],
  },
];

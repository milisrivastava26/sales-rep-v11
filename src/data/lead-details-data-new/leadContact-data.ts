import * as Yup from "yup";

export const formInputsForContact = [
  {
    id: 1,
    heading: "Contacts",
    inputFields: [
      {
        id: 1,
        tableInputsConfig: [
          {
            id: 1,
            heading: "Contact Name",
            tableInputs: [
              {
                id: 1,
                name: "contactName",
                type: "text",
              },
            ],
          },
          {
            id: 2,
            heading: "Relation",
            tableInputs: [
              {
                id: 1,
                name: "contactRelation",
                type: "text",
              },
            ],
          },
          {
            id: 3,
            heading: "Contact Number",
            tableInputs: [
              {
                id: 1,
                name: "contactNumber",
                type: "text",
              },
            ],
          },
          {
            id: 4,
            heading: "Primary",
            tableInputs: [
              {
                id: 1,
                name: "primary",
                type: "radio",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getInitialValuesForContact = (
  contact: any,
  leadCaptureId: any
) => {
  let getInitialValuesForContact = {
    contact: Array.isArray(contact)
      ? contact.map((c) => ({
          leadCaptureId: leadCaptureId,
          contactName: c?.contactName || "",
          contactRelation: c?.contactRelation || "",
          contactNumber: c?.contactNumber || "",
          primary: c?.primary || false,
        }))
      : [],
  };

  return getInitialValuesForContact;
};

export const validationSchemaForContact = Yup.object({
  contact: Yup.array().of(
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

      contactRelation: Yup.string()
        .trim()
        .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
        .min(2, "Relation must be at least 2 characters")
        .max(30, "Relation must not exceed 30 characters")
        .required("Relation is required"),

      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid phone number, must be 10 digits")
        .required("Contact Number is required"),
      primary: Yup.boolean(),
    })
  ),
});

export const contactRelationOptions = [
  { label: "Self", value: "self" },
  { label: "Father", value: "father" },
  { label: "Mother", value: "mother" },
  { label: "Brother", value: "brother" },
  { label: "Sister", value: "sister" },
  { label: "Spouse", value: "spouse" },
  { label: "Son", value: "son" },
  { label: "Daughter", value: "daughter" },
  { label: "Grandfather", value: "grandfather" },
  { label: "Grandmother", value: "grandmother" },
  { label: "Uncle", value: "uncle" },
  { label: "Aunt", value: "aunt" },
  { label: "Cousin", value: "cousin" },
  { label: "Nephew", value: "nephew" },
  { label: "Niece", value: "niece" },
  { label: "Guardian", value: "guardian" },
  { label: "Friend", value: "friend" },
];

import * as Yup from "yup";

export const formInputSchemaForManageTask = [
  {
    name: "salesrepName",
    label: "Owner",
    type: "select",
  },
  {
    name: "leadSource",
    label: "Lead Source",
    type: "select",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Complete", value: "true" },
      { label: "Pending", value: "false" },
      { label: "Overdue", value: "overdue" },
    ],
  },
  {
    name: "createdAtFrom",
    label: "From Date",
    type: "date",
  },
  {
    name: "createdAtTo",
    label: "To Date",
    type: "date",
  },
  {
    name: "career",
    label: "Academic Career",
    type: "select",
  },
  {
    name: "program",
    label: "Academic Program",
    type: "select",
  },
];

export const initialValuesForManageTask = {
  salesrepName: "",
  leadSource: "",
  status: "",
  createdAtFrom: "",
  createdAtTo: "",
  career: "",
  program: "",
};

export const validationSchemaForManageTask = Yup.object().shape({
  salesrepName: Yup.string().required("Owner is required"),
});

export const dropdownOptionsForTask = [
  {
    id: 1,
    name: "Close Tasks",
  },
  {
    id: 2,
    name: "Change Lead Owner",
  },
  {
    id: 3,
    name: "Change Stage",
  },
];

import * as Yup from "yup";
export interface ActivityDetailsResponseType {
  notes?: string;
  coreActivityOutcomeId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  coreLeadActionsId?: string;
}

export const initialValuesForActivity = {
  notes: "",
  coreActivityOutcomeId: "",
  scheduledDate: "",
  scheduledTime: "",
  modeOfFormFilling: "",
  expectedDate: "",
};

export const getValidationSchemaForActivity = (
  isTaskCreated: boolean,
  isCoreActivityOutcomeId: boolean,
  isHotOrWarmLead: boolean
) =>
  Yup.object().shape({
    notes: Yup.string().required("Notes is required"),

    ...(isCoreActivityOutcomeId && {
      coreActivityOutcomeId: Yup.string().required("Outcome is required"),
    }),

    ...(isHotOrWarmLead && {
      modeOfFormFilling: Yup.string().required(
        "Mode of form filling is required"
      ),
      expectedDate: Yup.string().required("Expected Date is required"),
    }),

    ...(isTaskCreated && {
      scheduledDate: Yup.string().required("Scheduled Date is required"),
      scheduledTime: Yup.string().required("Scheduled Time is required"),
    }),
  });

export const formInputsForWalkin = [
  {
    id: 1,
    label: "Notes",
    name: "notes",
    type: "textarea",
    isRequired: true,
  },
];
export const formInputsForActivity = [
  {
    id: 1,
    label: "Notes",
    name: "notes",
    type: "textarea",
    isRequired: true,
  },
  {
    id: 2,
    label: "Outcomes",
    name: "coreActivityOutcomeId",
    type: "select",
    isRequired: true,
  },
  {
    id: 3,
    label: "Create Task",
    name: "isTaskCreated",
    type: "checkbox",
    isRequired: true,
  },
  {
    id: 4,
    label: "Scheduled Date",
    name: "scheduledDate",
    type: "date",
    isRequired: true,
  },
  {
    id: 5,
    label: "Scheduled Time",
    name: "scheduledTime",
    type: "time",
    isRequired: true,
  },
];

export const getFormInputsForActivityPhoneBound = (
  isHotOrWarmLead: boolean,
  isTaskCreated: boolean
) => {
  const allFields = [
    {
      id: 1,
      label: "Conversation Note",
      name: "notes",
      type: "textarea",
      isrequired: true,
    },
    {
      id: 2,
      label: "Outcome",
      name: "coreActivityOutcomeId",
      type: "select",
      isrequired: true,
    },
    {
      id: 3,
      label: "Mode of form filling",
      name: "modeOfFormFilling",
      type: "select",
      isrequired: true,
    },
    {
      id: 4,
      label: "Expected Date",
      name: "expectedDate",
      type: "date",
      isrequired: true,
    },
    {
      id: 5,
      label: "Create Task",
      name: "isTaskCreated",
      type: "checkbox",
      isrequired: true,
    },
    {
      id: 6,
      label: "Scheduled Date",
      name: "scheduledDate",
      type: "date",
      isrequired: true,
    },
    {
      id: 7,
      label: "Scheduled Time",
      name: "scheduledTime",
      type: "time",
      isrequired: true,
    },
  ];

  return allFields.filter((field) => {
    // Exclude expectedDate and modeOfFormFilling if not hot/warm lead
    if (
      !isHotOrWarmLead &&
      (field.name === "expectedDate" || field.name === "modeOfFormFilling")
    ) {
      return false;
    }

    // Exclude scheduledDate and scheduledTime if task is not created
    if (
      !isTaskCreated &&
      (field.name === "scheduledDate" || field.name === "scheduledTime")
    ) {
      return false;
    }

    return true;
  });
};

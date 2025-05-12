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
};


export const getValidationSchemaForActivity = (isTaskCreated: boolean, isCoreActivityOutcomeId: boolean) =>
  Yup.object().shape({
    notes: Yup.string().required("Notes is required"),
    
    ...(isCoreActivityOutcomeId && {
      coreActivityOutcomeId: Yup.string().required("Outcome is required"),
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

export const formInputsForActivityPhoneBound = [
  {
    id: 1,
    label: "Conversation Note",
    name: "notes",
    type: "textarea",
    isRequired: true,
  },
  {
    id: 2,
    label: "Outcome",
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

// export const formInputsForActivityPhoneBound = [
//   {
//     id: 1,
//     label: "Conversation Notes",
//     name: "notes",
//     type: "textarea",
//     isRequired: true,
//   },
//   {
//     id: 2,
//     label: "Outcomes",
//     name: "OutcomePhoneId",
//     type: "select",
//     isRequired: true,
//   },

//   {
//     id: 3,
//     label: "Lead Stage",
//     name: "leadStageId",
//     type: "select",
//     isRequired: true,
//   },

//   {
//     id: 4,
//     label: "Lead Sub Stage",
//     name: "leadSubStageId",
//     type: "select",
//     isRequired: true,
//   },
//   {
//     id: 5,
//     label: "Create Task",
//     name: "isTaskCreated",
//     type: "checkbox",
//     isRequired: true,
//   },
//   {
//     id: 6,
//     label: "Scheduled Date",
//     name: "scheduledDate",
//     type: "date",
//     isRequired: true,
//   },
//   {
//     id: 7,
//     label: "Scheduled Time",
//     name: "scheduledTime",
//     type: "time",
//     isRequired: true,
//   },
// ];

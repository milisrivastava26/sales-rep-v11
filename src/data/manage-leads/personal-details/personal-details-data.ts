import * as Yup from "yup";

export const getPersonalDetailsFormData = (isUpdate: boolean) => [
  {
    id: 0,
    name: "name",
    label: "Name",
    type: "text",
    isRequired: true,
    isReadOnly: isUpdate ? false : true,
  },
  {
    id: 1,
    name: "phone",
    label: "Phone",
    type: "text",
    isRequired: true,
    isReadOnly: true,
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "text",
    isRequired: true,
    isReadOnly: isUpdate === false ? false : false,
  },
  {
    id: 3,
    name: "academicCareerId",
    label: "Academic Career",
    type: "select",
    isRequired: true,
    isReadOnly: isUpdate ? false : true,
  },
  {
    id: 4,
    name: "academicProgramId",
    label: "Program",
    type: "select",
    isRequired: true,
    isReadOnly: isUpdate ? false : true,
  },
  {
    id: 5,
    name: "currentCoreStateId",
    label: "State",
    type: "select",
    isRequired: true,
    isReadOnly: isUpdate ? false : true,
  },
  {
    id: 6,
    name: "cityId",
    label: "City",
    type: "select",
    isRequired: true,
    isReadOnly: isUpdate ? false : true,
  },
  {
    id: 7,
    name: "leadSourceId",
    label: "Lead Source",
    type: "text",
    isRequired: true,
    isReadOnly: true,
  },
  {
    id: 8,
    name: "session",
    label: "Session",
    type: "text",
    isRequired: true,
    isReadOnly: true,
  },
];

export const personalDetailsValidationSchema = Yup.object().shape({
  // name: Yup.string().trim().required("Name is required"),
  // phone: Yup.string().trim().required("Phone is required"),
  email: Yup.string().trim().email("Invalid email"),
  // academicCareerId: Yup.number().required("Career is required"),
  // academicProgramId: Yup.number().required("Program is required"),
  // currentCoreStateId: Yup.number().required("State is required"),
  // cityId: Yup.number().required("City is required"),
  // leadSourceId: Yup.number().required("Lead Source is required"),
  // session: Yup.string().trim().required("Session is required"),
});

export const getPersonalDetailsInitialValue = (
  data: any,
  activeEnquiry: any
) => {
  let initialValues = {
    name: data.leadName || "",
    phone: data.phone || "",
    email: data.email || "",
    academicCareerId: activeEnquiry[0]?.academicCareerId || "",
    academicProgramId: activeEnquiry[0]?.academicProgramId || "",
    currentCoreStateId: data.stateId || "",
    cityId: data.cityId || "",
    leadSourceId: data.sourceName || "",
    session: data.sessionName || "",
  };

  return initialValues;
};

export const getCampusInterestedInInitialValues = (data: any) => {
  let initialValues = {
    coreCampusId: Object.keys(data).length !== 0 ? data.coreCampusId : "",
  };

  return initialValues;
};

export const formValuesForCampusInterestedIn = [
  {
    id: 0,
    name: "coreCampusId",
    type: "select",
    label: "Interested In",
  },
];

export const campusInterestedValidationSchema = Yup.object().shape({
  coreCampusId: Yup.number().required("Campus Interested In is required"),
});

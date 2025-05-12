import * as Yup from "yup";

export const academicDetailsFormInput = [
  {
    id: 0,
    heading: "Tenth",
    inputFields: [
      {
        id: 1,
        type: "text",
        name: "school", // tenth
        label: "10th School",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "coreTenthBoardId", //tenth_borad
        label: "10th Board",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreTenthMarkingSchemeId", //tenth_marketing_scheme
        label: "10th Marking Scheme",
      },
      {
        id: 4,
        type: "text",
        name: "tenthMarksOrGrade", //tenth_marks_grade
        label: "10th Marks or  Grade",
        isrequired: true,
      },
      {
        id: 5,
        type: "select",
        name: "tenth_plus_2_type",
        label: "10 plus 2 type",
        isrequired: true,
      },
    ],
  },
  {
    id: 1,
    heading: "Twelfth",
    inputFields: [
      {
        id: 1,
        type: "text",
        name: "twelfthSchool",
        label: "12th School",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "coreTwelfthBoardId",
        label: "12th Board",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreTwelfthResultStatus",
        label: "12th Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "select",
        name: "coreTwelfthMarkingSchemeId",
        label: "12th Marking Scheme",
      },
      {
        id: 5,
        type: "text",
        name: "TwelfthMarksOrGrade",
        label: "12th Marks Or Grade",
        isrequired: true,
      },
    ],
  },
  {
    id: 2,
    heading: "Diploma",
    inputFields: [
      {
        id: 1,
        type: "text",
        name: "diplomaSchool",
        label: "Diploma School",
        isrequired: true,
      },
      {
        id: 2,
        type: "text",
        name: "coreDiplomaBoardId",
        label: "Diploma Board",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreDiplomaResultStatus",
        label: "Diploma Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "coreDiplomaMarks",
        label: "Diploma Marks",
        isrequired: true,
      },
    ],
  },
  {
    id: 3,
    heading: "UG",
    inputFields: [
      {
        id: 1,
        type: "text",
        name: "ugSchool",
        label: "UG School",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "coreUgResultStatus",
        label: "UG Result Status",
        isrequired: true,
      },
      {
        id: 3,
        type: "text",
        name: "coreUgMarks",
        label: "UG Marks",
        isrequired: true,
      },
    ],
  },
];

export const getInitialValuesForAcademicDetails = (data: any) => {
  let initialValues = {
    // Tenth Details
    academicDetailsTenthId:
      data?.detailsForTenthDTO?.academicDetailsTenthId || "",
    school: data?.detailsForTenthDTO?.school || "",
    coreTenthBoardId: data?.detailsForTenthDTO?.coreTenthBoardId || "",
    coreTenthMarkingSchemeId:
      data?.detailsForTenthDTO?.coreTenthMarkingSchemeId || "",
    tenthMarksOrGrade: data?.detailsForTenthDTO?.tenthMarksOrGrade || "",
    tenth_plus_2_type:
      data?.leadAcademicDetailsTwelfthDTO !== null
        ? "TWELFTH"
        : data?.leadAcademicDetailsDiplomaDTO !== null
        ? "DIPLOMA"
        : "",
    // Twelfth Details
    academicDetailsTwelfthId:
      data?.leadAcademicDetailsTwelfthDTO?.academicDetailsTwelfthId || "",
    twelfthSchool: data?.leadAcademicDetailsTwelfthDTO?.school || "",
    coreTwelfthBoardId:
      data?.leadAcademicDetailsTwelfthDTO?.twelveBoardId || "",
    coreTwelfthResultStatus:
      data?.leadAcademicDetailsTwelfthDTO?.twelveResultStatus || "",
    coreTwelfthMarkingSchemeId:
      data?.leadAcademicDetailsTwelfthDTO?.twelveMarkingSchemeId || "",
    TwelfthMarksOrGrade:
      data?.leadAcademicDetailsTwelfthDTO?.twelveMarksOrGrade || "",

    // Diploma Details
    academicDetailsDiplomaId:
      data?.leadAcademicDetailsDiplomaDTO?.academicDetailsDiplomaId || "",
    diplomaSchool: data?.leadAcademicDetailsDiplomaDTO?.school || "",
    coreDiplomaBoardId: data?.leadAcademicDetailsDiplomaDTO?.diplomaBoard || "",
    coreDiplomaResultStatus:
      data?.leadAcademicDetailsDiplomaDTO?.resultStatus || "",
    coreDiplomaMarks: data?.leadAcademicDetailsDiplomaDTO?.marks || "",

    // UG Details
    academicDetailsUGId:
      data?.leadAcademicDetailsUGDTO?.academicDetailsUGId || "",
    ugSchool: data?.leadAcademicDetailsUGDTO?.degree || "",
    coreUgResultStatus: data?.leadAcademicDetailsUGDTO?.resultStatus || "",
    coreUgMarks: data?.leadAcademicDetailsUGDTO?.marks || "",
  };

  return initialValues;
};

export const getValidationSchemaForAcademicDetails = (
  isEnableForTwelfth: boolean,
  isEnableForDiploma: boolean,
  isEnableForUg: boolean
) => {
  let validationSchema = {
    // Tenth Details
    school: Yup.string().required("10th School is required"),
    coreTenthBoardId: Yup.string().required("10th Board is required"),
    coreTenthMarkingSchemeId: Yup.string(), // Not required
    tenthMarksOrGrade: Yup.string().required("10th Marks or Grade is required"),
    tenth_plus_2_type: Yup.string().required("10 plus 2 type is required"),

    // Twelfth Details (conditionally required)
    ...(isEnableForTwelfth && {
      twelfthSchool: Yup.string().required("12th School is required"),
      coreTwelfthBoardId: Yup.string().required("12th Board is required"),
      coreTwelfthResultStatus: Yup.string().required(
        "12th Result Status is required"
      ),
      coreTwelfthMarkingSchemeId: Yup.string(), // Not required
      TwelfthMarksOrGrade: Yup.string().required(
        "12th Marks or Grade is required"
      ),
    }),

    // Diploma Details (conditionally required)
    ...(isEnableForDiploma && {
      diplomaSchool: Yup.string().required("Diploma School is required"),
      coreDiplomaBoardId: Yup.string().required("Diploma Board is required"),
      coreDiplomaResultStatus: Yup.string().required(
        "Diploma Result Status is required"
      ),
      coreDiplomaMarks: Yup.string().required("Diploma Marks are required"),
    }),

    // UG Details (conditionally required)
    ...(isEnableForUg && {
      ugSchool: Yup.string().required("UG School is required"),
      coreUgResultStatus: Yup.string().required("UG Result Status is required"),
      coreUgMarks: Yup.string().required("UG Marks are required"),
    }),
  };

  return Yup.object(validationSchema);
};

export const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "35px", // reduce overall control height
    height: "35px",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : undefined,
    fontSize: "0.875rem", // text-sm
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "8px",
    paddingRight: "8px",
    height: "30px",
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "30px",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "4px",
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: "4px",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#6b7280", // gray-500
    fontSize: "0.875rem",
    lineHeight: 1,
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#374151", // gray-700
    fontSize: "0.875rem",
    lineHeight: 1,
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 50,
    fontSize: "0.875rem", // text-sm
  }),
};

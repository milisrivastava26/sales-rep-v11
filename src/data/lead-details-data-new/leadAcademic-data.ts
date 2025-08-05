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
        name: "tenthMainSubject", //tenth_marks_grade
        label: "10th Main Subject/Stream",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "tenthYearOfPassing", //tenth_marks_grade
        label: "10th Year of Passing",
        isrequired: true,
      },
      {
        id: 5,
        type: "select",
        name: "coreTenthMarkingSchemeId", //tenth_marketing_scheme
        label: "10th Marking Scheme",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "tenthMarksOrGrade",
        label: "10th Percentage/CGPA",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "tenthMarksScored",
        label: "10th Marks Scored",
        isrequired: true,
      },
      {
        id: 8,
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
        name: "twelfthMainSubject",
        label: "12th Main Subject/Stream",
        isrequired: true,
      },
      {
        id: 5,
        type: "text",
        name: "twelfthYearOfPassing",
        label: "12th Year of Passing",
        isrequired: true,
      },
      {
        id: 6,
        type: "select",
        name: "coreTwelfthMarkingSchemeId",
        label: "12th Marking Scheme",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "TwelfthMarksOrGrade",
        label: "12th Percentage/CGPA",
        isrequired: true,
      },
      {
        id: 8,
        type: "text",
        name: "twelfthMarksScored",
        label: "12th Marks Scored",
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
        label: "Diploma Percentage/CGPA",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "diplomaProgram",
        label: "Diploma Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "diplomaYearOfPassing",
        label: "Diploma Year of Passing",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "diplomaMarksScored",
        label: "Diploma Marks Scored",
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
        label: "UG College/University",
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
        label: "UG Percentage/CGPA",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "ugProgram",
        label: "UG Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "ugYearOfPassing",
        label: "UG Year of Passing",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "ugMarksScored",
        label: "UG Marks Scored",
        isrequired: true,
      },
    ],
  },

  {
    id: 4,
    heading: "Additional UG Details",
    inputFields: [
      {
        id: 1,
        type: "text",
        name: "additionalUgSchool",
        label: "UG College/University",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "additionalUgResultStatus",
        label: "UG Result Status",
        isrequired: true,
      },
      {
        id: 3,
        type: "text",
        name: "additionalUgMarks",
        label: "UG Percentage/CGPA",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "additionalUgProgram",
        label: "UG Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "additionalUgYearOfPassing",
        label: "UG Year of Passing",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "additionalUgMarksScored",
        label: "UG Marks Scored",
        isrequired: true,
      },
    ],
  },
];

export const getInitialValuesForAcademicDetails = (data: any, additionalUgDetailsById: any) => {
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
    tenthMainSubject: data?.detailsForTenthDTO?.stream || "",
    tenthMarksScored: data?.detailsForTenthDTO?.marksScored || "",
    tenthYearOfPassing: data?.detailsForTenthDTO?.yearOfPassing || "",
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
    twelfthMainSubject: data?.leadAcademicDetailsTwelfthDTO?.stream || "",
    twelfthMarksScored: data?.leadAcademicDetailsTwelfthDTO?.marksScored || "",
    twelfthYearOfPassing:
      data?.leadAcademicDetailsTwelfthDTO?.yearOfPassing || "",

    // Diploma Details
    academicDetailsDiplomaId:
      data?.leadAcademicDetailsDiplomaDTO?.academicDetailsDiplomaId || "",
    diplomaSchool: data?.leadAcademicDetailsDiplomaDTO?.school || "",
    coreDiplomaBoardId: data?.leadAcademicDetailsDiplomaDTO?.diplomaBoard || "",
    coreDiplomaResultStatus:
      data?.leadAcademicDetailsDiplomaDTO?.resultStatus || "",
    coreDiplomaMarks: data?.leadAcademicDetailsDiplomaDTO?.marks || "",
    diplomaProgram: data?.leadAcademicDetailsDiplomaDTO?.program || "",
    diplomaYearOfPassing:
      data?.leadAcademicDetailsDiplomaDTO?.yearOfPassing || "",
    diplomaMarksScored: data?.leadAcademicDetailsDiplomaDTO?.marksScored || "",

    // UG Details
    academicDetailsUGId:
      data?.leadAcademicDetailsUGDTO?.academicDetailsUGId || "",
    ugSchool: data?.leadAcademicDetailsUGDTO?.degree || "",
    coreUgResultStatus: data?.leadAcademicDetailsUGDTO?.resultStatus || "",
    coreUgMarks: data?.leadAcademicDetailsUGDTO?.marks || "",
    ugProgram: data?.leadAcademicDetailsUGDTO?.program || "",
    ugYearOfPassing: data?.leadAcademicDetailsUGDTO?.yearOfPassing || "",
    ugMarksScored: data?.leadAcademicDetailsUGDTO?.marksScored || "",

    additionalUgSchool: additionalUgDetailsById?.degree || "",
    additionalUgResultStatus: additionalUgDetailsById?.resultStatus || "",
    additionalUgMarks: additionalUgDetailsById?.marks || "",
    additionalUgProgram: additionalUgDetailsById?.program || "",
    additionalUgYearOfPassing: additionalUgDetailsById?.yearOfPassing || "",
    additionalUgMarksScored: additionalUgDetailsById?.marksScored || "",
  };

  return initialValues;
};

export const getValidationSchemaForAcademicDetails = (
  isEnableForTwelfth: boolean,
  isEnableForDiploma: boolean,
  isEnableForUg: boolean,
  showUGDetails: boolean,
) => {
  let validationSchema = {
    // Tenth Details
    school: Yup.string().required("10th School is required"),
    coreTenthBoardId: Yup.string().required("10th Board is required"),
    coreTenthMarkingSchemeId: Yup.string().required("10th Marking is required"), // Not required
    tenthMarksOrGrade: Yup.string().required("10th Marks or Grade is required"),
    tenth_plus_2_type: Yup.string().required("10 plus 2 type is required"),
    tenthMainSubject: Yup.string().required(
      "10th main subject/stream is required"
    ),
    tenthMarksScored: Yup.string().required("10th marks is required"),
    tenthYearOfPassing: Yup.string().required(
      "10th year of passing is required"
    ),

    // Twelfth Details (conditionally required)
    ...(isEnableForTwelfth && {
      twelfthSchool: Yup.string().required("12th School is required"),
      coreTwelfthBoardId: Yup.string().required("12th Board is required"),
      coreTwelfthResultStatus: Yup.string().required(
        "12th Result Status is required"
      ),
      coreTwelfthMarkingSchemeId: Yup.string().required(
        "12th marking scheme is required"
      ), // Not required
      TwelfthMarksOrGrade: Yup.string().required(
        "12th Marks or Grade is required"
      ),
      twelfthMainSubject: Yup.string().required(
        "12th main subject/stream is required"
      ),
      twelfthMarksScored: Yup.string().required("12th marks is required"),
      twelfthYearOfPassing: Yup.string().required(
        "12th year of passing is required"
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
      diplomaProgram: Yup.string().required("Diploma Program is required"),
      diplomaYearOfPassing: Yup.string().required(
        "Diploma Year of Passing is required"
      ),
      diplomaMarksScored: Yup.string().required(
        "Diploma Marks Scored is required"
      ),
    }),

    // UG Details (conditionally required)
    ...(isEnableForUg && {
      ugSchool: Yup.string().required("UG School is required"),
      coreUgResultStatus: Yup.string().required("UG Result Status is required"),
      coreUgMarks: Yup.string().required("UG Marks are required"),
      ugProgram: Yup.string().required("UG Program is required"),
      ugYearOfPassing: Yup.string().required("UG Year of Passing is required"),
      ugMarksScored: Yup.string().required("UG Marks Scored is required"),
    }),

    ...(showUGDetails && {
      additionalUgSchool: Yup.string().required("UG School is required"),
      additionalUgResultStatus: Yup.string().required("UG Result Status is required"),
      additionalUgMarks: Yup.string().required("UG Marks are required"),
      additionalUgProgram: Yup.string().required("UG Program is required"),
      additionalUgYearOfPassing: Yup.string().required("UG Year of Passing is required"),
      additionalUgMarksScored: Yup.string().required("UG Marks Scored is required"),
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

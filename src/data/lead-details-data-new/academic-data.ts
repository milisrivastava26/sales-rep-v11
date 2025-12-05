import * as Yup from "yup";

export const resultStatusOptions = [
  {
    id: 1,
    value: "DECLARED",
    label: "Declared",
  },
  {
    id: 2,
    value: "AWAITED",
    label: "Awaited",
  },
];

export const mainSubjectOptionForTenth = [
  { id: 1, value: "science", label: "Science" },
  { id: 2, value: "arts", label: "Arts" },
  { id: 3, value: "vocational", label: "Vocational" },
  { id: 4, value: "commerce", label: "Commerce" },
  { id: 5, value: "others", label: "Others" },
];

export const mainSubjectOptionForTwelfth = [
  { id: 1, value: "pcm", label: "PCM" },
  { id: 2, value: "pcb", label: "PCB" },
  { id: 3, value: "pcmb", label: "PCMB" },
  { id: 4, value: "commerce", label: "Commerce" },
  { id: 5, value: "arts", label: "Arts" },
  { id: 6, value: "agriculture", label: "Agriculture" },
  { id: 7, value: "vocational", label: "Vocational" },
  // { id: 8, value: "others", label: "Others" },
];

export const typesForSectionOptions = [
  {
    id: 1,
    value: "TWELFTH",
    label: "Intermediate (12th)",
  },
  {
    id: 2,
    value: "DIPLOMA",
    label: "Diploma",
  },
];

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

export const academicDetailsFormInput = [
  {
    id: 0,
    heading: "High School (10th)",
    inputFields: [
      {
        id: 1,
        type: "select",
        name: "school",
        label: "School",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "coreTenthBoardId",
        label: "Board",
        isrequired: true,
      },
      {
        id: 32,
        type: "select",
        name: "coreTenthResultStatus",
        label: "Result Status",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "tenthMainSubject",
        label: "Stream",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "tenthYearOfPassing",
        label: "Year of Passing",
        isrequired: true,
      },
      {
        id: 5,
        type: "select",
        name: "coreTenthMarkingSchemeId",
        label: "Marking Scheme",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "tenthMarksOrGrade",
        label: "Percentage/CGPA",
        isrequired: true,
        description:
          "Ensure that you add marks of all the subjects while calculating percentage/CGPA.",
      },
      {
        id: 8,
        type: "select",
        name: "tenth_plus_2_type",
        label: "Plus 2 Type",
        isrequired: true,
      },
    ],
  },

  {
    id: 1,
    heading: "Intermediate (12th)",
    inputFields: [
      {
        id: 1,
        type: "select",
        name: "twelfthSchool",
        label: "School",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "coreTwelfthBoardId",
        label: "Board",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreTwelfthResultStatus",
        label: "Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "select",
        name: "twelfthMainSubject",
        label: "Stream",
        isrequired: true,
      },
      {
        id: 5,
        type: "text",
        name: "twelfthYearOfPassing",
        label: "Year of Passing",
        isrequired: true,
      },
      {
        id: 6,
        type: "select",
        name: "coreTwelfthMarkingSchemeId",
        label: "Marking Scheme",
        isrequired: true,
      },
      {
        id: 7,
        type: "text",
        name: "TwelfthMarksOrGrade",
        label: "Percentage/CGPA",
        isrequired: true,
        description:
          "Ensure that you add marks of all the subjects while calculating percentage/CGPA.",
      },
    ],
  },

  {
    id: 2,
    heading: "Diploma",
    inputFields: [
      {
        id: 1,
        type: "select",
        name: "diplomaSchool",
        label: "School/College Name",
        isrequired: true,
      },
      {
        id: 2,
        type: "text",
        name: "coreDiplomaBoardId",
        label: "Board Name",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreDiplomaResultStatus",
        label: "Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "coreDiplomaMarks",
        label: "Percentage/CGPA",
        isrequired: true,
        description:
          "Ensure that you add marks of all the subjects while calculating percentage/CGPA.",
      },
      {
        id: 5,
        type: "text",
        name: "diplomaProgram",
        label: "Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "diplomaYearOfPassing",
        label: "Year of Passing",
        isrequired: true,
      },
    ],
  },

  {
    id: 3,
    heading: "Graduation",
    inputFields: [
      {
        id: 1,
        type: "select",
        name: "ugSchool",
        label: "College",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "ugUniversity",
        label: "University",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "coreUgResultStatus",
        label: "Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "coreUgMarks",
        label: "Percentage/CGPA",
        isrequired: true,
        description:
          "Ensure that you add marks of all the subjects while calculating percentage/CGPA.",
      },
      {
        id: 5,
        type: "text",
        name: "ugProgram",
        label: "Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "ugYearOfPassing",
        label: "Year of Passing",
        isrequired: true,
      },
    ],
  },

  // ⭐⭐ NEW PG SECTION (Same as UG) ⭐⭐
  {
    id: 4,
    heading: "Post Graduation (PG)",
    inputFields: [
      {
        id: 1,
        type: "select",
        name: "pgSchool",
        label: "College",
        isrequired: true,
      },
      {
        id: 2,
        type: "select",
        name: "pgUniversity",
        label: "University",
        isrequired: true,
      },
      {
        id: 3,
        type: "select",
        name: "corePgResultStatus",
        label: "Result Status",
        isrequired: true,
      },
      {
        id: 4,
        type: "text",
        name: "corePgMarks",
        label: "Percentage/CGPA",
        isrequired: true,
        description:
          "Ensure that you add marks of all the subjects while calculating percentage/CGPA.",
      },
      {
        id: 5,
        type: "text",
        name: "pgProgram",
        label: "Program",
        isrequired: true,
      },
      {
        id: 6,
        type: "text",
        name: "pgYearOfPassing",
        label: "Year of Passing",
        isrequired: true,
      },
    ],
  },
];

const examHasValue = (exam: any) =>
  exam?.nameOfExam?.trim() ||
  exam?.examRank?.trim() ||
  exam?.percentage ||
  exam?.yearOfExam;



export const getInitialValuesForAcademicDetails = (data: any) => {
  const examsList = data?.leadCompetitiveExamDetailsDTOList || [];

  console.log("data", data)

  const hasAnyExam = Array.isArray(examsList)
    && examsList.some(exam => examHasValue(exam));
  let initialValues = {
    // ---------------------------------------------------------
    // Tenth Details
    // ---------------------------------------------------------
    academicDetailsTenthId:
      data?.detailsForTenthDTO?.academicDetailsTenthId || "",
    school: data?.detailsForTenthDTO?.school || "",
    coreTenthBoardId:
      data?.detailsForTenthDTO?.coreTenthBoardId || "",
    coreTenthResultStatus: data?.detailsForTenthDTO?.resultStatus || "",
    coreTenthBoardId_custom:
      data?.detailsForTenthDTO?.otherBoardDetails || "",
    coreTenthMarkingSchemeId:
      data?.detailsForTenthDTO?.coreTenthMarkingSchemeId || "",
    tenthMarksOrGrade:
      data?.detailsForTenthDTO?.tenthMarksOrGrade || "",
    tenth_plus_2_type:
      data && Object.keys(data).length > 0
        ? data.leadAcademicDetailsTwelfthDTO !== null
          ? "TWELFTH"
          : data.leadAcademicDetailsDiplomaDTO !== null
            ? "DIPLOMA"
            : ""
        : "",
    tenthMainSubject: data?.detailsForTenthDTO?.stream || "",
    tenthYearOfPassing:
      data?.detailsForTenthDTO?.yearOfPassing || "",

    // ---------------------------------------------------------
    // Twelfth Details
    // ---------------------------------------------------------
    academicDetailsTwelfthId:
      data?.leadAcademicDetailsTwelfthDTO?.academicDetailsTwelfthId || "",
    twelfthSchool: data?.leadAcademicDetailsTwelfthDTO?.school || "",
    coreTwelfthBoardId:
      data?.leadAcademicDetailsTwelfthDTO?.twelveBoardId || "",
    coreTwelfthBoardId_custom:
      data?.leadAcademicDetailsTwelfthDTO?.twelfthBoardOtherName || "",
    coreTwelfthResultStatus:
      data?.leadAcademicDetailsTwelfthDTO?.twelveResultStatus || "",
    coreTwelfthMarkingSchemeId:
      data?.leadAcademicDetailsTwelfthDTO?.twelveMarkingSchemeId || "",
    TwelfthMarksOrGrade:
      data?.leadAcademicDetailsTwelfthDTO?.twelveMarksOrGrade || "",
    twelfthMainSubject: data?.leadAcademicDetailsTwelfthDTO?.stream || "",
    twelfthYearOfPassing:
      data?.leadAcademicDetailsTwelfthDTO?.yearOfPassing || "",

    // ---------------------------------------------------------
    // Diploma Details
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // UG Details
    // ---------------------------------------------------------
    academicDetailsUGId:
      data?.leadAcademicDetailsUGDTO?.academicDetailsUGId || "",
    ugSchool: data?.leadAcademicDetailsUGDTO?.degree || "",
    coreUgResultStatus: data?.leadAcademicDetailsUGDTO?.resultStatus || "",
    coreUgMarks: data?.leadAcademicDetailsUGDTO?.marks || "",
    ugProgram: data?.leadAcademicDetailsUGDTO?.program || "",
    ugYearOfPassing: data?.leadAcademicDetailsUGDTO?.yearOfPassing || "",
    ugUniversity: data?.leadAcademicDetailsUGDTO?.universityName || "",

    // ---------------------------------------------------------
    // PG Details (NEW)
    // ---------------------------------------------------------
    leadAcademicDetailsForPGId:
      data?.leadAcademicDetailsPGDTO?.academicDetailsPGId || "",
    pgSchool: data?.leadAcademicDetailsPGDTO?.collegeName || "",
    pgUniversity: data?.leadAcademicDetailsPGDTO?.universityName || "",
    corePgResultStatus:
      data?.leadAcademicDetailsPGDTO?.resultStatus || "",
    corePgMarks: data?.leadAcademicDetailsPGDTO?.marks || "",
    pgProgram: data?.leadAcademicDetailsPGDTO?.program || "",
    pgYearOfPassing:
      data?.leadAcademicDetailsPGDTO?.yearOfPassing || "",

    appeared: hasAnyExam,

    exams: hasAnyExam
      ? examsList.map((exam: any) => ({
        nameOfExam: exam?.nameOfExam ?? "",
        examRank: exam?.examRank ?? "",
        percentage: exam?.percentage ?? "",
        yearOfExam: exam?.yearOfExam ?? "",
      }))
      : [
        {
          nameOfExam: "",
          examRank: "",
          percentage: "",
          yearOfExam: "",
        },
      ],

  };

  return initialValues;
};


export const getValidationSchemaForAcademicDetails = (
  isEnableForTwelfth: boolean,
  isEnableForDiploma: boolean,
  isEnableForUg: boolean,
  isEnableForPg: boolean,
  isDisabledForTenthPercentage: boolean,
  isDisabledForTwelfthPercentage: boolean,
  isDisabledForDiplomaPercentage: boolean,
  isDisabledForUgPercentage: boolean,
  isDisabledForPgPercentage: boolean
) => {
  const numericRegex = /^\d{1,2}(\.\d{1,2})?$/;
  const yearRegex = /^(19|20)\d{2}$/;


  // ------------------------------------------------------------
  // 🔥 CASE 1: If "10th Percentage" disabled → ONLY return Tenth Schema
  // ------------------------------------------------------------
  if (isDisabledForTenthPercentage) {
    return Yup.object({
      school: Yup.string().required("10th School is required"),
      coreTenthBoardId: Yup.string().required("10th Board is required"),
      coreTenthMarkingSchemeId: Yup.string().required("10th Marking is required"),
      tenthMarksOrGrade: Yup.string()
        .required("10th Marks or Grade is required")
        .oneOf(["N/A"], "Value must be N/A"),
      tenthMainSubject: Yup.string().required("10th Stream is required"),
      tenthYearOfPassing: Yup.string()
        .required("10th year of passing is required")
        .matches(yearRegex, "Enter a valid 4-digit year"),
      coreTenthResultStatus: Yup.string().required("Tenth Result Status is required"),
    });
  }

  // ------------------------------------------------------------
  // 🔥 CASE 2: Normal case → Include all sections based on flags
  // ------------------------------------------------------------
  return Yup.object({
    // 🔹 Tenth Schema (Normal)
    school: Yup.string().required("10th School is required"),
    coreTenthBoardId: Yup.string().required("10th Board is required"),
    coreTenthMarkingSchemeId: Yup.string().required("10th Marking is required"),
    tenthMarksOrGrade: Yup.string()
      .required("10th Marks or Grade is required")
      .test("tenth-marks-or-na", "Enter valid number up to 2 decimals", (value) => {
        return numericRegex.test(value || "");
      }),
    tenth_plus_2_type: Yup.string().required("10 plus 2 type is required"),
    tenthMainSubject: Yup.string().required("10th Stream is required"),
    tenthYearOfPassing: Yup.string()
      .required("10th year of passing is required")
      .matches(yearRegex, "Enter a valid 4-digit year"),
    coreTenthResultStatus: Yup.string().required("Tenth Result Status is required"),


    // 🔹 Twelfth Details  
    ...(isEnableForTwelfth && {
      twelfthSchool: Yup.string().required("12th School is required"),
      coreTwelfthBoardId: Yup.string().required("12th Board is required"),
      coreTwelfthResultStatus: Yup.string().required("12th Result Status is required"),
      coreTwelfthMarkingSchemeId: Yup.string().required("12th marking scheme is required"),
      TwelfthMarksOrGrade: Yup.string()
        .required("12th Marks or Grade is required")
        .test("twelfth-marks", "Enter valid number up to 2 decimals", (v) =>
          isDisabledForTwelfthPercentage ? v === "N/A" : numericRegex.test(v || "")
        ),
      twelfthMainSubject: Yup.string().required("12th Stream is required"),
      twelfthYearOfPassing: Yup.string()
        .required("12th year of passing is required")
        .matches(yearRegex, "Enter a valid 4-digit year"),
    }),

    // 🔹 Diploma Details  
    ...(isEnableForDiploma && {
      diplomaSchool: Yup.string().required("Diploma School is required"),
      coreDiplomaBoardId: Yup.string().required("Diploma Board is required"),
      coreDiplomaResultStatus: Yup.string().required("Diploma Result Status is required"),
      coreDiplomaMarks: Yup.string()
        .required("Diploma Marks are required")
        .test("diploma-marks", "Enter valid number up to 2 decimals", (v) =>
          isDisabledForDiplomaPercentage ? v === "N/A" : numericRegex.test(v || "")
        ),
      diplomaProgram: Yup.string().required("Diploma Program is required"),
      diplomaYearOfPassing: Yup.string()
        .required("Diploma Year of Passing is required")
        .matches(yearRegex, "Enter a valid 4-digit year"),
    }),

    // 🔹 UG Details  
    ...(isEnableForUg && {
      ugSchool: Yup.string().required("UG College/University is required"),
      coreUgResultStatus: Yup.string().required("UG Result Status is required"),
      coreUgMarks: Yup.string()
        .required("UG Marks are required")
        .test("ug-marks", "Enter valid number up to 2 decimals", (v) =>
          isDisabledForUgPercentage ? v === "N/A" : numericRegex.test(v || "")
        ),
      ugProgram: Yup.string().required("UG Program is required"),
      ugYearOfPassing: Yup.string()
        .required("UG Year of Passing is required")
        .matches(yearRegex, "Enter a valid 4-digit year"),
    }),

    // 🔹 PG Details  
    ...(isEnableForPg && {
      pgSchool: Yup.string().required("PG College is required"),
      pgUniversity: Yup.string().required("PG University is required"),
      corePgResultStatus: Yup.string().required("PG Result Status is required"),
      corePgMarks: Yup.string()
        .required("PG Marks are required")
        .test("pg-marks", "Enter valid number up to 2 decimals", (v) =>
          isDisabledForPgPercentage ? v === "N/A" : numericRegex.test(v || "")
        ),
      pgProgram: Yup.string().required("PG Program is required"),
      pgYearOfPassing: Yup.string()
        .required("PG Year of Passing is required")
        .matches(yearRegex, "Enter a valid 4-digit year"),
    }),

    // 🔹 Competitive Exams  
    appeared: Yup.boolean(),
    exams: Yup.array().when("appeared", {
      is: true,
      then: (schema) =>
        schema.of(
          Yup.object({
            nameOfExam: Yup.string().required("Name of Examination is required"),
            // examRank: Yup.string().required("Rank is required"),
            // percentage: Yup.string().required("Percentile is required"),
            yearOfExam: Yup.string()
              .matches(/^[0-9]{4}$/, "Enter valid 4-digit year")
              .required("Exam Year is required"),
          })
        ),
      otherwise: (s) =>
        s.of(
          Yup.object({
            nameOfExam: Yup.string().notRequired(),
            examRank: Yup.string().notRequired(),
            percentage: Yup.string().notRequired(),
            yearOfExam: Yup.string().notRequired(),
          })
        ),
    }),
  });
};


export const transformPayloadForAcademicData = (
  data: any,
  isEnableForTwelfthInputFields: boolean,
  isEnableForDiplomaInputFields: boolean,
  isEnableForUGInputFields: boolean,
  isEnableForPGInputFields: boolean,
  leadCaptureId: number | string | undefined,
  isDisabledForTenthPercentage: boolean
) => {

  // -------------------------------
  // ⭐ Check if ALL exams are filled
  // -------------------------------
  let competitiveExam: any[] = [];

  if (Array.isArray(data?.exams) && data.exams.length > 0) {
    const isAllFilled = data.exams.every((exam: any) => {
      const { isCustomExam, ...rest } = exam;
      return Object.values(rest).every(
        (val) => val !== "" && val !== null && val !== undefined
      );
    });

    if (isAllFilled) {
      competitiveExam = data.exams.map((exam: any) => {
        const { isCustomExam, ...rest } = exam;
        return {
          ...rest,
          leadCaptureId: leadCaptureId,
        };
      });
    }
  }

  // ----------------------------------------------------
  // ⭐ If tenth is disabled → return ONLY tenth payload
  // ----------------------------------------------------
  if (isDisabledForTenthPercentage === true) {
    return {
      tenthBoard: {
        leadCaptureId: leadCaptureId,
        academicDetailsTenthId: data.academicDetailsTenthId,
        school: data.school,
        resultStatus: data.coreTenthResultStatus,
        coreTenthBoardId: data.coreTenthBoardId,
        coreTenthMarkingSchemeId: data.coreTenthMarkingSchemeId,
        tenthMarksOrGrade: data.tenthMarksOrGrade,
        stream: data.tenthMainSubject,
        yearOfPassing: data.tenthYearOfPassing,
        otherBoardDetails: data.coreTenthBoardId_custom || null,
      },
    };
  }

  // ----------------------------------------------------
  // ⭐ Build Final Full Payload (all levels allowed)
  // ----------------------------------------------------
  const transformPayload: any = {
    // ⭐ TENTH
    tenthBoard: {
      leadCaptureId: leadCaptureId,
      academicDetailsTenthId: data.academicDetailsTenthId,
      school: data.school,
      resultStatus: data.coreTenthResultStatus,
      coreTenthBoardId: data.coreTenthBoardId,
      coreTenthMarkingSchemeId: data.coreTenthMarkingSchemeId,
      tenthMarksOrGrade: data.tenthMarksOrGrade,
      stream: data.tenthMainSubject,
      yearOfPassing: data.tenthYearOfPassing,
      otherBoardDetails: data.coreTenthBoardId_custom || null,
    },

    ...(isEnableForTwelfthInputFields && {
      twelfthBoard: {
        leadCaptureId: leadCaptureId,
        academicDetailsTwelfthId: data.academicDetailsTwelfthId,
        school: data.twelfthSchool,
        twelveBoardId: data.coreTwelfthBoardId,
        twelveMarkingSchemeId: data.coreTwelfthMarkingSchemeId,
        twelveMarksOrGrade: data.TwelfthMarksOrGrade,
        twelveResultStatus: data.coreTwelfthResultStatus,
        stream: data.twelfthMainSubject,
        yearOfPassing: data.twelfthYearOfPassing,
        twelfthBoardOtherName: data.coreTwelfthBoardId_custom || null,
      },
    }),

    ...(isEnableForDiplomaInputFields && {
      diploma: {
        leadCaptureId: leadCaptureId,
        academicDetailsDiplomaId: data.academicDetailsDiplomaId,
        school: data.diplomaSchool,
        diplomaBoard: data.coreDiplomaBoardId,
        resultStatus: data.coreDiplomaResultStatus,
        marks: data.coreDiplomaMarks,
        program: data.diplomaProgram,
        yearOfPassing: data.diplomaYearOfPassing,
      },
    }),

    ...(isEnableForUGInputFields && {
      ug: {
        leadCaptureId: leadCaptureId,
        academicDetailsUGId: data.academicDetailsUGId,
        degree: data.ugSchool,
        universityName: data.ugUniversity,
        resultStatus: data.coreUgResultStatus,
        marks: data.coreUgMarks,
        program: data.ugProgram,
        yearOfPassing: data.ugYearOfPassing,
      },
    }),

    ...(isEnableForPGInputFields && {
      pg: {
        leadCaptureId: leadCaptureId,
        academicDetailsPGId: data.academicDetailsPGId,
        collegeName: data.pgSchool,
        universityName: data.pgUniversity,
        resultStatus: data.corePgResultStatus,
        marks: data.corePgMarks,
        program: data.pgProgram,
        yearOfPassing: data.pgYearOfPassing,
      },
    }),
  };

  // Add competitive exams only when valid
  if (competitiveExam.length > 0) {
    transformPayload.competitiveExam = competitiveExam;
  }

  return transformPayload;
};





export const initialValuesForCompetitiveExam = {
  appeared: false,
  exams: [
    {
      nameOfExamination: "",
      rank: "",
      percentile: "",
      examYear: "",
    },
  ],
};

export const validationSchemaForCompetitiveExam = Yup.object().shape({
  appeared: Yup.boolean(),

  exams: Yup.array().of(
    Yup.object().shape({
      nameOfExamination: Yup.string()
        .trim()
        .when("$appeared", {
          is: true,
          then: (schema) =>
            schema.required("Name of Examination is required"),
        }),

      rank: Yup.string()
        .trim()
        .when("$appeared", {
          is: true,
          then: (schema) => schema.required("Rank is required"),
        }),

      percentile: Yup.string()
        .trim()
        .when("$appeared", {
          is: true,
          then: (schema) => schema.required("Percentile is required"),
        }),

      examYear: Yup.string()
        .trim()
        .matches(/^[0-9]{4}$/, "Enter valid 4-digit year")
        .when("$appeared", {
          is: true,
          then: (schema) => schema.required("Exam Year is required"),
        }),
    })
  ),
});
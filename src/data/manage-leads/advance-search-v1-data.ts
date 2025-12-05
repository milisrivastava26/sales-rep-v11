import { getAllLeadSourses } from "../../store/advance-search/get-all-leadSourse-slice";
import { getAcademicCareerValues } from "../../store/get/get-all-academic-career-slice";
import { getStateValues } from "../../store/get/get-all-state-slice";
import { getApplicationStatusValues } from "../../store/lead-capturing/get-allApplicationStatus-slice";
import { getLeadStageValues } from "../../store/lead-capturing/get-allLeadStage-slice";
import { getOwnerValues } from "../../store/lead-capturing/get-allOwner-slice";

type FilterId =
  | "state"
  | "city"
  | "academicCareer"
  | "academicProgram"
  | "leadStage"
  | "leadSubStage"
  | "owner"
  | "leadSource"
  | "application_status";


  interface FilterConfigItem {
  id: FilterId;
  label: string;
  dependsOn?: FilterId;
  fetchThunk?: () => any;
}



export const filterConfig:FilterConfigItem[] = [
  {
    id: "leadStage",
    label: "Lead Stage",
    fetchThunk: getLeadStageValues,
  },
  {
    id: "leadSubStage",
    label: "Lead Sub Stage",
    dependsOn: "leadStage",
  },
  {
    id: "leadSource",
    label: "Lead Source",
    fetchThunk: getAllLeadSourses,
  },
  {
    id: "owner",
    label: "Owner",
    fetchThunk: getOwnerValues,
  },
  {
    id: "academicCareer",
    label: "Academic Career",
    fetchThunk: getAcademicCareerValues,
  },
  {
    id: "academicProgram",
    label: "Academic Program",
    dependsOn: "academicCareer",
  },
  {
    id: "state",
    label: "State",
    fetchThunk: getStateValues,
  },
  {
    id: "city",
    label: "City",
    dependsOn: "state",
  },
  {
    id: "application_status",
    label: "Application Status",
    fetchThunk: getApplicationStatusValues,
  }
];

export const filterKeyMap: Record<string, string> = {
  state: "stateName",
  city: "cityName",
  academicProgram: "academicProgramDescription",
  academicCareer: "academicCareerName",
  leadStage: "currentLeadStageDisplayName",
  owner: "currentSalesrepFullName",
  leadSource: "leadSourceName",
  application_status: "applicationStatusName",
};
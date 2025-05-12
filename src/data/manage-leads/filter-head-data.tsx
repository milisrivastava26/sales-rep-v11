export interface InputDataType {
  id: number;
  label: string;
  type: string;
  name: string;
}

export const filterInputData: InputDataType[] = [
  { id: 1, label: "Lead Stages", type: "select", name: "currentLeadStageDisplayName" },
  { id: 2, label: "Lead Sub Stages", type: "select", name: "currentLeadSubStageDisplayName" },
  { id: 3, label: "Lead Source", type: "select", name: "leadSourceDescription" },
  { id: 4, label: "Owner", type: "select", name: "currentSalesrepFullName" },
  { id: 5, label: "Academic Career", type: "select", name: "academicCareerDescription" },
  { id: 6, label: "Academic Program", type: "select", name: "academicProgramDescription" },
  {
    id: 7,
    label: "Created from Date",
    type: "date",
    name: "fromDate",
  },
  { id: 8, label: "Created to Date", type: "date", name: "toDate" },
  {
    id: 9,
    label: "Application Status",
    type: "select",
    name: "applicationStatusName",
  },
];

export const filterInputDataForNewLead: InputDataType[] = [
  // { id: 1, label: "Lead Stages", type: "select", name: "current_lead_stage_display_name" },
  // { id: 2, label: "Lead Sub Stages", type: "select", name: "current_lead_sub_stage_display_name" },
  { id: 3, label: "Lead Source", type: "select", name: "lead_source_description" },
  { id: 4, label: "Owner", type: "select", name: "current_salesrep_full_name" },
  { id: 5, label: "Academic Career", type: "select", name: "academic_career_description" },
  { id: 6, label: "Academic Program", type: "select", name: "academic_program_description" },
  {
    id: 7,
    label: "Created from Date",
    type: "date",
    name: "from_date",
  },
  { id: 8, label: "Created to Date", type: "date", name: "to_date" },
  {
    id: 9,
    label: "Application Status",
    type: "select",
    name: "application_status_name",
  },
];

import { Column } from "react-table";
import { CollegeDkhoLead } from "../../../store/third-party-slices/get-collegeDkhoLeads-slice";

const CollageDekhoColumn: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "lead_capture_id",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.lead_capture_id || "N/A"} </span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.name || "N/A"}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.email || "N/A"}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.phone || "N/A"}</span>,
  },
  {
    Header: "Career",
    accessor: "academic_career_description",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.academic_career_description || "N/A"}</span>,
  },
  {
    Header: "Program",
    accessor: "academic_program_description",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.academic_program_description || "N/A"}</span>,
  },

  {
    Header: "State",
    accessor: "state_name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.state_name || "N/A"}</span>,
  },
  {
    Header: "City",
    accessor: "city_name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.city_name || "N/A"}</span>,
  },
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.createdAt || "N/A"}</span>,
  },
  {
    Header: "Lead stage",
    accessor: "current_lead_stage_display_name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.current_lead_stage_display_name}</span>,
  },
  {
    Header: "Lead sub Stage",
    accessor: "current_lead_sub_stage_display_name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.current_lead_sub_stage_display_name}</span>,
  },
  {
    Header: "Enquiry Status",
    accessor: "application_status_name",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.application_status_name}</span>,
  },
  {
    Header: "Lead source",
    accessor: "lead_source_description",
    Cell: ({ row }: { row: { original: CollegeDkhoLead } }) => <span>{row.original.lead_source_description}</span>,
  },
];

export default CollageDekhoColumn;

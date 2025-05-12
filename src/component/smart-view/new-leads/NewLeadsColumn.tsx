import { Column } from "react-table";
import { formatDate } from "../../../util/helper";  // Assuming you have a date formatter

export const NewLeadColumn: Column<any>[] = [
  {
    Header: "Lead ID",
    accessor: "lead_capture_id",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.lead_capture_id}</span>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: any } }) => (
      <span className="text-blue-500 underline">
        <a href={`mailto:${row.original.email}`} target="_blank" rel="noopener noreferrer">
          {row.original.email}
        </a>
      </span>
    ),
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.name}</span>
    ),
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>
        <a href={`tel:${row.original.phone}`} className="text-blue-500 underline">
          {row.original.phone}
        </a>
      </span>
    ),
  },
  {
    Header: "Academic Career",
    accessor: "academic_career_description",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.academic_career_description}</span>
    ),
  },
  {
    Header: "Program",
    accessor: "academic_program_description",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.academic_program_description}</span>
    ),
  },
  {
    Header: "City",
    accessor: "city_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.city_name}</span>
    ),
  },
  {
    Header: "State",
    accessor: "state_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.state_name}</span>
    ),
  },
  {
    Header: "Lead Source",
    accessor: "lead_primary_source",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.lead_source_description}</span>
    ),
  },
  {
    Header: "Session",
    accessor: "session_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.session_name}</span>
    ),
  },
  {
    Header: "Sales Rep",
    accessor: "current_salesrep_full_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.current_salesrep_full_name}</span>
    ),
  },
  {
    Header: "Lead Stage",
    accessor: "current_lead_stage_display_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.current_lead_stage_display_name}</span>
    ),
  },
  {
    Header: "Sub Stage",
    accessor: "current_lead_sub_stage_display_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.current_lead_sub_stage_display_name}</span>
    ),
  },
  {
    Header: "Application Status",
    accessor: "application_status_name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.application_status_name || "N/A"}</span>
    ),
  },
  {
    Header: "Alternative Number",
    accessor: "lead_alternatve_number",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.lead_alternatve_number || "N/A"}</span>
    ),
  },
  {
    Header: "Created At",
    accessor: "created_at",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{formatDate(row.original.created_at)}</span>
    ),
  },
];

import { Column } from "react-table";
import { UntouchedLeadDetails } from "../../../store/dashboard/get-todayUntouchedLeadDetailsByUsername-slice";

const OverdueLeadColumn: Column<any>[] = [
  //overdue
  // {
  //   Header: "Sr. No",
  //   Cell: ({ row }: { row: { index: number } }) => <span>{row.index + 1}</span>,
  // },
  {
    Header: "Lead#",
    accessor: "lead_capture_id",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.lead_capture_id} </span>,
  },
  {
    Header: "Name",
    accessor: "lead_name",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.lead_name}</span>,
  },
  {
    Header: "Email",
    accessor: "lead_email",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.lead_email}</span>,
  },

  {
    Header: "Lead Stage",
    accessor: "lead_stage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.lead_stage}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "lead_sub_stage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.lead_sub_stage}</span>,
  },
  {
    Header: "Phone",
    accessor: "lead_phone",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.lead_phone}</span>,
  },
  {
    Header: "Task Type",
    accessor: "task_type",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.task_type}</span>,
  },
  {
    Header: "Task Details",
    accessor: "task_details",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.task_details}</span>,
  },
  {
    Header: "Date",
    accessor: "scheduled_date",
    Cell: ({ row }: { row: { original: UntouchedLeadDetails } }) => <span>{row.original.scheduled_date}</span>,
  },
];

export default OverdueLeadColumn;

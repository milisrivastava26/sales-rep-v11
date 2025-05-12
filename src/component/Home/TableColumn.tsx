import { Column } from "react-table";

export const TableColumn: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId} </span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Lead Stage",
    accessor: "current_lead_stage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.current_lead_stage}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "sub_stage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.sub_stage}</span>,
  },
];

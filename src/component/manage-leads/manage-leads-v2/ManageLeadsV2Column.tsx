import { Column } from "react-table";

export const ManageLeadsV2Column: Column<any>[] = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "City",
    accessor: "cityName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.cityName}</span>,
  },
  {
    Header: "State",
    accessor: "stateName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.stateName}</span>,
  },
  {
    Header: "Program",
    accessor: "academicProgramDescription",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.academicProgramDescription}</span>,
  },
  {
    Header: "Career",
    accessor: "academicCareerDescription",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.academicCareerDescription}</span>,
  },
  {
    Header: "Lead Source",
    accessor: "leadSourceDescription",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadSourceDescription}</span>,
  },
  {
    Header: "Session",
    accessor: "sessionName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.sessionName}</span>,
  },
  {
    Header: "Sales Rep",
    accessor: "currentSalesrepFullName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currentSalesrepFullName}</span>,
  },
  {
    Header: "Stage",
    accessor: "currentLeadStageDisplayName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currentLeadStageDisplayName}</span>,
  },
  {
    Header: "Sub Stage",
    accessor: "currentLeadSubStageDisplayName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currentLeadSubStageDisplayName}</span>,
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.createdAt}</span>,
  },
];

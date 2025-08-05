import { Column } from "react-table";

export const ViewCoreLeadColumns: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "leadCaptureId",
    Cell: ({ row }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Created At",
    accessor: "createdAt",
    Cell: ({ row }) => <span>{row.original.createdAt}</span>,
  },
  {
    Header: "Career",
    accessor: "academicCareerDescription",
    Cell: ({ row }) => <span>{row.original.academicCareerDescription}</span>,
  },
  {
    Header: "Program",
    accessor: "academicProgramDescription",
    Cell: ({ row }) => <span>{row.original.academicProgramDescription}</span>,
  },
  {
    Header: "State",
    accessor: "stateName",
    Cell: ({ row }) => <span>{row.original.stateName}</span>,
  },
  {
    Header: "City",
    accessor: "cityName",
    Cell: ({ row }) => <span>{row.original.cityName}</span>,
  },
  {
    Header: "Lead Source",
    accessor: "leadCurrentSource",
    Cell: ({ row }) => <span>{row.original.leadCurrentSource}</span>,
  },
  {
    Header: "Session",
    accessor: "sessionName",
    Cell: ({ row }) => <span>{row.original.sessionName}</span>,
  },
  {
    Header: "Sales Rep Name",
    accessor: "currentSalesrepFullName",
    Cell: ({ row }) => <span>{row.original.currentSalesrepFullName}</span>,
  },
  {
    Header: "Application Status",
    accessor: "applicationStatusName",
    Cell: ({ row }) => <span>{row.original.applicationStatusName}</span>,
  },
  {
    Header: "Lead Stage",
    accessor: "currentLeadStageDisplayName",
    Cell: ({ row }) => <span>{row.original.currentLeadStageDisplayName}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "currentLeadSubStageDisplayName",
    Cell: ({ row }) => <span>{row.original.currentLeadSubStageDisplayName}</span>,
  },
];


export const defaultAdvanceSearchColumns: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "leadCaptureId",
    Cell: ({ row }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Sales Rep Name",
    accessor: "currentSalesrepFullName",
    Cell: ({ row }) => <span>{row.original.currentSalesrepFullName}</span>,
  },
];


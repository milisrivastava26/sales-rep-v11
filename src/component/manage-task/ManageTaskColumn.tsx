import { Column } from "react-table";
import { extractDateTime } from "../../util/actions/extractDateAndTime";

export const ManageTaskColumn: Column<any>[] = [
  {
    Header: "Lead ID",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Lead Name",
    accessor: "leadName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadName}</span>,
  },
  {
    Header: "Phone",
    accessor: "leadPhone",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadPhone}</span>,
  },
  {
    Header: "Lead Capture Date",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.createdAt);
      return `${dateFormatted} ${timeFormatted}`;
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" ");
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <span>{dateFormatted}</span>
          <br />
          <span>{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    Header: "Task Schedule Date",
    accessor: "scheduledDate",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.scheduledDate}</span>,
  },
  {
    Header: "Task Type",
    accessor: "taskType",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.taskType}</span>,
  },
  // {
  //   Header: "Details",
  //   accessor: "taskDetails",
  //   Cell: ({ row }: { row: { original: any } }) => (
  //     <span>{row.original.taskDetails}</span>
  //   ),
  // },
  {
    Header: "Status",
    accessor: "isCompleted",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.isCompleted ? "Completed" : "Pending"}</span>,
  },
  {
    Header: "Current Salesrep",
    accessor: "salesrepName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.salesrepName}</span>,
  },
  // {
  //   Header: "Phone",
  //   accessor: "salesrepPhone",
  //   Cell: ({ row }: { row: { original: any } }) => (
  //     <span>{row.original.salesrepPhone}</span>
  //   ),
  // },
  // {
  //   Header: "Email",
  //   accessor: "salesrepEmail",
  //   Cell: ({ row }: { row: { original: any } }) => (
  //     <span>{row.original.salesrepEmail}</span>
  //   ),
  // },
  {
    Header: "Lead Stage",
    accessor: "currentLeadStage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currentLeadStage}</span>,
  },
  {
    Header: "Sub Stage",
    accessor: "currentLeadSubStage",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currentLeadSubStage}</span>,
  },
  {
    Header: "Lead Source",
    accessor: "leadSource",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadSource}</span>,
  },
];

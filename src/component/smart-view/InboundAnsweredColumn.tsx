import { Column } from "react-table";
import { formatDate } from "../../util/helper";

export const inboundAnsweredColumn: Column<any>[] = [
  {
    Header: "Lead Name",
    accessor: "leadName",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.leadName || "N/A"}</span>
    ),
  },
  {
    Header: "Call To",
    accessor: "callto",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.callto}</span>
    ),
  },
  {
    Header: "Dial Status",
    accessor: "dialstatus",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.dialstatus}</span>
    ),
  },
  {
    Header: "Start Time",
    accessor: "starttime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{formatDate(row.original.starttime)}</span>
    ),
  },
  {
    Header: "End Time",
    accessor: "endtime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{formatDate(row.original.endtime)}</span>
    ),
  },
  {
    Header: "Answered Time",
    accessor: "answeredtime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.answeredtime || "N/A"}</span>
    ),
  },
  {
    Header: "Recording",
    accessor: "filename",
    Cell: ({ row }: { row: { original: any } }) => (
      <a href={row.original.filename} target="_blank">{row.original.filename}</a>
    ),
  },

  {
    Header: "Agent Name",
    accessor: "agentname",
    Cell: ({ row }: { row: { original: any } }) => (
      <>
        {row.original.agentname || "N/A"}
      </>
    ),
  },
];

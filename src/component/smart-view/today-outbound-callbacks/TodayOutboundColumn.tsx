import { Column } from "react-table";

export const todayOutboundCallbacks: Column<any>[] = [
  {
    Header: "Lead Id",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.leadCaptureId || "N/A"}</span>
    ),
  },
  {
    Header: "Dial Status",
    accessor: "dialstatus",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.dialStatus}</span>
    ),
  },
  {
    Header: "Start Time",
    accessor: "starttime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.startTime}</span>
    ),
  },
  {
    Header: "End Time",
    accessor: "endtime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.endTime}</span>
    ),
  },
  {
    Header: "Answered Time",
    accessor: "answeredtime",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.answeredTime || "N/A"}</span>
    ),
  },
  {
    Header: "Recording",
    accessor: "filename",
    Cell: ({ row }: { row: { original: any } }) => (
      <audio controls>
        <source src={row.original.filename} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    ),
  },

  {
    Header: "Agent Name",
    accessor: "agentName",
    Cell: ({ row }: { row: { original: any } }) => (
      <>{row.original.agentname || "N/A"}</>
    ),
  },
];

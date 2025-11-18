import { Column } from "react-table";
import { extractDateTime } from "../../../util/actions/extractDateAndTime";

export const manageTicketColumnForAdmin: Column<any>[] = [
  {
    Header: "Lead #",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.leadCaptureId}</span>
    ),
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.name || "N/A"}</span>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.email || "N/A"}</span>
    ),
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.phone || "N/A"}</span>
    ),
  },
  {
    Header: "Ticket #",
    accessor: "ticketNumber",
    Cell: ({ row }: { row: { original: any } }) => (
      <span className="text-blue-500 cursor-pointer">{row.original.ticketNumber}</span>
    ),
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.title}</span>
    ),
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ row }: { row: { original: any } }) => (
      <span
        style={{
          display: "inline-block",
          maxWidth: "250px",
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {row.original.description}
      </span>
    ),
  },
  {
    Header: "Service Type",
    accessor: "serviceType",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.serviceTypeName}</span>
    ),
  },
  {
    Header: "Service Sub Type",
    accessor: "serviceSubType",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.serviceSubType}</span>
    ),
  },
  {
    Header: "Assignment Status",
    accessor: "assignmentStatus",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.assignmentStatus}</span>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.status}</span>
    ),
  },

  {
    Header: "Created At",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.createdAt);
      return `${dateFormatted} ${timeFormatted}`;
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" ");
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{dateFormatted}</span>
          <span>{timeFormatted}</span>
        </div>
      );
    },
  },
];

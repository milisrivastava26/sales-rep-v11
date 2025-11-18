import { Column } from "react-table";
import { extractDateTime } from "../../../util/actions/extractDateAndTime";

export const TicketLeadsColumn: Column<any>[] = [
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
      <span>{row.original.ticketNumber}</span>
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
    Header: "Department",
    accessor: "departmentName",
    Cell: ({ row }: { row: { original: any } }) => (
      <span>{row.original.serviceDepartmentName}</span>
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

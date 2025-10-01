import { Column } from "react-table";
import { extractDateTime } from "../../../../util/actions/extractDateAndTime";
import { FaEye } from "react-icons/fa6";
import store from "../../../../store";
import { setLeadServiceTicketId, setViewTicketId } from "../../../../store/ui/ui-slice";
import { getTicketDetailsByTicketNumber } from "../../../../store/tickets/get-ticket-details-by-ticketNumber-slice";

export const getPriorityBadge = (servicePriorityName: string) => {
  switch (servicePriorityName.toLocaleLowerCase()) {
    case "low":
      return <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">Low</span>;
    case "normal":
      return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">Normal</span>;
    case "high":
      return <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-600">High</span>;
    case "urgent":
      return <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">Urgent</span>;
    case "immediate":
      return <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600">Immediate</span>;
    default:
      return <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">{servicePriorityName}</span>;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "new":
      return <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">New</span>;
    case "in process":
      return <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-600">In Process</span>;
    case "hold":
      return <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-600">Hold</span>;
    case "resolved":
      return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">Resolved</span>;
    default:
      return <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">{status}</span>;
  }
};

export const ServiceTicketsColumn: Column<any>[] = [
  {
    Header: "Ticket Id",
    accessor: "ticketNumber",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.ticketNumber}</span>,
  },
  {
    Header: "Reported Date",
    accessor: (row) => {
      if (!row.createdAt) return "";
      const { dateFormatted, timeFormatted } = extractDateTime(row.createdAt);
      return `${dateFormatted} ${timeFormatted}`;
    },
    Cell: ({ value }: { value: string }) => {
      if (!value) return <span>-</span>;
      const [dateFormatted, timeFormatted] = value.split(" ");
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{dateFormatted}</span>
          <span className="text-gray-500 text-xs">{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.title}</span>,
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.description}</span>,
  },
  {
    Header: "Priority",
    accessor: "servicePriorityName",
    Cell: ({ row }: { row: { original: any } }) => getPriorityBadge(row.original.servicePriorityName),
  },
  {
    Header: "Department",
    accessor: "serviceDepartmentName",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.serviceDepartmentName}</span>,
  },
  {
    Header: "Assigned To",
    accessor: "assignee",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.assignee || "-"}</span>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: { original: any } }) => getStatusBadge(row.original.status),
  },
  {
    Header: "Action",
    Cell: ({ row }: { row: { original: any } }) => (
      <div
        className="mx-2"
        onClick={() => {
          store.dispatch(setViewTicketId(row.original.ticketNumber));
          store.dispatch(getTicketDetailsByTicketNumber(row.original.ticketNumber));
          store.dispatch(setLeadServiceTicketId(row.original.leadServiceTicketId));
        }}
      >
        <FaEye className="text-xl text-gray-600" />
      </div>
    ),
  },
];

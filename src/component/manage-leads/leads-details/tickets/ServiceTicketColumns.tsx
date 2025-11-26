import { Column } from "react-table";
import { FaEye } from "react-icons/fa6";
import { extractDateTime } from "../../../../util/actions/extractDateAndTime";
import store from "../../../../store";
import { setTicketNumber } from "../../../../store/ui/ui-slice";



export const getStatusBadge = (status: string | null) => {
  if (!status) return null;
  switch (status.toLowerCase()) {
    case "new":
      return <span className="px-2 text-xs rounded bg-blue-100 text-blue-600">New</span>;
    case "in process":
      return <span className="px-2 text-xs rounded bg-yellow-100 text-yellow-600">In Process</span>;
    case "hold":
      return <span className="px-2 text-xs rounded bg-orange-100 text-orange-600">Hold</span>;
    case "resolved":
      return <span className="px-2 text-xs rounded bg-green-100 text-green-600">Resolved</span>;
    default:
      return <span className="px-2 text-xs rounded bg-gray-100 text-gray-600">{status}</span>;
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
  // {
  //   Header: "Status",
  //   accessor: "status",
  //   Cell: ({ row }: { row: { original: any } }) => getStatusBadge(row.original.status),
  // },
  {
    Header: "Details",
    Cell: ({ row }: { row: { original: any } }) => (
      <div
        className="mx-3 cursor-pointer"
        onClick = {() => store.dispatch(setTicketNumber(row.original.ticketNumber))}
      >
        <FaEye className="text-xl text-gray-600" />
      </div>
    ),
  },
];

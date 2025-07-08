import { Column } from "react-table";
import { extractDateTime } from "../../util/actions/extractDateAndTime";
import ViewConversation from "./ViewConversation";

export const SuperbotCallbackColumns: Column<any>[] = [
  {
    Header: "Lead Capture ID",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId}</span>,
  },
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
    Header: "Direction",
    accessor: "direction",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.direction}</span>,
  },
  {
    Header: "Owner",
    accessor: "owner",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.owner}</span>,
  },
  {
    Header: "Date & Time",
    accessor: (row) => {
      const { dateFormatted, timeFormatted } = extractDateTime(row.time);
      return `${dateFormatted} ${timeFormatted}`;
    },
    Cell: ({ value }: { value: string }) => {
      const [dateFormatted, timeFormatted] = value.split(" ");
      return (
        <div className="flex flex-col">
          <span>{dateFormatted}</span>
          <span className="text-gray-500 text-xs">{timeFormatted}</span>
        </div>
      );
    },
  },
  {
    Header: "Action",
    Cell: ({ row }: { row: { original: any } }) => <ViewConversation phone={row.original.phone}/>,
  },
];

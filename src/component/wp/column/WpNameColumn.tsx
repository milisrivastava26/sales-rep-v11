import { Column } from "react-table";
import { formatDate } from "../../../util/helper";
import { InboundWhatsappMessage } from "../../../store/wp/get-allInboundWhatsappMessages-slice";

const WpNameColumn = (onCreateLead: (rowData: InboundWhatsappMessage) => void, handleReject:(id:string|number)=>void): Column<any>[] => [
  {
    Header: "Client#",
    accessor: "leadCaptureClientR2nId",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => <span>{row.original.leadCaptureClientR2nId}</span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Message",
    accessor: "message",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => <span>{row.original.message}</span>,
  },
  {
    Header: "Date / Time",
    accessor: "createdAt",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => <span>{formatDate(row.original.createdAt)}</span>,
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }: { row: { original: InboundWhatsappMessage } }) => {
      return (
        <div className="flex gap-2">
          <button
            onClick={handleReject.bind({}, row.original.leadCaptureClientR2nId)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={onCreateLead.bind({},row.original)} // Pass only the clicked row's data
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create lead
          </button>
        </div>
      );
    },
  },
];

export default WpNameColumn;

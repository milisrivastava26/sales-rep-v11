import { Column } from "react-table";
import { formatIndianNumber } from "../../data/payment-info-data";

export const PaymentInfoColumn: Column<any>[] = [
    {
        Header: "Lead#",
        accessor: "leadCaptureId",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId}</span>,
    },
    {
        Header: "Enquiry #",
        accessor: "leadEnquiryId",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadEnquiryId}</span>,
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
    },
    {
        Header: "Email",
        accessor: "email",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.email}</span>,
    },
    {
        Header: "Phone",
        accessor: "mobileNumber",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.mobileNumber}</span>,
    },
    {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.status}</span>,
    },
    {
        Header: "Order ID",
        accessor: "orderId",
        Cell: ({ row }: { row: { original: any } }) => {
            return (
                <span>{row.original.orderId}</span>
            )
        },
    },
    {
        Header: "Payment ID",
        accessor: "id",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.id}</span>,
    },
    {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }: { row: { original: any } }) => <span>{formatIndianNumber(row.original.amount)}</span>,
    },
    {
        Header: "Currency",
        accessor: "currency",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.currency}</span>,
    },
    {
        Header: "Payment Method",
        accessor: "method",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.method}</span>,
    },
    {
        Header: "Career",
        accessor: "career",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.career}</span>,
    },
    {
        Header: "Program",
        accessor: "program",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.program}</span>,
    },
    {
        Header: "UPI Transaction ID",
        accessor: "upiTransactionId",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.upiTransactionId}</span>,
    },
    {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ row }: { row: { original: any } }) => <span>{row.original.createdAt}</span>,
    },
];

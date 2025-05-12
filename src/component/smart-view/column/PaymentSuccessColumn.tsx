import { Column } from "react-table";
import { formatDate } from "../../../util/helper";
import { LeadPaymentDetail } from "../../../store/smart-view/get-leadPaymentDetailsForFinance-slice";

export const PaymentSuccessColumn: Column<LeadPaymentDetail>[] = [
  {
    Header: "Id#",
    accessor: "leadPaymentsId",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.leadPaymentsId || "N/A"}</span>
    ),
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.name || "N/A"}</span>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.email || "N/A"}</span>
    ),
  },
  {
    Header: "Receipt Number",
    accessor: "receiptNumber",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.receiptNumber || "N/A"}</span>
    ),
  },
  {
    Header: "Amount",
    accessor: "paymentAmount",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.paymentAmount || "N/A"}</span>
    ),
  },
  {
    Header: "Status",
    accessor: "orderStatus",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.orderStatus || "N/A"}</span>
    ),
  },
  {
    Header: "Order ID",
    accessor: "razorpayOrderId",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.razorpayOrderId || "N/A"}</span>
    ),
  },
  {
    Header: "Created At",
    accessor: (row) => (row.createdAt ? formatDate(row.createdAt) : "N/A"),
  },
  {
    Header: "Program",
    accessor: "program",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.program || "N/A"}</span>
    ),
  },
  {
    Header: "Career Name",
    accessor: "careerName",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.careerName || "N/A"}</span>
    ),
  },
  {
    Header: "City",
    accessor: "city",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.city || "N/A"}</span>
    ),
  },
  {
    Header: "State",
    accessor: "state",
    Cell: ({ row }: { row: { original: LeadPaymentDetail } }) => (
      <span>{row.original.state || "N/A"}</span>
    ),
  },
];

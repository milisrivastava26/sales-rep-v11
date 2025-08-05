import { Column } from "react-table";
import { LeadCashPayment } from "../../data/view-cash-payment/view-cash-payment-data";
import CashActionOption from "./CashActionOption";

export const ViewLeadCashPaymentColumn: Column<LeadCashPayment>[] = [
  {
    Header: "Lead Capture Id",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Lead Enquiry Id",
    accessor: "enquiryId",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.enquiryId}</span>,
  },
  {
    Header: "Lead Name",
    accessor: "name", // Preprocess data for both search and display
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Receipt Number",
    accessor: "receiptNumber",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.receiptNumber}</span>,
  },
  {
    Header: "Payment Amount",
    accessor: "paymentAmount",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.paymentAmount}</span>,
  },
  {
    Header: "Order Id",
    accessor: "orderId",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <span>{row.original.orderId}</span>,
  },
  {
    Header: "Action",
    Cell: ({ row }: { row: { original: LeadCashPayment } }) => <CashActionOption razonPayId={row.original.orderId} />,
  },

  //   {
  //     Header: "Modified On",
  //     accessor: (row) => {
  //       const { dateFormatted, timeFormatted } = extractDateTime(row.modifiedOn);
  //       return `${dateFormatted} ${timeFormatted}`; // Preprocess for sorting/filtering
  //     },
  //     Cell: ({ value }: { value: string }) => {
  //       const [dateFormatted, timeFormatted] = value.split(" "); // Split the combined string
  //       return (
  //         <div style={{ display: "flex", gap: "10px" }}>
  //           <span>{dateFormatted}</span>
  //           <br />
  //           <span>{timeFormatted}</span>
  //         </div>
  //       );
  //     },
  //   },
];

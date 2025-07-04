import { Column } from "react-table";

export const documentReviewColumns: Column<any>[] = [
  {
    Header: "Lead #",
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
    Header: "Program",
    accessor: "program",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.program}</span>,
  },
  {
    Header: "Career",
    accessor: "career",
    Cell: ({ row }: { row: { original: any } }) => <span>{row.original.career}</span>,
  },
];

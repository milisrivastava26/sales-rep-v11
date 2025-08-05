import { Column } from "react-table";

export const getDocumentReviewColumns = (roles: string[] = []): Column<any>[] => {
  const baseColumns: Column<any>[] = [
    {
      Header: "Lead #",
      accessor: "leadCaptureId",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.leadCaptureId}</span>
      ),
    },
    {
      Header: "ERP #",
      accessor: "employeeId",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.employeeId}</span>
      ),
    },
    {
      Header: "Enquiry #",
      accessor: "leadEnquiryId",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.leadEnquiryId}</span>
      ),
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.name}</span>
      ),
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.phone}</span>
      ),
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.email}</span>
      ),
    },
    {
      Header: "Program",
      accessor: "program",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.program}</span>
      ),
    },
    {
      Header: "Career",
      accessor: "career",
      Cell: ({ row }: { row: { original: any } }) => (
        <span>{row.original.career}</span>
      ),
    },
  ];

  const statusColumn: Column<any> = {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: { row: { original: any } }) => (
      <span
        className={`${
          row.original.status === true
            ? "text-green-600 font-medium"
            : "text-red-600 font-medium"
        }`}
      >
        {row.original.status === true ? "Verified" : "Not Verified"}
      </span>
    ),
  };

  return roles.includes("ROLE_DOCUMENT_REVIEWER")
    ? baseColumns
    : [...baseColumns, statusColumn];
};

import { Column } from "react-table";
import { DiscountAuditType } from "./getDiscountAuditsColumns";

export const discountAuditColumn: Column<DiscountAuditType>[] = [
  {
    Header: "Lead #",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.leadCaptureId || "N/A"}</span>,
  },
  {
    Header: "Lead Name",
    accessor: "leadName",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.leadName || "N/A"}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.email || "N/A"}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.phone || "N/A"}</span>,
  },
  {
    Header: "Employee ID",
    accessor: "psEmployeeId",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.psEmployeeId || "N/A"}</span>,
  },
  {
    Header: "Program Description",
    accessor: "programDescription",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.programDescription || "N/A"}</span>,
  },
  {
    Header: "Career Description",
    accessor: "careerDescription",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.careerDescription || "N/A"}</span>,
  },
  {
    Header: "Scholarship Scheme",
    accessor: "scholarshipScheme",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.scholarshipScheme ?? "N/A"}</span>,
  },
  {
    Header: "Scholarship Category",
    accessor: "scholarshipCategory",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.scholarshipCategory ?? "N/A"}</span>,
  },
  {
    Header: "Scholarship Slab",
    accessor: "scholarshipSlab",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.scholarshipSlab ?? "N/A"}</span>,
  },
  {
    Header: "Scholarship Discount",
    accessor: "scholarshipDiscount",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.scholarshipDiscount ?? 0}</span>,
  },

  {
    Header: "Additional Discount",
    accessor: "additionalDiscount",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.additionalDiscount ?? "N/A"}</span>,
  },

  {
    Header: "One Time Discount",
    accessor: "oneTimeDiscount",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.oneTimeDiscount ?? "N/A"}</span>,
  },

  {
    Header: "Package Deal",
    accessor: "packageDeal",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.packageDeal ?? 0}</span>,
  },
  {
    Header: "Total Discount",
    accessor: "totalDiscount",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.totalDiscount ?? 0}</span>,
  },
  {
    Header: "Offer Status",
    accessor: "status",
    Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span className="font-medium">{row.original.status || "N/A"}</span>,
  },
];

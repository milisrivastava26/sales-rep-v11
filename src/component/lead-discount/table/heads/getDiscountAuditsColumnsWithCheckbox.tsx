import { Column } from "react-table";
import { DiscountAuditType } from "./getDiscountAuditsColumns";

export const discountAuditColumn: Column<DiscountAuditType>[] = [
    {
      Header: "Lead Capture ID",
      accessor: "leadCaptureId",
      Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.leadCaptureId || "N/A"}</span>,
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
      Header: "Scholarship Discount",
      accessor: "scholarshipDiscount",
      Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.scholarshipDiscount ?? 0}</span>,
    },

    {
      Header: "Special Discount",
      accessor: "specialDiscount",
      Cell: ({ row }: { row: { original: DiscountAuditType } }) => <span>{row.original.specialDiscount ?? "N/A"}</span>,
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
import { Column } from "react-table";

// API se aane wale data ka type
export interface DiscountAuditType {
  status: string;
  leadCaptureId: number;
  psEmployeeId: number;
  scholarshipDiscount: number;
  totalDiscount: number;
  specialDiscount: number | null;
  packageDeal: number;
  programDescription: string;
  careerDescription: string;
}

export const getDiscountAuditsColumnsWithCheckbox = (
  selectedRowIds: { [key: string]: boolean },
  toggleRow: (id: number) => void,
  toggleAll: (checked: boolean) => void
): Column<DiscountAuditType>[] => {
  const columns: Column<DiscountAuditType>[] = [
    {
      id: "selection",
      Header: () => (
        <input type="checkbox" onChange={(e) => toggleAll(e.target.checked)} checked={Object.values(selectedRowIds).length > 0 && Object.values(selectedRowIds).every(Boolean)} />
      ),
      Cell: ({ row }: { row: { original: DiscountAuditType } }) => (
        <input type="checkbox" checked={!!selectedRowIds[row.original.leadCaptureId]} onChange={() => toggleRow(row.original.leadCaptureId)} />
      ),
    },
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

  return columns;
};

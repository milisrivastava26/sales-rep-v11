import { Column } from "react-table";
import TruncatedText from "./TruncatedText";

export interface DiscountAuditType {
  scholarshipSlab: string;
  scholarshipCategory: string;
  scholarshipScheme: string;
  phone: string;
  email: string;
  name: string;
  status: string;
  leadCaptureId: number;
  psEmployeeId: number;
  scholarshipDiscount: number;
  totalDiscount: number;
  specialDiscount: number | null;
  packageDeal: number;
  programDescription: string;
  careerDescription: string;
  additionalDiscount: string;
  oneTimeDiscount: string;
}

export const getDiscountAuditsColumns = (): Column<DiscountAuditType>[] => {
  const columns: Column<DiscountAuditType>[] = [
    {
      Header: "Lead #",
      accessor: "leadCaptureId",
      Cell: ({ row }) => <span>{row.original.leadCaptureId || "N/A"}</span>,
    },
    {
      Header: "Lead Name",
      accessor: "name",
      Cell: ({ row }) => <TruncatedText text={row.original.name} />,
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ row }) => <TruncatedText text={row.original.email} />,
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: ({ row }) => <TruncatedText text={row.original.phone} />,
    },
    {
      Header: "Employee ID",
      accessor: "psEmployeeId",
      Cell: ({ row }) => <span>{row.original.psEmployeeId || "N/A"}</span>,
    },
    {
      Header: "Program Description",
      accessor: "programDescription",
      Cell: ({ row }) => <TruncatedText text={row.original.programDescription} />,
    },
    {
      Header: "Career Description",
      accessor: "careerDescription",
      Cell: ({ row }) => <TruncatedText text={row.original.careerDescription} />,
    },
    {
      Header: "Scholarship Scheme",
      accessor: "scholarshipScheme",
      Cell: ({ row }) => <TruncatedText text={row.original.scholarshipScheme} />,
    },
    {
      Header: "Scholarship Category",
      accessor: "scholarshipCategory",
      Cell: ({ row }) => <TruncatedText text={row.original.scholarshipCategory} />,
    },
    {
      Header: "Scholarship Slab",
      accessor: "scholarshipSlab",
      Cell: ({ row }) => <TruncatedText text={row.original.scholarshipSlab} />,
    },
    {
      Header: "Scholarship Discount",
      accessor: "scholarshipDiscount",
      Cell: ({ row }) => <span>{row.original.scholarshipDiscount ?? 0}</span>,
    },
    {
      Header: "Additional Discount",
      accessor: "additionalDiscount",
      Cell: ({ row }) => <TruncatedText text={row.original.additionalDiscount} />,
    },
    {
      Header: "One Time Discount",
      accessor: "oneTimeDiscount",
      Cell: ({ row }) => <TruncatedText text={row.original.oneTimeDiscount} />,
    },
    {
      Header: "Package Deal",
      accessor: "packageDeal",
      Cell: ({ row }) => <span>{row.original.packageDeal ?? 0}</span>,
    },
    {
      Header: "Total Discount",
      accessor: "totalDiscount",
      Cell: ({ row }) => <span>{row.original.totalDiscount ?? 0}</span>,
    },
    {
      Header: "Offer Status",
      accessor: "status",
      Cell: ({ row }) => <TruncatedText text={row.original.status || "N/A"} />,
    },
  ];

  return columns;
};

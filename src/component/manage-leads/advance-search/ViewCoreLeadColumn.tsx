import { Column } from "react-table";

export const ViewCoreLeadColumns: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "leadCaptureId",
    Cell: ({ row }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Lead Created At",
    accessor: "leadCaptureCreatedAt",
    Cell: ({ row }) => <span>{row.original.leadCaptureCreatedAt}</span>,
  },
  {
    Header: "Lead Enquiry ID",
    accessor: "leadEnquiryId",
    Cell: ({ row }) => <span>{row.original.leadEnquiryId}</span>,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => <span>{row.original.status}</span>,
  },
  {
    Header: "Action Track ID",
    accessor: "actionTrackId",
    Cell: ({ row }) => <span>{row.original.actionTrackId}</span>,
  },
  {
    Header: "Lead Enquiry Created At",
    accessor: "leadEnquiryCreatedAt",
    Cell: ({ row }) => <span>{row.original.leadEnquiryCreatedAt}</span>,
  },
  {
    Header: "Career",
    accessor: "career",
    Cell: ({ row }) => <span>{row.original.career}</span>,
  },
  {
    Header: "Program",
    accessor: "program",
    Cell: ({ row }) => <span>{row.original.program}</span>,
  },
  {
    Header: "State",
    accessor: "state",
    Cell: ({ row }) => <span>{row.original.state}</span>,
  },
  {
    Header: "City",
    accessor: "city",
    Cell: ({ row }) => <span>{row.original.city}</span>,
  },
  {
    Header: "Lead Source",
    accessor: "leadSource",
    Cell: ({ row }) => <span>{row.original.leadSource}</span>,
  },
  {
    Header: "Session",
    accessor: "session",
    Cell: ({ row }) => <span>{row.original.session}</span>,
  },
  {
    Header: "Sales Rep Name",
    accessor: "salesRepName",
    Cell: ({ row }) => <span>{row.original.salesRepName}</span>,
  },
  {
    Header: "Sales Rep Phone",
    accessor: "salesRepPhone",
    Cell: ({ row }) => <span>{row.original.salesRepPhone}</span>,
  },
  {
    Header: "Sales Rep Email",
    accessor: "salesRepEmail",
    Cell: ({ row }) => <span>{row.original.salesRepEmail}</span>,
  },
  {
    Header: "Application Status",
    accessor: "applicationStatus",
    Cell: ({ row }) => <span>{row.original.applicationStatus}</span>,
  },
  {
    Header: "Fee Status",
    accessor: "feeStatus",
    Cell: ({ row }) => <span>{row.original.feeStatus}</span>,
  },
  {
    Header: "Yearly Course Fee",
    accessor: "yearlyCourseFee",
    Cell: ({ row }) => <span>{row.original.yearlyCourseFee || "N/A"}</span>,
  },
  {
    Header: "Scholarship Discount",
    accessor: "scholarshipDiscount",
    Cell: ({ row }) => <span>{row.original.scholarshipDiscount || "N/A"}</span>,
  },
  {
    Header: "Special Discount",
    accessor: "specialDiscount",
    Cell: ({ row }) => <span>{row.original.specialDiscount || "N/A"}</span>,
  },
  {
    Header: "Total Discount",
    accessor: "totalDiscount",
    Cell: ({ row }) => <span>{row.original.totalDiscount || "N/A"}</span>,
  },
  {
    Header: "Net Fee",
    accessor: "netFee",
    Cell: ({ row }) => <span>{row.original.netFee || "N/A"}</span>,
  },
  {
    Header: "Paid Application Fee",
    accessor: "pyApplicationFee",
    Cell: ({ row }) => <span>{row.original.pyApplicationFee || "N/A"}</span>,
  },
  {
    Header: "Paid Course Fee",
    accessor: "pyCourseFee",
    Cell: ({ row }) => <span>{row.original.pyCourseFee || "N/A"}</span>,
  },
  {
    Header: "Scholarship Category",
    accessor: "scholarshipCategory",
    Cell: ({ row }) => <span>{row.original.scholarshipCategory || "N/A"}</span>,
  },
  {
    Header: "Scholarship Scheme",
    accessor: "scholarshipScheme",
    Cell: ({ row }) => <span>{row.original.scholarshipScheme || "N/A"}</span>,
  },
  {
    Header: "Scholarship Slab",
    accessor: "scholarshipSlab",
    Cell: ({ row }) => <span>{row.original.scholarshipSlab || "N/A"}</span>,
  },
  {
    Header: "Percentage Discount",
    accessor: "percentageDiscount",
    Cell: ({ row }) => <span>{row.original.percentageDiscount}%</span>,
  },
  {
    Header: "Applicable On",
    accessor: "applicableOn",
    Cell: ({ row }) => <span>{row.original.applicableOn || "N/A"}</span>,
  },
  {
    Header: "Lead Stage",
    accessor: "leadStage",
    Cell: ({ row }) => <span>{row.original.lead_stage || "N/A"}</span>,
  },
  {
    Header: "Lead Sub Stage",
    accessor: "leadSubStage",
    Cell: ({ row }) => <span>{row.original.lead_sub_stage || "N/A"}</span>,
  },
];

export const defaultAdvanceSearchColumns: Column<any>[] = [
  {
    Header: "Lead#",
    accessor: "leadCaptureId",
    Cell: ({ row }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Sales Rep Name",
    accessor: "salesRepName",
    Cell: ({ row }) => <span>{row.original.salesRepName}</span>,
  },
];

import { Column } from "react-table";

// ✅ Define the Type for API response
interface LeadImporterType {
  leadDataImporterId: number;
  name: string;
  email: string;
  coreStateId: number;
  coreCityId: number;
  careerName: number;
  programName: number;
  leadSource: number;
  phone: string;
}

export const ImportedLeadColumn: Column<LeadImporterType>[] = [
  {
    Header: "Lead Name",
    accessor: (row: LeadImporterType) => row.name,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.name || "N/A"}</span>
    ),
  },
  {
    Header: "Email",
    accessor: (row: LeadImporterType) => row.email,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.email || "N/A"}</span>
    ),
  },
  {
    Header: "Phone",
    accessor: (row: LeadImporterType) => row.phone,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.phone}</span>
    ),
  },
  {
    Header: "State ID",
    accessor: (row: LeadImporterType) => row.coreStateId,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.coreStateId}</span>
    ),
  },
  {
    Header: "City ID",
    accessor: (row: LeadImporterType) => row.coreCityId,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.coreCityId}</span>
    ),
  },
  {
    Header: "Career Id",
    accessor: (row: LeadImporterType) => row.careerName,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.careerName}</span>
    ),
  },
  {
    Header: "Program Id",
    accessor: (row: LeadImporterType) => row.programName,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.programName}</span>
    ),
  },
  {
    Header: "Lead Source Id",
    accessor: (row: LeadImporterType) => row.leadSource,
    Cell: ({ row }: { row: { original: LeadImporterType } }) => (
      <span>{row.original.leadSource}</span>
    ),
  },
  
];

import { Column } from "react-table";
import Actions from "./Actions";

// empIdMap should be: { [leadCaptureId: string]: string }
export function getPsIntegrationLeadDetailsColumns(empId: string): Column<any>[] {
  const columns: Column<any>[] = [
    {
      Header: "Lead ID",
      accessor: "leadCaptureId",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.leadCaptureId}</span>,
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.name}</span>,
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.email}</span>,
    },
    {
      Header: "Phone",
      accessor: "phone",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.phone}</span>,
    },
    {
      Header: "Career",
      accessor: "academicCareerDescription",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.academicCareerDescription}</span>,
    },
    {
      Header: "Program",
      accessor: "academicProgramDescription",
      Cell: ({ row }: { row: { original: any } }) => <span>{row.original.academicProgramDescription}</span>,
    },
  ];

  if (empId !== "") {
    columns.push({
      Header: "PS EmpId",
      Cell: () => <span>{empId}</span>,
    });
  } else {
    columns.push({
      Header: "Action",
      Cell: ({ row }: { row: { original: any } }) => <Actions leadCaptureId={row.original.leadCaptureId} />,
    });
  }

  return columns;
}

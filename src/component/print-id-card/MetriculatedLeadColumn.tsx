import { Column } from "react-table";
import { MetriculatedLead } from "../../store/print-id-card/get-metriculated-lead-slice";
import { FaEye } from "react-icons/fa6";
import store from "../../store";
import { openModalForPrintIdCard } from "../../store/ui/ui-slice";
import { getMetriculatedLeadDetailById, resetMetriculatedLeadDetail } from "../../store/print-id-card/get-metriculated-lead-byId-slice";

export const MetriculatedLeadsColumn: Column<MetriculatedLead>[] = [
  {
    Header: "Lead Capture ID",
    accessor: "leadCaptureId",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.leadCaptureId}</span>,
  },
  {
    Header: "Lead Enquiry ID",
    accessor: "leadEnquiryId",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.leadEnquiryId}</span>,
  },
  {
    Header: "Lead Name",
    accessor: "name",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.name}</span>,
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.email}</span>,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.phone}</span>,
  },
  {
    Header: "Employee ID",
    accessor: "psEmployeeId",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.psEmployeeId}</span>,
  },
  {
    Header: "Roll Number",
    accessor: "rollNumber",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.rollNumber}</span>,
  },
  {
    Header: "Program",
    accessor: "programDescription",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.programDescription}</span>,
  },
  {
    Header: "Career",
    accessor: "careerDescription",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => <span>{row.original.careerDescription}</span>,
  },
  {
    Header: "Preview",
    Cell: ({ row }: { row: { original: MetriculatedLead } }) => {
      const data = {
        name: row.original.name,
        erpId: row.original.psEmployeeId,
        rollNumber: row.original.rollNumber,
        program: row.original.programDescription,
        phone: row.original.phone,
        leadCaptureId: row.original.leadCaptureId,
      };
      return (
        <div
          className="mx-5"
          onClick={() => {
            store.dispatch(resetMetriculatedLeadDetail());
            store.dispatch(openModalForPrintIdCard(data));
            store.dispatch(getMetriculatedLeadDetailById(row.original.leadCaptureId));
            
          }}
        >
          <FaEye className="text-xl" />
        </div>
      );
    },
  },
];

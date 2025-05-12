import { Column } from "react-table";

export const WalkinAndCounsellingColumn: Column<any>[] = [
    {
        Header: "Lead Capture ID",
        accessor: "lead_capture_id",
        Cell: ({ row }: { row: { original: any } }) => (
            <span>{row.original.lead_capture_id || "N/A"}</span>
        ),
    },
    {
        Header: "Name",
        accessor: "lead_name",
        Cell: ({ row }: { row: { original: any } }) => (
            <span>{row.original.lead_name || "N/A"}</span>
        ),
    },
    {
        Header: "Lead Email",
        accessor: "lead_email",
        Cell: ({ row }: { row: { original: any } }) => (
            <span>{row.original.lead_email || "N/A"}</span>
        ),
    },
    {
        Header: "Lead Phone",
        accessor: "lead_phone",
        Cell: ({ row }: { row: { original: any } }) => (
            <span>{row.original.lead_phone || "N/A"}</span>
        ),
    },
    {
        Header: "Notes",
        accessor: "notes",
        Cell: ({ row }: { row: { original: any } }) => (
            <span>{row.original.notes || "N/A"}</span>
        ),
    },

];

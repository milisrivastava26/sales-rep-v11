import { Column } from "react-table";
import { LeadNotesType } from "../../../../types/manage-leads/notes-type";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";
import { BiDownload } from "react-icons/bi";
import store from "../../../../store";
import PreviewDocument from "../../../../util/custom/PreviewDocument";

export const DocumentDetailsColumn: Column<LeadNotesType>[] = [
  {
    Header: "Name",
    accessor: (row: LeadNotesType) => row.name,
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      return (
        <span>{row.original.name !== null ? row.original.name : "N/A"}</span>
      );
    },
  },
  {
    Header: "Attached to",
    accessor: (row: LeadNotesType) => row.coreDocAttachmentTypeName,
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      return <span>{row.original.coreDocAttachmentTypeName}</span>;
    },
  },
  {
    Header: "Created By",
    accessor: "modifiedBy",
    Cell: ({ row }: { row: { original: LeadNotesType } }) => (
      <span>{row.original.modifiedBy}</span>
    ),
  },
  {
    Header: "Download Docs",
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      const handleDownload = (
        docName: string,
        leadCaptureId: number,
        docTypeId: number | undefined
      ) => {
        if (docName) {
          // ✅ Ensure docName is defined before dispatching
          store.dispatch(
            downloadDocForNotes({ leadCaptureId, docName, docTypeId })
          );
        } else {
          console.error("Document name is undefined.");
        }
      };

      return (
        <span
          className="cursor-pointer"
          onClick={() =>
            handleDownload(
              row.original.name ?? "",
              row.original.leadCaptureId ?? 0,
              row.original.coreDocAttachmentTypeId
            )
          }
        >
          <BiDownload size={22} />
        </span>
      );
    },
  },
  {
    Header: "Preview",
    Cell: ({ row }: { row: { original: LeadNotesType } }) => {
      return (
        <PreviewDocument
          coreDocAttachmentTypeId={row.original.coreDocAttachmentTypeId}
          leadCaptureId={row.original.leadCaptureId}
          name={row.original.name}
          coreDocAttachmentTypeName={row.original.coreDocAttachmentTypeName}
        />
      );
    },
  },
];

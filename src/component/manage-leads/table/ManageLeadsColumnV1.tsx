import { Column } from "react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ActionOptions from "../genral/ActionOption";
import { ManageLeadV1Type } from "../../../types/manage-leads/manage-leads-type";
 
export const getManageLeadsColumnV1 = () => {
  const selectedColumnToDisplay = useSelector((state: RootState) => state.ui.selectedColumnToDisplay);
  const savedColumns = JSON.parse(localStorage.getItem("selectedColumns") || "[]");
  const columnsToShow = Object.keys(savedColumns).length > 0 ? savedColumns : selectedColumnToDisplay;
  let columns: Column<ManageLeadV1Type>[] = [];
 
  columns.push({
    Header: "Action",
    Cell: ({ row }: { row: { original: ManageLeadV1Type; index: number } }) => {
      return <ActionOptions pageFlag="details/" rowIndex={row.index} leadId={row.original.leadCaptureId} leadNum={row.original.phone} leadStageId={1} />;
    },
  });
 
  columnsToShow.forEach((item: any) => {
    const label = item.label;
    const ColumnName: keyof ManageLeadV1Type = item.name;
 
    columns.push({
      Header: label,
      accessor: ColumnName,
      Cell: ({ row }: { row: { original: ManageLeadV1Type } }) => (
        <span>{ColumnName === "application_status_name" ? row.original[ColumnName] || "Pending" : row.original[ColumnName] || "N/A"}</span>
      ),
    });
  });
 
  return columns;
};
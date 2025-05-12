import React from "react";
import { Column } from "react-table";

interface ColumnSelectorProps {
  allColumns: Column<any>[];
  selectedColumns: Column<any>[];
  onColumnChange: (updatedColumns: Column<any>[]) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  allColumns,
  selectedColumns,
  onColumnChange,
}) => {
  const toggleColumn = (column: Column<any>) => {
    const isSelected = selectedColumns.some(
      (col) => col.accessor === column.accessor
    );
    const updatedColumns = isSelected
      ? selectedColumns.filter((col) => col.accessor !== column.accessor)
      : [...selectedColumns, column];

    onColumnChange(updatedColumns);
  };

  return (
    <div className="grid grid-cols-2 gap-1 gap-x-32 mx-10 mb-5">
      {allColumns.map((column, index) => (
        <label key={index} className="flex gap-2">
          <input
            type="checkbox"
            checked={selectedColumns.some(
              (col) => col.accessor === column.accessor
            )}
            onChange={() => toggleColumn(column)}
          />
          <span className="text-sm">
            {typeof column.Header === "function"
              ? "Custom Header"
              : column.Header || ""}
          </span>
        </label>
      ))}
    </div>
  );
};

export default ColumnSelector;

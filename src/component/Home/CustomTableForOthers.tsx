import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTable, Column, TableInstance } from "react-table";

interface TableInstanceWithPlugins<T extends object> extends TableInstance<T> {
  getTableBodyProps: () => any;
  headerGroups: Array<any>;
  prepareRow: (row: any) => void;
}

interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[] | any;
  isModeType?: string;
  onNameChange?: (id: string | number, newName: string) => void;
}

export function CustomTableForOthers<T extends object>({ columns, data, isModeType, onNameChange }: CustomDetailsTableProps<T>) {
  const { isError, response } = useSelector((state: RootState) => state.updateNameWpLeadsData);

  const { getTableBodyProps, headerGroups, prepareRow, rows } = useTable<T>({
    columns,
    data,
  }) as TableInstanceWithPlugins<T>;

  // Track name edits and UI state
  const [editingNames, setEditingNames] = useState<Record<string | number, string>>({});
  const [showSave, setShowSave] = useState<Record<string | number, boolean>>({});
  const [isEditing, setIsEditing] = useState<Record<string | number, boolean>>({});

  // Handle name input change
  const handleInputChange = (rowId: string | number, newValue: string) => {
    setEditingNames((prev) => ({ ...prev, [rowId]: newValue }));
    // Get the original value from data
    const originalValue = data.find((row: any) => row.leadCaptureClientR2nId === rowId)?.name || "";
    // Show Save button only if value is changed and input is not empty
    setShowSave((prev) => ({
      ...prev,
      [rowId]: newValue.trim() !== "" && newValue !== originalValue,
    }));
  };

  // Enable editing mode when user clicks the name
  const handleEditClick = (rowId: string | number) => {
    setIsEditing((prev) => ({ ...prev, [rowId]: true }));
    setEditingNames((prev) => ({
      ...prev,
      [rowId]: data.find((row: any) => row.leadCaptureClientR2nId === rowId)?.name || "",
    }));
  };

  // Save the updated name
  const handleSave = (rowId: string | number) => {
    if (onNameChange && editingNames[rowId] !== undefined) {
      onNameChange(rowId, editingNames[rowId]);
    }
  };

  // Cancel editing and revert changes
  const handleCancel = (rowId: string | number) => {
    setIsEditing((prev) => ({ ...prev, [rowId]: false }));
    setShowSave((prev) => ({ ...prev, [rowId]: false }));
  };

  useEffect(() => {
    if (!isError && response) {
      // Hide buttons after saving
      setShowSave({});
      setIsEditing({});
    }
  }, [isError, response]);

  return (
    <div className="overflow-x-auto horizontal w-full">
      <table className="w-full table-auto mt-4">
        <thead className="bg-[#e5e7eb]">
          {headerGroups.map((headerGroup: any) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column: any) => {
                  const { key: colKey, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={colKey} className="pl-2 py-1 text-start text-nowrap border text-gray-500" {...restColumnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white">
          {rows.map((row: any) => {
            prepareRow(row);
            const { key: rowKey, ...restRowProps } = row.getRowProps();
            const rowId = row.original?.leadCaptureClientR2nId;

            return (
              <tr key={rowKey} className="text-[#757575] py-1" {...restRowProps}>
                {row.cells.map((cell: any) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();

                  return (
                    <td key={cellKey} className={`py-1 pl-2 border border-[#e5e7eb] ${(isModeType === "wpTable" && cell.column.Header !== "Message") ? "text-nowrap":""} `} {...restCellProps}>
                      {/* Name Field with Editing Logic */}
                      {cell.column.id === "name" && isModeType === "wpTable" ? (
                        <div
                          className={`flex items-center ${isEditing[rowId] ? "" : "text-green-600 cursor-pointer"}`}
                          onClick={() => !isEditing[rowId] && handleEditClick(rowId)}
                        >
                          {isEditing[rowId] ? (
                            <input
                              type="text"
                              value={editingNames[rowId]}
                              className="border-b border-gray-400 outline-none focus:border-blue-500 p-1 w-full"
                              onChange={(e) => handleInputChange(rowId, e.target.value)}
                            />
                          ) : (
                            <span>{cell.value}</span>
                          )}
                        </div>
                      ) : cell.column.id === "action" ? (
                        // Actions: Save & Cancel Buttons
                        <div className="flex gap-2">
                          {isEditing[rowId] && (
                            <>
                              <button className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={() => handleCancel(rowId)}>
                                Cancel
                              </button>
                              {showSave[rowId] && (
                                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleSave(rowId)}>
                                  Save
                                </button>
                              )}
                            </>
                          )}
                          {!isEditing[rowId] && cell.render("Cell")}
                        </div>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

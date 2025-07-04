import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  Column,
  TableOptions,
  TableState,
  TableInstance,
  UsePaginationOptions,
  UsePaginationState,
  UsePaginationInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGlobalFiltersInstanceProps,
} from "react-table";
import { RootState } from "../../store";
import {
  setFilterActions,
  setPaginationActions,
} from "../../store/ui/wp-table-slice";

interface BaseRow {
  leadCaptureClientR2nId: string | number;
  name: string;
}


// ---------- Custom Types ----------
type CustomTableOptions<T extends object> = TableOptions<T> &
  UsePaginationOptions<T> &
  UseGlobalFiltersOptions<T>;

type CustomTableState<T extends object> = TableState<T> &
  UsePaginationState<T> &
  UseGlobalFiltersState<T>;

type CustomTableInstance<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseGlobalFiltersInstanceProps<T>;

// ---------- Props ----------
interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[];
  isModeType?: string;
  onNameChange?: (id: string | number, newName: string) => void;
}

// ---------- Component ----------
export function CustomTableForOthers<T extends BaseRow>({
  columns,
  data = [],
  isModeType,
  onNameChange,
}: CustomDetailsTableProps<T>) {
  const dispatch = useDispatch();
  const { isError, response } = useSelector(
    (state: RootState) => state.updateNameWpLeadsData
  );

  const tableInstance = useTable<T>(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 50,
      } as Partial<CustomTableState<T>>, // ✅ Type-cast the state
    } as CustomTableOptions<T>,
    useGlobalFilter,
    usePagination
  ) as CustomTableInstance<T>;

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, pageSize, globalFilter } = state as CustomTableState<T>;

  const [editingNames, setEditingNames] = useState<Record<string | number, string>>({});
  const [showSave, setShowSave] = useState<Record<string | number, boolean>>({});
  const [isEditing, setIsEditing] = useState<Record<string | number, boolean>>({});

  const handleInputChange = (rowId: string | number, newValue: string) => {
    setEditingNames((prev) => ({ ...prev, [rowId]: newValue }));
    const originalValue = data.find((row: any) => row.leadCaptureClientR2nId === rowId)?.name || "";
    setShowSave((prev) => ({
      ...prev,
      [rowId]: newValue.trim() !== "" && newValue !== originalValue,
    }));
  };

  const handleEditClick = (rowId: string | number) => {
    setIsEditing((prev) => ({ ...prev, [rowId]: true }));
    setEditingNames((prev) => ({
      ...prev,
      [rowId]: data.find((row: any) => row.leadCaptureClientR2nId === rowId)?.name || "",
    }));
  };

  const handleSave = (rowId: string | number) => {
    if (onNameChange && editingNames[rowId] !== undefined) {
      onNameChange(rowId, editingNames[rowId]);
    }
  };

  const handleCancel = (rowId: string | number) => {
    setIsEditing((prev) => ({ ...prev, [rowId]: false }));
    setShowSave((prev) => ({ ...prev, [rowId]: false }));
  };

  useEffect(() => {
    if (!isError && response) {
      setShowSave({});
      setIsEditing({});
    }
  }, [isError, response]);

  useEffect(() => {
    dispatch(
      setFilterActions({
        globalFilter: globalFilter || "",
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, setGlobalFilter, dispatch]);

  useEffect(() => {
    dispatch(
      setPaginationActions({
        canPreviousPage,
        canNextPage,
        gotoPage,
        setPageSize,
        previousPage,
        nextPage,
        pageIndex,
        pageCount: Math.ceil(data.length / pageSize),
        dataLength: data.length,
        pageSize,
      })
    );
  }, [
    canPreviousPage,
    canNextPage,
    gotoPage,
    setPageSize,
    previousPage,
    nextPage,
    pageIndex,
    pageSize,
    data.length,
    dispatch,
  ]);

  return (
    <div className="w-full">
      <div className="overflow-x-auto horizontal w-full">
        <table className="w-full table-auto mt-2" {...getTableProps()}>
          <thead className="bg-[#e5e7eb]">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key: colKey, ...restColumnProps } = column.getHeaderProps();
                    return (
                      <th
                        key={colKey}
                        className="pl-2 py-1 text-start text-nowrap border text-gray-500"
                        {...restColumnProps}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row: any) => {
              prepareRow(row);
              const { key: rowKey, ...restRowProps } = row.getRowProps();
              const rowId = row.original?.leadCaptureClientR2nId;

              return (
                <tr key={rowKey} className="text-[#757575] py-1" {...restRowProps}>
                  {row.cells.map((cell: any) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={cellKey}
                        className={`pl-2 py-1 border text-sm border-[#e5e7eb] ${
                          isModeType === "wpTable" && cell.column.Header !== "Message" ? "text-nowrap" : ""
                        }`}
                        style={
                          cell.column.id === "message"
                            ? { maxWidth: "300px", whiteSpace: "pre-wrap", wordWrap: "break-word" }
                            : { maxWidth: "150px", whiteSpace: "pre-wrap", wordWrap: "break-word" }
                        }
                        {...restCellProps}
                      >
                        {cell.column.id === "name" && isModeType === "wpTable" ? (
                          <div
                            className={`flex items-center ${
                              isEditing[rowId] ? "" : "text-green-600 cursor-pointer"
                            }`}
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
                          <div className="flex gap-2">
                            {isEditing[rowId] && (
                              <>
                                <button
                                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                  onClick={() => handleCancel(rowId)}
                                >
                                  Cancel
                                </button>
                                {showSave[rowId] && (
                                  <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={() => handleSave(rowId)}
                                  >
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
    </div>
  );
}

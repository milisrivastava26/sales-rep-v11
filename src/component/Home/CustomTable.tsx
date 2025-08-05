import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getFilterProps } from "../../store/ui/table-slice";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  Column,
  TableInstance,
  TableState,
} from "react-table";

interface TableInstanceWithPlugins<T extends object> extends TableInstance<T> {
  setGlobalFilter: (filterValue: any) => void;
}

interface TableStateWithFilters<T extends object> extends TableState<T> {
  globalFilter: string;
}

interface CustomTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

export function CustomTable<T extends { lead_capture_id?: number }>({
  columns,
  data,
}: CustomTableProps<T>) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    setGlobalFilter,
  } = useTable<T>(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  ) as TableInstanceWithPlugins<T>;

  const { globalFilter } = state as TableStateWithFilters<T>;

  useEffect(() => {
    dispatch(
      getFilterProps({ globalFilter, setGlobalfilter: setGlobalFilter })
    );
  }, [globalFilter, dispatch]);

  const handleNavigation = (leadId?: number) => {
    if (leadId) {
      navigate(`/manage-leads-v1/details/${leadId}`, {
        state: { viaButton: true },
      });
    }
  };

  return (
    <div className="overflow-x-auto w-full scroll-show-hover">
      <table className="w-full table-auto mt-2">
        <thead className="border-y border-gray-300">
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key: colKey, ...restColumnProps } =
                    column.getHeaderProps();
                  return (
                    <th
                      key={colKey}
                      className="px-8 py-1 text-start text-nowrap text-sm text-gray-500"
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
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            // ✅ Check if any cell in the row contains "New Lead"
            const isHotRow = row.cells.some((cell) => cell.value === "Hot");
            const isWarmRow = row.cells.some((cell) => cell.value === "Warm");

            const { key: rowKey, ...restRowProps } = row.getRowProps();
            return (
              <tr
                key={rowKey}
                className={`text-gray-600 ${
                  isHotRow ? "bg-green-200" : isWarmRow ? "bg-green-100" : ""
                }`} // Apply green bg to the entire row
                {...restRowProps}
              >
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } =
                    cell.getCellProps();
                  return (
                    <td
                      key={cellKey}
                      className="py-1 px-8 border-y border-gray-300 text-nowrap text-sm"
                      {...restCellProps}
                      onClick={() =>
                        cell.column.Header === "Name" &&
                        handleNavigation(
                          (row.original as { lead_capture_id?: number })
                            .lead_capture_id
                        )
                      }
                      style={
                        cell.column.Header === "Name"
                          ? { cursor: "pointer", color: "blue" }
                          : {}
                      }
                    >
                      {isHotRow && cell.value==="Hot" ? (
                        <>{cell.render("Cell")} 🔥</>
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

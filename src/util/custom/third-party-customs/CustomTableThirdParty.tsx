import { useEffect } from "react";
import store, { RootState } from "../../../store";
import {
  getFilterProps,
  getPaginationProps,
} from "../../../store/ui/table-slice";
import {
  useTable,
  usePagination,
  useFilters,
  useGlobalFilter,
  Column,
  TableInstance,
  TableState,
  useRowSelect,
} from "react-table";
import { useSelector } from "react-redux";
import { getThirdpartySelectedLead } from "../../../store/ui/ui-slice";

interface TableInstanceWithPlugins<T extends object> extends TableInstance<T> {
  setGlobalFilter: (filterValue: any) => void;
  setPageSize: (pageSize: number) => void;
  page: Array<any>;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  selectedFlatRows: any;
  toggleAllRowsSelected: (value?: boolean) => void;
}

interface TableStateWithFiltersAndPagination<T extends object>
  extends TableState<T> {
  globalFilter: string;
  pageIndex: number;
  pageSize: number;
}
interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[] | any;
  btnText?: string;
  linkUrl?: string;
  isOperationModeType?: string;
  isCreateEnabled?: boolean;
  isUserCreateEnabled?: boolean;
  isUserEditEnable?: boolean;
  isCrateSamePage?: boolean;
  handleAddForm?: () => void;
  initialValues?: any;
  validationSchema?: any;
  inputData?: any;
  onAction?: any;
  onSaveAndAddHandler?: any;
  isUserMode?: boolean;
  propsForSearchSelectInputs?: any;
  isManagerModeForCreate?: boolean;
  isLoadingForCreate?: boolean;
}

export function CustomTableThirdParty<T extends object>({
  columns,
  data,
}: CustomDetailsTableProps<T>) {
  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    setPageSize,
    page,
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    selectedFlatRows,
    toggleAllRowsSelected,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 } as Partial<
        TableStateWithPagination<T>
      >,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      hooks.visibleColumns.push((columns: any) => [
        {
          id: "selection",
          // use getToggleAllPageRowsSelectedProps to only select rows on the current page
          Header: ({ getToggleAllPageRowsSelectedProps }: any) => {
            const { indeterminate, ...rest } =
              getToggleAllPageRowsSelectedProps();
            return (
              <input
                type="checkbox"
                ref={(el) => el && (el.indeterminate = indeterminate)}
                {...rest}
              />
            );
          },
          Cell: ({ row }: any) => {
            const { indeterminate, ...rest } = row.getToggleRowSelectedProps();
            return (
              <input
                type="checkbox"
                ref={(el) => el && (el.indeterminate = indeterminate)}
                {...rest}
              />
            );
          },
          className: "w-8",
        },
        ...columns,
      ]);
    }
  ) as TableInstanceWithPlugins<T>;

  const { globalFilter, pageIndex, pageSize } =
    state as TableStateWithFiltersAndPagination<T>;

  const dispatch = store.dispatch;
  const dataLength = data?.length;

  useEffect(() => {
    dispatch(
      getFilterProps({
        globalFilter,
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, dispatch]);

  useEffect(() => {
    dispatch(
      getPaginationProps({
        canPreviousPage,
        canNextPage,
        gotoPage,
        setPageSize,
        previousPage,
        nextPage,
        pageIndex,
        pageCount,
        dataLength,
        pageSize,
      })
    );
  }, [pageIndex, pageSize, dispatch]);

  const { isError, responseExportLead } = useSelector(
    (state: RootState) => state.exportLeadData
  );

  useEffect(() => {
    const selectedData = selectedFlatRows.map((row: any) => row.original);
    //  // console.log("selectedData= ", selectedData);
    dispatch(getThirdpartySelectedLead(selectedData));
  }, [selectedFlatRows]);

  // this useEffect is responsible for the toggling selected rows only after export is successfully working
  useEffect(() => {
    if (isError || responseExportLead) {
      if (responseExportLead.success) toggleAllRowsSelected(false);
    }
  }, [isError, responseExportLead, toggleAllRowsSelected]);

  return (
    <div className="overflow-x-auto horizontal w-full ">
      <table className="w-full table-auto mt-4">
        <thead className=" bg-[#e5e7eb] ">
          {headerGroups.map((headerGroup: any, i: number) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column: any, id: any) => (
                <th
                  className={`px-4 py-1 text-center text-nowrap border text-gray-500 }`}
                  {...column.getHeaderProps()}
                  key={id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white ">
          {page.map((row: any) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps(); // Destructure the key separately
            return (
              <tr className="text-[#757575] py-1" key={rowKey} {...rowProps}>
                {/* Pass the key explicitly */}
                {row.cells.map((cell: any) => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps(); // Destructure the key separately
                  return (
                    <td
                      key={cellKey}
                      className="py-1 px-4  border border-[#e5e7eb]  text-nowrap "
                      {...cellProps}
                    >
                      {cell.render("Cell")}
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

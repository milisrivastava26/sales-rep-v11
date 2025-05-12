import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store, { RootState } from "../../../store";
import { highlightText } from "../general/genral-action";
import { getLeadsForManageTask, getLeadsForOverdueTask, onGetAllCheckSelectedDataFormCustomTable } from "../../../store/ui/ui-slice";
import {
  getFilterProps,
  getPaginationProps,
  onGetOnlyDataLength,
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
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  prepareRow: any;
  state: any;
  selectedRowIds: any;
  selectedFlatRows: any;
  toggleAllRowsSelected: (value?: boolean) => void;
}

interface TableStateWithFiltersAndPagination<T extends object>
  extends TableState<T> {
  globalFilter: string;
  pageIndex: number;
  pageSize: number;
}

interface CustomDetailsTableProps<T extends object> {
  columns: Column<T>[];
  data?: T[] | any;
  isMode?: string;
  onRowClick?: (row: any) => void;
}

export function CustomDetailsTable<T extends object>({
  columns,
  data,
  onRowClick,
  isMode,
}: CustomDetailsTableProps<T>) {
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(data); // Local state for table data
  const [filteredDataLength, setFilteredDataLength] = useState(
    data?.length || 0
  );
  const { settingId } = useSelector((state: RootState) => state.ui);
  const { isError, responseExportLead } = useSelector(
    (state: RootState) => state.exportLeadData
  );

  // const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  // const [selectedRows, setSelectedRows] = useState<any[]>([]); // Store selected rows

  const [selectedRow, setSelectedRow] = useState({
    offerId: data[0]?.leadOfferId,
    leadStatus: data[0]?.status,
  });


  useEffect(() => {
    if (selectedRow && selectedRow !== undefined && onRowClick) {
      onRowClick(selectedRow);
    }
  }, [selectedRow]);
  const { paginatedProps } = useSelector((state: RootState) => state.ui);
  console.log("paginatedProps", paginatedProps)

  console.log("isMode", isMode)
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
    // state: { selectedRowIds: selectedRows },
  } = useTable<T>(
    {
      columns,
      data: currentData, // Use the local state for data
      initialState: { pageIndex: 0, pageSize: isMode === "manageLeads" ? paginatedProps.pageSize : 50 } as Partial<
        TableStateWithFiltersAndPagination<T>
      >,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect, // Enable row selection plugin
    (hooks: any) => {
      if (isMode === "manageLeads" || isMode === "advanceSearch" || isMode === "overdueTask" || isMode === "manageTask") {
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
              const { indeterminate, ...rest } =
                row.getToggleRowSelectedProps();
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
    }
  ) as TableInstanceWithPlugins<T>;

  const { globalFilter, pageIndex, pageSize } =
    state as TableStateWithFiltersAndPagination<T>;

  console.log("pageSize", pageSize)


  // Sync current data with the passed data prop
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  // const dataLength = currentData?.length;

  useEffect(() => {
    dispatch(
      getFilterProps({
        globalFilter,
        setGlobalfilter: setGlobalFilter,
      })
    );
  }, [globalFilter, dispatch]);

  useEffect(() => {
    if (globalFilter) {
      setFilteredDataLength(page.length || 0);
    } else {
      setFilteredDataLength(data?.length || 0);
    }
  }, [globalFilter, page, data]);

  useEffect(() => {
    dispatch(onGetOnlyDataLength(filteredDataLength));
  }, [filteredDataLength]);

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
        dataLength: filteredDataLength, // Update pagination when data length changes
        pageSize,
      })
    );
  }, [pageIndex, pageSize, filteredDataLength, dispatch]); // Include currentData as a dependency

  // const handleDownload = (docName: string, leadCaptureId: number, docTypeId: number | undefined) => {
  //   dispatch(downloadDocForNotes({ leadCaptureId, docName, docTypeId }));
  // };
  const handleNavigation = (leadId: number) => {
    // const path = userDetails?.authority?.includes("ROLE_AUTHORITY") ? `/view-decline-cases/manage-contract/${leadId}` : `/manage-leads/details/${leadId}`;
    const path = `/manage-leads-v1/details/${leadId}`;
    navigate(path, { state: { viaButton: true } });
  };

  // this is using to capture all leads data on clicking the checkbox
  useEffect(() => {
    const selectedData = selectedFlatRows.map((row: any) => row.original);
    if (isMode === "overdueTask") {
      dispatch(getLeadsForOverdueTask(selectedData));
    } else if (isMode === "manageTask") {
      dispatch(getLeadsForManageTask(selectedData));
    }
    else {
      dispatch(onGetAllCheckSelectedDataFormCustomTable(selectedData));
    }
  }, [selectedFlatRows]);

  // this useEffect is resppnsible for the toggling selected rows only after export is successfully working
  useEffect(() => {
    if (isError || responseExportLead) {
      if (responseExportLead.success) toggleAllRowsSelected(false);
    }
  }, [isError, responseExportLead, toggleAllRowsSelected]);

  return (
    <>
      <table className="w-full bg-white">
        <thead>
          {headerGroups.map((headerGroup: any, i: number) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={i}
              className="__fliter_gradient"
            >
              {headerGroup.headers.map((column: any, id: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={id}
                  className={`border p-2 text-left text-black text-sm text-nowrap ${column.render("Header") === "Action"
                    ? " w-[150px] min-w-[150px] max-w-[130px]"
                    : " "
                    }`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
            const leadId =
              row.original.leadCaptureId || row.original.lead_capture_id;
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={i}
                className={`relative group  ${i % 2 === 0 ? "  hover:bg-gray-200" : "hover:bg-gray-100"
                  }`}
              >
                {row.cells.map((cell: any, id: any) => {
                  const cellValue = cell.value;
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={id}
                      onClick={() => {
                        if (onRowClick) {
                          setSelectedRow((prev) => {
                            return {
                              ...prev,
                              offerId: row.original.leadOfferId,
                              leadStatus: row.original.status,
                            };
                          });
                        }
                      }} // Handle row click
                      className={`${leadId === settingId && i % 2 === 0 ? "bg-gray-200" : ""
                        }  
              ${leadId === settingId && i % 2 !== 0 ? "bg-gray-100" : ""}  
              ${leadId === settingId ? "border border-gray-300 " : "border "}  
            ${isMode !== "viewDecline" &&
                          isMode !== "advanceSearch" &&
                          isMode !== "testApi" &&
                          isMode !== "importedLead" &&
                          isMode !== "newLeadFilter" &&
                          isMode !== "followUp" &&
                          isMode !== "manageLeads" &&
                          isMode !== "documents" &&
                          isMode !== "cashPayment" &&
                          isMode !== "inboundCalls" &&
                          isMode !== "payment_success" &&
                          isMode !== "payment_failed" &&
                          isMode !== "overdueTask" &&
                          isMode !== "manageTask" &&
                          row.original.leadOfferId === selectedRow.offerId
                          ? "bg-blue-100 cursor-pointer"
                          : "cursor-pointer"
                        }
 p-2 text-left text-sm text-nowrap`}
                    >
                      {
                        // cell.column.Header === "Created By" ? (
                        //   <div className="flex items-center justify-between">
                        //     {/* Render the cell content with text highlighting */}
                        //     <span>{typeof cellValue === "string" ? highlightText(cellValue, globalFilter || "") : cell.render("Cell")}</span>
                        //     {/* Render icons */}
                        //     <div className="flex items-center gap-1 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity text-lg cursor-pointer">
                        //       <MdFileDownload onClick={() => handleDownload(row.original.name, row.original.leadCaptureId, row.original.coreDocAttachmentTypeId)} />
                        //       <MdDelete />
                        //     </div>FFFFFFFFFFFFFFF
                        //   </div>
                        // ) :

                        cell.column.Header === "Recording" ? (
                          // <a
                          //   href={cellValue}
                          //   target="_blank"
                          //   className="text-[14px] hover:underline cursor-pointer"
                          // >
                          //   {highlightText(cellValue, globalFilter || "")}
                          // </a>
                          <div className="flex items-center ">
                            <audio controls className="w-52 h-8">
                              <source src={cellValue} type="audio/wav" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        ) : cell.column.Header === "Name" || cell.column.Header === "Lead ID" ? (
                          <span
                            onClick={() => handleNavigation(leadId)}
                            className="text-blue-500 text-[14px] font-semibold hover:underline cursor-pointer"
                          >
                            {highlightText(cellValue, globalFilter || "")}
                          </span>
                        ) : /* Render cell content normally for other columns */
                          typeof cellValue === "string" ? (
                            highlightText(cellValue, globalFilter || "")
                          ) : (
                            cell.render("Cell")
                          )
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

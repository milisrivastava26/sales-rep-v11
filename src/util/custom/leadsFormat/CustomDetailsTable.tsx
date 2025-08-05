import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store, { RootState } from "../../../store";
import { highlightText } from "../general/genral-action";
import { deleteRazorPayPaymentId, getLeadsForManageTask, getLeadsForOverdueTask, onGetAllCheckSelectedDataFormCustomTable, openFailedCaseModalModal, openPaymentInfoModal, setRazorPayPaymentId } from "../../../store/ui/ui-slice";
import { getFilterProps, getPaginationProps, onGetOnlyDataLength } from "../../../store/ui/table-slice";
import { useTable, usePagination, useFilters, useGlobalFilter, Column, TableInstance, TableState, useRowSelect } from "react-table";
import { getLeadPaymentDetailsByOrderId, resetLeadPaymentDetails } from "../../../store/paymentInfo/get-leadPaymentDetails-byOrderId-slice";
import { getCrmLeadPaymentDetailsByOrderId, resetCrmLeadPaymentDetails } from "../../../store/paymentInfo/get-crmLeadPaymentDetails-slice";
import { getLeadFailedPaymentDetailsByPaymentId, resetFailedPaymentDetails } from "../../../store/paymentInfo/get-leadFailedPaymentDetails-slice";

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

interface TableStateWithFiltersAndPagination<T extends object> extends TableState<T> {
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

export function CustomDetailsTable<T extends object>({ columns, data, onRowClick, isMode }: CustomDetailsTableProps<T>) {
  const dispatch = store.dispatch;
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState(data); // Local state for table data
  const [filteredDataLength, setFilteredDataLength] = useState(data?.length || 0);
  const { settingId } = useSelector((state: RootState) => state.ui);
  const { isError, responseExportLead } = useSelector((state: RootState) => state.exportLeadData);

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
  const { paginatedProps, paymentDetailsPageSize } = useSelector((state: RootState) => state.ui);

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
      initialState: { pageIndex: 0, pageSize: isMode === "manageLeads" ? paginatedProps.pageSize : isMode === "paymentDetails" ? paymentDetailsPageSize : 50 } as Partial<
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
              const { indeterminate, ...rest } = getToggleAllPageRowsSelectedProps();
              return <input type="checkbox" ref={(el) => el && (el.indeterminate = indeterminate)} {...rest} />;
            },
            Cell: ({ row }: any) => {
              const { indeterminate, ...rest } = row.getToggleRowSelectedProps();
              return <input type="checkbox" ref={(el) => el && (el.indeterminate = indeterminate)} {...rest} />;
            },
            className: "w-8",
          },
          ...columns,
        ]);
      }
    }
  ) as TableInstanceWithPlugins<T>;

  const { globalFilter, pageIndex, pageSize } = state as TableStateWithFiltersAndPagination<T>;


  useEffect(() => {
    if (JSON.stringify(currentData) !== JSON.stringify(data)) {
      setCurrentData(data);
    }
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
    } else {
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
            <tr {...headerGroup.getHeaderGroupProps()} key={i} className="__fliter_gradient">
              {headerGroup.headers.map((column: any, id: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={id}
                  className={`border p-2 text-left text-black text-sm text-nowrap ${column.render("Header") === "Action" ? " w-[150px] min-w-[150px] max-w-[130px]" : " "
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
            const leadId = row.original.leadCaptureId || row.original.lead_capture_id;
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i} className={`relative group  ${i % 2 === 0 ? "  hover:bg-gray-200" : "hover:bg-gray-100"}`}>
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
                      className={`${leadId === settingId && i % 2 === 0 ? "bg-gray-200" : ""}  
              ${leadId === settingId && i % 2 !== 0 ? "bg-gray-100" : ""}  
              ${leadId === settingId ? "border border-gray-300 " : "border "}  
            ${isMode === "offerAnalysis" &&
                          row.original.leadOfferId === selectedRow.offerId
                          ? "bg-blue-100 cursor-pointer"
                          : "cursor-pointer"
                        }
 p-2 text-left text-sm text-nowrap`}
                    >
                      {

                        cell.column.Header === "Recording" ? (
                          <div className="flex items-center ">
                            <audio controls className="w-52 h-8">
                              <source src={cellValue} type="audio/wav" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        ) : cell.column.Header === "Status" && isMode === "paymentDetails" ? (
                          <p className={`px-2 rounded-full w-20 flex justify-center font-medium py-1 text-white text-sm ${row.original.status === "captured"
                            ? "bg-green-600"
                            : row.original.status === "failed"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                            }`}>{cell.render("Cell")}</p>
                        ) : cell.column.Header === "Amount" && isMode === "paymentDetails" ? (
                          <p className="flex justify-end">{cell.render("Cell")}</p>
                        ) : cell.column.Header === "Order ID" && isMode === "paymentDetails" ? (
                          <p className={`${row.original.status === "captured" ? "text-blue-600 font-medium underline underline-offset-2" : ""}`} onClick={() => {
                            if (row.original.status === "captured") {
                              store.dispatch(deleteRazorPayPaymentId());
                              store.dispatch(resetCrmLeadPaymentDetails());
                              store.dispatch(resetLeadPaymentDetails());
                              store.dispatch(openPaymentInfoModal());
                              store.dispatch(setRazorPayPaymentId(row.original.id))
                              store.dispatch(getCrmLeadPaymentDetailsByOrderId(row.original.orderId))
                              store.dispatch(getLeadPaymentDetailsByOrderId(row.original.orderId))
                            }

                          }}>{cell.render("Cell")}</p>
                        ) : cell.column.Header === "Payment ID" && isMode === "paymentDetails" ? (
                          <p className={`${row.original.status === "failed" ? "text-blue-600 font-medium underline underline-offset-2" : ""}`} onClick={() => {
                            if (row.original.status === "failed") {
                              store.dispatch(resetFailedPaymentDetails());
                              store.dispatch(getLeadFailedPaymentDetailsByPaymentId(row.original.id));
                              store.dispatch(openFailedCaseModalModal());
                            }
                          }}>{cell.render("Cell")} </p>
                        )
                          : cell.column.Header === "Name" || cell.column.Header === "Lead ID" ? (
                            <span
                              onClick={() => handleNavigation(leadId)}
                              className="text-blue-500 text-[14px] font-semibold hover:underline cursor-pointer"
                            >
                              {highlightText(cellValue, globalFilter || "")}
                            </span>
                          ) :
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

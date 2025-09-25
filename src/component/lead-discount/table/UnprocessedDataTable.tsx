import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import { getDiscountAudits } from "../../../store/lead-discount/getDiscountAuditsSlice";
import TableHead from "./heads/TableHead";
import { getDiscountAuditsColumnsWithCheckbox } from "./heads/getDiscountAuditsColumnsWithCheckbox";

interface SelectedRowPayload {
  employeeId: number;
  amount: number;
  transactionType: string;
  captureId: string;
}

interface Props {
  onSelectionChange: (rows: SelectedRowPayload[]) => void;
}

const UnprocessedDataTable: React.FC<Props> = ({ onSelectionChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { responseOfGetDiscountAudits, isLoading, isError } = useSelector((state: RootState) => state.getDiscountAudits);

  const [selectedRowIds, setSelectedRowIds] = useState<{ [key: number]: boolean }>({});
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  // Filtered Data (search)
  const filteredData = useMemo(() => {
    if (!searchText) return responseOfGetDiscountAudits || [];
    return responseOfGetDiscountAudits?.filter((item) => Object.values(item).join(" ").toLowerCase().includes(searchText.toLowerCase())) || [];
  }, [searchText, responseOfGetDiscountAudits]);

  //  Paginated Data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  //  Row select/unselect
  const toggleRow = (id: number) => {
    setSelectedRowIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      const selectedRows = Object.keys(updated)
        .filter((k) => updated[+k])
        .map((key) => {
          const row = responseOfGetDiscountAudits?.find((item) => item.leadCaptureId === +key);
          return row
            ? {
                employeeId: row.psEmployeeId,
                amount: row.totalDiscount,
                transactionType: "Discount",
                captureId: row.leadCaptureId.toString(),
              }
            : null;
        })
        .filter((r): r is SelectedRowPayload => r !== null);

      onSelectionChange(selectedRows);
      return updated;
    });
  };

  //  Select/unselect all rows (on current page)
  const toggleAll = (checked: boolean) => {
    let updated: { [key: number]: boolean } = { ...selectedRowIds };
    let selectedRows: SelectedRowPayload[] = [];

    if (checked) {
      paginatedData.forEach((row) => {
        updated[row.leadCaptureId] = true;
        selectedRows.push({
          employeeId: row.psEmployeeId,
          amount: row.totalDiscount,
          transactionType: "Discount",
          captureId: row.leadCaptureId.toString(),
        });
      });
    } else {
      paginatedData.forEach((row) => {
        delete updated[row.leadCaptureId];
      });
    }

    setSelectedRowIds(updated);

    // Collect all selected rows across all pages
    const finalSelection =
      responseOfGetDiscountAudits
        ?.filter((row) => updated[row.leadCaptureId])
        .map((row) => ({
          employeeId: row.psEmployeeId,
          amount: row.totalDiscount,
          transactionType: "Discount",
          captureId: row.leadCaptureId.toString(),
        })) || [];

    onSelectionChange(finalSelection);
  };

  //API call
  useEffect(() => {
    dispatch(getDiscountAudits());
  }, [dispatch]);

  // Columns with checkbox support
  const columns = getDiscountAuditsColumnsWithCheckbox(selectedRowIds, toggleRow, toggleAll);

  return (
    <div className="w-full __fliter_gradient overflow-x-scroll">
      {isLoading ? (
        <LoadingSpinner centered={false} size={20} message="Loading Discount Audits..." mainLoading={true} />
      ) : isError ? (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo={isError} icon={emptyDataIcon} />
        </div>
      ) : responseOfGetDiscountAudits && responseOfGetDiscountAudits.length > 0 ? (
        <div>
          {/*Table Head with search & pagination */}
          <div className="bg-white">
            <TableHead
              searchText={searchText}
              setSearchText={setSearchText}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={filteredData.length}
             
              pageSize={pageSize}
            />
          </div>

          {/* Table gets only filtered + paginated data */}
          <CustomDetailsTable columns={columns} data={paginatedData} isMode="discountAudits" />
        </div>
      ) : (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo="No Discount Audits Found" icon={emptyDataIcon} />
        </div>
      )}
    </div>
  );
};

export default UnprocessedDataTable;

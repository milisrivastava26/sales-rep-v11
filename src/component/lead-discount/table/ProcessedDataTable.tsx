import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import { getDiscountAuditsColumns } from "./heads/getDiscountAuditsColumns";
import TableHead from "./heads/TableHead";
import { getProcessedDiscountAudits } from "../../../store/lead-discount/getProcessedDiscountAuditsSlice";

const ProcessedDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const column = getDiscountAuditsColumns();
  const { responseOfGetProcessedDiscountAudits, isLoading, isError } = useSelector((state: RootState) => state.getProcessedDiscountAudits);

  // State for search & pagination
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  useEffect(() => {
    dispatch(getProcessedDiscountAudits());
  }, [dispatch]);

  // Filtered Data (search)
  const filteredData = useMemo(() => {
    if (!searchText) return responseOfGetProcessedDiscountAudits || [];
    return responseOfGetProcessedDiscountAudits?.filter((item) => Object.values(item).join(" ").toLowerCase().includes(searchText.toLowerCase())) || [];
  }, [searchText, responseOfGetProcessedDiscountAudits]);

  // Paginated Data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  return (
    <div className="w-full __fliter_gradient overflow-x-scroll">
      {isLoading ? (
        <LoadingSpinner centered={false} size={20} message="Loading Discount Audits..." mainLoading={true} />
      ) : isError ? (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo={isError} icon={emptyDataIcon} />
        </div>
      ) : responseOfGetProcessedDiscountAudits && responseOfGetProcessedDiscountAudits.length > 0 ? (
        <div>
          {/*Pass control props to TableHead */}
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

          {/*Table gets only filtered + paginated data */}
          <CustomDetailsTable columns={column} data={paginatedData} isMode="discountAudits" />
        </div>
      ) : (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo="No Discount Audits Found" icon={emptyDataIcon} />
        </div>
      )}
    </div>
  );
};

export default ProcessedDataTable;

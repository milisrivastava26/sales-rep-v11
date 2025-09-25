import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import { getDiscountAuditsColumns } from "./heads/getDiscountAuditsColumns";
import { getProcessedDiscountAudits } from "../../../store/lead-discount/getProcessedDiscountAuditsSlice";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";

const ProcessedDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const column = getDiscountAuditsColumns();
  const { responseOfGetProcessedDiscountAudits, isLoading, isError } = useSelector((state: RootState) => state.getProcessedDiscountAudits);
  useEffect(() => {
    dispatch(getProcessedDiscountAudits());
  }, [dispatch]);

 
  return (
    <div className="w-full overflow-x-scroll">
      {isLoading ? (
        <LoadingSpinner centered={false} size={20} message="Loading Discount Audits..." mainLoading={true} />
      ) : isError ? (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo={isError} icon={emptyDataIcon} />
        </div>
      ) : responseOfGetProcessedDiscountAudits && responseOfGetProcessedDiscountAudits.length > 0 ? (
        <div>
          {/*Pass control props to TableHead */}
          <div className="bg-white flex gap-10 justify-between items-center mb-5">
            <Search />
            <Pagination />
          </div>

          {/*Table gets only filtered + paginated data */}
          <CustomDetailsTable columns={column} data={responseOfGetProcessedDiscountAudits} isMode="processedDiscountAudit" />
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

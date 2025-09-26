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
import LeadDiscountFilter from "../LeadDiscountFilter";
import SectionHead from "./heads/SectionHead";

const ProcessedDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const column = getDiscountAuditsColumns();

  const { responseOfGetProcessedDiscountAudits, isLoading, isError } = useSelector((state: RootState) => state.getProcessedDiscountAudits);

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const roles = userDetails?.authority || [];
  const allowedRoles = ["ROLE_DISCOUNT", "ROLE_ADMIN"];

  const isEdit = allowedRoles.some((role) => roles.includes(role));

  useEffect(() => {
    dispatch(getProcessedDiscountAudits());
  }, [dispatch]);

  return (
    <div className="w-full overflow-x-scroll">
      {isEdit && <SectionHead isMode="processed" />}

      {/* Top controls always mounted */}
      <div className="bg-white flex gap-10 justify-between items-center mb-5">
        <Search />
        <Pagination />
      </div>

      {/* Filter always mounted */}
      <LeadDiscountFilter isMode="processed" />

      {/* Loader overlay */}
      {isLoading && <LoadingSpinner centered={false} size={20} message="Loading Discount Audits..." mainLoading={true} />}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo={isError} icon={emptyDataIcon} />
        </div>
      )}

      {/* Success with data */}
      {!isLoading && !isError && responseOfGetProcessedDiscountAudits && responseOfGetProcessedDiscountAudits.length > 0 && (
        <CustomDetailsTable columns={column} data={responseOfGetProcessedDiscountAudits} isMode={isEdit ? "processedDiscountAudit" : "processedDiscountAuditView"} />
      )}

      {/* No data */}
      {!isLoading && !isError && (!responseOfGetProcessedDiscountAudits || responseOfGetProcessedDiscountAudits.length === 0) && (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo="No Discount Audits Found" icon={emptyDataIcon} />
        </div>
      )}
    </div>
  );
};

export default ProcessedDataTable;

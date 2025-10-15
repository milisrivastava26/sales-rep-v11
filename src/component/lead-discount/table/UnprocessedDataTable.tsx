import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import { getDiscountAudits } from "../../../store/lead-discount/getDiscountAuditsSlice";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import SectionHead from "./heads/SectionHead";
import { getDiscountAuditsColumns } from "./heads/getDiscountAuditsColumns";

const UnprocessedDataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { responseOfGetDiscountAudits, isLoading, isError } = useSelector((state: RootState) => state.getDiscountAudits);

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const roles = userDetails?.authority || [];
  const allowedRoles = ["ROLE_DISCOUNT", "ROLE_ADMIN"];

  const isEdit = allowedRoles.some((role) => roles.includes(role));
  const column = getDiscountAuditsColumns();

  // API call
  useEffect(() => {
    dispatch(getDiscountAudits());
  }, [dispatch]);

  return (
    <div className="w-full">
      {isEdit && <SectionHead isMode="unprocessed" />}

      {/* Top controls always mounted */}
      <div className="flex items-center gap-10 justify-between mb-5">
        <Search />
        <Pagination />
      </div>

      {/* Filter always mounted */}
      {/* <div className="flex justify-between items-center pb-4">
        <LeadDiscountFilter isMode="unprocessed" />
      </div> */}

      {/* Loader overlay */}
      {isLoading && <LoadingSpinner centered={false} size={20} message="Loading Discount Audits..." mainLoading={true} />}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo={isError} icon={emptyDataIcon} />
        </div>
      )}

      {/* Success with data */}
      {!isLoading && !isError && responseOfGetDiscountAudits && responseOfGetDiscountAudits.length > 0 && (
        <div className="overflow-x-scroll">
          <CustomDetailsTable columns={column} data={responseOfGetDiscountAudits} isMode={isEdit ? "discountAudits" : "documentAuditView"} />
        </div>
      )}

      {/* No data */}
      {!isLoading && !isError && (!responseOfGetDiscountAudits || responseOfGetDiscountAudits.length === 0) && (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo="No Discount Audits Found" icon={emptyDataIcon} />
        </div>
      )}
    </div>
  );
};

export default UnprocessedDataTable;

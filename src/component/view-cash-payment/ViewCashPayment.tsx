import React from "react";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { ViewLeadCashPaymentColumn } from "./ViewCashPaymentColumn";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import Pagination from "../../util/custom/customSearchPagination/Pagination";
import Search from "../../util/custom/customSearchPagination/Search";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";

const ViewCashPayment: React.FC = () => {
  const { isLoading, responseLeadForCashPayment } = useSelector((state: RootState) => state.getLeadForCashPayments);
  return (
    <div className="mt-10 px-5">
      {isLoading && <LoadingSpinner centered={true} mainLoading={true} message="Loading Lead Data" size={25} />}
      {!isLoading && (
        <>
          <div className="flex justify-between gap-10 items-center py-2">
            <Search />
            <Pagination />
          </div>
          <CustomDetailsTable columns={ViewLeadCashPaymentColumn} data={responseLeadForCashPayment} isMode="cashPayment" />
        </>
      )}
      {responseLeadForCashPayment.length === 0 && <Fallback errorInfo="No Leads found for cash payment !!" icon={emptyDataIcon} />}
    </div>
  );
};

export default ViewCashPayment;

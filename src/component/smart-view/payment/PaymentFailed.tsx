import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { PaymentSuccessColumn } from "../column/PaymentSuccessColumn";
import Search from "../../../util/custom/customSearchPagination/Search";
import CustomTabHeader from "../../../util/custom/smartView/CustomTabHeader";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { getLeadPaymentDetailsForFinance } from "../../../store/smart-view/get-leadPaymentDetailsForFinance-slice";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";

const PaymentFailed: React.FC = () => {
  const dispatch = store.dispatch;
  const { isLoading, leadPaymentDetailsResponse } = useSelector((state: RootState) => state.getLeadPaymentDetailsDataForFinance);
  useEffect(() => {
    dispatch(getLeadPaymentDetailsForFinance("created"));
  }, [dispatch]);
  return (
    <>
      <CustomTabHeader heading="Payment Failed" isMode="payment_failed" />

      {leadPaymentDetailsResponse.length !== 0 && !isLoading && <div className="flex justify-between items-center gap-10 mt-3">
        <Search />
        <Pagination />
      </div>}

      {/* ================================Table Part============================= */}
      <div className="w-full overflow-x-auto my-5">
        {isLoading && <LoadingSpinner centered={false} mainLoading={false} message="Loading payment failed" size={20} />}
        {!isLoading && leadPaymentDetailsResponse.length === 0 &&  <Fallback isCenter={true} errorInfo="Data not found" icon={emptyDataIcon}/>}
        {leadPaymentDetailsResponse.length !== 0 && !isLoading && (
          <CustomDetailsTable columns={PaymentSuccessColumn} data={leadPaymentDetailsResponse} isMode="payment_failed" />
        )}
      </div>
    </>
  );
};

export default PaymentFailed;

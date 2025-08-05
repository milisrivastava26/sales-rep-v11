import React, { useEffect } from "react";
import store, { RootState } from "../../store";
import { getLeadForCashPaymentValues } from "../../store/view-cash-payments/get-leadForCashPayment-slice";
import { useSelector } from "react-redux";
import ViewCashPayment from "../../component/view-cash-payment/ViewCashPayment";

const ViewCashPaymentPage: React.FC = () => {
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { isRun } = useSelector((state: RootState) => state.submitCashPayments);

  useEffect(() => {
    store.dispatch(getLeadForCashPaymentValues());
  }, [userDetails, isRun]);

  return (
    <>
      <ViewCashPayment />
    </>
  );
};

export default ViewCashPaymentPage;

import React, { useEffect } from "react";
import store, { RootState } from "../../store";
import { onDisableRecieveModal, onOpenRecieveModal } from "../../store/ui/ui-slice";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { submitCashPaymentValues } from "../../store/view-cash-payments/submit-cash-payment-slice";

interface cashActionOptionType {
  razonPayId: any;
}

const CashActionOption: React.FC<cashActionOptionType> = ({ razonPayId }) => {
  const { selectedRazorPayId } = useSelector((state: RootState) => state.ui);
  const { isError, responseSubmitCashPayment, isLoading: isLoadingForSubmitCashPayment } = useSelector((state: RootState) => state.submitCashPayments);
  const handlePaymentRecieve = () => {
    store.dispatch(submitCashPaymentValues(razonPayId));
  };
  const handleCancel = () => {
    store.dispatch(onDisableRecieveModal());
  };

  useEffect(() => {
    if (!isError && Object.keys(responseSubmitCashPayment).length !== 0) {
      store.dispatch(onDisableRecieveModal());
    }
  }, [responseSubmitCashPayment, isError]);
  return (
    <>
      <div>
        <button type="button" className="text-white bg-green-600 px-2 py-1 font-medium rounded" onClick={() => store.dispatch(onOpenRecieveModal(razonPayId))}>
          Receive
        </button>
      </div>
      {selectedRazorPayId === razonPayId && (
        <Modal
          title="Payment Confirmation"
          open={selectedRazorPayId === razonPayId}
          onOk={handlePaymentRecieve}
          onCancel={handleCancel}
          okButtonProps={{ disabled: isLoadingForSubmitCashPayment }}
          centered
        >
          <p className="pb-5">Are you sure you want to confirm this payment transaction?</p>
        </Modal>
      )}
    </>
  );
};

export default CashActionOption;

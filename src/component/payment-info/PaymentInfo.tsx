import React from 'react'
import { CustomDetailsTable } from '../../util/custom/leadsFormat/CustomDetailsTable'
import { PaymentInfoColumn } from './PaymentInfoColumn'
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import LoadingSpinner from '../../util/custom/ui/LoadingSpinner';
import Fallback from '../../util/custom/ui/Fallback';
import { emptyDataIcon } from '../../data/savgIcons';
import { Modal } from 'antd';
import ViewPaymentDetails from './ViewPaymentDetails';
import { closeFailedCaseModalModal, closePaymentInfoModal } from '../../store/ui/ui-slice';
import ViewFailedPaymentDetails from './ViewFailedPaymentDetails';

const PaymentInfo: React.FC = () => {
  const { paymentInfoList, isLoading } = useSelector((state: RootState) => state.getPaymentInfo);
  const { paymentInfoModal, failedCaseModal } = useSelector((state: RootState) => state.ui);

  const closeModal = () => {
    store.dispatch(closePaymentInfoModal());
  }
  const closeModalForFailedcases = () => {
    store.dispatch(closeFailedCaseModalModal());
  }
  return (
    <>
      <div className='mt-5 overflow-x-auto'>
        <CustomDetailsTable columns={PaymentInfoColumn} data={paymentInfoList} isMode='paymentDetails' />
        {isLoading && <div className='mt-32'>
          <LoadingSpinner
            centered={false}
            size={20}
            message="Loading Payments..."
            mainLoading={true}
          />
        </div>}
        {(paymentInfoList.length == 0 && !isLoading) && <Fallback
          isCenter={true}
          errorInfo="No Payments Found!"
          icon={emptyDataIcon}
        />}
      </div>
      <Modal
        title="Reconciliation"
        open={paymentInfoModal}
        onCancel={closeModal}
        footer={null}
        centered
        width={1080} 
      >
        <ViewPaymentDetails />
      </Modal>
      <Modal
        title="Payment Failed Details"
        open={failedCaseModal}
        onCancel={closeModalForFailedcases}
        footer={null}
        centered 
        width={680}
      >
        <ViewFailedPaymentDetails />
      </Modal>
    </>
  )
}

export default PaymentInfo
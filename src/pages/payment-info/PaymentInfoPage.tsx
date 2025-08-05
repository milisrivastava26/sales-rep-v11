import React, { useEffect, useState } from 'react'
import PaymentInfo from '../../component/payment-info/PaymentInfo'
import store, { RootState } from '../../store';
import { getPaymentInfo, resetPaymentInfo } from '../../store/paymentInfo/get-paymentInfo-slice';
import PaymentPagination from '../../component/payment-info/PaymentPagination';
import { getCurrentDateFormatted, pageSize } from '../../data/payment-info-data';
import Search from '../../util/custom/customSearchPagination/Search';
import PaymentFilter from '../../component/payment-info/PaymentFilter';
import { useSelector } from 'react-redux';
import { resetUpdateReconcilePaymentStatusResponse } from '../../store/paymentInfo/reconcile-payment-slice';
import { closePaymentInfoModal } from '../../store/ui/ui-slice';

const PaymentInfoPage: React.FC = () => {

    const [payload, setPayload] = useState({
        toDate: getCurrentDateFormatted(),
        fromDate: getCurrentDateFormatted(),
        skip: 0,
        count: pageSize[pageSize.length - 1],
    });

    const [isRefreshed, setIsRefreshed] = useState(false);
    const {isRun, updateReconcilePaymentStatusResponse} = useSelector((state:RootState) => state.reconcilePayment);

    useEffect(() => {
        if (isRefreshed) {
            setPayload({
                toDate: getCurrentDateFormatted(),
                fromDate: getCurrentDateFormatted(),
                skip: 0,
                count: pageSize[pageSize.length - 1],
            })
        }
    }, [isRefreshed])

    useEffect(() => {
        if(updateReconcilePaymentStatusResponse !=="") {
            store.dispatch(resetUpdateReconcilePaymentStatusResponse());
            store.dispatch(closePaymentInfoModal());
        }
    }, [updateReconcilePaymentStatusResponse])

    useEffect(() => {
        setIsRefreshed(false)
        store.dispatch(resetPaymentInfo());
        store.dispatch(getPaymentInfo(payload));
    }, [payload, isRun])


    return (
        <div className='mx-6 my-4 p-4 bg-white rounded-lg shadow-lg h-screen'>
            <h3 className="text-base sm:text-[22px] font-medium mb-3">Payment Details</h3>
            <hr />
            <div className='flex items-center gap-10 mt-6'>
                <Search />
                <PaymentPagination setPayload={setPayload} payload={payload} />
            </div>
            <PaymentFilter setPayload={setPayload} payload={payload} setIsRefreshed={setIsRefreshed} />
            <PaymentInfo />
        </div>
    )
}

export default PaymentInfoPage
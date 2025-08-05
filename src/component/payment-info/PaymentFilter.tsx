import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { formatIndianNumber } from '../../data/payment-info-data';
import { LuRefreshCcw } from "react-icons/lu";

interface FilterProps {
    payload: any;
    setPayload: (e: any) => void;
    setIsRefreshed: (e: any) => void;
}

const PaymentFilter: React.FC<FilterProps> = ({ payload, setPayload, setIsRefreshed }) => {
    const [fromDate, setFromDate] = useState(payload.fromDate);
    const [toDate, setToDate] = useState(payload.toDate);
    const [error, setError] = useState('');
    const [totalCapturedPayment, settotalCapturedPayment] = useState(0);
    const [totalFailedPayment, setTotalFailedPayment] = useState(0);
    const [totalCapturedAmount, settotalCapturedAmount] = useState(0);
    const { paymentInfoList } = useSelector((state: RootState) => state.getPaymentInfo);
    
    useEffect(() => {
        setFromDate(payload.fromDate);
        setToDate(payload.toDate);
    }, [payload.fromDate, payload.toDate]);


    useEffect(() => {
        const createdPayments = paymentInfoList.filter((item: any) => item.status === "captured");
        settotalCapturedPayment(createdPayments.length);
        setTotalFailedPayment(paymentInfoList.filter((item: any) => item.status === "failed").length);
        const createdAmountTotal = createdPayments.reduce(
            (acc: number, payment: any) => acc + payment.amount,
            0
        );
        settotalCapturedAmount(createdAmountTotal)
    }, [paymentInfoList])

    // Validate dates on change
    useEffect(() => {
        if (fromDate && toDate) {
            if (new Date(toDate) < new Date(fromDate)) {
                setError('To Date cannot be earlier than From Date.');
            } else {
                setError('');
            }
        } else {
            setError('');
        }
    }, [fromDate, toDate]);

    const handleSearch = () => {
        setPayload((prev: any) => ({
            ...prev,
            skip: 0,
            fromDate,
            toDate,
        }));
    };

    const handleRefresh = () => {
        setIsRefreshed(true);
    }


    return (
        <div className="flex flex-col gap-4 md:flex-row justify-between md:items-center px-4 py-4 bg-gray-100 my-5 rounded-lg">
            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-start md:items-center">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="text-nowrap">
                        <label htmlFor="from_date">From Date:</label>
                        <input
                            id="from_date"
                            type="date"
                            name="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border ml-2 p-1.5 rounded-md w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-nowrap">
                        <label htmlFor="to_date">To Date:</label>
                        <input
                            id="to_date"
                            type="date"
                            name="toDate"
                            value={toDate}
                            disabled={!fromDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border ml-2 p-1.5 rounded-md w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <button
                    onClick={handleSearch}
                    disabled={!fromDate || !toDate || error !== ''}
                    className={`px-4 py-2 rounded-md text-white mt-2 md:mt-0 ${!fromDate || !toDate || error
                        ? 'bg-blue-600 bg-opacity-50 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Search
                </button>
                <div onClick={handleRefresh}>
                    <LuRefreshCcw className='font-bold text-xl cursor-pointer' />
                </div>
            </div>

            {/* Summary Section */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="text-sm font-medium flex items-center gap-2 text-green-700">
                    💰 <span>Total Captured Amount:</span> ₹{formatIndianNumber(totalCapturedAmount)}
                </div>
                <div className="text-sm font-medium flex items-center gap-2 text-blue-700">
                    ✅ <span>Total Captured Payments:</span> {totalCapturedPayment}
                </div>
                <div className="text-sm font-medium flex items-center gap-2 text-red-700">
                    ❌ <span>Total Failed Payments:</span> {totalFailedPayment}
                </div>
            </div>
        </div>
    );

};

export default PaymentFilter;

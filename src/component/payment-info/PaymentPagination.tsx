import React from 'react';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import { getCurrentDateFormatted, pageSize } from '../../data/payment-info-data';
import { setPaymentDetailsPageSize } from '../../store/ui/ui-slice';

interface payload {
    payload: any;
    setPayload: (e: any) => void;
}

const PaymentPagination: React.FC<payload> = ({ payload, setPayload }) => {
    const table = useSelector((state: RootState) => state.table);
    const {
        paginationAction: { setPageSize },
    } = table;

    const { paymentInfoList } = useSelector((state: RootState) => state.getPaymentInfo);

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        store.dispatch(setPaymentDetailsPageSize(newSize));
        setPayload({
            toDate: getCurrentDateFormatted(),
            fromDate: getCurrentDateFormatted(),
            count: newSize,
            skip: 0
        });
    };

    const handleNext = () => {
        setPayload((prev: any) => ({
            ...prev,
            skip: payload.skip + payload.count
        }));
    }

    const handlePrev = () => {
        setPayload((prev: any) => ({
            ...prev,
            skip: payload.skip - payload.count
        }));
    }


    return (
        <div className="flex gap-x-7 justify-between items-center">
            <div className="flex items-center gap-x-2">
                <label htmlFor="">Size</label>
                <div className="flex gap-x-2">
                    <div className="select-container">
                        <select
                            className="__custom-select"
                            value={payload.count}
                            onChange={handleSizeChange}
                        >
                            {pageSize.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <i className="fas fa-chevron-down dropdown-icon text-[14px]"></i>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-x-1 sm:gap-x-2  ">
                <div className="flex justify-center w-full items-center sm:gap-x-1">
                    {/* Previous button */}
                    <button
                        className={`py-1 px-2 border ${payload.skip + 1 === 1 ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handlePrev}
                        disabled={payload.skip + 1 === 1}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </button>

                    {/* Page indicator */}
                    <div className="text-gray-600 text-nowrap">
                        {payload.skip + 1} - {payload.skip + paymentInfoList.length || 0}
                    </div>

                    {/* Next button */}
                    <button
                        className={`py-1 px-2 border ${paymentInfoList.length < payload.count ? "bg-opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleNext}
                        disabled={paymentInfoList.length < payload.count}
                    >
                        <i className="fa fa-chevron-right" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPagination;

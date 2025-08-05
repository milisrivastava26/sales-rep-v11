import React from 'react';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaEnvelope,
    FaPhone,
    FaRupeeSign,
    FaCalendarAlt,
    FaUser,
    FaReceipt,
    FaIdCard,
    FaExchangeAlt,
} from 'react-icons/fa';
import { FaBookOpen, FaCheck, FaGraduationCap, FaHashtag } from 'react-icons/fa6';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { TbDatabaseSearch } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store';
import Fallback from '../../util/custom/ui/Fallback';
import { emptyDataIcon } from '../../data/savgIcons';
import { formatIndianNumber } from '../../data/payment-info-data';
import { updateReconcilePaymentStatus } from '../../store/paymentInfo/reconcile-payment-slice';
import { Spin } from 'antd';

const Field = ({
    label,
    value,
    icon,
    fullWidth = false,
}: {
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}) => (
    <div className={`flex items-start gap-3 py-3 ${fullWidth ? 'col-span-2' : ''}`}>
        {icon && <div className="text-blue-600 pt-1">{icon}</div>}
        <div className="min-w-0"> {/* Added min-w-0 to allow children to wrap */}
            <div className="text-gray-500 text-sm">{label}</div>
            <div className="text-gray-800 font-medium break-words whitespace-normal">
                {value}
            </div>
        </div>
    </div>
);


const ViewPaymentDetails: React.FC = () => {
    const { leadPaymentDetails, isLoading } = useSelector((state: RootState) => state.getLeadPaymentDetailsByOrderId);
    const { crmLeadPaymentDetails, isLoading: isLoadingForCrmLead } = useSelector((state: RootState) => state.getCrmLeadPaymentDetails)
    const { razorPayPaymentId } = useSelector((state: RootState) => state.ui);
    const { isLoading: isLoadingForReconciliation } = useSelector((state: RootState) => state.reconcilePayment);

    const isDisabled = !!(
        crmLeadPaymentDetails &&
        crmLeadPaymentDetails.status === "PAYMENT DONE" &&
        leadPaymentDetails &&
        leadPaymentDetails.status === "paid"
    ) || !!(
        crmLeadPaymentDetails &&
        leadPaymentDetails &&
        crmLeadPaymentDetails.amountPaid !== leadPaymentDetails.amountPaid
    );


    const handleReconcile = () => {
        if (!leadPaymentDetails || !crmLeadPaymentDetails) return;
        const payload = {
            razorpayPaymentId: razorPayPaymentId,
            orderId: leadPaymentDetails.id,
            corePaymentTypeId: crmLeadPaymentDetails.paymentTypeId,
            leadEnquiryId: crmLeadPaymentDetails.leadEnquiryId,
            leadCaptureId: crmLeadPaymentDetails.leadCaptureId,
        }
        store.dispatch(updateReconcilePaymentStatus(payload))
    }

    if (isLoading || isLoadingForCrmLead) {
        return (
            <div className="flex justify-center items-center h-40">
                <Spin tip="Loading payment details..." />
            </div>
        )
    }

    if ((!isLoading && !isLoadingForCrmLead) && (crmLeadPaymentDetails === null || leadPaymentDetails === null || Object.keys(crmLeadPaymentDetails).length === 0)) {
        return (
            <Fallback
                isCenter={true}
                errorInfo="Data not available!"
                icon={emptyDataIcon}
            />
        )
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1100px] px-6 ">
                {/* Left: Payment Gateway */}
                <div className="flex-1 bg-white shadow rounded-2xl border-l-4 border-green-600">
                    <h2 className="text-lg font-semibold bg-green-600 py-1.5 px-4 rounded-t-xl text-white mb-4 flex items-center gap-2">
                        <RiSecurePaymentLine className='text-[22px]' /> Payment Gateway (Razorpay)
                    </h2>
                    <div className="grid grid-cols-2 px-6 pb-3 gap-x-10 text-sm">
                        <Field label="Order ID" value={leadPaymentDetails && leadPaymentDetails.id} icon={<FaIdCard />} />
                        <Field
                            label="Status"
                            icon={<FaCheck className='font-bold' />}
                            value={
                                leadPaymentDetails && leadPaymentDetails.status === 'paid' ? (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <FaCheckCircle /> Paid
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold flex items-center gap-1">
                                        <FaExclamationCircle /> {leadPaymentDetails && leadPaymentDetails.status}
                                    </span>
                                )
                            }
                        />
                        <Field
                            label="Amount Paid"
                            value={`₹${formatIndianNumber(leadPaymentDetails && leadPaymentDetails.amountPaid != null ? leadPaymentDetails.amountPaid : 0)}`}
                            icon={<FaRupeeSign />}
                        />
                        <Field label="Receipt" value={leadPaymentDetails && leadPaymentDetails.receipt} icon={<FaReceipt />} />
                        <Field label="Created At" value={leadPaymentDetails && leadPaymentDetails.createdAt} icon={<FaCalendarAlt />} />
                        <Field label="Name" value={leadPaymentDetails && leadPaymentDetails.name} icon={<FaUser />} />
                        <Field label="Email" value={leadPaymentDetails && leadPaymentDetails.email} icon={<FaEnvelope />} />
                        <Field label="Mobile Number" value={leadPaymentDetails && leadPaymentDetails.mobileNumber} icon={<FaPhone />} />
                        <Field label="Lead Capture ID" value={leadPaymentDetails && leadPaymentDetails.leadCaptureId} icon={<FaHashtag />} />
                        <Field label="Lead Enquiry ID" value={leadPaymentDetails && leadPaymentDetails.leadEnquiryId} icon={<FaHashtag />} />
                        <Field label="Payment Type" value={leadPaymentDetails && leadPaymentDetails.paymentType} icon={<FaHashtag />} />
                        <Field label="Career" value={leadPaymentDetails && leadPaymentDetails.career} icon={<FaGraduationCap className='text-lg' />} />
                        <Field label="Program" value={leadPaymentDetails && leadPaymentDetails.program} icon={<FaBookOpen />} fullWidth />
                    </div>
                </div>

                {/* Right: CRM Data with Icons */}
                <div className="flex-1 bg-white shadow rounded-2xl border-l-4 border-blue-600">
                    <h2 className="text-lg font-semibold bg-blue-600 py-1.5 px-4 rounded-t-xl text-white mb-4 flex items-center gap-2">
                        <TbDatabaseSearch className='text-xl' /> CRM (Internal)
                    </h2>
                    <div className="grid grid-cols-2 gap-x-10 text-sm px-6 pb-3">
                        <Field label="Order ID" value={crmLeadPaymentDetails && crmLeadPaymentDetails.orderId} icon={<FaIdCard />} />
                        <Field
                            label="Status"
                            icon={<FaCheck className='font-bold' />}
                            value={
                                crmLeadPaymentDetails && crmLeadPaymentDetails.status === 'PAYMENT DONE' ? (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <FaCheckCircle /> Paid
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold flex items-center gap-1">
                                        <FaExclamationCircle /> {crmLeadPaymentDetails && crmLeadPaymentDetails.status}
                                    </span>
                                )
                            }
                        />
                        <Field label="Amount Paid" value={`₹${formatIndianNumber(crmLeadPaymentDetails && crmLeadPaymentDetails.amountPaid != null ? crmLeadPaymentDetails.amountPaid : 0)}`} icon={<FaRupeeSign />} />
                        <Field label="Receipt" value={crmLeadPaymentDetails && crmLeadPaymentDetails.receipt} icon={<FaReceipt />} />
                        <Field label="Created At" value={crmLeadPaymentDetails && crmLeadPaymentDetails.createdAt} icon={<FaCalendarAlt />} />
                        <Field label="Name" value={crmLeadPaymentDetails && crmLeadPaymentDetails.name} icon={<FaUser />} />
                        <Field label="Email" value={crmLeadPaymentDetails && crmLeadPaymentDetails.email} icon={<FaEnvelope />} />
                        <Field label="Mobile Number" value={crmLeadPaymentDetails && crmLeadPaymentDetails.mobileNumber} icon={<FaPhone />} />
                        <Field label="Lead Capture ID" value={crmLeadPaymentDetails && crmLeadPaymentDetails.leadCaptureId} icon={<FaHashtag />} />
                        <Field label="Lead Enquiry ID" value={crmLeadPaymentDetails && crmLeadPaymentDetails.leadEnquiryId} icon={<FaHashtag />} />
                        <Field label="Payment Type " value={crmLeadPaymentDetails && crmLeadPaymentDetails.paymentType} icon={<FaHashtag />} />
                        <Field label="Career" value={crmLeadPaymentDetails && crmLeadPaymentDetails.career} icon={<FaGraduationCap className='text-lg' />} />
                        <Field label="Program" value={crmLeadPaymentDetails && crmLeadPaymentDetails.program} icon={<FaBookOpen />} fullWidth />
                    </div>
                </div>
            </div>
            <div className='flex justify-end mt-2 mx-6'>
                <button
                    type="button"
                    disabled={isDisabled || isLoadingForReconciliation}
                    onClick={handleReconcile}
                    className={`flex items-center gap-2 px-6 py-2 ${isDisabled ? "bg-opacity-50" : "hover:bg-blue-700"} bg-blue-600 text-white font-medium rounded-lg shadow transition duration-200`}
                >
                    <FaExchangeAlt className="text-lg" />
                    Reconcile
                </button>
            </div>
        </>
    );
};

export default ViewPaymentDetails;

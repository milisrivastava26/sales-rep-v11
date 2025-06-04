import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FaRupeeSign, FaUser, FaPhoneAlt, FaEnvelope, FaUniversity } from 'react-icons/fa';
import { MdPayment, MdErrorOutline } from 'react-icons/md';
import { RiListCheck2 } from 'react-icons/ri';
import { BiIdCard } from 'react-icons/bi';
import { Spin, Alert } from 'antd';

const ViewFailedPaymentDetails: React.FC = () => {
  const { failedPaymentDetails, isLoading } = useSelector(
    (state: RootState) => state.getLeadFailedPaymentDetails
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin tip="Loading failed payment details..." />
      </div>
    );
  }

  if (!failedPaymentDetails) {
    return (
      <div className="p-4">
        <Alert type="warning" message="No payment details found." showIcon />
      </div>
    );
  }

  const {
    razorPayId,
    amount,
    status,
    name,
    mobileNumber,
    email,
    leadCaptureId,
    leadEnquiryId,
    program,
    career,
    paymentType,
    errorCode,
    errorDescription,
  } = failedPaymentDetails;

  return (
    <div className="p-4 space-y-4 text-sm text-gray-700">
      <div className="grid grid-cols-2 gap-5">
        <p className="flex items-center gap-2"><BiIdCard className='text-blue-600 text-[17px]'/> <strong>Razorpay ID:</strong> {razorPayId}</p>
        <p className="flex items-center gap-2"><FaRupeeSign className='text-blue-600 text-[17px]'/> <strong>Amount:</strong> ₹{(+amount / 100).toFixed(2)}</p>
        <p className="flex items-center gap-2"><MdPayment className='text-blue-600 text-[17px]'/> <strong>Status:</strong> <span className="text-red-600 font-medium capitalize">{status}</span></p>
        <p className="flex items-center gap-2"><FaUser className='text-blue-600 text-[17px]'/> <strong>Name:</strong> {name}</p>
        <p className="flex items-center gap-2"><FaPhoneAlt className='text-blue-600 text-[17px]'/> <strong>Mobile:</strong> {mobileNumber}</p>
        <p className="flex items-center gap-2"><FaEnvelope className='text-blue-600 text-[17px]'/> <strong>Email:</strong> {email}</p>
        <p className="flex items-center gap-2"><RiListCheck2 className='text-blue-600 text-[17px]'/> <strong>Lead Capture ID:</strong> {leadCaptureId}</p>
        <p className="flex items-center gap-2"><RiListCheck2 className='text-blue-600 text-[17px]'/> <strong>Enquiry ID:</strong> {leadEnquiryId}</p>
        <p className="flex items-center gap-2"><FaUniversity className='text-blue-600 text-[17px]'/> <strong>Program:</strong> {program}</p>
        <p className="flex items-center gap-2"><FaUniversity className='text-blue-600 text-[17px]'/> <strong>Career:</strong> {career}</p>
        <p className="flex items-center gap-2"><MdPayment className='text-blue-600 text-[17px]'/> <strong>Payment Type:</strong> {paymentType}</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3 text-sm text-red-800">
        <MdErrorOutline className="text-xl mt-0.5" />
        <div>
          <p><strong>Error Code:</strong> {errorCode}</p>
          <p><strong>Description:</strong> {errorDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewFailedPaymentDetails;

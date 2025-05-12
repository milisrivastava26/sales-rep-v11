import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { getPreviousEnquiryPay } from "../../../../store/ui/ui-slice";

const AdjustEnquiry: React.FC = () => {
  const { getLeadPreviousPaymentByLeadIdResponse } = useSelector((state: RootState) => state.getLeadPreviousPaymentByLeadId);
  const [isPreviousEnquiryChecked, setIsPreviousEnquiryChecked] = useState(true);
  const [enteredAmount, setEnteredAmount] = useState(100);
  const [error, setError] = useState(false);

  const handleCheckboxChange = () => {
    setIsPreviousEnquiryChecked(!isPreviousEnquiryChecked);
  };

  useEffect(() => {
    if (isPreviousEnquiryChecked) {
      setEnteredAmount(100);
    } else {
      setEnteredAmount(0);
    }
  }, [isPreviousEnquiryChecked]);

  useEffect(() => {
    if (enteredAmount > 100) {
      setError(true);
    } else {
      setError(false);
    }
  }, [enteredAmount]);

  useEffect(() => {
    const data = {
      adjustedAmount: getLeadPreviousPaymentByLeadIdResponse,
      adjustedPercentage: enteredAmount,
    };
    store.dispatch(getPreviousEnquiryPay(data));
  }, [enteredAmount, getLeadPreviousPaymentByLeadIdResponse]);

  return (
    <div className="bg-white rounded py-5 my-5 px-4">
      <h1 className="text-xl text-blue-500 font-semibold mb-4">Previous enquiry course fee</h1>
      <div className="flex gap-2 mb-2">
        <label>Amount:</label>
        <input type="text" name="amount" value={getLeadPreviousPaymentByLeadIdResponse ?? ""} disabled={true} className="border-b border-gray-400" />
      </div>

      <div className="flex gap-2 mb-2">
        <input type="checkbox" name="previousEnquiry" checked={isPreviousEnquiryChecked} onChange={handleCheckboxChange} />
        <label htmlFor="previousEnquiry">Adjust previous enquiry pay</label>
      </div>

      <div className="flex gap-2 mb-2">
        <label>Percentage Adjusted:</label>
        <input type="text" name="amount" className="border border-gray-400 px-2 rounded" value={enteredAmount} onChange={(e: any) => setEnteredAmount(e.target.value)} />
      </div>
      {error && <p className="text-red-500 text-sm">Adjusted percentage cannot be greater than 100</p>}

      {/* <button className="bg-blue-600 text-white font-medium px-6 py-2">Calculate Fee</button> */}
    </div>
  );
};

export default AdjustEnquiry;

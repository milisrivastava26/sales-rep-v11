import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Field, ErrorMessage } from "formik";

interface propsType {
  isPreviousEnquiryChecked: boolean;
  setIsPreviousEnquiryChecked: (e: any) => void;
  setFieldValue: any;
  isNewOffer: boolean;
}

const AdjustPreviousAmount: React.FC<propsType> = ({
  isPreviousEnquiryChecked,
  setIsPreviousEnquiryChecked,
  setFieldValue,
  isNewOffer,
}) => {
  const {
    isLoading: isLoadingForPreviousPayment,
    getLeadPreviousPaymentByLeadIdResponse,
  } = useSelector((state: RootState) => state.getLeadPreviousPaymentByLeadId);

  const handleCheckboxChange = () => {
    setIsPreviousEnquiryChecked(!isPreviousEnquiryChecked);
  };

  return (
    <div>
      {!isLoadingForPreviousPayment &&
        getLeadPreviousPaymentByLeadIdResponse !== null &&
        getLeadPreviousPaymentByLeadIdResponse !== 0 && (
          <div className="py-2 rounded-md px-4">
            <h1 className="text-xl text-blue-500 font-semibold mb-4">
              Payments till date
            </h1>

            <div className="flex gap-2 mb-2">
              <label>Amount:</label>
              <Field
                type="text"
                name="adjustedAmount"
                value={getLeadPreviousPaymentByLeadIdResponse ?? ""}
                disabled={true}
                className="border-b cursor-not-allowed border-gray-400"
              />
            </div>

            <div className="flex gap-2 mb-2">
              <input
                type="checkbox"
                name="previousEnquiry"
                checked={isPreviousEnquiryChecked}
                disabled={!isNewOffer}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="previousEnquiry">
                Adjust previous enquiry pay
              </label>
            </div>

            <div className="mb-2">
              <label className="mr-2">Percentage Adjusted:</label>
              <Field
                type="text"
                name="adjustedPercentage"
                disabled={!isNewOffer}
                className={`border border-gray-400 px-2 rounded `}
                onChange={(e: any) =>
                  setFieldValue("adjustedPercentage", e.target.value)
                }
              />
              <ErrorMessage
                name="adjustedPercentage"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default AdjustPreviousAmount;

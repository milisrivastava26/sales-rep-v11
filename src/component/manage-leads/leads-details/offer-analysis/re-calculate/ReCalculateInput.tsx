import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { packageDealByLeadCaptureId } from "../../../../../store/package-deal/get-package-deal-by-programId-leadCaptureId-slice";

interface ReCalculateInputProps {
  isDisabled?: boolean;
}

interface previousEnquiryPayType {
  adjustedPercentage: number;
  adjustedAmount: number;
}

const ReCalculateInput: React.FC<ReCalculateInputProps> = ({ isDisabled }) => {
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { isLoading: isLoadingForLeadOfferByLeadId, getLeadOfferByLeadIdResponse } = useSelector((state: RootState) => state.getLeadOfferByLeadId);
  const { isLoading: isLoadingForLeadOfferDetails, leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const { previousEnquiryPay } = useSelector((state: RootState) => state.ui) as unknown as { previousEnquiryPay: previousEnquiryPayType };

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const academicProgramId = activeEnquiry[0].academicProgramId;
  const initialValues = {
    reCalculatedFee: "",
  };

  const validationSchema = Yup.object({
    reCalculatedFee: Yup.string().required("Fee is required"),
  });

  const { leadCaptureId } = useParams();

  const handleSubmit = (values: any) => {
    const payload = {
      programId: academicProgramId,
      leadCaptureId: leadCaptureId,
      feeAmount: values.reCalculatedFee,
      adjustedPercentage: previousEnquiryPay.adjustedPercentage,
      adjustedAmount: previousEnquiryPay.adjustedAmount,
    };

    store.dispatch(packageDealByLeadCaptureId(payload));
  };

  return (
    <div className="px-4 w-full rounded-md">
      <div className="py-2">
        <h2 className="text-xl font-semibold text-[#3b82f6]">Grant package deal</h2>
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ resetForm }) => {
          useEffect(() => {
            if (isDisabled) {
              resetForm();
            }
          }, [isDisabled]);
          return (
            <Form>
              <div className="mb-4 py-2">
                <label htmlFor="reCalculatedFee" className="block text-gray-700 mb-1">
                  Package Deal Offer
                </label>
                <Field
                  type="text"
                  name="reCalculatedFee"
                  disabled={isDisabled}
                  className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {!isDisabled && <ErrorMessage name="reCalculatedFee" component="div" className="text-red-500 text-sm mt-1" />}
              </div>
              {!isDisabled &&
                !isLoadingForLeadOfferDetails &&
                !isLoadingForLeadOfferByLeadId &&
                leadOfferHistoryByOfferIdResponse === null &&
                getLeadOfferByLeadIdResponse.length === 0 && (
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md ${isDisabled ? "bg-opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-blue-600"}`}
                    disabled={isDisabled}
                  >
                    Calculate Fee
                  </button>
                )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReCalculateInput;

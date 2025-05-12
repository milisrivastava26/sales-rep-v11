import React, { useEffect } from "react";
import ProgressStep from "../activity-history/ProgressStep";
import { getLeadInitiatePaymentDetails } from "../../../../store/activity/get-leadInitiatePaymentDetails-slice";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";

const Payment: React.FC = () => {
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;

  const { leadCaptureId } = useParams();

  useEffect(() => {
    store.dispatch(
      getLeadInitiatePaymentDetails({ leadCaptureId, leadEnquiryId })
    );
  }, [leadCaptureId]);

  const { isLoading, responseForLeadInitiatePayment } = useSelector(
    (state: RootState) => state.getLeadInitiatePaymentDetails
  );

  return (
    <>
      {isLoading && (
        <LoadingSpinner
          size={20}
          mainLoading={false}
          message="Fetching Payment Details!"
          centered={true}
        />
      )}

      {!isLoading && responseForLeadInitiatePayment.length === 0 && (
        <Fallback
          isCenter={true}
          errorInfo="No Payments Found"
          icon={emptyDataIcon}
        />
      )}

      {!isLoading && responseForLeadInitiatePayment.length !== 0 && (
        <div className="px-1 sm:px-3">
          <div className="w-full py-4 bg-white px-4 mb-[12px]">
            {responseForLeadInitiatePayment.map((step: any, paymentIndex: number) => (
              <ProgressStep
                isMode="Payment"
                key={paymentIndex}
                title={step?.paymentType}
                paymentStatus={step?.orderStatus}
                date={step?.paymentInitiationDate}
                paymentAmount={step?.paymentAmount}
                id={step?.orderId}
                timestamp={step?.paymentInitiationDate}
                PaymentInitiationDate={step?.paymentInitiationDate}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;

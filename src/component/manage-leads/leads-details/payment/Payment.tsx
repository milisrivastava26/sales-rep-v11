import React, { useEffect, useState } from "react";
import ProgressStep from "../activity-history/ProgressStep";
import { getLeadInitiatePaymentDetails } from "../../../../store/activity/get-leadInitiatePaymentDetails-slice";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import Fallback from "../../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../../data/savgIcons";
import { getLeadAddressById } from "../../../../store/lead-attribute-update/get-leadAddress-byId-slice";
import { getReceiptData } from "../../../../data/payment-data";
import DownloadReceipt from "./DownloadReceipt";

const Payment: React.FC = () => {
  const [receiptData, setReceiptData] = useState<any>(null);
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
    store.dispatch(getLeadAddressById(leadCaptureId));
  }, [leadCaptureId]);


  const { isLoading, responseForLeadInitiatePayment } = useSelector(
    (state: RootState) => state.getLeadInitiatePaymentDetails
  );
  const { isLoading: isLoadingForAddress } = useSelector(
    (state: RootState) => state.getLeadAddressDataById
  );

   const handleDownload = () => {
    setTimeout(() => {
      const printContent =
        document.getElementById("download-receipt")?.innerHTML;

      if (printContent) {
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        document.body.appendChild(iframe);

        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) {
          console.error("Failed to access iframe contentWindow");
          document.body.removeChild(iframe);
          return;
        }

        const iframeDoc = iframeWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
          <html>
            <head>
              <title>Receipt</title>
            </head>
            <body>${printContent}</body>
          </html>
        `);
        iframeDoc.close();

        iframe.onload = () => {
          iframeWindow.focus();
          iframeWindow.print();

          // Clean up after printing
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 500);
        };
      }
    }, 500);
  };

  const getPaymentReceiptData = (data: {
    responseOfLeadAddressById: any;
    id: any;
    paymentAmount: any;
    paymentDate: any;
    paymentInitiateTime: any;
    leadName: any;
    leadCaptureId: any;
    mode: any;
    receiptNumber: any;
  }) => {
    const {
      responseOfLeadAddressById,
      id,
      paymentAmount,
      paymentDate,
      paymentInitiateTime,
      leadName,
      leadCaptureId,
      mode,
      receiptNumber,
    } = data;

    const receiptData = getReceiptData(
      responseOfLeadAddressById,
      id,
      paymentAmount,
      paymentDate,
      paymentInitiateTime,
      leadName,
      leadCaptureId,
      mode,
      receiptNumber
    );

    setReceiptData(receiptData);
    handleDownload();
  };

  return (
    <>
      {(isLoading || isLoadingForAddress) && (
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

      {!isLoading && !isLoadingForAddress && responseForLeadInitiatePayment.length !== 0 && (
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
                getPaymentReceiptData={getPaymentReceiptData}
                mode={step?.mode}
                receiptNumber={step?.receiptNumber}
              />
            ))}
          </div>
        </div>
      )}

      <div id="download-receipt" style={{ display: "none" }}>
        {receiptData && <DownloadReceipt receiptData={receiptData} />}
      </div>
    </>
  );
};

export default Payment;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "antd";
import store, { RootState } from "../../../../../store";
import { mergeDetailsOfScholarshipAndInstallment } from "../../../../../util/actions/mergeDetailsOfScholarshipAndInstallment";
import DownloadFeeAndInstallmentDetails from "../DownloadFeeAndInstallmentDetails";
import { EscalateLeadOffer } from "../../../../../store/offer-analysis/eccalate-leadOffer-slice";

const ViewInstallmentHistory: React.FC = () => {
  const { leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const { isLoading: isLoadingForVoidOffer } = useSelector((state: RootState) => state.EscalateLeadOffer);

  const { responseForAllScholarshipOptions } = useSelector((state: RootState) => state.getAllScholarshipOption);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE")
    : [];
  const leadEnquiryId = activeEnquiry.length > 0 ? activeEnquiry[0].leadEnquiryId : null;
  const { leadCaptureId } = useParams();
  const [receiptData, setReceiptData] = useState<any>("");
  const [openVoidModal, setOpenVoidModal] = useState(false);

  const PrintOfferHandler = () => {
    setReceiptData(true);
    setTimeout(() => {
      const printContent = document.getElementById("print-contenttt")?.innerHTML;

      if (!printContent) return;

      if (printContent) {
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        document.body.appendChild(iframe);

        const iframeWindow = iframe.contentWindow;
        if (!iframeWindow) {
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



  const scholarshipAndInstallmentData = mergeDetailsOfScholarshipAndInstallment(responseForAllScholarshipOptions, leadOfferHistoryByOfferIdResponse);

  const handleOk = () => {
    const EscalateLeadOfferData = {
      leadFeeDetailsId: leadOfferHistoryByOfferIdResponse?.leadFeeDetailsId,
      leadScholarshipDetailsSalesRepId: leadOfferHistoryByOfferIdResponse?.leadScholarshipDetailsSalesRepId,
      leadOfferId: leadOfferHistoryByOfferIdResponse?.leadOfferId,
      leadCaptureId: leadCaptureId,
      status: "void",
      leadEnquiryId: leadEnquiryId,
    };

    store.dispatch(EscalateLeadOffer(EscalateLeadOfferData));
  };

  return (
    <>
      <div className="bg-white rounded-md" id="installment-history-container">
        <div className="w-full handle-table-box px-5" id="table-wrapper">
          <div className="w-full mt-5 lg:mt-0" id="installment-section">
            <div className="h-[calc(100%-40px)]">
              <div className="w-full px-3">
                <div className="w-full overflow-x-auto" id="installment-table-container">
                  {leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails &&
                    leadOfferHistoryByOfferIdResponse !== null &&
                    leadOfferHistoryByOfferIdResponse?.status !== "submitted" && (
                      <h2
                        className="text-[20px] font-semibold text-[#3b82f6] mb-2"
                        id="installment-section-title"
                      >
                        Installment Details
                      </h2>
                    )}
                  <table
                    className="text-sm"
                    border={1}
                    style={{ width: "100%", textAlign: "left" }}
                    id="installment-table"
                  >
                    {leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails &&
                      leadOfferHistoryByOfferIdResponse?.leadFeeInstallmentDetails.length !== 0 &&
                      leadOfferHistoryByOfferIdResponse?.status !== "submitted" && (
                        <>
                          <thead id="installment-table-head">
                            <tr className="w-full">
                              <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Installment Number</th>
                              <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Due Date</th>
                              <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Amount(Rs)</th>
                              <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Balance(Rs)</th>
                              <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Status</th>
                            </tr>
                          </thead>
                          <tbody id="installment-table-body">
                            {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.map((item: any) => (
                              <tr key={item.leadFeeInstallmentDetailsId} id={`installment-row-${item.leadFeeInstallmentDetailsId}`}>
                                <td className="px-1 py-1 text-nowrap border">{item.installmentSeq}</td>
                                <td className="px-1 py-1 text-nowrap border">{dayjs(item.dueDate).format("YYYY-MM-DD")}</td>
                                <td className="px-1 py-1 text-nowrap border">{item.installmentAmount.toFixed(2)}</td>
                                <td className="px-1 py-1 text-nowrap border">{item.balance.toFixed(2)}</td>
                                <td className="px-1 py-1 text-nowrap border">{item.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </>
                      )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-5 mt-5 px-5" id="action-buttons-container">
          {(leadOfferHistoryByOfferIdResponse?.status === "validated" ||
            leadOfferHistoryByOfferIdResponse?.status === "accept" ||
            leadOfferHistoryByOfferIdResponse?.status === "declined") && (
              <button
                className="bg-blue-600 text-white px-4 py-2 mr-2 rounded bottom-[16px] right-[16px]"
                onClick={PrintOfferHandler}
                id="print-offer-button"
              >
                Print Offer
              </button>
            )}

          {(leadOfferHistoryByOfferIdResponse?.status === "validated" ||
            leadOfferHistoryByOfferIdResponse?.status === "accept") && (
              <button
                className="bg-gray-500 text-white ml-2 px-6 py-2 rounded bottom-[16px] right-[16px]"
                onClick={() => setOpenVoidModal(true)}
                id="void-offer-button"
              >
                Void
              </button>
            )}
        </div>
      </div>

      <div id="print-contenttt" style={{ display: "none" }}>
        {receiptData && <DownloadFeeAndInstallmentDetails data={scholarshipAndInstallmentData} />}
      </div>

      <Modal
        title="Void Offer"
        open={openVoidModal}
        onOk={handleOk}
        onCancel={() => setOpenVoidModal(false)}
        confirmLoading={isLoadingForVoidOffer}
        centered
        okButtonProps={{ id: "confirm-void-offer-button" }}
        cancelButtonProps={{ id: "cancel-void-offer-button" }}
      >
        <p id="void-offer-confirmation-text">Are you sure you want to void the offer?</p>
      </Modal>
    </>
  );
};

export default ViewInstallmentHistory;

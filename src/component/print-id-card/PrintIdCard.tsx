import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { MetriculatedLeadsColumn } from "./MetriculatedLeadColumn";
import Search from "../../util/custom/customSearchPagination/Search";
import Pagination from "../../util/custom/customSearchPagination/Pagination";
import PrintIdCardModal from "./PrintIdCardModal";
import { Modal, Button } from "antd";
import { closeModalForPrintIdCard } from "../../store/ui/ui-slice";

const PrintIdCard: React.FC = () => {
  const { metriculatedLeads, isLoading, isError } = useSelector((state: RootState) => state.getAllMetriculatedLeads);
  const { isModalOpenForIdCard } = useSelector((state: RootState) => state.ui);

  // Print handler for specific components
  const handlePrint = (elementId: string) => {
    const printContent = document.getElementById(elementId)?.outerHTML;
    if (!printContent) return;

    const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
      .map((node) => node.outerHTML)
      .join("\n");

    // Create invisible iframe
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
        <title>Print ID Card</title>
        ${styles}
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);
    iframeDoc.close();

    iframe.onload = () => {
      iframeWindow.focus();
      iframeWindow.print();

      // Cleanup after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 500);
    };
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-gray-500 text-sm">Loading matriculated leads...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-64 text-red-500 text-sm">{isError || "Something went wrong. Please try again."}</div>;
  }

  if (!metriculatedLeads || metriculatedLeads.length === 0) {
    return <div className="flex justify-center items-center h-64 text-gray-400 text-sm">No matriculated leads found.</div>;
  }

  return (
    <>
      <div className="p-6 m-6 bg-white border rounded-lg border-gray-200">
        <h3 className="text-base sm:text-[22px] font-medium mb-2">Print Id Card</h3>
        <hr />

        <div className="flex my-5 justify-between gap-10 items-center">
          <Search />
          <Pagination />
        </div>

        <div className="overflow-x-auto">
          <CustomDetailsTable columns={MetriculatedLeadsColumn} data={metriculatedLeads} isMode="metriculatedLeads" />
        </div>
      </div>

      {isModalOpenForIdCard && (
        <Modal
          title="Print Id Card"
          open={isModalOpenForIdCard}
          onCancel={() => store.dispatch(closeModalForPrintIdCard())}
          centered
          width={1040}
          bodyStyle={{ overflow: "auto" }}
          footer={[
            <Button key="cancel" onClick={() => store.dispatch(closeModalForPrintIdCard())}>
              Cancel
            </Button>,
            <Button key="front" type="primary" onClick={() => handlePrint("id-card-front")}>
              Print Front
            </Button>,
            <Button key="back" type="primary" onClick={() => handlePrint("id-card-back")}>
              Print Back
            </Button>,
          ]}
        >
          <PrintIdCardModal />
        </Modal>
      )}
    </>
  );
};

export default PrintIdCard;

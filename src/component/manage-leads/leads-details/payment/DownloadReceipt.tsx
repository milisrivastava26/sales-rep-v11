import React from "react";
import logo from "../../../../assets/srmu_logo.jpg";

interface PropsType {
  receiptData: any;
}

const DownloadReceipt: React.FC<PropsType> = ({ receiptData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  const numberToWords = (num: number) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if ((num = +num) === 0) return "Zero";
    if (num > 999999) return "Amount too large";

    let words = "";

    const getBelowThousand = (n: number) => {
      let str = "";
      if (n > 99) {
        str += a[Math.floor(n / 100)] + " Hundred ";
        n %= 100;
      }
      if (n > 0) {
        str +=
          n < 20
            ? a[n]
            : b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      }
      return str.trim();
    };

    if (num > 999) {
      words += getBelowThousand(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }

    words += getBelowThousand(num);
    return words.trim() + " Only";
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#fc0", // ✅ Add this
          fontFamily: "Arial, sans-serif",
          fontSize: "18px",
          width: "800px",
          margin: "auto",
          border: "1px solid #000",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            backgroundColor: "#cccccc",
            borderBottom: "1px solid #000", // Applies all borders
            padding: "16px 0px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
        >
          Web Receipt
        </div>

        {/* University Info Row */}
        <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
          <div
            style={{
              width: "25%",
              borderRight: "1px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="Logo" style={{ maxWidth: "115px" }} />
          </div>
          <div
            style={{
              width: "50%",
              padding: "14px",
              borderRight: "1px solid #000",
              fontSize: "17px",
              textAlign: "center",
              textWrap: "nowrap",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
              Shri Ramswaroop Memorial University
            </div>
            <div>Village - Hadauri, Post - Tindola, Lucknow Deva Road</div>
            <div>Barabanki, Uttar Pradesh - 225003</div>
          </div>
          <div style={{ width: "25%" }}>
            <div
              style={{
                borderBottom: "1px solid #000", padding: "14px 8px", textAlign: "center",
                
              }}
            >
              <strong>Receipt No.:</strong> {receiptData.receiptNumber}
            </div>
            <div style={{ padding: "14px 8px" }}>
              <strong>Date:</strong> {formatDate(receiptData.createdAt)}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div style={{ borderBottom: "1px solid #000" }}>
          <div
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #000",
              padding: "12px",
              fontSize: "17px",
            }}
          >
            <strong>Received with thanks from:</strong> {receiptData.name} ({receiptData.leadCaptureId})
          </div>
          <div
            style={{ marginBottom: "10px", padding: "12px", fontSize: "17px" }}
          >
            <strong>Address:</strong> {receiptData.address}, {receiptData.city},{" "}
            {receiptData.state}, {receiptData.pincode}, IND
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "12px",
                borderRight: "1px solid #000",
              }}
            >
              <strong>Rupees:</strong>{" "}
              {numberToWords(receiptData.paymentAmount)}
            </div>
            <div style={{ padding: "12px", minWidth: "150px" }}>
              <strong>Rs.:</strong> ₹{receiptData.paymentAmount}
            </div>
          </div>
          <div style={{ padding: "12px", borderBottom: "1px solid #000" }}>
            <strong>Towards:</strong> {receiptData.corePaymentTypeName}
          </div>
          <div style={{ padding: "12px", borderBottom: "1px solid #000" }}>
            <strong>By Payment Reference No.:</strong> {receiptData.orderId}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                padding: "12px",
                borderRight: "1px solid #000",
              }}
            >
              <strong>Dated:</strong> {receiptData.createdAt}, {receiptData.createdTime}
            </div>
            <div style={{ padding: "12px", minWidth: "300px" }}>
              <strong>Drawn on:</strong>{" "}
              {receiptData.platform || "Payment Gateway"}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div style={{ padding: "16px", fontSize: "19px" }}>
        <strong>Payment successfully collected.</strong> You can download the
        web receipt here.
      </div>
    </>
  );
};

export default DownloadReceipt;

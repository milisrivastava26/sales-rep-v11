import { useRef } from "react";
 
const PaymentReceipt = ({ data }: { data: Record<string, any> }) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const logo = "/srmulogo.png";
 
  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
                    <html>
                    <head>
                        <title>Payment Receipt</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .receipt-container { width: 100%; max-width: 400px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
                            table { width: 100%; border-collapse: collapse; }
                            td { padding: 8px; border-bottom: 1px solid #ddd; }
                            h2 { text-align: center; }
                            img { width: 150px; display: block; }
                        </style>
                    </head>
                    <body>
                        <div class="receipt-container">
                        <div>
                        <div>
                            <img src="/srmulogo.png" alt="SRMU Logo" />
                        </div>
                          </div>
                            <h2>Payment Receipt</h2>
                            <table>
                                ${Object.entries(data)
                                  .map(
                                    ([key, value]) => `
                                    <tr>
                                        <td style="font-weight: bold; text-transform: capitalize;">${key.replace(
                                          /_/g,
                                          " "
                                        )}:</td>
                                        <td style="text-align: right;">${value}</td>
                                    </tr>
                                `
                                  )
                                  .join("")}
                            </table>
                        </div>
                        <script>
                            window.onload = function() {
                                window.print();
                                window.onafterprint = function() { window.close(); };
                            };
                        </script>
                    </body>
                    </html>
                `);
        printWindow.document.close();
      }
    }
  };
 
  return (
    <div className="py-4 px-6 bg-white rounded-lg shadow-md w-full min-w-[400px]">
      <div>
        <img src={logo} alt="SRMU Logo" style={{ height: "64px" }} />
      </div>
      <div ref={receiptRef} className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold text-center mb-4">
          Payment Receipt
        </h2>
        <table className="w-full border-collapse">
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key} className="border-b">
                <td className="py-2 font-medium capitalize">
                  {key.replace(/_/g, " ")}:
                </td>
                <td className="py-2 text-right">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handlePrint}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Print Receipt
      </button>
    </div>
  );
};
 
export default PaymentReceipt;
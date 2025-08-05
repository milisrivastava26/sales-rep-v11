import React from "react";
import { FaFileContract } from "react-icons/fa6";
import FeeAndInstallmentDetailsPdf from "./FeeAndInstallmentDetailsPdf";

// Define types for data structure
interface InstallmentData {
  installmentSeq: number;
  dueDate: string;
  installmentAmount: number;
  balance: number;
  status: string;
}

interface DownloadFeeAndInstallmentDetailsProps {
  data: any; // Update this type based on your data structure if possible
}

const DownloadFeeAndInstallmentDetails: React.FC<DownloadFeeAndInstallmentDetailsProps> = ({ data }) => {
  if (!data || data.length < 3) {
    return <p style={{ textAlign: "center", color: "#4B5563", fontWeight: "600" }}>No data available</p>;
  }

  const generalInfo = data[0];
  const scholarshipData = data[1];
  const feeData = data[2];
  const installmentData: InstallmentData[] = data[3].installmentData || [];
  const logo = "/srmulogo.png";

  const termsAndConditions = [
    {
      id: "term-1",
      text: "Payment of fees means that provisional admission in desired course has been done. Admission confirmation is subject to successful clearance during document verification process.",
    },
    {
      id: "term-2",
      text: "In case the candidate fails to satisfy the eligibility criterion of course in which provisional admission has been granted, his admission will be cancelled.",
    },
    {
      id: "term-3",
      text: "In case candidate fails to provide all relevant documents as mentioned in document checklist provided, his admission will be cancelled.",
    },
    {
      id: "term-4",
      text: "Fee refund in case of admission cancellation/ withdrawn will be governed by the university refund policy.",
    },
    {
      id: "term-5",
      text: "Concession provided, if any, will be granted only after successful verification of documents.",
    },
    {
      id: "term-6",
      text: "Concession provided, if any, stands cancelled if fees is not paid as per due date mentioned in Fee Payment Plan.",
    },
    {
      id: "term-7",
      text: "Concession can be provided subject to presenting relevant documents in original latest by 30th September 2025. In case the required original documents are not presented by mentioned date, concession provided will stand cancelled.",
    },
    {
      id: "term-8",
      text: "Concession amount will be adjusted in the last installment of course fee.",
    },
    {
      id: "term-9",
      text: "Late fine as per university policy and instructions issued by competent authorities will be imposed if fees is not paid as per the dates mentioned in Fee Payment Plan.",
    },
    {
      id: "term-10",
      text: "In case there is any increase in fee under any head, the same will be paid by the candidate.",
    },
    {
      id: "term-11",
      text: "If the due of an installment is falling after the date of commencement of odd semester examination, candidate needs to clear all dues 5 days prior to start of exams. Penal action will be implied in case of failure.",
    },
    {
      id: "term-12",
      text: "Concession provided (if any), might be waived off in case of non adherence to Fee Payment Plan.",
    },
  ];

  return (

    <>

      <div id="printable-content">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "-13px",
            marginLeft: "20px",
          }}
        >
          <img
            src={logo}
            alt="University Logo"
            style={{ height: "60px" }}
          />
        </div>

        <div>
          <div
            style={{
              borderBottom: "1px solid #e2e8f0",
              padding: "0px 20px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginTop: "2px",
            }}
          >
            <span
              style={{
                border: "2px solid #3b82f6",
                width: "32px",
                height: "32px",
                minWidth: "32px",
                minHeight: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <FaFileContract />
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: "600" }}>
              Contract Acceptance
            </h2>
          </div>

          <div style={{ padding: "20px" }}>
            <div
              style={{
                width: "100%",
                borderRadius: "6px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ width: "100%", marginTop: "4px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#3b82f6",
                    marginBottom: "8px",
                  }}
                >
                  General Information
                </h2>
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      border: "1px solid #ccc",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tbody>
                      {Object.entries(generalInfo).map(([key, value]: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              fontWeight: "600",
                              border: "1px solid #ccc",
                              padding: "8px",
                              width: "50%",
                            }}
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()} :
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              width: "50%",
                            }}
                          >
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              <div style={{ width: "100%", marginTop: "16px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#3b82f6",
                    marginBottom: "8px",
                  }}
                >
                  Scholarship Options
                </h2>
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      border: "1px solid #ccc",
                      borderCollapse: "collapse", // 🔧 This is key to fix double borders
                    }}
                  >
                    <tbody>
                      {Object.entries(scholarshipData).map(([key, value]: any, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              fontWeight: "600",
                              border: "1px solid #ccc",
                              padding: "8px",
                              width: "50%",
                            }}
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()} :
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              width: "50%",
                            }}
                          >
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* ViewInstallmentFee Component Here */}
            <FeeAndInstallmentDetailsPdf installmentData={installmentData} feeData={feeData} />

            <div style={{ width: "100%", marginTop: "16px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#3b82f6",
                  marginBottom: "8px",
                }}
              >
                Terms & Conditions
              </h2>
              <div style={{ width: "100%", overflowX: "auto" }}>
                <ol style={{ paddingLeft: "20px" }}>
                  {termsAndConditions.map((term) => (
                    <li
                      key={term.id}
                      style={{
                        fontSize: "14px",
                        color: "#4b5563",
                        marginBottom: "8px",
                      }}
                    >
                      {term.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default DownloadFeeAndInstallmentDetails;
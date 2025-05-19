import React from "react";
 
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
  const installmentData: InstallmentData[] = data[3].installmentData || []; // Type the installmentData
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
    <div style={{ padding: "0px 10px 10px 10px", marginTop: "-20px" }}>
      {/* Logo */}
 
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <img src={logo} alt="SRMU Logo" style={{ height: "64px" }} />{" "}
      </div>
 
      {/* General Info Details */}
      <div style={{ marginTop: "5px", borderTop: "2px solid gray" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#2D3748",
            paddingBottom: "8px",
            marginBottom: "6px",
          }}
        >
          General Information
        </h2>
        <table
          style={{
            width: "100%",
            fontSize: "0.875rem",
            backgroundColor: "#FFFFFF",
            // border: "1px solid gray",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            borderCollapse: "collapse", // Add this line
            borderSpacing: "0",
          }}
        >
          <tbody>
            {Object.entries(generalInfo).map(([key, value]: any, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  transition: "background-color 0.3s",
                }}
              >
                <td
                  style={{
                    padding: "8px",
                    fontWeight: "600",
                    width: "50%",
                    color: "#4A5568",
                    backgroundColor: "#EDF2F7",
                    textTransform: "capitalize",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td style={{ padding: "8px", color: "#2D3748", width: "50%" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Scholarship Details */}
      <div style={{ marginTop: "5px" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#2D3748",
            paddingBottom: "8px",
            marginBottom: "6px",
          }}
        >
          Scholarship Details
        </h2>
        <table
          style={{
            width: "100%",
            fontSize: "0.875rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid gray",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            borderCollapse: "collapse", // Add this line
            borderSpacing: "0",
          }}
        >
          <tbody>
            {Object.entries(scholarshipData).map(([key, value]: any, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  transition: "background-color 0.3s",
                }}
              >
                <td
                  style={{
                    padding: "8px",
                    fontWeight: "600",
                    color: "#4A5568",
                    width: "50%",
 
                    backgroundColor: "#EDF2F7",
                    textTransform: "capitalize",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td style={{ padding: "8px", color: "#2D3748", width: "50%" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Fee Details */}
      <div style={{ marginTop: "8px" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#2D3748",
            paddingBottom: "8px",
            marginBottom: "6px",
            marginTop: "20px",
          }}
        >
          Fee Details
        </h2>
        <table
          style={{
            width: "100%",
            fontSize: "0.875rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            borderCollapse: "collapse", // Add this line
            borderSpacing: "0",
          }}
        >
          <tbody>
            {Object.entries(feeData).map(([key, value]: any, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  transition: "background-color 0.3s",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "600",
                    color: "#4A5568",
                    backgroundColor: "#EDF2F7",
                    width: "50%",
 
                    textTransform: "capitalize",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td style={{ padding: "12px", color: "#2D3748", width: "50%" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Installment Details */}
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: "#2D3748",
          paddingBottom: "8px",
          marginBottom: "12px",
          marginTop: "60px",
        }}
      >
        Installment Details
      </h2>
      <table
        style={{
          width: "100%",
          fontSize: "0.875rem",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          borderCollapse: "collapse", // Add this line
          borderSpacing: "0",
        }}
      >
        <thead>
          <tr
            style={{
              background: "linear-gradient(to right, #EDF2F7, #E2E8F0)",
              color: "#2D3748",
            }}
          >
            <th style={{ padding: "12px", borderRight: "1px solid #E2E8F0" }}>Installment Number</th>
            <th style={{ padding: "12px", borderRight: "1px solid #E2E8F0" }}>Due Date</th>
            <th style={{ padding: "12px", borderRight: "1px solid #E2E8F0" }}>Amount (Rs)</th>
            <th style={{ padding: "12px", borderRight: "1px solid #E2E8F0" }}>Balance (Rs)</th>
            <th style={{ padding: "12px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {installmentData.length > 0 ? (
            installmentData.map((item, index) => (
              <tr
                key={index}
                style={{
                  textAlign: "center",
                  transition: "background-color 0.3s",
                }}
              >
                <td style={{ padding: "12px", border: "1px solid #E2E8F0" }}>{item.installmentSeq}</td>
                <td style={{ padding: "12px", border: "1px solid #E2E8F0" }}>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td style={{ padding: "12px", border: "1px solid #E2E8F0" }}>{item.installmentAmount.toFixed(2)}</td>
                <td style={{ padding: "12px", border: "1px solid #E2E8F0" }}>{item.balance.toFixed(2)}</td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E2E8F0",
                    fontWeight: "600",
                    color: item.status === "paid" ? "#38A169" : "#E53E3E",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  color: "#4B5563",
                }}
              >
                No installment data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
 
      {/* Terms and Conditions */}
      <div style={{ width: "100%", marginTop: "16px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#2D3748",
            marginBottom: "8px",
          }}
        >
          Terms & Conditions
        </h2>
        <div style={{ width: "100%", overflowX: "auto" }}>
          <ol style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {termsAndConditions.map((term) => (
              <li
                key={term.id}
                style={{
                  fontSize: "0.975rem",
                  color: "#4A5568",
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
  );
};
 
export default DownloadFeeAndInstallmentDetails;
 
 
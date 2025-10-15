import React from "react";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const IdBack: React.FC = () => {
  const { idCardData } = useSelector((state: RootState) => state.ui);
  const { metriculatedLeadDetail } = useSelector((state: RootState) => state.getMetriculatedLeadDetailbyId);

  const facilityType = metriculatedLeadDetail?.facility_type;

  // Determine background color and text based on facility type
  let bottomColor = "";
  let bottomText = "";

  if (facilityType === "Bus") {
    bottomColor = "red";
    bottomText = "BUS COMMUTER";
  } else if (facilityType === "Hostel") {
    bottomColor = "#FFED29"; // yellow
    bottomText = "HOSTEL RESIDENT";
  }

  return (
    <div>
      <style>{`
        :root {
          --blue: #002b5c;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f0f0f0;
          font-family: Arial, sans-serif;
        }
        .container {
          background: #fff;
          width: 450px;
          padding: 5px;
        }
        .id-card {
          border: 10px solid var(--blue);
          padding: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          min-height: 404px;
        }
        table {
          width: 100%;
        }
        tr td {
          text-align: left;
          font-weight: 600;
          min-width: 170px;
          font-size: 12px;
          vertical-align: super;
          line-height: 1.5;
          padding-bottom: 5px;
        }
        .bar-code {
          width: 100%;
          height: 40px;
          position: absolute;
          bottom: 40px;
          left: 0;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        .bottom-fixed {
          width: 100%;
          padding: 5px 0px;
          font-weight: 600;
          font-size: 14px;
          position: absolute;
          bottom: 0;
          left: 0;
          color: #000;
        }
        .address {
          overflow-wrap: break-word;
          white-space: normal;
        }
      `}</style>

      <div className="container" id="id-card-back">
        <div className="id-card">
          <table>
            <tbody>
              <tr>
                <td>ERP ID:</td>
                <td>{idCardData?.erpId}</td>
              </tr>
              <tr>
                <td>Contact No.:</td>
                <td>{idCardData?.phone}</td>
              </tr>
              <tr>
                <td>Validity:</td>
                <td>2024–2028</td>
              </tr>
              <tr>
                <td>Parent's Name:</td>
                <td>{metriculatedLeadDetail?.father_name}</td>
              </tr>
              <tr>
                <td>Parent's Contact No.:</td>
                <td>{metriculatedLeadDetail?.father_contact_number}</td>
              </tr>
              <tr>
                <td>Permanent Address:</td>
                <td className="address">
                  {metriculatedLeadDetail?.address}
                  <br />
                  Pin {metriculatedLeadDetail?.pin}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="bar-code">
            <Barcode height={30} value={idCardData?.rollNumber || ""} displayValue={false} />
          </div>

          {/* Conditional bottom bar */}
          {bottomText && (
            <div className="bottom-fixed" style={{ backgroundColor: bottomColor }}>
              {bottomText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdBack;

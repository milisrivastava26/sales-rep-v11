import React, { useEffect } from "react";
import srmuLogo from "../../assets/srmu_logo.jpg";
import user from "../../assets/user.jpg";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { viewDoc } from "../../store/view-document/view-document-slice";

const IdFront: React.FC = () => {
  const { idCardData } = useSelector((state: RootState) => state.ui);
  const { metriculatedLeadDetail } = useSelector((state: RootState) => state.getMetriculatedLeadDetailbyId);

  useEffect(() => {
    if (metriculatedLeadDetail !== null) {
      store.dispatch(
        viewDoc({
          leadCaptureId: idCardData?.leadCaptureId,
          docTypeId: 9,
          docName: metriculatedLeadDetail?.document_name,
        })
      );
    }
  }, [metriculatedLeadDetail]);

  return (
    <div>
      <style>{`
        :root{
          --blue:#002b5c
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
          min-height:404px;
        }

        .header {
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        .header img {
          width: 50px;
          vertical-align: middle;
        }

        .header h1 {
          color: #002b5c;
          font-size: 20px;
          margin: 5px 0 2px;
        }

        .header h2 {
          color: #002b5c;
          font-size: 14px;
          margin: 0;
          font-weight: normal;
        }

        .content {
          display: flex;
          justify-content: space-between;
          text-align: left;
        }

       .photo {
    width: 45%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

        .photo img {
          width: 100%;
          max-width: 100px;
          object-fit: cover;
          object-position: top;
          aspect-ratio: 1/1;
          height: auto;
          border: 1px solid var(--blue);
        }

        .details {
          width: 50%;
          text-align: center;
           display: flex;
    flex-direction: column;
    align-items: center;
        }

        .name {
          font-weight: bold;
          font-size: 14px;
          color: #000;
          margin: 4px 0px;
          height:40px;

        }

        .course {
          font-size: 12px;
          color: var(--blue);
          margin-bottom: 10px;
          font-weight: bold;
          margin: 7px 0px 0px 0px;
        height:57px;
        }

        .roll {
          font-size: 14px;
          font-weight: bold;
          color: var(--blue);
          margin: 4px 0px;
        }

        .roll-no {
          font-size: 18px;
          font-weight: bold;
          color: var(--blue);
          margin: 23px 0px 0px 0px;
        }

        .qr {
          width: 100%;
          max-width: 100px;
          object-fit: cover;
          object-position: top;
          aspect-ratio: 1/1;
        }

        .logo-part {
          display: flex;
          align-items: start;
          justify-content: center;
          column-gap: 10px;
        }

        .uname .t-name {
          font-size: 27px;
          font-weight: bold;
          color: var(--blue);
          
        }

        .uname .b-name {
          font-size: 23px;
          font-weight: bold;
          color: var(--blue);
        }

        .uname .established {
          font-size: 12px;
          font-weight: 700;
          margin-top: 3px;
        }

        .uname {
          line-height: 1.2;
        }

        .address {
          font-size: 16px;
          font-weight: 600;
          margin-top: 2px;
          margin-bottom: 0;
        }

        .url {
          font-size: 14px;
        }
      `}</style>

      <div className="container" id="id-card-front">
        <div className="id-card">
          <div className="header">
            <div className="logo-part">
              <img src={srmuLogo} alt="SRMU Logo" />
              <div className="uname">
                <div className="t-name">SHRI RAMSWAROOP</div>
                <div className="b-name">MEMORIAL UNIVERSITY</div>
                <div className="established">(Established by UP State Govt. Act 1 of 2012)</div>
              </div>
            </div>

            <p className="address">Lucknow-Deva Road, Barabanki, Uttar Pradesh</p>
            <p className="url">Website url: https://srmuu.ac.in</p>
          </div>

          <div className="content">
            <div className="photo">
              <img src={user} alt="Student Photo" />
              <p className="name">{idCardData?.name}</p>
              <p className="course">Course: {idCardData?.program}</p>
            </div>

            <div className="details">
              <div className="qr">
                <QRCodeSVG size={100} value={`Id: ${idCardData?.erpId} RollNumber: ${idCardData?.rollNumber} Name: ${idCardData?.name}`} />
              </div>
              <p className="roll">Roll Number</p>
              <p className="roll-no">{idCardData?.rollNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdFront;

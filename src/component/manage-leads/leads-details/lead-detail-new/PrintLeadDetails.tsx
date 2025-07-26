import React from "react";
import { transformAcademicDetails } from "../../../../util/actions/transformAcademicDetails";
import dayjs from "dayjs";

interface propstype {
  data: any;
}
const PrintLeadDetails: React.FC<propstype> = ({ data }) => {
  const generalInfo = data[0];
  const addressDetails = data[1];
  const bioInfo = data[2];
  const acadDetialsRaw = data[3];
  const srmusetInfo = data[4];
  const erpId = data[5];
  const fatherContact = data[6];
  const motherContact = data[7];
  const logo = "/srmulogo.png";

  const academicDetails = transformAcademicDetails(acadDetialsRaw);
  const addressPermanent = addressDetails[0];
  const addressCorrespondence = addressDetails[1];

  console.log("erp", erpId);

  return (
    <div
      style={{
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        // border: "1px solid #cbd5e0",
        padding: "0rem 0.5rem",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "0.5rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem" }}>
          <img src={logo} alt="SRMU Logo" style={{ height: "67px" }} />
        </div>
        <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ fontWeight: "700", fontSize: "1.2rem" }}>REGISTRATION FORM</div>
          <div style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.75rem" }}>
            Session (2025-2026)

          </div>
        </div>
      </header>

      <form
        style={{
          fontSize: "0.75rem",
          lineHeight: "1.25",
        }}
      >
        <fieldset
          style={{
            border: "1px solid #cbd5e0",
            padding: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              paddingBottom: "2px",
              display: "inline-block",
            }}
          >
            For Official Use Only
          </span>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "0.5rem", // Adds spacing between columns/rows
              marginTop: "0.25rem",
            }}
          >
            {[
              { label: "Recruiter Name:", value: "", width: "5rem" },
              { label: "ERP ID:", value: erpId, width: "10rem" },
              { label: "Enquiry #:", value: generalInfo.leadEnquiryId, width: "4rem" },
              { label: "Lead #:", value: generalInfo.leadCaptureId, width: "4rem" },
            ].map((field, index) => (
              <label key={index} style={{ width: "48%", display: "flex", flexDirection: "row" }}>
                {field.label}
                <input
                  value={field.value}
                  readOnly
                  style={{
                    width: field.width,
                    border: "none",
                    borderBottom: "1px solid black",
                    outline: "none",
                  }}
                />
              </label>
            ))}
          </div>

        </fieldset>

        <div style={{ display: "flex", columnGap: "1rem" }}>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <span style={{ fontWeight: "600" }}>Admit Term:</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo?.admitTypeName === "First Year Student"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>First year</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo?.admitTypeName === "Lateral"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Lateral Entry</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo?.admitTypeName === "Readmitted"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Re-admission</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center" }}>
                <input type="checkbox" checked={bioInfo?.admitTypeName === "Transfer"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Transfer</span>
              </label>
            </div>

            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <span style={{ fontWeight: "600" }}>Academic Career:</span>
              </label>

              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo?.careerName === "Undergraduate"} />
                <span style={{ marginLeft: "0.25rem" }}>UG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo?.careerName === "Postgraduate"} />
                <span style={{ marginLeft: "0.25rem" }}>PG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo?.careerName === "Integrated"} />
                <span style={{ marginLeft: "0.25rem" }}>IG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo?.careerName === "Diploma"} />
                <span style={{ marginLeft: "0.25rem" }}>DP</span>
              </label>
            </div>

            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>Course Applied For:</label>
              <input
                defaultValue={generalInfo?.programName}
                style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                readOnly
              />
            </div>

            <div style={{ marginBottom: "0.5rem", whiteSpace: "nowrap", fontWeight: "600" }}>Personal Details:</div>

            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>Name:</label>
              <input
                defaultValue={generalInfo?.leadName || ""}
                style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                readOnly
              />
            </div>

            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <div style={{ width: "100%", display: "flex", columnGap: "1rem", alignItems: "center" }}>
                <label style={{ whiteSpace: "nowrap" }}>Date of Birth:</label>
                <input
                  defaultValue={bioInfo?.dob ? new Date(bioInfo.dob).toISOString().split("T")[0] : ""}
                  style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                  readOnly
                />
              </div>
              <div style={{ width: "100%", display: "flex", columnGap: "1rem", alignItems: "center" }}>
                <label style={{ whiteSpace: "nowrap" }}>E-mail:</label>
                <input
                  defaultValue={generalInfo?.email || ""}
                  style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div style={{ border: "1px solid #ccc", padding: "0.25rem", width: "7rem", minWidth: "7rem", height: "9rem" }}>
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Nationality:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.nationality || ""}
              style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
              readOnly
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ width: "10%", textAlign: "center" }}>Gender:</label>
            <label style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
              <input type="checkbox" checked={bioInfo.gender === "MALE"} readOnly />
              <span style={{ marginLeft: "0.25rem" }}>Male</span>
            </label>
            <label style={{ display: "inline-flex", alignItems: "center" }}>
              <input type="checkbox" checked={bioInfo?.gender === "FEMALE"} readOnly />
              <span style={{ marginLeft: "0.25rem" }}>Female</span>
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Blood Group:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.bloodGroup || ""}
              style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
              readOnly
            />
          </div>
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <label style={{ width: "10%", textAlign: "center", marginRight: "1rem" }}>Category:</label>
            {["General", "SC", "ST", "OBC"].map((cat) => (
              <label key={cat} style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <input type="checkbox" checked={bioInfo?.categoryName === cat} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>{cat}</span>
              </label>
            ))}
            <label style={{ display: "inline-flex", alignItems: "center" }}>
              <input type="checkbox" readOnly />
              <span style={{ marginLeft: "0.25rem" }}>Minority</span>
            </label>
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Landline No.:</label>
            <input
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Mobile:</label>
            <input
              defaultValue={generalInfo?.phone || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",

                outline: "none",
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Father's Name:</label>
            <input
              defaultValue={bioInfo?.fatherName || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Occupation:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.fatherOccupation || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Designation, If any:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.fatherDesignation || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Father's Gross Annual Salary/Income:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.fatherAnnualIncome || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Father's Mobile:</label>
          <input
            defaultValue={fatherContact || ""}
            readOnly
            style={{
              display: "inline-block",
              width: "100%",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Mother's Name:</label>
            <input
              defaultValue={bioInfo?.motherName || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Occupation:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.motherOccupation || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Designation, If any:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.motherDesignation || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Mother's Gross Annual Salary/Income:</label>
            <input
              defaultValue={bioInfo?.leadDemographicDetailsDTO?.motherAnnualIncome || ""}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Mother's Mobile:</label>
          <input
            defaultValue={motherContact || ""}
            readOnly
            style={{
              display: "inline-block",
              width: "100%",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Permanent Address:</label>
          <input
            defaultValue={
              addressPermanent
                ? [addressPermanent.addressLine1, addressPermanent.addressLine2, addressPermanent.cityName, addressPermanent.stateName, addressPermanent.pin]
                  .filter(Boolean)
                  .join(", ")
                : ""
            }
            readOnly
            style={{
              display: "inline-block",
              width: "100%",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ whiteSpace: "nowrap" }}>District:</label>
            <input
              defaultValue={addressPermanent?.cityName}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ whiteSpace: "nowrap" }}>Pin code:</label>
            <input
              defaultValue={addressPermanent?.pin}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Correspondence Address:</label>
          <input
            defaultValue={
              addressCorrespondence
                ? [
                  addressCorrespondence.addressLine1,
                  addressCorrespondence.addressLine2,
                  addressCorrespondence.cityName,
                  addressCorrespondence.stateName,
                  addressCorrespondence.pin,
                ]
                  .filter(Boolean)
                  .join(", ")
                : ""
            }
            readOnly
            style={{
              display: "inline-block",
              width: "100%",
              border: "none",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ whiteSpace: "nowrap" }}>District:</label>
            <input
              defaultValue={addressCorrespondence?.cityName}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ whiteSpace: "nowrap" }}>Pin code:</label>
            <input
              defaultValue={addressCorrespondence?.pin}
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div style={{ width: "100%", display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ whiteSpace: "nowrap" }}>Student's Mobile:</label>
            <input
              defaultValue=""
              readOnly
              style={{
                display: "inline-block",
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Academic Qualification:
          <span style={{ fontStyle: "italic" }}> (Enclose Attested Photocopies) </span>
        </div>

        <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse", fontSize: "10px", marginBottom: "1rem" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "6%" }}>Sr. No.</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "18%" }}>Examination Passsd</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "20%" }}>Main Subject /Stream</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "15%" }}>Name of Board/ University</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "20%" }}>Name of School/College</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "7%" }}>Year</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "7%" }}>Marks Scored</th>
              <th style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center", width: "7%" }}>Marks Scored %</th>
            </tr>
          </thead>
          <tbody>
            {academicDetails.length > 0
              ? academicDetails.map((item: any, index: any) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center" }}>
                    <div
                      style={{
                        display: "inline-block",
                        width: "100%",
                        border: "none",
                        textAlign: "center",
                        outline: "none",
                      }}
                    >
                      {`${index + 1}.`}
                    </div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.exam}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.subject}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.board}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.school}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.year}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.marks}</div>
                  </td>
                  <td style={{ border: "1px solid black", padding: "2px 4px" }}>
                    <div style={{ display: "inline-block", width: "100%", border: "none", textAlign: "center", outline: "none" }}>{item.percentage}</div>
                  </td>
                </tr>
              ))
              : [...Array(1)].map((_, rowIndex) => (
                <tr key={`empty-${rowIndex}`}>
                  {[...Array(8)].map((_, colIndex) => (
                    <td key={colIndex} style={{ border: "1px solid black", padding: "2px 4px", textAlign: "center" }}>
                      <div style={{ display: "inline-block", width: "100%", height: "30px" }}></div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>

        <div style={{ fontSize: "10px", marginBottom: "1rem" }}>Awards/Co-curricular Achievements(s): NCC/NSS/Sports/Cultural Activities (Attach Copies of Certificates)</div>

        <div style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>SRMUSET</div>

        <div style={{ marginBottom: "0.5rem" }}>
          Are you interested in SRMUSET:
          <label style={{ display: "inline-flex", alignItems: "center", marginLeft: "0.5rem", marginRight: "1rem" }}>
            <input type="checkbox" readOnly checked={srmusetInfo?.isSrmuSetOpted === true} />
            <span style={{ marginLeft: "0.25rem" }}>Yes</span>
          </label>
          <label style={{ display: "inline-flex", alignItems: "center" }}>
            <input type="checkbox" readOnly checked={srmusetInfo?.isSrmuSetOpted === false} />
            <span style={{ marginLeft: "0.25rem" }}>No</span>
          </label>
        </div>

        <div>
          If Yes, then provide an examination date (dd/mm/yyyy):
          <span
            style={{
              display: "inline-block",
              borderBottom: "1px solid black",
              width: "12rem",
              marginLeft: "0.25rem",
            }}
          >
            {srmusetInfo?.isSrmuSetOpted === true ? dayjs(srmusetInfo?.preferedDate || "").format("YYYY-MM-DD") : ""}
          </span>
        </div>
      </form>
      {(academicDetails.length !== 3) && (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </>
      )}
      <div
        style={{
          fontFamily: "'Times New Roman', serif",
          color: "black",
          margin: 0,
          padding: "32px 24px",
          maxWidth: "768px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >


        

<div >


        <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "13px",
            marginBottom: "16px",
            lineHeight: 1.3,
            
          }}
        >
          Undertaking
        </div>

        <div style={{ fontSize: "13px", lineHeight: 1.3 }}>
          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Non Liability</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>
              Shri Ramswaroop Memorial University (SRMU) has not authorized any admission consultants, agents, counseling centers or any such persons promising, confirming or
              giving admissions. All such peoples indulging in these activities are unauthorized, fake &amp; fraudulent and immediately be reported at admissions@srmcu.ac.in or
              1800-102-6004
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Cancellation of Admission</p>
          <p style={{ fontWeight: 700, marginBottom: "4px" }}>SRMU reserves its right to cancel the admission of selected candidate under any of the following circumstances:</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>If fee is not deposited as per the timelines provided in the declaration form</li>
            <li style={{ marginBottom: "4px" }}>If the candidate does not join the particular program by the stipulated date even though the fee has been deposited</li>
            <li style={{ marginBottom: "4px" }}>
              If any document submitted by the candidate is found false, fabricated or forged during period of study, admission shall be cancelled immediately and fee shall be
              forfeited
            </li>
            <li style={{ marginBottom: "4px" }}>If student is found practicing any unfair means after admission</li>
            <li style={{ marginBottom: "4px" }}>
              If the student is found indulged in any act of indiscipline, damage/ breakage of any property belonging to university, admission will be cancelled along with
              appropriate legal action for recovery of the damages
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Imposition of Fine</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>
              If program fee is not paid as per the timelines provided in the declaration form at the time of admission, suitable fine as per university policy will be imposed
              along with waiver of concession provided, if any
            </li>
            <li style={{ marginBottom: "4px" }}>
              Absence from scheduled classes without prior information and without a valid reason will lead to name getting struck off and readmission at discretion of university
              after paying the due fine/ fees
            </li>
            <li style={{ marginBottom: "4px" }}>
              If a student is found in unauthorized use of transportation or residing in hostel without approval of authorities, he will be liable to pay fee for the facility used
              for the entire year
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Refund of Fee</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>Fee refund will be governed by the University Refund Policy</li>
          </ul>

          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Jurisdiction</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>
              Any dispute pertaining to admission or any matter as a student of SRMU shall be subjected to the exclusive jurisdiction of courts in Barabanki, Uttar Pradesh
            </li>
          </ul>

          <p style={{ fontWeight: 700, marginBottom: "4px" }}>Student Agreement Clause</p>
          <ul style={{ paddingLeft: "20px", marginTop: 0, marginBottom: "16px" }}>
            <li style={{ marginBottom: "4px" }}>All the successful candidates shall be bound by the rules &amp; regulations of the university and student declaration form</li>
          </ul>

          <p
            style={{
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "16px",
              lineHeight: 1.3,
            }}
          >
            Declaration by the Candidate
          </p>
          <p style={{ textAlign: "center", marginBottom: "32px", lineHeight: 1.3 }}>
            I hereby solemnly affirm that the entries in the application form are true to the best of my knowledge and belief.
          </p>

          <div style={{ marginBottom: "30px" }}>
            <p style={{ fontWeight: 700, marginBottom: "24px" }}>Date: ..............................................</p>
            <p style={{ fontWeight: 700 }}>Place: ..............................................</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              fontSize: "13px",
              marginBottom: "30px",
              columnGap: "70px",
            }}
          >
            <span>Signature of the Parent/Guardian</span>
            <span>Signature of Student</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "10vh" }}>
          <div style={{ flex: "1 0 auto" }}>
            {/* Your page content goes here */}
          </div>

          <footer
            style={{
              fontSize: "11px",
              padding: "8px 0",
              textAlign: "center",
              fontFamily: "'Times New Roman', serif",
              flexShrink: 0, // Prevents footer from shrinking
            }}
          >
            Toll Free: 1800-102-6004 | Website: www.srmu.ac.in
          </footer>
        </div>
</div>
      </div>
    </div>
  );
};

export default PrintLeadDetails;

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
  const logo = "/srmulogo.png";
 
  const academicDetails = transformAcademicDetails(acadDetialsRaw);
  const addressPermanent = addressDetails[0];
  const addressCorrespondence = addressDetails[1];
 
  return (
    <div
      style={{
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid #cbd5e0",
        padding: "0rem 0.5rem",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "0.5rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "0.5rem" }}>
          <img src={logo} alt="SRMU Logo" style={{ height: "55px" }} />
        </div>
        <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ fontWeight: "700", fontSize: "1rem", textDecoration: "underline" }}>REGISTRATION FORM</div>
          <div style={{ fontSize: "0.75rem", fontWeight: "600", marginBottom: "0.75rem" }}>
            Session (20
            <input style={{ display: "inline-block", width: "1.25rem", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />
            20
            <input style={{ display: "inline-block", width: "1.25rem", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />)
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
              borderBottom: "1px solid black",
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
              marginTop: "0.25rem",
            }}
          >
            <label style={{ width: "48%" }}>
              Recruiter ID:
              <input style={{ display: "inline-block", width: "5rem", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />
            </label>
            <label style={{ width: "48%", textAlign: "right" }}>
              Recruiting Centre:
              <input style={{ display: "inline-block", width: "5rem", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />
            </label>
          </div>
 
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "0.25rem",
            }}
          >
            <label style={{ width: "48%" }}>
              ERP ID:
              <input
                defaultValue={generalInfo.leadCaptureId}
                style={{ display: "inline-block", width: "103px", border: "none", borderBottom: "1px solid black", outline: "none" }}
                readOnly
              />
            </label>
            <label style={{ width: "48%", textAlign: "right" }}>
              No.
              <input style={{ display: "inline-block", width: "5rem", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />
            </label>
          </div>
        </fieldset>
 
        <div style={{ display: "flex", columnGap: "1rem" }}>
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <span style={{ fontWeight: "600" }}>Admit Term:</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo.admitTypeName === "First Year Student"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>First year</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo.admitTypeName === "Lateral"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Lateral Entry</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" checked={bioInfo.admitTypeName === "Readmitted"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Re-admission</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center" }}>
                <input type="checkbox" checked={bioInfo.admitTypeName === "Transfer"} readOnly />
                <span style={{ marginLeft: "0.25rem" }}>Transfer</span>
              </label>
            </div>
 
            <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <span style={{ fontWeight: "600" }}>Academic Career:</span>
              </label>
 
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo.careerName === "Undergraduate"} />
                <span style={{ marginLeft: "0.25rem" }}>UG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo.careerName === "Postgraduate"} />
                <span style={{ marginLeft: "0.25rem" }}>PG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo.careerName === "Integrated"} />
                <span style={{ marginLeft: "0.25rem" }}>IG</span>
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", marginRight: "1rem" }}>
                <input type="checkbox" readOnly checked={generalInfo.careerName === "Diploma"} />
                <span style={{ marginLeft: "0.25rem" }}>DP</span>
              </label>
            </div>
 
            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>Course Applied For:</label>
              <input
                defaultValue={generalInfo.programName}
                style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                readOnly
              />
            </div>
 
            <div style={{ marginBottom: "0.5rem", whiteSpace: "nowrap", fontWeight: "600" }}>Personal Details:</div>
 
            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <label style={{ whiteSpace: "nowrap" }}>Name:</label>
              <input
                defaultValue={generalInfo.leadName}
                style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                readOnly
              />
            </div>
 
            <div style={{ marginBottom: "0.5rem", display: "flex", columnGap: "1rem", alignItems: "center" }}>
              <div style={{ width: "100%", display: "flex", columnGap: "1rem", alignItems: "center" }}>
                <label style={{ whiteSpace: "nowrap" }}>Date of Birth:</label>
                <input
                  defaultValue={bioInfo.dob ? new Date(bioInfo.dob).toISOString().split("T")[0] : ""}
                  style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                  readOnly
                />
              </div>
              <div style={{ width: "100%", display: "flex", columnGap: "1rem", alignItems: "center" }}>
                <label style={{ whiteSpace: "nowrap" }}>E-mail:</label>
                <input
                  defaultValue={generalInfo.email}
                  style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }}
                  readOnly
                />
              </div>
            </div>
          </div>
 
          <div style={{ border: "1px solid #ccc", padding: "0.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", width: "7rem", minWidth: "7rem", height: "9rem" }}>
            {/* <img
              alt="Photo"
              src="https://storage.googleapis.com/a1aa/image/7f626238-f9b9-46e7-75e9-766e2f59e6e9.jpg"
              width="120"
              height="150"
              style={{ width: "7rem", minWidth: "7rem", height: "9rem", objectFit: "cover" }}
            /> */}
          </div>
        </div>
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Nationality:</label>
            <input
              defaultValue={addressPermanent?.country === "India" ? "Indian" : ""}
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
              <input type="checkbox" checked={bioInfo.gender === "FEMALE"} readOnly />
              <span style={{ marginLeft: "0.25rem" }}>Female</span>
            </label>
          </div>
        </div>
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Blood Group:</label>
            <input defaultValue="" style={{ display: "inline-block", width: "100%", border: "none", borderBottom: "1px solid black", outline: "none" }} readOnly />
          </div>
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <label style={{ width: "10%", textAlign: "center", marginRight: "1rem" }}>Category:</label>
            {["General", "SC", "ST", "OBC"].map((cat) => (
              <label key={cat} style={{ display: "inline-flex", alignItems: "center", marginRight: "0.5rem" }}>
                <input type="checkbox" checked={bioInfo.categoryName === cat} readOnly />
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
              defaultValue={generalInfo.phone}
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
              defaultValue={bioInfo.fatherName}
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
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Designation, If any:</label>
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
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Gross Annual Salary/Income:</label>
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
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Father's Mobile:</label>
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
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Mother's Name:</label>
            <input
              defaultValue={bioInfo.motherName}
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
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Designation, If any:</label>
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
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <label style={{ whiteSpace: "nowrap" }}>Gross Annual Salary/Income:</label>
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
 
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label style={{ whiteSpace: "nowrap" }}>Mother's Mobile:</label>
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
            <input type="checkbox" readOnly checked={srmusetInfo.isSrmuSetOpted === true} />
            <span style={{ marginLeft: "0.25rem" }}>Yes</span>
          </label>
          <label style={{ display: "inline-flex", alignItems: "center" }}>
            <input type="checkbox" checked={srmusetInfo.isSrmuSetOpted === false} />
            <span style={{ marginLeft: "0.25rem" }}>No</span>
          </label>
        </div>
 
        <div>
          If Yes, then provide an examination date (dd/mm/yyyy):
          <span style={{ display: "inline-block", borderBottom: "1px solid black", width: "12rem", marginLeft: "0.25rem" }}>{srmusetInfo.isSrmuSetOpted === true ? dayjs(srmusetInfo.preferedDate || "").format("YYYY-MM-DD") : ""}</span>
        </div>
      </form>
    </div>
  );
};
 
export default PrintLeadDetails;
 
 
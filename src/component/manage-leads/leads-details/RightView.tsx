import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import React, { useEffect, useState } from "react";
import { tabs } from "../../../data/manage-leads/active-history-data";
import { onGetRightSectionTabname } from "../../../store/ui/ui-slice";
import { getleadDetailsById } from "../../../store/view-leads-details/get-leadDetails-byId-slice";
import { getLeadScheduledNotesValuesById } from "../../../store/notes/get-leadScheduledNotes-by-CaptureId-slice";
import { getLeadScheduleTaskById } from "../../../store/task/get-allLeadScheduleTaskById-slice";
import { getleadAdditionalDetailsById } from "../../../store/lead-capturing/get-leadAdditionalDetails-byId-slice";
import { getDocumentsById } from "../../../store/notes/get-documents-by-CaptureId-slice";
import TopIconHeader from "./manage-lead-details-head/TopIconHeader";
import TopHeaderTabsActions from "./manage-lead-details-head/TopHeaderTabsActions";
import { resetLeadNotesDetailsDataById } from "../../../store/view-leads-details/get-lead-notesDetailsById-slice";
import { getLeadInitiatePaymentDetails } from "../../../store/activity/get-leadInitiatePaymentDetails-slice";
import { useParams } from "react-router-dom";
import { mergedLeadDetailsData } from "../../../util/actions/mergedLeadDetailsData";
import { getLeadAddressById } from "../../../store/lead-attribute-update/get-leadAddress-byId-slice";
import { getAdditionalInfoById } from "../../../store/lead-attribute-update/get-leadAdditionalDetails-slice";
import { getLeadAcademicDetailsById } from "../../../store/lead-attribute-update/get-leadAcademicDetails-slice";
import PrintLeadDetails from "./lead-detail-new/PrintLeadDetails";
import { getStudentDocsByCareerId } from "../../../store/student-documets/get-studentDocs-byId-slice";
import { getAllDocUploadStatusByleadCaptureId } from "../../../store/student-documets/get-all-doc-upload-status-by-leadCapture-id-slice";
import { getPsEmplId } from "../../../store/crm-to-ps-integration/get-PsEmplId-slice";
import { getLeadContactDetailsById } from "../../../store/lead-attribute-update/get-leadContactDetails-byId-slice";
import { getSrmusetOptionDetails } from "../../../store/srmuset/get-srmuSetOption-detail-slice";

const RightView: React.FC = () => {
  const dispatch = store.dispatch;
  const [activeTab, setActiveTab] = useState(0);
  const [leadDetailsPrint, setLeadDetailsPrint] = useState(false);

  const { leadCaptureId } = useParams();

  const { rightSectionTabname } = useSelector((state: RootState) => state.ui);
  const { isLoading, leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);

  const [displayOfferAnalysis, setDisplayOfferAnalysis] = useState(false);

  useEffect(() => {
    let registrationFeeObject: any = null;

    if (!isLoading && Array.isArray(leadApplicationStatusByLeadId) && leadApplicationStatusByLeadId.length !== 0) {
      registrationFeeObject = leadApplicationStatusByLeadId.find((item: any) => item.name === "Registration Fee");
    }

    const shouldDisplayOfferAnalysis = registrationFeeObject?.status === true;

    setDisplayOfferAnalysis(shouldDisplayOfferAnalysis);
  }, [leadApplicationStatusByLeadId]);

  useEffect(() => {
    store.dispatch(onGetRightSectionTabname(tabs[activeTab].label));
  }, [activeTab]);

  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { isLoading: isLoadingForAddress, responseOfLeadAddressById } = useSelector((state: RootState) => state.getLeadAddressDataById);
  const { isLoading: isLoadingForAdditionalDetails, responseofLeadAdditionalInfo } = useSelector((state: RootState) => state.getAdditionalInfoByIdData);
  const { isLoading: isLoadingForAcademicDetails, responseOfLeadAcademicDetailsById } = useSelector((state: RootState) => state.getLeadAcademicDetailsDataById);
  const { srmusetOptionDetails } = useSelector(
    (state: RootState) => state.getSrmusetOptionDetails
  );
  const { getPsEmplIdResponse } = useSelector((state: RootState) => state.getEmplId);
  const { responseOfLeadContactDetailsById } = useSelector((state: RootState) => state.getLeadContactDetailsDataById);




  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry[0]?.leadEnquiryId;
  const careerId = activeEnquiry[0]?.academicCareerId;
  const programId = activeEnquiry[0]?.academicProgramId;

  const payload = {
    careerId: careerId,
    programId: programId
  }

  const handleRefresh = function () {
    if (rightSectionTabname === "Activity History") {
      dispatch(getleadDetailsById(leadCaptureId));
    } else if (rightSectionTabname === "Lead Details") {
      dispatch(getleadAdditionalDetailsById(leadCaptureId));
    } else if (rightSectionTabname === "Tasks") {
      dispatch(getLeadScheduleTaskById(leadCaptureId));
    } else if (rightSectionTabname === "Notes") {
      dispatch(getLeadScheduledNotesValuesById(leadCaptureId));
    } else if (rightSectionTabname === "Documents") {
      dispatch(getDocumentsById(leadCaptureId));
    } else if (rightSectionTabname === "Student's Documents") {
      dispatch(getStudentDocsByCareerId(payload));
      dispatch(getAllDocUploadStatusByleadCaptureId(leadCaptureId));
    } else if (rightSectionTabname === "Payment") {
      dispatch(getLeadInitiatePaymentDetails({ leadCaptureId, leadEnquiryId }));
    }
  };

  const handlePrintClick = () => {
    dispatch(getLeadAddressById(leadCaptureId));
    dispatch(getAdditionalInfoById(leadCaptureId));
    dispatch(getLeadAcademicDetailsById(leadCaptureId));
    store.dispatch(getPsEmplId(leadCaptureId));
    store.dispatch(getLeadContactDetailsById(leadCaptureId));
    store.dispatch(getSrmusetOptionDetails(leadEnquiryId));
    setLeadDetailsPrint(true);
  };


  useEffect(() => {
    if (
      leadDetailsPrint &&
      !isLoadingForAddress &&
      !isLoadingForAdditionalDetails &&
      !isLoadingForAcademicDetails &&
      responseOfLeadAddressById &&
      responseofLeadAdditionalInfo &&
      responseOfLeadAcademicDetailsById
    ) {
      const printContent = document.getElementById("print-leadDetails")?.innerHTML;
      if (!printContent) return;

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
          <head><title>Lead Details</title></head>
          <body>${printContent}</body>
        </html>
      `);
      iframeDoc.close();

      iframe.onload = () => {
        iframeWindow.focus();
        iframeWindow.print();

        setTimeout(() => {
          document.body.removeChild(iframe);
          setLeadDetailsPrint(false); // Reset the flag
        }, 500);
      };
    }
  }, [
    leadDetailsPrint,
    isLoadingForAddress,
    isLoadingForAdditionalDetails,
    isLoadingForAcademicDetails,
    responseOfLeadAddressById,
    responseofLeadAdditionalInfo,
    responseOfLeadAcademicDetailsById,
  ]);

  const MergedLeadData = mergedLeadDetailsData(responseOfLeadEnquiryDetailsById, responseOfLeadAddressById, responseofLeadAdditionalInfo, responseOfLeadAcademicDetailsById, srmusetOptionDetails, getPsEmplIdResponse, responseOfLeadContactDetailsById);

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  
  const isDocumentReviewer = userDetails?.authority?.includes("ROLE_DOCUMENT_REVIEWER") || userDetails?.authority?.includes("ROLE_DOCUMENT_ADMIN");


  useEffect(() => {
    if (isDocumentReviewer) {
      setActiveTab(6)
    }
  }, [isDocumentReviewer])
  return (
    <>
      <div className="border-b border-gray-200 bg-white text-sm  ">
        <div className="flex justify-end border-b py-2 px-3">
          <TopIconHeader />
          <TopHeaderTabsActions />
        </div>
        <div className="flex gap-x-5 justify-between items-center px-3">
          <ul className="flex space-x-4 text-gray-500 overflow-x-auto remove_scroll_bar overflow-y-hidden">
            {tabs.map((tab, i) => {
              if (isDocumentReviewer && tab.label !== "Student's Documents") {
                return null
              }

              return (
                <li
                  key={tab.id}
                  className={`cursor-pointer relative text-nowrap block text-[13px]  py-2 font-semibold ${activeTab === i ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(i);
                    dispatch(resetLeadNotesDetailsDataById());
                  }}
                >
                  {displayOfferAnalysis || tab.label !== "Offer Analysis" ? tab.label : ""}
                </li>
              )
            })}
          </ul>

          {activeTab !== 6 && (
            <div className="flex space-x-2 ml-auto">
              {/* <i className="fas fa-cog text-gray-500"></i> */}
              {activeTab === 1 && <button type="button" className="border border-gray-300 px-2 py-1 rounded text-sm" onClick={handlePrintClick}>
                Print Details
              </button>}
              <button type="button" onClick={handleRefresh}>
                <i className="fas fa-sync-alt text-gray-500"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div id="print-leadDetails" style={{ display: "none" }}>
        {leadDetailsPrint &&
          !isLoadingForAddress &&
          !isLoadingForAdditionalDetails &&
          !isLoadingForAcademicDetails &&
          responseOfLeadAddressById &&
          responseofLeadAdditionalInfo && <PrintLeadDetails data={MergedLeadData} />}
      </div>
      {tabs[activeTab].content}
    </>
  );
};

export default RightView;


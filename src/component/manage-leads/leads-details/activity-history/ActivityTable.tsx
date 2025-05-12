import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { downloadDocForNotes } from "../../../../store/task/download-doc-slice";
import { capitalizeName } from "../../genral/CapitalizeName";
import { transformGeneralInfo } from "../../../../util/actions/transformGeneralInfo";

interface ActivityTableData {
  title: any;
}

const ActivityTable: React.FC<ActivityTableData> = ({ title }) => {
  let activityData: any;
  let isLoading = false;

  const { leadActivityDataByTrackingId } = useSelector((state: RootState) => state.getleadActivityDataByTrackingId);
  const { isLoading: inBLoading, getInboundCallDetailsResponse } = useSelector((state: RootState) => state.getInboundCallDetails);
  const { isLoading: ldEnqLoading, leadEnquiryDetailsDataById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataNewById);
  const { isLoading: outBLoading, leadPhoneConvoOutcomeDataById } = useSelector((state: RootState) => state.getleadPhoneConvoOutcomeDataById);
  const { isLoading: ldPayLoading, leadPaymentsDetailsDataById } = useSelector((state: RootState) => state.getLeadPaymentsDetailsDataById);
  const { isLoading: isLoadingForLeadCaptureDetails, leadCaptureDetailsByActionTrackId } = useSelector((state: RootState) => state.getLeadCaptureDetailsByActionTrackId);
  const { leadTaskDetailsDataById, isLoading: isLoadingForTaskDetails } = useSelector((state: RootState) => state.getLeadTaskDetailsDataById);
  const { isLoading: isLoadingForNotesDetails, leadNotesDetailsDataById } = useSelector(
    (state: RootState) => state.getLeadNotesDetailsDataById
  ) as unknown as {
    isLoading: boolean;
    leadNotesDetailsDataById: {
      leadCaptureId: string;
      name: string;
      coreDocAttachmentTypeId: string;
    };
  };
  const { leadBasicDetails, isLoading: isLoadingForBasicDetails } = useSelector((state: RootState) => state.getLeadBasicDetails);
  const { isLoading: isLoadingForWalkin, responseForRecordWalkinOutcome } = useSelector((state: RootState) => state.getRecordWalkinOutcomeDetails);
  const { isLoading: isLoadingForManualCallOutboundDetails, manualCallDetails } = useSelector((state: RootState) => state.getManualOutboundCallDetails);
  const { isLoading: isLoadingForOwnerChangedDetails, getOwnerChangedDetailsResponse } = useSelector((state: RootState) => state.getOwnerChangedDetails);
  const { getLeadOwnerAssignedDetailsResponse, isLoading: isLoadingForLeadOwnerAssigned } = useSelector((state: RootState) => state.getLeadOwnerAssignedDetails);
  const { isLoading: isLoadingForCounselling, responseForRecordCounsellingOutcome } = useSelector((state: RootState) => state.getRecordCounsellingOutcomeDetails);
  const { isLoading: isLoadingForGeneralInfo, responseForLeadGeneralInfo } = useSelector((state: RootState) => state.getLeadGeneralInfoDetails);
  const {isLoading:isLoadingForOfferDetails, leadOfferAnalysisDetailsDataById} = useSelector((state:RootState) => state.getLeadOfferDetails);
  if (title === "Had a Phone Conversation : Inbound") {
    activityData = getInboundCallDetailsResponse;
    isLoading = inBLoading;
  } else if (title === "Phone Conversation Outcome") {
    activityData = leadPhoneConvoOutcomeDataById;
    isLoading = outBLoading;
  } else if (title === "New Enquiry") {
    activityData = leadEnquiryDetailsDataById;
    isLoading = ldEnqLoading;
  } else if (title === "Application Fee" || title === "Registration Fee" || title === "Course Fee") {
    activityData = leadPaymentsDetailsDataById;
    isLoading = ldPayLoading;
  } else if (title === "Lead Captured") {
    activityData = leadCaptureDetailsByActionTrackId;
    isLoading = isLoadingForLeadCaptureDetails;
  } else if (title === "Task") {
    activityData = leadTaskDetailsDataById;
    isLoading = isLoadingForTaskDetails;
  } else if (title === "Leads Notes") {
    activityData = leadNotesDetailsDataById;
    isLoading = isLoadingForNotesDetails;
  } else if (title === "Basic Details") {
    activityData = leadBasicDetails;
    isLoading = isLoadingForBasicDetails;
  } else if (title === "Manual Call Outbound") {
    activityData = manualCallDetails;
    isLoading = isLoadingForManualCallOutboundDetails;
  } else if (title === "Lead Owner Changed") {
    activityData = getOwnerChangedDetailsResponse;
    isLoading = isLoadingForOwnerChangedDetails;
  } else if (title === "Lead Owner Assigned") {
    activityData = getLeadOwnerAssignedDetailsResponse;
    isLoading = isLoadingForLeadOwnerAssigned;
  } else if (title === "Record Walkin Outcome") {
    activityData = responseForRecordWalkinOutcome;
    isLoading = isLoadingForWalkin;
  } else if (title === "Record Counselling Outcome") {
    activityData = responseForRecordCounsellingOutcome;
    isLoading = isLoadingForCounselling;
  } else if (title === "General Information") {
    activityData = transformGeneralInfo(responseForLeadGeneralInfo);
    isLoading = isLoadingForGeneralInfo;
  } else if (title === "Offer Analysis") {
    activityData = leadOfferAnalysisDetailsDataById;
    isLoading = isLoadingForOfferDetails;
  }
  else {
    activityData = leadActivityDataByTrackingId;
  }

  const downloadDoc = () => {
    store.dispatch(
      downloadDocForNotes({
        leadCaptureId: leadNotesDetailsDataById.leadCaptureId,
        docName: leadNotesDetailsDataById.name,
        docTypeId: leadNotesDetailsDataById.coreDocAttachmentTypeId,
      })
    );
  };

  if (isLoading) {
    return <p className="ml-5 text-gray-700">Loading...</p>;
  }

  if (title === "Initiate Payment") {
    return <p className="ml-5 mt-2 text-gray-700">For more details please switch to payment tab</p>;
  }

  if (!activityData || Object.keys(activityData).length === 0) {
    return <p className="ml-5 text-gray-700">No data found for activity table</p>;
  }

  const renderTable = (data: any) => (
    <div className={`bg-blue-50 border border-gray-300 rounded-md shadow-md p-4 w-full ${title === "General Information" ? "max-w-[48%]" : "max-w-[70%]"}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="pl-[17px] text-left">Field</th>
            <th className="pl-[17px] text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]: any) => {
            const notesDescription = key === "description" ? value.replace(/<p>(.*?)<\/p>/, "$1") : "";
            return (
              <tr key={key}>
                {key === "fileName" ? (
                  <>
                    <td className="px-4 py-2 border">Recording</td>
                    <td className="px-4 py-2 border">
                      <Link className="text-blue-500 underline underline-offset-2" to={value} target="_blank" download>
                        Click here to listen recording
                      </Link>
                    </td>
                  </>
                ) : (
                  <>
                    {key !== "leadCaptureId" && key !== "coreDocAttachmentTypeId" && (
                      <>
                        <td className="px-4 py-2 border">{capitalizeName(key)}</td>
                        <td
                          className={`px-4 py-2 max-w-[300px] border break-words whitespace-normal overflow-hidden text-ellipsis ${
                            key === "name" && title === "Leads Notes" ? "text-blue-500 cursor-pointer" : ""
                          }`}
                          onClick={() => {
                            if (key === "name" && title === "Leads Notes" && value !== null) {
                              downloadDoc();
                            }
                          }}
                        >
                          {key === "description"
                            ? notesDescription
                            : key === "New Owner Assigned Date" || key === "Assigned Date"
                            ? String(value)?.split("T")[0]
                            : value}
                        </td>
                      </>
                    )}
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (title === "General Information") {
    const firstHalf = activityData[0] || {};
    const secondHalf = activityData[1] || {};
    return (
      <div className="p-4 flex flex-wrap gap-4">
        {renderTable(firstHalf)}
        {renderTable(secondHalf)}
      </div>
    );
  }

  return <div className="p-4">{renderTable(activityData)}</div>;
};

export default ActivityTable;

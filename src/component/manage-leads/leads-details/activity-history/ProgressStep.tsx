import React, { useState } from "react";
import { GoClock } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { useSelector } from "react-redux";
import ActivityTable from "./ActivityTable";
import { MdEdit, MdPayment } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import store, { RootState } from "../../../../store";
import { renderIcon } from "./operation/GetIconFromName";
import { onToggleActiveStepHandler } from "../../../../store/ui/ui-slice";
import { formatTime } from "../../../../util/actions/extractDateAndTime";
import { extractDateTime } from "../../../../util/actions/extractDateAndTime";
import {
  FaChevronDown,
  FaChevronRight,
  FaRegCheckCircle,
} from "react-icons/fa";
import { updateLeadCompletionStatus } from "../../../../store/task/update-leadscheduleTaskCompletionStatus-slice";
import { getLeadActivityByTrackingId } from "../../../../store/view-leads-details/get-leadActivity-byTrackingId-slice";
import { getInboundCallDetails } from "../../../../store/lead-properties/get-inboundCall-details-by-actionTrackId-slice";
import { getleadPhoneConvoOutcomeById } from "../../../../store/view-leads-details/get-lead-phone-convo-outcome-slice";
import { getLeadNotesDetailsById } from "../../../../store/view-leads-details/get-lead-notesDetailsById-slice";
import { getLeadTaskDetailsById } from "../../../../store/view-leads-details/get-leadTaskDetailsById-slice";
import { getLeadEnquiryDetailsByTrackId } from "../../../../store/view-leads-details/get-leadEnquiryDetailsById-slice";
import { getLeadPaymentsDetailsById } from "../../../../store/view-leads-details/get-leadPaymentsDetailsById-slice";
import { getLeadCaptureDetailsByActionTrackId } from "../../../../store/lead-capture/get-leadCaptureDetails-by-actionTrackId-slice";
import { getLeadBasicDetails } from "../../../../store/lead-capture/get-leadBasicDetails-slice";
import { useParams } from "react-router-dom";
import { getManualOutboundCallDetails } from "../../../../store/activity/get-manualCallOutboundDetails-slice";
import { getOwnerChangedDetails } from "../../../../store/lead-capturing/get-ownerChangedDetails-slice";
import { getLeadOwnerAssignedDetails } from "../../../../store/lead-capturing/get-leadOwnerAssignedDetails-slice";
import { getRecordWalkinOutcomeDetails } from "../../../../store/activity/get-recordWalkinOutcomeDetails-slice";
import { getRecordCounsellingOutcomeDetails } from "../../../../store/activity/get-recordCounsellingOutcomeDetails-slice";
import { getLeadGeneralInfoDetails } from "../../../../store/activity/get-leadGeneralInfoDetails-slice";
import { getLeadOfferAnalysisDetailsByEnquiryId } from "../../../../store/view-leads-details/get-leadOfferDetails-slice";


interface LeadDocAttachmentDTO {
  path: string;
  name: string;
  leadCaptureId: string | number | undefined;
  coreDocAttachmentTypeId: string | number | undefined;
}

interface ProgressStepType {
  id?: number;
  timestamp?: string;
  title?: string;
  isLast?: boolean;
  icon?: string;
  createdBy?: string;
  isMode?: string;
  date?: string;
  owner?: string;
  status?: boolean;
  description?: string;
  createdAt?: string;
  leadNotesId?: number;
  onHandleEditClick?: any;
  coreTaskTypeId?: number;
  child?: React.ReactElement;
  message?: string | React.ReactElement;
  leadDocAttachmentDTO?: LeadDocAttachmentDTO;
  paymentAmount?: number;
  PaymentInitiationDate?: string;
  paymentStatus? : string;
  onDownloadDocForNotesHandler?: (
    leadCaptureId: string | number | undefined,
    docName: string | number | undefined,
    docTypeId: string | number | undefined
  ) => void;
}

const ProgressStep: React.FC<ProgressStepType> = ({
  id,
  timestamp,
  title,
  isLast,
  icon,
  child,
  createdBy,
  isMode,
  date,
  description,
  createdAt,
  owner,
  coreTaskTypeId,
  status,
  onHandleEditClick,
  leadNotesId,
  onDownloadDocForNotesHandler,
  leadDocAttachmentDTO,
  paymentAmount,
  PaymentInitiationDate,
  paymentStatus,
}) => {
  const { activeStep } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { leadPropertiesDataById } = useSelector(
    (state: RootState) => state.getLeadPropertiesDataById
  );
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
    const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
    const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isActive = activeStep === id;
  const { leadCaptureId } = useParams();

  const { dateFormatted, timeFormatted } = extractDateTime(timestamp);
  const { dateFormatted: createdDate, timeFormatted: createdTime } =
    extractDateTime(createdAt);
  const { dateFormatted: paymentDate, timeFormatted: paymentInitiateTime } =
    extractDateTime(PaymentInitiationDate);
  const Hour_12_Time = formatTime(timestamp);
  const handleActiveStep = async (id: number | undefined, title: string) => {
    if (!id) return; // Ensure id is defined
    if (isActive) {
      store.dispatch(onToggleActiveStepHandler(null));
    } else {
      store.dispatch(onToggleActiveStepHandler(id));
      if (title === "Had a Phone Conversation : Inbound") {
        await store.dispatch(getInboundCallDetails(id));
      } else if (title === "Phone Conversation Outcome") {
        await store.dispatch(getleadPhoneConvoOutcomeById(id));
      } else if (title === "Leads Notes") {
        await store.dispatch(getLeadNotesDetailsById(id));
      } else if (title === "Task") {
        await store.dispatch(getLeadTaskDetailsById(id));
      } else if (title === "New Enquiry") {
        await store.dispatch(getLeadEnquiryDetailsByTrackId(id));
      } else if (title === "Application Fee" || title === "Registration Fee" || title === "Course Fee") {
        await store.dispatch(getLeadPaymentsDetailsById(id));
      } else if (title === "Lead Captured") {
        await store.dispatch(getLeadCaptureDetailsByActionTrackId(id));
      } else if (title === "Basic Details") {
        await store.dispatch(getLeadBasicDetails(leadCaptureId));
      } else if (title === "Manual Call Outbound") {
        await store.dispatch(getManualOutboundCallDetails(id));
      } else if (title === "Lead Owner Changed") {
        const payload = {
          leadCaptureId: leadCaptureId,
          salesRepId: leadPropertiesDataById.salesrepId,
        };
        await store.dispatch(getOwnerChangedDetails(payload));
      } else if (title === "Lead Owner Assigned") {
        const payload = {
          leadCaptureId: leadCaptureId,
          salesRepId: leadPropertiesDataById.salesrepId,
        };
        await store.dispatch(getLeadOwnerAssignedDetails(payload));
      } else if (title === "Record Walkin Outcome") {
        await store.dispatch(getRecordWalkinOutcomeDetails(id));
      } else if (title === "Record Counselling Outcome") {
        await store.dispatch(getRecordCounsellingOutcomeDetails(id));
      } 
      // else if (title === "Initiate Payment") {
      //   await store.dispatch(
      //     getLeadInitiatePaymentDetails({ leadCaptureId, leadEnquiryId })
      //   );
      // } 

      else if (title === "Offer Analysis"){
        await store.dispatch(getLeadOfferAnalysisDetailsByEnquiryId(leadEnquiryId));
      }

      else if (title === "General Information") {
        await store.dispatch(getLeadGeneralInfoDetails(leadCaptureId));
      }
      else {
        await store.dispatch(getLeadActivityByTrackingId(id));
      }
    }
  };

  const handleComplete = async (id: number | undefined) => {
    if (!id || isButtonDisabled) return; // Prevent multiple clicks
    setIsButtonDisabled(true); // Disable the button after click

    const isComplete = !status;
    const updatedData = { isCompleted: isComplete };

    try {
      await store.dispatch(updateLeadCompletionStatus({ id, updatedData }));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      // Re-enable button after a delay or when the operation completes
      setTimeout(() => setIsButtonDisabled(false), 2000); // Adjust the delay as needed
    }
  };
  return (
    <div className="relative flex group hover:bg-slate-50 items-stretch px-4 ">
      <div className="flex flex-col mr-[8px] mt-[10px]">
        <p className="text-sm text-gray-500 max-w-[70px] min-w-[80px] mt-1">
          {isMode === "task" ? date : dateFormatted}
        </p>
        <p className="text-sm text-gray-500 max-w-[70px] min-w-[80px] mt-1">
          {isMode === "task" ? Hour_12_Time : timeFormatted}
        </p>
      </div>
      <div className="flex flex-col items-center h-auto">
        {!isLast && <div className="h-5 w-[3px] bg-[#E0E3E8]"></div>}
        <div
          className={`w-8 h-8 min-w-8 min-h-8 rounded-full ${
            isMode === "task"
              ? "bg-[#919EAB]"
              : isMode === "Notes"
              ? "bg-yellow-500"
              : isMode === "Payment"
              ? paymentStatus === "PAYMENT DONE" ? "bg-green-500" : "bg-red-400"
              : "bg-blue-500"
          } flex items-center justify-center`}
        >
          <span
            className="
          text-white text-xl"
          >
            {isMode === "task" ? (
              <BiTask />
            ) : isMode === "Notes" ? (
              <GrNotes className="text-[17px]" />
            ) : isMode === "Payment" ? (
              <MdPayment />
            ) : (
              icon && renderIcon(icon)
            )}
          </span>
        </div>
        {!isLast && (
          <div className="h-full min-h-20 w-[3px] bg-[#E0E3E8] "></div>
        )}
      </div>

      <div className="w-full ml-1 sm:ml-3 mt-[16px]">
        <div>
          {title && (
            <div className="flex items-center gap-x-1 sm:gap-x-2">
              {isMode !== "task" && isMode !== "Payment" && (
                <div className=" text-blue-500 ">
                  {isActive ? (
                    <FaChevronDown
                      className="cursor-pointer"
                      onClick={() => handleActiveStep(id, title)}
                    />
                  ) : (
                    <FaChevronRight
                      className="cursor-pointer"
                      onClick={() => handleActiveStep(id, title)}
                    />
                  )}
                </div>
              )}
              <p
                className={`font-medium ${
                  isMode === "task"
                    ? `ml-[13px] text-[13px] text-[rgb(69,79,91)] ${
                        status ? "line-through" : ""
                      }`
                    : isMode === "Payment"
                    ? "ml-[13px] text-[rgb(69,79,91)]"
                    : "text-blue-500"
                }`}
              >
                {isMode === "Payment" ? `Payment Type: ${title}` : title}
              </p>
            </div>
          )}

          {/* this is using for activity history */}
          {isMode !== "task" && isMode !== "Notes" && isMode !== "Payment" && (
            <div className="text-gray-500 text-sm pt-2 ml-[22px]">
              <div>
                <span className="font-semibold">Modified By </span> {createdBy}
              </div>
              <div>
                <span className="font-semibold">Action Date </span>
                {isMode === "task" ? date : dateFormatted} at{" "}
                {isMode === "task" ? Hour_12_Time : timeFormatted}{" "}
              </div>
            </div>
          )}

          {isMode === "task" && (
            <div className="text-gray-500 text-sm pt-2 ml-[15px]">
              <div>
                <p className="break-all">{description}</p>
              </div>
              <div className="flex gap-x-1 mt-2">
                <div className="flex flex-wrap gap-1 items-center">
                  {<GoClock />}
                  <p className="font-normal">{date}</p>
                  <p className="font-normal">{Hour_12_Time}</p>
                  <div className="flex gap-1">
                    <p className="font-normal">Owner:</p>
                    <span className="font-semibold">{owner}</span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-normal">Created On:</p>
                    <span className="font-semibold">
                      {createdDate} {createdTime}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-normal">By:</p>
                    <span className="font-semibold">
                      {createdBy}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isMode === "Payment" && (
            <div className="ml-4 mt-2 max-w-md rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-md">
              <h3 className="mb-2 text-lg font-semibold text-gray-800 flex gap-2 items-start">
                <span>💳</span> Payment Summary
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-medium">Payment Status</span>
                  <span>{paymentStatus}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-medium">Order ID</span>
                  <span>{id}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-1">
                  <span className="font-medium">Amount</span>
                  <span>{paymentAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Initiate Date</span>
                  <span>
                    {paymentDate} at {paymentInitiateTime}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* {isActive && title === "Task" && <ViewTask />} */}

          {isMode === "Notes" && (
            <div className="text-gray-500 text-sm pt-2 ml-[15px]">
              <div
                className="break-all"
                dangerouslySetInnerHTML={{ __html: description ?? "" }}
              ></div>
              {/* <div>
                <img src={leadDocAttachmentDTO?.path} height="40" width="40" />
                <a href={leadDocAttachmentDTO?.path} target="_blank">
                  <div className="text-blue-400 font-bold">{leadDocAttachmentDTO?.name}</div>
                </a>
              </div> */}
              <div>
                <div
                  className="text-blue-400 font-semibold cursor-pointer"
                  title="download your file"
                  onClick={onDownloadDocForNotesHandler?.bind(
                    {},
                    leadDocAttachmentDTO?.leadCaptureId,
                    leadDocAttachmentDTO?.name,
                    leadDocAttachmentDTO?.coreDocAttachmentTypeId
                  )}
                >
                  {leadDocAttachmentDTO?.name}
                </div>
                {/* <a href={leadDocAttachmentDTO?.path} target="_blank" rel="noopener noreferrer">
                </a> */}
              </div>
              <div className="flex gap-x-1">
                <div className="flex gap-x-1 items-center">
                  <p className="font-normal">Added By:</p>
                  <span className="font-semibold">{owner}</span>
                </div>
              </div>
            </div>
          )}

          {child && <div>{child}</div>}
        </div>

        {isActive && <ActivityTable title={title} />}
      </div>

      {isMode !== "activity" && (
        <div className="absolute right-3 bottom-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center">
            {isMode === "task" && (
              <button
                className={`mr-2 rounded-sm px-1.5 py-1 ${
                  !status
                    ? "bg-blue-600 border border-blue-600 text-white gap-1"
                    : "bg-transparent border border-gray-400 text-black gap-1"
                } ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                } flex items-center`}
                type="button"
                onClick={() => id !== undefined && handleComplete(id)}
                disabled={isButtonDisabled}
              >
                <div className="flex items-center justify-center gap-x-[4px]">
                  <div>
                    {!status ? (
                      <FaRegCheckCircle className="text-[15px] mt-[1.2px]" />
                    ) : (
                      <BiTask className="text-[15px]" />
                    )}
                  </div>
                  <div className="text-[13px]">
                    {!status ? "Mark Complete" : "Mark Open"}
                  </div>
                </div>
              </button>
            )}
            {createdBy === userDetails.email && (
              <button
                className="mr-2 border border-gray-400 rounded-sm px-1 py-1"
                type="button"
                onClick={() => {
                  if (isMode === "task") {
                    id !== undefined &&
                      coreTaskTypeId !== undefined &&
                      onHandleEditClick(id, coreTaskTypeId);
                  } else if (isMode === "Notes") {
                    leadNotesId !== undefined && onHandleEditClick(leadNotesId);
                  }
                }}
              >
                <MdEdit className="text-base" />
              </button>
            )}

            {/* <button className="mr-2 border border-gray-400 rounded-sm px-1 py-1">
              <MdDelete className="text-base" />
            </button> */}
          </div>
        </div>
      )}
      {isMode === "activity" && title === "Had a Phone Conversation" && (
        <div className="absolute right-3 bottom-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="mr-2 border border-gray-400 rounded-sm px-1 py-1"
            type="button"
            onClick={() => {
              onHandleEditClick(id);
            }}
          >
            <MdEdit className="text-base" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressStep;

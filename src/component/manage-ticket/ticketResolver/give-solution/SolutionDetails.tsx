import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import ServiceManagementForm from "../ServiceManagementForm";
import { giveSolution } from "../../../../store/tickets/give-solution-slice";
import { useParams } from "react-router-dom";
import { downloadTicketDoc } from "../../../../store/tickets/download-ticket-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { RiAttachment2 } from "react-icons/ri";
import { HiAcademicCap, HiLightBulb } from "react-icons/hi";
import {
  buildResolutionFormData,
  buildResolutionUpdateFormData,
  getFormInputsForTicketResolution,
  getInitialValuesForTicketResolution,
  getValidationSchemaForTicketResolution,
} from "../../../../data/service/service-data";
import { getStatusBadge } from "../GetStatusBadge";
import { FaRegEdit } from "react-icons/fa";
import { getAllStatuses } from "../../../../store/tickets/get-all-status-slice";
import {
  resetUpdateSolution,
  updateSolution,
} from "../../../../store/tickets/update-solution-slice";
import { getTicketDetailsByTicketNumber } from "../../../../store/tickets/get-ticket-details-by-ticketNumber-slice";
import { getDepartment } from "../../../../util/actions/getTicketDepartment";

interface InfoRowProps {
  label: string;
  value: any;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <>
      {label === "Department" && (
        <div className="flex items-center gap-2 mt-2">
          <p className="font-medium text-gray-700 whitespace-nowrap">
            Department:
          </p>
          <div className="flex flex-wrap gap-2">
            {value.map((item: any, index: number) => (
              <span key={index} className="text-gray-600 break-all">
                {item.departmentName},
              </span>
            ))}
          </div>
        </div>
      )}

      {label !== "Department" && (
        <div className="flex items-start gap-2 text-sm">
          <span className="font-medium text-gray-800 whitespace-nowrap">
            {label}:
          </span>
          <span className="text-gray-600 break-all">{value || "—"}</span>
        </div>
      )}
    </>
  );
};

const SolutionDetails: React.FC = () => {
  const { ticket, isLoading } = useSelector(
    (state: RootState) => state.getTicketDetailsByNumber
  );

  const { isLoading: isLoadingForUpdateSolution, updatedSolution } =
    useSelector((state: RootState) => state.updateSolution);

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
    const { departments } = useSelector(
      (state: RootState) => state.getAllDepartment
    );

  const [resolutionData, setResolutionData] = useState<{
    id: string;
    status: string;
    description: string;
  } | null>(null);

  const { leadCaptureId } = useParams();

  // ✅ Find if the logged-in user has already submitted a resolution
  const hasCurrentUserGivenResolution =
    Array.isArray(ticket?.leadServiceTicketResolutionDTOS) &&
    ticket.leadServiceTicketResolutionDTOS.some(
      (res: any) =>
        String(res.assigneeId) === String(userDetails?.userId) ||
        String(res.assigneeId) === String(userDetails?.id) ||
        res.updatedBy?.toLowerCase() === userDetails?.email?.toLowerCase()
    );

  const handleSubmit = (values: any) => {
    const userName = userDetails.email;
    if (resolutionData && Object.keys(resolutionData).length > 0) {
      const payload = buildResolutionUpdateFormData(
        values,
        ticket.leadcaptureId,
        resolutionData.id
      );
      store.dispatch(updateSolution(payload));
    } else {
      const payload = buildResolutionFormData(
        values,
        ticket.leadServiceTicketId,
        userName
      );
      store.dispatch(giveSolution(payload));
    }
  };

  const handleDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId,
        fileType: "tickets",
        fileName: attachmentName,
      })
    );
  };

  const handleSolutionDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId,
        fileType: "tickets-resolutions",
        fileName: attachmentName,
      })
    );
  };

  // ✅ Returns existing data if editing, else default
  const getInitialValuesForResolution = (data: any) => {
    if (data && Object.keys(data).length > 0) {
      store.dispatch(getAllStatuses());
      return {
        status: data.status || "",
        description: data.description || "",
        attachments: [],
      };
    } else {
      return getInitialValuesForTicketResolution();
    }
  };

  useEffect(() => {
    if (updatedSolution !== "" && !isLoadingForUpdateSolution) {
      setResolutionData(null);
      store.dispatch(resetUpdateSolution());
      store.dispatch(getTicketDetailsByTicketNumber(ticket.ticketNumber));
    }
  }, [updatedSolution, isLoadingForUpdateSolution]);

  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingSpinner
          centered={false}
          size={20}
          message="Loading Ticket Details..."
          mainLoading={true}
        />
      </div>
    );
  }

  if (!isLoading && !ticket) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="text-gray-500 text-sm">No grievance found.</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mx-8 space-y-8">
      {ticket && (
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm mb-6">
          <h3 className="text-lg flex items-center gap-2 font-semibold text-gray-800 mb-3">
            <HiAcademicCap className="text-2xl text-blue-600" /> Student Details
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 text-sm text-gray-700">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-gray-600">Name</p>
              <p className="text-gray-900 mt-1">{ticket.name || "N/A"}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-gray-600">Email</p>
              <p className="text-gray-900 mt-1">{ticket.email || "N/A"}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-gray-600">Phone</p>
              <p className="text-gray-900 mt-1">{ticket.phone || "N/A"}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-gray-600">Career</p>
              <p className="text-gray-900 mt-1">{ticket.career || "N/A"}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="font-medium text-gray-600">Program</p>
              <p className="text-gray-900 mt-1">{ticket.program || "N/A"}</p>
            </div>
          </div>
        </div>
      )}


      {/* 🎟️ Ticket Information */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            🎟️ Ticket Information
          </h2>
          {getStatusBadge(ticket.status)}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          <InfoRow label="Ticket Number" value={ticket.ticketNumber} />
          <InfoRow
            label="Report Date"
            value={new Date(ticket.createdAt).toLocaleString()}
          />
          <InfoRow label="Service Sub Type" value={ticket.serviceSubTypeName} />
          <InfoRow label="Service Type" value={ticket.serviceTypeName} />
          <InfoRow label="Department" value={ticket.serviceDepartment} />
          <InfoRow label="Title" value={ticket.title} />
          <InfoRow label="Description" value={ticket.description} />
        </div>

        {/* Attachments */}
        <div className="mt-4">
          <span className="font-semibold text-gray-900 flex items-center gap-1 mb-2">
            <RiAttachment2 className="text-blue-500" /> Attachments:
          </span>
          {ticket.ticketAttachmentsDTOS?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {ticket.ticketAttachmentsDTOS.map(
                (file: { attachmentName: string }, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleDownload(file.attachmentName)}
                    className="px-3 py-1.5 text-xs bg-blue-50 border border-blue-200 rounded-md text-blue-700 hover:bg-blue-100 active:scale-95 transition-all"
                  >
                    {file.attachmentName}
                  </button>
                )
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No attachments</p>
          )}
        </div>


      </div>

      <div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="font-medium text-gray-600">Admin's Remark:</p>
          <p className="text-gray-900 mt-1">{ticket.remark || "N/A"}</p>
        </div>
      </div>


      {/* 💡 Resolution Details */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3 mb-5">
          <HiLightBulb className="text-yellow-500 text-xl" />
          Resolution Details
        </h3>

        {ticket.leadServiceTicketResolutionDTOS.length > 0 ? (
          <div className="space-y-5">
            {ticket.leadServiceTicketResolutionDTOS.map((item: any) => (
              <div
                key={item.ticketResolutionId}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      {item.updatedBy?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">
                        {item.updatedBy ? (
                          <>
                            <div>
                              <span className="text-gray-600">Assignee </span>
                              <span className="text-blue-600">
                                {item.updatedBy}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">{item.status === "Reassigned" ? "Transferred to" : "Department"} </span>

                              <span className="text-blue-600">
                                {getDepartment(item.assigneeId, departments)}
                              </span>
                            </div>
                          </>
                        ) : (
                          "Resolved by Unknown User"
                        )}
                      </h4>
                      <p className="text-gray-500 text-xs mt-2">
                        {new Date(item.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div>{getStatusBadge(item.status)}</div>
                    {/* Only allow edit for the same resolver */}
                    {(
                      userDetails.email?.toLowerCase() ===
                      item.updatedBy?.toLowerCase() && item.status !== "Closed") && item.status !== "Assign to other department" && (
                        <button
                          onClick={() =>
                            setResolutionData({
                              id: item.ticketResolutionId,
                              status: item.status || "",
                              description: item.resolutionDescription || "",
                            })
                          }
                          className="text-blue-700 hover:text-blue-800"
                        >
                          <FaRegEdit className="text-lg" />
                        </button>
                      )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.resolutionDescription || "No description provided."}
                  </p>
                </div>

                {/* Attachments */}
                {item.resolutionAttachmentsDTOS?.length > 0 ? (
                  <div className="mt-3">
                    <span className="font-medium text-gray-800 flex gap-1 items-center text-sm">
                      <RiAttachment2 className="text-blue-600" /> Attachments:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.resolutionAttachmentsDTOS.map(
                        (
                          attachment: { attachmentName: string },
                          index: number
                        ) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleSolutionDownload(attachment.attachmentName)
                            }
                            className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 active:scale-95 transition-all"
                          >
                            {attachment.attachmentName}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs italic mt-2">
                    No attachments available.
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center mt-5 text-sm">
            No resolution updates found.
          </p>
        )}
      </div>

      {/* ✅ Show Add/Edit Resolution only for resolver who hasn’t added yet or is editing */}
      {(resolutionData && Object.keys(resolutionData).length > 0) ||
        !hasCurrentUserGivenResolution ? (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5 flex items-center gap-2">
            {resolutionData && Object.keys(resolutionData).length > 0
              ? "✏️ Edit Resolution"
              : "💬 Add Resolution"}
          </h3>

          <ServiceManagementForm
            formInputs={getFormInputsForTicketResolution()}
            initialValues={getInitialValuesForResolution(resolutionData)}
            validationSchema={getValidationSchemaForTicketResolution()}
            isMode="solutionCreate"
            onSubmit={(values: any) => handleSubmit(values)}
          />
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 italic">
          ✅ You have already submitted your resolution kindly edit the existing resolution.
        </p>
      )}
    </div>
  );
};

export default SolutionDetails;

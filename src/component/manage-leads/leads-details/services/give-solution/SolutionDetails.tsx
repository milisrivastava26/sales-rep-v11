import React from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import ServiceManagementForm from "../ServiceManagementForm";
import {
  buildResolutionFormData,
  formInputsForTicketResolution,
  initialValuesForTicketResolution,
  validationSchemaForTicketResolution,
} from "../../../../../data/service/service-data";
import { giveSolution } from "../../../../../store/tickets/give-solution-slice";
import { useParams } from "react-router-dom";
import { downloadTicketDoc } from "../../../../../store/tickets/download-ticket-slice";
import { getPriorityBadge, getStatusBadge } from "../ServiceTicketColumns";
import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";

const SolutionDetails: React.FC = () => {
  const { ticket, isLoading } = useSelector((state: RootState) => state.getTicketDetailsByNumber);
  const { leadServiceTicketId } = useSelector((state: RootState) => state.ui);
  const { leadCaptureId } = useParams();

  const handleSubmit = (values: any) => {
    console.log(values);

    const payload = buildResolutionFormData(values, leadServiceTicketId);

    store.dispatch(giveSolution(payload));
  };

  const handleDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId: leadCaptureId,
        fileType: "tickets",
        fileName: attachmentName,
      })
    );
  };
  const handleSolutionDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId: leadCaptureId,
        fileType: "tickets-resolutions",
        fileName: attachmentName,
      })
    );
  };

  if (isLoading) {
    return (
      <div className="mt-20">
        <LoadingSpinner centered={false} size={20} message="Loading Ticket Details.." mainLoading={true} />
      </div>
    );
  }

  if (!isLoading && !ticket) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-gray-500 text-sm">No tickets found.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Ticket Info */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-3">
        {/* Line 1 */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <span className="font-semibold">Ticket ID: </span>
            {ticket.ticketNumber}
          </div>
          <div>
            <span className="font-semibold">Report Date: </span>
            {new Date(ticket.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Priority: </span>

            {getPriorityBadge(ticket.servicePriorityName)}
          </div>
        </div>

        {/* Line 2 */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <span className="font-semibold">Service Type: </span>
            {ticket.serviceTypeName}
          </div>
          <div>
            <span className="font-semibold">Department: </span>
            {ticket.serviceDepartmentName}
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            {getStatusBadge(ticket.status)}
          </div>
        </div>

        {/* Line 3 */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <span className="font-semibold">Assigned To: </span>
            {ticket.assignee}
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Attachment: </span>
            {ticket.attachmentName ? (
              <p onClick={() => handleDownload(ticket.attachmentName)} className="text-blue-600 cursor-pointer underline">
                {ticket.attachmentName}
              </p>
            ) : (
              "No attachment"
            )}
          </div>
        </div>
        {/* Subject & Description */}
        <div className="">
          <div className="mb-2">
            <span className="font-semibold">Subject: </span>
            {ticket.title}
          </div>

          <div>
            <span className="font-semibold">Description: </span>
            {ticket.description}
          </div>
        </div>
      </div>

      {ticket.leadServiceTicketResolutionDTOS.length !== 0 && (
        <div className="space-y-4 my-4 pt-5">
          <div className=" h-[50px] flex items-center px-4 bg-blue-100">
            <h1 className="text-lg font-semibold">Previous Solutions</h1>
          </div>
          {ticket.leadServiceTicketResolutionDTOS.map((item: any) => (
            <div key={item.ticketResolutionId} className="p-4 border rounded-lg shadow-sm bg-white">
              <div className="flex justify-between mb-3">
                <div>
                  <h1 className="font-medium mb-1">{item.updatedBy}</h1>
                  <p className="text-gray-600 text-sm">{new Date(item.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">{getStatusBadge(item.status)}</div>
              </div>

              {/* Description */}
              <p className="text-gray-800 text-[15px] mb-2">{item.resolutionDescription}</p>

              {/* Attachment */}
              {item.attachmentName && (
                <p className="text-gray-600 flex gap-2 text-sm">
                  <span className="font-medium">Attachment:</span>{" "}
                  <p onClick={() => handleSolutionDownload(item.attachmentName)} className="text-blue-600 cursor-pointer hover:underline">
                    {item.attachmentName}
                  </p>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="pt-5">
        <div className=" h-[50px] flex items-center px-4 bg-blue-100">
          <h1 className="text-lg font-semibold">Your Remarks</h1>
        </div>
        <ServiceManagementForm
          formInputs={formInputsForTicketResolution}
          initialValues={initialValuesForTicketResolution}
          validationSchema={validationSchemaForTicketResolution}
          isMode="solutionCreate"
          onSubmit={(values: any) => handleSubmit(values)}
        />
      </div>
    </div>
  );
};

export default SolutionDetails;

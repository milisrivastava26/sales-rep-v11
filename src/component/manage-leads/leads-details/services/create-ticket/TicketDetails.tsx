import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllServiceTypes } from "../../../../../store/tickets/get-all-serviceType-slice";
import { getAllDepartments } from "../../../../../store/tickets/get-all-department-slice";
import { getAllPriorities } from "../../../../../store/tickets/get-all-priority-slice";
import store, { RootState } from "../../../../../store";
import ServiceManagementForm from "../ServiceManagementForm";
import { formInputsForService, transformTicketDataToInitialValues, validationSchemaForService } from "../../../../../data/service/service-data";
import { getAllAssignees } from "../../../../../store/tickets/get-all-assignees-slice";
import { downloadTicketDoc } from "../../../../../store/tickets/download-ticket-slice";
import { useParams } from "react-router-dom";
import { getStatusBadge } from "../ServiceTicketColumns";
import LoadingSpinner from "../../../../../util/custom/ui/LoadingSpinner";

const TicketDetails: React.FC = () => {
  const { ticket, isLoading } = useSelector((state: RootState) => state.getTicketDetailsByNumber);
  const dispatch = store.dispatch;
  const { leadCaptureId } = useParams();

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([dispatch(getAllServiceTypes()), dispatch(getAllDepartments()), dispatch(getAllPriorities()), dispatch(getAllAssignees())]);
    };

    fetchAll();
  }, [dispatch]);

  const handleDownload = (attachmentName: string) => {
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

  if (!ticket) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No ticket data found.</p>
      </div>
    );
  }

  return (
    <div>
      <ServiceManagementForm
        formInputs={formInputsForService}
        initialValues={transformTicketDataToInitialValues(ticket)}
        validationSchema={validationSchemaForService}
        isMode="update"
      />

      <div className="space-y-4 mt-4">
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
                <a onClick={() => handleDownload(item.attachmentName)} className="text-blue-600 cursor-pointer hover:underline">
                  {item.attachmentName}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketDetails;

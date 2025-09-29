import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { getRaisedTicketsByLeadCaptureId } from "../../../../../store/tickets/get-all-raised-tickets-slice";
import { createTicket, resetCreateTicket } from "../../../../../store/tickets/create-ticket-slice";
import ServiceDetails from "./ServiceDetails";
import ServiceManagementForm from "../ServiceManagementForm";
import { formInputsForService, initialValuesForService, validationSchemaForService } from "../../../../../data/service/service-data";
import TicketDetails from "./TicketDetails";

const CreateTicket: React.FC = () => {
  const { leadCaptureId } = useParams();
  const [isCreateTicket, setIsCreateTicket] = useState(false);
  const { viewTicketId } = useSelector((state: RootState) => state.ui);
  const { ticket, isLoading } = useSelector((state: RootState) => state.createTicket);

  useEffect(() => {
    store.dispatch(getRaisedTicketsByLeadCaptureId(leadCaptureId));
  }, [leadCaptureId]);

  useEffect(() => {
    if (!isLoading && ticket !== null) {
      store.dispatch(resetCreateTicket());
      setIsCreateTicket(false);
      store.dispatch(getRaisedTicketsByLeadCaptureId(leadCaptureId));
    }
  }, [ticket]);

  const handleSubmit = (values: any) => {
    const formData = new FormData();

    const ticketData = {
      leadCaptureId: leadCaptureId,
      sericeTypeId: values.serviceType,
      servicePriorityId: values.priority,
      serviceDepartmentId: values.department,
      title: values.subject,
      description: values.description,
      assigneeId: values.assignee.toString(),
      attachmentName: values.attachment ? values.attachment.name : undefined,
    };

    formData.append("ticketData", JSON.stringify(ticketData));

    if (values.attachment) {
      formData.append("file", values.attachment);
    }

    store.dispatch(createTicket(formData));
  };

  return (
    <div className="bg-white pb-20 px-3">
      <div className=" h-[50px] flex items-center px-4 bg-blue-100">
        <h1 className="text-lg font-semibold">Service Management</h1>
      </div>

      {!isCreateTicket && viewTicketId === "" && (
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg text-gray-700">All Tickets</h1>
          <button
            onClick={() => {
              setIsCreateTicket(true);
              // store.dispatch(generateTicketNumberByLeadId(leadCaptureId));
            }}
            className="text-white font-medium flex gap-2 items-center px-4 rounded-lg py-1.5 bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            <FaPlus /> New Ticket
          </button>
        </div>
      )}

      {!isCreateTicket && viewTicketId === "" && <ServiceDetails />}
      {isCreateTicket && (
        <ServiceManagementForm
          formInputs={formInputsForService}
          initialValues={initialValuesForService}
          validationSchema={validationSchemaForService}
          onSubmit={(values: any) => handleSubmit(values)}
          isMode="create"
          setIsCreateTicket={setIsCreateTicket}
        />
      )}

      {!isCreateTicket && viewTicketId !== "" && <TicketDetails />}
    </div>
  );
};

export default CreateTicket;

import React from 'react'
import ServiceManagementForm from '../../../manage-ticket/ticketResolver/ServiceManagementForm'
import { useParams } from 'react-router-dom';
import { formInputsForService, initialValuesForService, validationSchemaForService } from '../../../../data/service/create-ticket-data';
import { createTicket } from '../../../../store/tickets/create-ticket-slice';
import store, { RootState } from '../../../../store';
import { useSelector } from 'react-redux';

interface createTicketProps {
  setIsCreateTicket: (e: any) => void;
}

const CreateTicket: React.FC<createTicketProps> = ({setIsCreateTicket}) => {
    const {leadCaptureId} = useParams();
    const {} = useSelector((state:RootState) => state.createTicket);

    const handleSubmit = (values: any) => {
    const formData = new FormData();

    const ticketData = {
      leadCaptureId,
      title: values.subject,
      description: values.description,
      serviceDepartment: values.departments.map((dept: any) => {
        // Handle both number and object formats safely
        return { departmentId: typeof dept === "object" ? dept.value : dept };
      }),
    };

    formData.append("ticketData", JSON.stringify(ticketData));

    if (values.attachments && Array.isArray(values.attachments)) {
      values.attachments.forEach((file: File) => {
        formData.append("files", file);
      });
    }

    store.dispatch(createTicket(formData));
  };


    return (
        <div className='bg-white'>
            <h1 className='font-medium px-6 pt-6'>Create Ticket</h1>
            <div>
                <ServiceManagementForm
                formInputs={formInputsForService}
                initialValues={initialValuesForService}
                validationSchema={validationSchemaForService}
                onSubmit={handleSubmit}
                isMode="ticketCreator"
                setIsCreateTicket={setIsCreateTicket}
            />

            </div>
        </div>
    )
}

export default CreateTicket

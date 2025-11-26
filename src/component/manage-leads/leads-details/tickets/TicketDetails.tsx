import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RiAttachment2 } from "react-icons/ri";
import store, { RootState } from "../../../../store";
import { downloadTicketDoc } from "../../../../store/tickets/download-ticket-slice";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { useParams } from "react-router-dom";
import ServiceManagementForm from "../../../manage-ticket/ticketResolver/ServiceManagementForm";
import { formInputsForService, transformTicketDataToInitialValues, validationSchemaForService } from "../../../../data/service/create-ticket-data";
import { HiLightBulb } from "react-icons/hi";
import { getStatusBadge } from "./ServiceTicketColumns";
import { clearTicketNumber } from "../../../../store/ui/ui-slice";
import { getTicketDetailsByTicketNumber } from "../../../../store/tickets/get-ticket-details-by-ticketNumber-slice";
import { getAllDepartments } from "../../../../store/tickets/get-all-department-slice";


const TicketDetails: React.FC = () => {
    const { ticket, isLoading } = useSelector(
        (state: RootState) => state.getTicketDetailsByNumber
    );
    const { ticketNumber } = useSelector((state: RootState) => state.ui);


    const { leadCaptureId } = useParams();


    const handleDownload = (attachmentName: string) => {
        store.dispatch(
            downloadTicketDoc({
                leadCaptureId: leadCaptureId,
                fileType: "tickets-resolutions",
                fileName: attachmentName,
            })
        );
    };

    useEffect(() => {
        store.dispatch(getTicketDetailsByTicketNumber(ticketNumber));
        store.dispatch(getAllDepartments());
    }, [])


    if (isLoading) {
        return (
            <div className="mt-20">
                <LoadingSpinner
                    centered={false}
                    size={20}
                    message="Loading Ticket Details.."
                    mainLoading={true}
                />
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
        <div className={` bg-white rounded-md`}>
            <div className=" border-slate-200 mb-2 items-center flex gap-2 ">
                
                <h2 className="text-xl font-semibold">Ticket Details</h2>
            </div>

            <ServiceManagementForm
                formInputs={formInputsForService}
                initialValues={transformTicketDataToInitialValues(ticket)}
                validationSchema={validationSchemaForService}
                isMode="update"
            />

            <div className="space-y-6 p-6">
                <h3 className="text-2xl flex items-center gap-2 font-semibold text-gray-800 border-b pb-2">
                    <HiLightBulb className="text-3xl text-yellow-500" />{" "}
                    <span>Resolution Details</span>
                </h3>

                {ticket.leadServiceTicketResolutionDTOS.length > 0 ? (
                    ticket.leadServiceTicketResolutionDTOS.map((item: any) => (
                        <div
                            key={item.ticketResolutionId}
                            className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 mb-5"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                                        {item.updatedBy?.charAt(0)?.toUpperCase() || "U"}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {item.updatedBy ? (
                                                <>
                                                    <span className="text-gray-600">Resolved by </span>
                                                    <span className="text-blue-600">
                                                        {item.updatedBy}
                                                    </span>
                                                </>
                                            ) : (
                                                "Resolved by Unknown User"
                                            )}
                                        </h4>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(item.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div>{getStatusBadge(item.status)}</div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-1.5">
                                <p className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-line">
                                    {item.resolutionDescription || "No description provided."}
                                </p>
                            </div>

                            {/* Attachments */}
                            {item.resolutionAttachmentsDTOS &&
                                item.resolutionAttachmentsDTOS.length > 0 ? (
                                <div className="mt-4">
                                    <span className="font-medium text-gray-800 flex gap-1 items-center">
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
                                                        handleDownload(attachment.attachmentName)
                                                    }
                                                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                                                >
                                                    {attachment.attachmentName}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm mt-3 italic">
                                    No attachments available.
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-center mt-5">
                        No resolution updates found.
                    </p>
                )}

                {/* Back Button */}
                <div className="flex gap-3 justify-end mt-6">
                    {/* Back Button (secondary) */}
                    <button
                        onClick={() => store.dispatch(clearTicketNumber())}
                        className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-md shadow-sm hover:bg-blue-50 transition-colors duration-200"
                    >
                        Back
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TicketDetails;

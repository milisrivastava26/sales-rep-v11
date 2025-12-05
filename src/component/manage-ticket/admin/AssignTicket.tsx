import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import ServiceManagementForm from "../ticketResolver/ServiceManagementForm";
import {
  getInitialValuesForReassign,
  reassignForInput,
  validationSchemaForReassign,
} from "../../../data/service/service-data";
import { HiAcademicCap, HiLightBulb, HiUserAdd } from "react-icons/hi";
import { RiAttachment2 } from "react-icons/ri";
import { downloadTicketDoc } from "../../../store/tickets/download-ticket-slice";
import { getStatusBadge } from "../ticketResolver/GetStatusBadge";
import {
  reassignTicket,
  resetReassignTicket,
} from "../../../store/tickets/reassign-ticketSlice";
import { useNavigate } from "react-router-dom";
import { getAllServiceTypes } from "../../../store/tickets/get-all-serviceType-slice";
import { getServiceSubTypeById } from "../../../store/tickets/get-all-serviceSubType-slice";
import { MdFeedback } from "react-icons/md";
import { getTicketFeedback } from "../../../store/tickets/get-ticket-feedback-slice";
import { assignTicketToDepartment, resetAssignTicketToDepartment } from "../../../store/tickets/assign-ticket-to-other-department-slice";
import { getAssignee, getDepartment } from "../../../util/actions/getTicketDepartment";

const AssignTicket: React.FC = () => {
  const { ticket, isLoading } = useSelector(
    (state: RootState) => state.getTicketDetailsByNumber
  );
  const { departments } = useSelector(
    (state: RootState) => state.getAllDepartment
  );

  const [isServiceTypeAssigned, setIsServiceTypeAssigned] =
    React.useState(false);

  const [initialValues, setInitialValues] = React.useState({
    serviceType: "",
    serviceSubType: "",
    departments: [],
    remark: "",
  });

  const [isReassign, setIsReassign] = React.useState(false);

  useEffect(() => {
    if (ticket === null) {
      setIsReassign(false);
    }
  }, [])

  useEffect(() => {

    if (ticket !== null) {
      const isReassign = ticket.leadServiceTicketResolutionDTOS.some((item: any) => item.status === "Assign to other department");
      if (isReassign) {
        setIsReassign(isReassign);
        handleInitialValues();
      }
    }

  }, [ticket])

  const handleInitialValues = () => {
    if (ticket) {
      setInitialValues({
        serviceType: ticket.serviceTypeId || "",
        serviceSubType: ticket.serviceSubTypeId || "",
        departments:
          ticket.serviceDepartment.map((dept: any) => dept.departmentId) || [],
        remark: "",
      });

      // store.dispatch(getAllDepartments());
      store.dispatch(getAllServiceTypes());
      store.dispatch(getServiceSubTypeById(ticket.serviceTypeId));
    }
  };

  useEffect(() => {
    if (ticket) {
      store.dispatch(getTicketFeedback(ticket.leadServiceTicketId));
      setIsServiceTypeAssigned(!!ticket.serviceTypeId);
    }
  }, [ticket]);

  const { isLoading: isLoadingForReassign, reassignment } = useSelector(
    (state: RootState) => state.reassignTicket
  );
  const { feedback, isLoading: feedbackLoading } = useSelector(
    (state: RootState) => state.getTicketFeedback
  );
  const { isLoading: isLoadingForAssignToOtherDepartment, assignment } = useSelector((state: RootState) => state.assignTicketToOtherDepartment);


  const navigate = useNavigate();

  useEffect(() => {
    if ((!isLoadingForReassign && reassignment !== null) || (!isLoadingForAssignToOtherDepartment && assignment !== "")) {
      navigate("/manage-ticket");
      store.dispatch(resetAssignTicketToDepartment());
      store.dispatch(resetReassignTicket());
    }
  }, [reassignment, assignment]);

  const handleSubmit = (values: any) => {

    if (isReassign) {
      const assigneeIds = ticket.leadServiceTicketResolutionDTOS
        .filter((item: any) => item.status === "Assign to other department")
        .map((item: any) => item.assigneeId);

      const payload = {
        ticketId: ticket.leadServiceTicketId,
        serviceSubTypeId: values.serviceSubType,
        serviceTypeId: values.serviceType,
        departmentId: values.departments,
        assigneeId: assigneeIds,
        resolutionDescription
          : values.remark,
      };
      store.dispatch(assignTicketToDepartment(payload));
    }
    else {
      const deptId = values.departments.map((dept: any) => {
        // Handle both number and object formats safely
        return { departmentId: typeof dept === "object" ? dept.value : dept }
      });

      const payload = {
        leadServiceTicketId: ticket.leadServiceTicketId,
        serviceSubTypeId: values.serviceSubType,
        serviceTypeId: values.serviceType,
        remark: values.remark,
        serviceDepartment: deptId,
      };
      store.dispatch(reassignTicket(payload));
    }


  };

  const handleSolutionDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId: ticket.leadCaptureId,
        fileType: "tickets-resolutions",
        fileName: attachmentName,
      })
    );
  };

  const handleDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId: ticket.leadCaptureId,
        fileType: "tickets",
        fileName: attachmentName,
      })
    );
  };

  // Loading UI
  if (isLoading || !ticket || feedbackLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-600">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
        <p className="text-lg font-medium">Loading ticket details...</p>
      </div>
    );
  }

  return (
    <div className="my-4 mx-3 sm:mx-16 bg-white shadow-lg rounded-xl p-6">
      {/* Main Heading */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Ticket Details
        </h2>
      </div>

      {/* --- Student Details Section --- */}
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



      {/* --- Ticket Info Section --- */}
      {ticket && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md mb-8">
          {/* Title Number */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <span className="font-medium">Title Number: </span>
            {ticket.ticketNumber || "Untitled Ticket"}
          </h3>

          {/* Title */}
          <div className="text-sm text-gray-900 font-medium mb-3">
            Title: <span className="font-semibold">{ticket.title || "N/A"}</span>
          </div>

          {/* Description */}
          <p className="text-gray-900 text-sm mb-3">
            <span className="font-semibold">Description:</span>{" "}
            {ticket.description || "No description available."}
          </p>

          {/* Attachments */}
          <div className="flex items-start gap-3 mb-3 overflow-x-auto whitespace-nowrap">
            <p className="text-gray-900 text-sm font-semibold flex-shrink-0">
              Attachments:
            </p>

            {ticket.ticketAttachmentsDTOS && ticket.ticketAttachmentsDTOS.length > 0 ? (
              <div className="flex items-center gap-3">
                {ticket.ticketAttachmentsDTOS.map(
                  (file: { attachmentName: string }, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleDownload(file.attachmentName)}
                      className="flex items-center gap-2 bg-white border border-blue-300 hover:border-blue-500 text-blue-700 hover:text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-sm transition-all duration-200 flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      {file.attachmentName}
                    </button>
                  )
                )}
              </div>
            ) : (
              <p className="text-blue-700 text-sm italic">No attachments</p>
            )}
          </div>
        </div>
      )}


      {/* --- Assignment Details Section --- */}
      {ticket && (
        <div className="bg-white border border-blue-100 rounded-lg p-5 shadow-sm mb-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg flex gap-2 font-semibold">
              <HiUserAdd className="text-2xl text-blue-600" /> Current Assignment Details
            </h3>


          </div>

          {/* Parent Grid → 3 Equal Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">

            {/* --- Currently Assigned Departments Box --- */}
            <div className="bg-blue-50 rounded-lg p-3 break-words">
              <p className="font-medium text-gray-700">Currently Assigned To</p>

              {/* Inner Assignment Boxes */}
              <div className="flex gap-3 mt-3 flex-wrap">
                {ticket.serviceDepartment && ticket.serviceDepartment.length > 0 ? (
                  ticket.serviceDepartment.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex-grow min-w-[180px] p-3 bg-white border border-blue-200 rounded-md shadow-sm"
                    >
                      <p className="text-sm whitespace-normal break-words">
                        <span className="font-semibold">Department:</span> {item.departmentName}
                      </p>

                      <p className="text-sm mt-1 whitespace-normal break-words">
                        <span className="font-semibold">Assignee:</span> {getAssignee(item.departmentName, departments)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-1 italic">No Departments</p>
                )}
              </div>

            </div>

            {/* --- Service Type --- */}
            <div className="bg-blue-50 rounded-lg p-3 break-words">
              <p className="font-medium text-gray-700">Service Type</p>
              <p className="text-gray-900 font-semibold mt-1 break-words">
                {ticket.serviceTypeName || "N/A"}
              </p>
            </div>

            {/* --- Service Sub Type --- */}
            <div className="bg-blue-50 rounded-lg p-3 break-words">
              <p className="font-medium text-gray-700">Service Sub Type</p>
              <p className="text-gray-900 font-semibold mt-1 break-words">
                {ticket.serviceSubTypeName || "N/A"}
              </p>
            </div>

          </div>
        </div>
      )}


      {/* --- Resolution Details Section --- */}
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 shadow-sm mb-8">
        <h3 className="text-lg flex items-center gap-2 font-semibold text-gray-800 mb-4">
          <HiLightBulb className="text-2xl text-yellow-500" /> Resolution
          Details
        </h3>

        {ticket?.leadServiceTicketResolutionDTOS?.length > 0 ? (
          ticket.leadServiceTicketResolutionDTOS.map((item: any) => (
            <div
              key={item.ticketResolutionId}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-5"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">
                    {item.updatedBy?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
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
                <div>{getStatusBadge(item.status)}</div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                  {item.resolutionDescription || "No description provided."}
                </p>
              </div>

              {/* Attachments */}
              {item.resolutionAttachmentsDTOS?.length > 0 ? (
                <div className="mt-4">
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
                          className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          {attachment.attachmentName}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-xs mt-3 italic">
                  No attachments available.
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center mt-3">
            No resolution updates found.
          </p>
        )}
      </div>

      {feedback && (
        <div className="mt-10 border-t border-gray-200 py-6">
          <h3 className="text-xl flex items-center gap-2 font-semibold text-gray-900 mb-5">
            <span className="inline-flex items-center justify-center w-6 h-6  text-blue-600 rounded-md">
              <MdFeedback className="tetx-lg mt-1" />
            </span>
            Student Feedback
          </h3>

          <div
            className={`flex items-start gap-4 p-5 rounded-xl border shadow-sm ${feedback.isSatisfied
              ? "border-green-300 bg-green-50"
              : "border-red-300 bg-red-50"
              }`}
          >
            {/* Status Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full ${feedback.isSatisfied ? "bg-green-100" : "bg-red-100"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={
                  feedback.isSatisfied ? "rgb(34 197 94)" : "rgb(239 68 68)"
                }
                className="w-6 h-6"
              >
                {feedback.isSatisfied ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </div>

            {/* Feedback Content */}
            <div className="flex flex-col flex-1">
              <h4
                className={`text-lg font-semibold ${feedback.isSatisfied ? "text-green-700" : "text-red-700"
                  }`}
              >
                {feedback.isSatisfied ? "Satisfied" : "Dissatisfied"}
              </h4>

              {feedback.remark ? (
                <p className="mt-2 text-gray-800 text-sm leading-relaxed bg-white border border-gray-100 rounded-lg px-4 py-2 shadow-sm">
                  {feedback?.remark}
                </p>
              ) : (
                <p className="mt-2 text-gray-500 italic text-sm">
                  No remarks provided.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Reassign Ticket Section --- */}
      {(!isServiceTypeAssigned || isReassign) && (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg flex items-center gap-2 font-semibold text-gray-800 mb-4">
            <HiUserAdd className="text-2xl text-blue-600" /> Reassign Ticket
          </h3>
          <ServiceManagementForm
            formInputs={reassignForInput}
            initialValues={
              isServiceTypeAssigned ? initialValues : getInitialValuesForReassign(ticket)
            }
            validationSchema={validationSchemaForReassign}
            isMode="admin"
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default AssignTicket;

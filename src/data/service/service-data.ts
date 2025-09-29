import * as Yup from "yup";
import { FieldConfig } from "../../component/manage-leads/leads-details/services/ServiceManagementForm";
import { getAllServiceTypes } from "../../store/tickets/get-all-serviceType-slice";
import { getAllDepartments } from "../../store/tickets/get-all-department-slice";
import { getAllPriorities } from "../../store/tickets/get-all-priority-slice";
import { getAllAssignees } from "../../store/tickets/get-all-assignees-slice";
import { getAllStatuses } from "../../store/tickets/get-all-status-slice";

export const initialValuesForService = {
  serviceType: "",
  department: "",
  subject: "",
  description: "",
  priority: "",
  attachment: null,
  assignee: "",
};

export const validationSchemaForService = Yup.object({
  serviceType: Yup.string().required("Service type is required"),
  department: Yup.string().required("Department is required"),
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  attachment: Yup.mixed().nullable(),
  assignee: Yup.string().required("Assignee is required"),
});

export const formInputsForService: FieldConfig[] = [
  {
    name: "serviceType",
    label: "Service Type",
    type: "select",
    fetchThunk: getAllServiceTypes,
  },
  {
    name: "department",
    label: "Related Department",
    type: "select",
    fetchThunk: getAllDepartments,
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Enter Subject",
    colSpan: 2,
  },
  {
    name: "description",
    label: "Query Description",
    type: "textarea",
    placeholder: "Describe your query here...",
    colSpan: 2,
  },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    fetchThunk: getAllPriorities,
  },
  {
    name: "attachment",
    label: "Attachments",
    type: "file",
  },
  {
    name: "assignee",
    label: "Assignee",
    type: "select",
    fetchThunk: getAllAssignees,
  },
];

interface ApiTicketData {
  leadServiceTicketId: number;
  leadCaptureId: number;
  sericeTypeId: number | null;
  serviceTypeName: string;
  servicePriorityId: number | null;
  servicePriorityName: string;
  serviceDepartmentId: number | null;
  serviceDepartmentName: string;
  ticketNumber: string;
  title: string;
  description: string;
  attachmentPath: string | null;
  attachmentName: string | null;
  status: string;
  assigneeId: number | null;
  assignee: string;
  createdAt: string;
}

interface FormInitialValues {
  serviceType: string | number;
  department: string | number;
  subject: string;
  description: string;
  priority: string | number;
  attachment: File | null;
  assignee: string | number;
}

export const transformTicketDataToInitialValues = (apiData: ApiTicketData): FormInitialValues => {
  return {
    serviceType: apiData.sericeTypeId ?? "", // use ID if exists, else empty string
    department: apiData.serviceDepartmentId ?? "",
    subject: apiData.title || "",
    description: apiData.description || "",
    priority: apiData.servicePriorityId ?? "",
    attachment: apiData.attachmentName
      ? new File([], apiData.attachmentName) // placeholder File, real upload file needs user selection
      : null,
    assignee: apiData.assigneeId ?? "", // use ID if exists, else empty string
  };
};

export const formInputsForTicketResolution: FieldConfig[] = [
  {
    name: "description",
    label: "Resolution Description",
    type: "textarea",
    placeholder: "Describe your query here...",
    colSpan: 2,
  },
  {
    name: "attachment",
    label: "Attachments",
    type: "file",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    fetchThunk: getAllStatuses,
  },
];

export const initialValuesForTicketResolution = {
  description: "",
  attachment: null,
  status: "",
};

export const validationSchemaForTicketResolution = Yup.object({
  description: Yup.string().required("Description is required"),
  attachment: Yup.mixed().nullable(),
  status: Yup.string().required("Status is required"),
});

interface ResolutionValues {
  description: string;
  attachment: File | null;
  status: number | string;
}

export const buildResolutionFormData = (values: ResolutionValues, leadServiceTicketId: number): FormData => {
  const formData = new FormData();

  // Build the resolutionData object
  const resolutionData = {
    leadServiceTicketId,
    status: values.status,
    attachmentName: values.attachment ? values.attachment.name : "",
    resolutionDescription: values.description,
  };

  // Append JSON as string
  formData.append("resolutionData", JSON.stringify(resolutionData));

  // Append file if present
  if (values.attachment) {
    formData.append("file", values.attachment);
  }

  return formData;
};

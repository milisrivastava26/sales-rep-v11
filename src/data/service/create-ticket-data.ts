import { getAllDepartments } from "../../store/tickets/get-all-department-slice";
import * as Yup from "yup";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "file"
  | "multi-select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  colSpan?: number;
  fetchThunk?: any;
  isMultiple?: boolean;
}


export const formInputsForService: FieldConfig[] = [
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Enter Subject",
    colSpan: 2,
  },
  {
    name: "departments",
    label: "Department",
    type: "multi-select",
    fetchThunk: getAllDepartments,
  },
  {
    name: "description",
    label: "Query Description",
    type: "textarea",
    placeholder: "Please describe your grievance clearly with all relevant details — include what happened, when and where it occurred, names of any related student(s)/staff, and attach any supporting documents to help us resolve it quickly.",
    colSpan: 2,
  },

  {
    name: "attachments",
    label: "Attachments",
    type: "file",
    isMultiple: true,
  },
];

export const initialValuesForService = {
  subject: "",
  description: "",
  attachments: [],
  departments: [],
};

export const validationSchemaForService = Yup.object({
  subject: Yup.string().required("Subject is required"),
  description: Yup.string().required("Description is required"),
  departments: Yup.array()
    .min(1, "At least one department must be selected")
    .required("Department is required"),
  // attachments: Yup.array()
  //   .of(Yup.mixed().required("File is required"))
  //   .min(1, "At least one file is required"),
});
export interface TicketAttachmentDTO {
  attachmentName: string;
}


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
  ticketAttachmentsDTOS?: TicketAttachmentDTO[];
  status: string;
  assigneeId: number | null;
  assignee: string;
  createdAt: string;
  sericeSubTypeId: string;
  attachmentName: string;
  serviceDepartment: {
    departmentId: string;
  }[];
}

interface FormInitialValues {
  subject: string;
  description: string;
  attachments: string[];
  departments: string[];
}


export const transformTicketDataToInitialValues = (
  apiData: ApiTicketData
): FormInitialValues => {
  return {
    subject: apiData.title || "",
    description: apiData.description || "",
    departments: apiData.serviceDepartment.map((dept) => dept.departmentId) || [],
    attachments: Array.isArray(apiData.ticketAttachmentsDTOS)
      ? apiData.ticketAttachmentsDTOS.map((item) => item.attachmentName)
      : apiData.attachmentName
      ? [apiData.attachmentName]
      : [],
  };
};
import * as Yup from "yup";
import { FieldConfig } from "../../component/manage-ticket/ticketResolver/ServiceManagementForm";
import { getAllStatuses } from "../../store/tickets/get-all-status-slice";
import { getAllServiceTypes } from "../../store/tickets/get-all-serviceType-slice";

export const getFormInputsForTicketResolution = (): FieldConfig[] => {
  const baseFields: FieldConfig[] = [
    {
      name: "status",
      label: "Status",
      type: "select",
      fetchThunk: getAllStatuses,
    },
    {
      name: "description",
      label: "Resolution Description",
      type: "textarea",
      placeholder: "Describe your query here...",
      colSpan: 2,
    },
    {
      name: "attachments",
      label: "Attachments",
      type: "file",
      isMultiple: true,
    },
  ];
  return baseFields;
};

export const getInitialValuesForTicketResolution = () => {
  const baseValues = {
    status: "",
    description: "",
    attachments: [],
  };

  return baseValues;
};

export const getValidationSchemaForTicketResolution = () => {
  const baseSchema = {
    status: Yup.string().required("Status is required"),
    description: Yup.string().required("Description is required"),
    // attachments: Yup.array()
    //   .of(Yup.mixed().required("File is required"))
    //   .min(1, "At least one file is required"),
  };

  return Yup.object(baseSchema);
};

interface ResolutionValues {
  description: string;
  attachments: File | null;
  status: number | string;
}

export const buildResolutionFormData = (
  values: ResolutionValues,
  leadServiceTicketId: any,
  userName: string
): FormData => {
  const formData = new FormData();

  // Build the resolutionData object
  const resolutionData = {
    leadServiceTicketId,
    status: values.status,
    resolutionDescription: values.description,
    assignee: userName,
    serviceTicketId: leadServiceTicketId,
  };

  // Append JSON as string
  formData.append("resolutionData", JSON.stringify(resolutionData));

  // Append files if present
  if (Array.isArray(values.attachments) && values.attachments.length > 0) {
    values.attachments.forEach((file: File) => {
      formData.append("files", file); // backend should expect 'files' as array
    });
  }

  return formData;
};

export const buildResolutionUpdateFormData = (
  values: ResolutionValues,
  leadCaptureId: any,
  resolutionId: any
): FormData => {
  const formData = new FormData();

  // Build the resolutionData object
  const resolutionData = {
    status: values.status,
    description: values.description,
    leadCaptureId,
    ticketResolutionId: resolutionId,
  };

  // Append JSON as string
  formData.append("resolutionData", JSON.stringify(resolutionData));

  // Append files if present
  if (Array.isArray(values.attachments) && values.attachments.length > 0) {
    values.attachments.forEach((file: File) => {
      formData.append("files", file); // backend should expect 'files' as array
    });
  }

  return formData;
};

export const filterInputDataForManageTicket = [
  {
    name: "typeId",
    label: "Service Type",
    type: "select",
    fetchThunk: getAllServiceTypes,
  },
  {
    name: "subTypeId",
    label: "Service Sub Type",
    type: "select",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    fetchThunk: getAllStatuses,
  },
  {
    name: "isAssigned",
    label: "Assignee Status",
    type: "select",
  },
  {
    name: "fromDate",
    label: "From Date",
    type: "date",
  },
  {
    name: "toDate",
    label: "To Date",
    type: "date",
  },
];

export const initialFilterDataForManageTicket = {
  typeId: null,
  subTypeId: null,
  status: null,
  isAssigned: null,
  fromDate: null,
  toDate: null,
};

export const reassignForInput: FieldConfig[] = [
  {
    name: "serviceType",
    label: "Service Type",
    type: "select",
    fetchThunk: getAllServiceTypes,
  },
  {
    name: "serviceSubType",
    label: "Service Sub Type",
    type: "select",
  },
  {
    name: "departments",
    label: "Department",
    type: "multi-select",
  },
  {
    name: "remark",
    label: "Remark",
    type: "textarea",
    placeholder: "Describe your query here...",
    colSpan: 2,
  },
];

export const assignToOtherDeptFormInput: FieldConfig[] = [
  {
    name: "serviceType",
    label: "Service Type",
    type: "select",
    fetchThunk: getAllServiceTypes,
  },
  {
    name: "serviceSubType",
    label: "Service Sub Type",
    type: "select",
  },
  {
    name: "departments",
    label: "Department",
    type: "multi-select",
  },
];


export const getInitialValuesForReassign = (data: any = {}) => {
  return {
    serviceType: null,
    serviceSubType: null,
    departments: Array.isArray(data.serviceDepartment)
      ? data.serviceDepartment.map((dept: any) => dept.departmentId)
      : [],
    remark: "",
  };
};


export const validationSchemaForReassign = Yup.object({
  serviceType: Yup.string().required("Service Type is required"),
  serviceSubType: Yup.string().required("Service Sub Type is required"),
  departments: Yup.array()
    .min(1, "At least one assignee must be selected")
    .required("Assignee is required"),
  remark: Yup.string().required("Remark is required"),
});

export const validationSchemaForAssignToOtherDept = Yup.object({
  serviceType: Yup.string().required("Service Type is required"),
  serviceSubType: Yup.string().required("Service Sub Type is required"),
  departments: Yup.array()
    .min(1, "At least one assignee must be selected")
    .required("Assignee is required"),
});

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "34px", // ✅ reduced height
    height: "34px",
    fontSize: "14px",
    padding: "0 2px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 6px",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "34px",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "2px",
  }),
};

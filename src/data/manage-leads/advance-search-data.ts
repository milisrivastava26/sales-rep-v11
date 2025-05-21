export const advanceSearchData = {
  title: "Select Criteria",
  cancelButton: "Cancel",
  saveButton: "Search",
};

export const advanceSearchStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: "28px",
    fontSize: "11px",
    padding: "0px",
    borderRadius: "6px",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0px 6px",
    fontSize: "14px",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    fontSize: "12px",
    borderRadius: "4px",
    padding: "2px 4px",
    backgroundColor: "#eff6ff",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    fontSize: "12px",
    padding: "2px 4px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    padding: "2px",
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "#bfdbfe",
      color: "#1e3a8a",
    },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "4px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    fontSize: "12px",
    borderRadius: "6px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: "4px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "12px",
    padding: "6px 10px",
    backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#eff6ff" : "white",
    color: state.isSelected ? "white" : "#1e293b",
    "&:hover": {
      backgroundColor: "#dbeafe",
      color: "#1e3a8a",
    },
  }),
};

export const advanceSearchColumnData = [
  {
    id: 0,
    name: "leadCaptureId",
    label: "Lead Capture Id",
    isReadOnly: true,
  },
  {
    id: 1,
    name: "name",
    label: "Name",
    isReadOnly: true,
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    isReadOnly: false,
  },
  {
    id: 3,
    name: "phone",
    label: "Phone",
    isReadOnly: true,
  },
  {
    id: 4,
    name: "leadCaptureCreatedAt",
    label: "Lead Capture Created At",
    isReadOnly: false,
  },
  {
    id: 5,
    name: "leadEnquiryId",
    label: "Lead Enquiry Id",
    isReadOnly: false,
  },
  {
    id: 6,
    name: "status",
    label: "Status",
    isReadOnly: false,
  },
  {
    id: 7,
    name: "actionTrackId",
    label: "Action Track Id",
    isReadOnly: false,
  },
  {
    id: 8,
    name: "leadEnquiryCreatedAt",
    label: "Lead Enquiry Created At",
    isReadOnly: false,
  },
  {
    id: 9,
    name: "career",
    label: "Career",
    isReadOnly: true,
  },
  {
    id: 10,
    name: "program",
    label: "Program",
    isReadOnly: true,
  },
  {
    id: 11,
    name: "state",
    label: "State",
    isReadOnly: false,
  },
  {
    id: 12,
    name: "city",
    label: "City",
    isReadOnly: false,
  },
  {
    id: 13,
    name: "leadSource",
    label: "Lead Source",
    isReadOnly: false,
  },
  {
    id: 14,
    name: "session",
    label: "Session",
    isReadOnly: false,
  },
  {
    id: 15,
    name: "salesRepName",
    label: "Sales Rep Name",
    isReadOnly: false,
  },
  {
    id: 16,
    name: "salesRepPhone",
    label: "Sales Rep Phone",
    isReadOnly: false,
  },
  {
    id: 17,
    name: "salesRepEmail",
    label: "Sales Rep Email",
    isReadOnly: false,
  },
  {
    id: 18,
    name: "applicationStatus",
    label: "Application Status",
    isReadOnly: false,
  },
  {
    id: 19,
    name: "feeStatus",
    label: "Fee Status",
    isReadOnly: false,
  },
  {
    id: 20,
    name: "yearlyCourseFee",
    label: "Yearly Course Fee",
    isReadOnly: false,
  },
  {
    id: 21,
    name: "scholarshipDiscount",
    label: "Scholarship Discount",
    isReadOnly: false,
  },
  {
    id: 22,
    name: "specialDiscount",
    label: "Special Discount",
    isReadOnly: false,
  },
  {
    id: 23,
    name: "totalDiscount",
    label: "Total Discount",
    isReadOnly: false,
  },
  {
    id: 24,
    name: "netFee",
    label: "Net Fee",
    isReadOnly: false,
  },
  {
    id: 25,
    name: "pyApplicationFee",
    label: "Previous Year Application Fee",
    isReadOnly: false,
  },
  {
    id: 26,
    name: "pyCourseFee",
    label: "Previous Year Course Fee",
    isReadOnly: false,
  },
  {
    id: 27,
    name: "scholarshipCategory",
    label: "Scholarship Category",
    isReadOnly: false,
  },
  {
    id: 28,
    name: "scholarshipScheme",
    label: "Scholarship Scheme",
    isReadOnly: false,
  },
  {
    id: 29,
    name: "scholarshipSlab",
    label: "Scholarship Slab",
    isReadOnly: false,
  },
  {
    id: 30,
    name: "percentageDiscount",
    label: "Percentage Discount",
    isReadOnly: false,
  },
  {
    id: 31,
    name: "applicableOn",
    label: "Applicable On",
    isReadOnly: false,
  },
];

export interface advanceSearchResponse {
  leadCaptureId: number;
  name: string;
  email: string;
  phone: string;
  leadCaptureCreatedAt: string;
  leadEnquiryId: number;
  status: string;
  actionTrackId: string;
  leadEnquiryCreatedAt: string;
  career: string;
  program: string;
  state: string;
  city: string;
  leadSource: string;
  session: string;
  salesRepName: string;
  salesRepPhone: string;
  salesRepEmail: string;
  applicationStatus: string;
  feeStatus: string;
  yearlyCourseFee: number | null;
  scholarshipDiscount: number | null;
  specialDiscount: number | null;
  totalDiscount: number | null;
  netFee: number | null;
  pyApplicationFee: number | null;
  pyCourseFee: number | null;
  scholarshipCategory: string;
  scholarshipScheme: string;
  scholarshipSlab: string;
  percentageDiscount: number;
  applicableOn: string;
}

export const advanceSearchHamburgerModalData = {
  title: "Manage Columns",
  cancelButton: "Save",
  saveButton: "Save",
};

type Mode = "include" | "exclude";
type FieldType =
  | "career"
  | "program"
  | "city"
  | "state"
  | "lead_source"
  | "lead_stage"
  | "lead_sub_stage"
  | "application_status"
  | "name"
  | "email"
  | "phone";

interface FieldInput {
  type: FieldType;
  mode: Mode;
  value: string[];
  from?: string;
  to?: string;
}

type FilterPayload = Record<string, string[]>;

export function buildFilterArrays(fields: FieldInput[] = []): FilterPayload {
  const typeMap: Record<FieldType, string> = {
    career: "AcademicCareerDescription",
    program: "AcademicProgramDescription",
    city: "CityName",
    state: "StateName",
    lead_source: "LeadSourceDescription",
    lead_stage: "CurrentLeadStageDisplayName",
    lead_sub_stage: "CurrentLeadSubStageDisplayName",
    application_status: "ApplicationStatusName",
    name: "LeadName",
    email: "LeadEmail",
    phone: "LeadPhone",
  };

  const result: FilterPayload = {};

  for (const { type, mode, value } of fields) {
    const suffix = typeMap[type];
    if (!suffix || !mode || !Array.isArray(value)) continue;

    const key = `${mode}${suffix}`;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(...value);
  }

  return result;
}

export function getCurrentSalesReps(data: any) {
  const filters = data?.fields;
  const salesRepFilter = filters.find((item: any) => item.type === "salesrep_name");
  return salesRepFilter ? salesRepFilter.value : [];
}

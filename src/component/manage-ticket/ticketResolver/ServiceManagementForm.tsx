import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../../store";
import { downloadTicketDoc } from "../../../store/tickets/download-ticket-slice";
import { useNavigate, useParams } from "react-router-dom";
import FilePreview from "./FilePreview";
import { getAllAssignees } from "../../../store/tickets/get-all-assignees-slice";
import { customSelectStyles } from "../../../data/service/service-data";
import { getServiceSubTypeById } from "../../../store/tickets/get-all-serviceSubType-slice";

// Types
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

interface ServiceFormProps {
  initialValues: Record<string, any>;
  validationSchema: any;
  formInputs: FieldConfig[];
  onSubmit?: (
    values: Record<string, any>,
    formikHelpers: FormikHelpers<Record<string, any>>
  ) => void | Promise<any>;
  isMode: string;
  setIsCreateTicket?: (e: any) => void;
}

const ServiceManagementForm: React.FC<ServiceFormProps> = ({
  initialValues,
  validationSchema,
  formInputs,
  onSubmit,
  isMode,
  setIsCreateTicket
}) => {

  const dispatch = useDispatch<AppDispatch>();
  const { leadCaptureId } = useParams();
  const [loadingField, setLoadingField] = useState<string | null>(null);

  const { serviceTypes } = useSelector(
    (state: RootState) => state.getAllServiceType
  );
  const { departments } = useSelector(
    (state: RootState) => state.getAllDepartment
  );

  const { assignees } = useSelector(
    (state: RootState) => state.getAllAssignees
  );

  const { serviceSubTypes } = useSelector(
    (state: RootState) => state.getServiceSubType
  );
  const { statuses } = useSelector((state: RootState) => state.getAllStatuses);
  const { isLoading } = useSelector((state: RootState) => state.createTicket);
  const { isLoading: isLoadingForSolution } = useSelector(
    (state: RootState) => state.giveSolution
  );
  const { isLoading: isLoadingForReassign } = useSelector(
    (state: RootState) => state.reassignTicket
  );

  const { isLoading: isLoadingForUpdateSolution } = useSelector(
    (state: RootState) => state.updateSolution
  );

  const { isLoading: isLoadingForAssignToOtherDepartment } = useSelector((state: RootState) => state.assignTicketToOtherDepartment);

  const handleDownload = (attachmentName: string) => {
    store.dispatch(
      downloadTicketDoc({
        leadCaptureId: leadCaptureId,
        fileType: "tickets",
        fileName: attachmentName,
      })
    );
  };

  const handleCancel = () => {
    if (isMode !== "ticketCreator") {
      navigate(-1);
    } else {
      setIsCreateTicket && setIsCreateTicket(false);
    }
  };

  const getOptionsFromStore = (fieldName: string) => {
    switch (fieldName) {
      case "serviceType":
        return (
          serviceTypes?.map((s: any) => ({ value: s.id, label: s.name })) || []
        );
      case "departments":
        return (
          departments?.map((d: any) => ({ value: d.id, label: d.name })) || []
        );
      case "serviceSubType":
        return (
          serviceSubTypes?.map((p: any) => ({ value: p.id, label: p.name })) ||
          []
        );
      case "assignee":
        return (
          assignees?.map((p: any) => ({
            value: p.assigneeId,
            label: p.assigneeEmail,
          })) || []
        );
      case "status":
        return (
          statuses?.map((p: any) => ({ value: p.status, label: p.status })) ||
          []
        );
      default:
        return [];
    }
  };

  const handleDepartmentChange = async (
    departmentId: string,
    setFieldValue: any
  ) => {
    setFieldValue("department", departmentId);
    setFieldValue("assignee", "");

    if (departmentId) {
      store.dispatch(getAllAssignees(departmentId));
    }
  };

  const handleFetch = async (field: FieldConfig) => {
    if (!field.fetchThunk) return;
    setLoadingField(field.name);
    await dispatch(field.fetchThunk());
    setLoadingField(null);
  };

  const navigate = useNavigate();

  return (
    <div className=" px-6 pb-6 pt-3">

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit || (() => { })}
      >
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-2 gap-6">
            {formInputs.map((field) => (
              <div
                key={field.name}
                className={field.colSpan === 2 ? "col-span-2" : "col-span-1"}
              >
                <label className="block text-sm font-medium text-gray-800">
                  {field.label}
                </label>

                {/* Select Field */}
                {field.type === "select" ? (
                  <Select
                    options={getOptionsFromStore(field.name)}
                    isLoading={loadingField === field.name}
                    onMenuOpen={() => handleFetch(field)}
                    styles={customSelectStyles}
                    onChange={(option) => {
                      if (field.name === "department") {
                        handleDepartmentChange(option?.value, setFieldValue);
                      } else if (field.name === "serviceType") {
                        setFieldValue(field.name, option?.value);
                        store.dispatch(getServiceSubTypeById(option?.value));
                      } else {
                        setFieldValue(field.name, option?.value);
                      }
                    }}
                    placeholder={`Select ${field.label}`}
                    isDisabled={isMode === "update"}
                    value={
                      getOptionsFromStore(field.name).find(
                        (opt) => opt.value === values[field.name]
                      ) || null
                    }
                  />
                ) : field.type === "multi-select" ? (
                  <Select
                    options={getOptionsFromStore(field.name)}
                    isMulti
                    onMenuOpen={() => handleFetch(field)}
                    closeMenuOnSelect={false}
                    placeholder={`Select ${field.label}`}
                    isDisabled={isMode === "update"}
                    styles={customSelectStyles}
                    value={getOptionsFromStore(field.name).filter((opt) =>
                      Array.isArray(values[field.name])
                        ? values[field.name].includes(opt.value)
                        : false
                    )}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((opt) => opt.value)
                        : [];
                      setFieldValue(field.name, selectedValues);
                    }}
                  />
                ) : field.type === "textarea" ? (
                  <Field
                    as="textarea"
                    disabled={isMode === "update"}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full mt-1 p-2 border rounded-md text-sm h-24 resize-none"
                  />
                ) : field.type === "file" && field.isMultiple ? (
                  <Field name={field.name}>
                    {() => (
                      <div className="space-y-2">
                        {/* 🔹 If in update mode, just show existing attachment names */}
                        {isMode === "update" ? (
                          <>
                            {Array.isArray(values[field.name]) &&
                              values[field.name].length > 0 ? (
                              values[field.name].map(
                                (fileName: string, index: number) => (
                                  <p
                                    key={index}
                                    onClick={() => handleDownload(fileName)}
                                    className="text-sm text-blue-600 hover:text-blue-700 underline cursor-pointer mb-1"
                                  >
                                    {fileName}
                                  </p>
                                )
                              )
                            ) : (
                              <p className="text-gray-500 text-sm">
                                No attachments
                              </p>
                            )}
                          </>
                        ) : (
                          /* 🔹 Create mode — use FilePreview for uploads */
                          <FilePreview
                            files={values[field.name] || []}
                            onDelete={(index) => {
                              const newFiles = [...(values[field.name] || [])];
                              newFiles.splice(index, 1);
                              setFieldValue(field.name, newFiles);
                            }}
                            onAdd={(newFiles) => {
                              if (!newFiles) return;
                              setFieldValue(field.name, [
                                ...(values[field.name] || []),
                                ...Array.from(newFiles),
                              ]);
                            }}
                            disabled={isMode === "update"}
                          />
                        )}
                      </div>
                    )}
                  </Field>
                ) : (
                  <Field
                    type="text"
                    disabled={isMode === "update"}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full mt-1 p-2 border rounded-md text-sm"
                  />
                )}

                <ErrorMessage
                  name={field.name}
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            ))}

            {/* Actions */}

            {isMode !== "update" && <div className="col-span-2 flex justify-end gap-3">
              <button
                type="reset"
                onClick={handleCancel}
                className="px-4 py-1.5 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  isLoadingForSolution ||
                  isLoadingForReassign ||
                  isLoadingForUpdateSolution ||
                  isLoadingForAssignToOtherDepartment
                }
                className={`${isLoading ||
                  isLoadingForSolution ||
                  isLoadingForReassign ||
                  isLoadingForUpdateSolution ||
                  isLoadingForAssignToOtherDepartment
                  ? "bg-opacity-50"
                  : ""
                  } px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
              >
                Submit
              </button>
            </div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceManagementForm;

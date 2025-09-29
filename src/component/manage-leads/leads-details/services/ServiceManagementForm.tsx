import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../../../store";

export type FieldType = "text" | "textarea" | "select" | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  colSpan?: number;
  fetchThunk?: any;
}

import { FormikHelpers } from "formik";
import { setLeadServiceTicketId, setViewTicketId } from "../../../../store/ui/ui-slice";

interface ServiceFormProps {
  initialValues: Record<string, any>;
  validationSchema: any;
  formInputs: FieldConfig[];
  onSubmit?: (values: Record<string, any>, formikHelpers: FormikHelpers<Record<string, any>>) => void | Promise<any>;
  isMode: string;
  setIsCreateTicket?: (e: any) => void;
}

const ServiceManagementForm: React.FC<ServiceFormProps> = ({ initialValues, validationSchema, formInputs, onSubmit, isMode, setIsCreateTicket }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingField, setLoadingField] = useState<string | null>(null);

  const { serviceTypes } = useSelector((state: RootState) => state.getAllServiceType);
  const { departments } = useSelector((state: RootState) => state.getAllDepartment);
  const { priorities } = useSelector((state: RootState) => state.getAllPriority);
  const { assignees } = useSelector((state: RootState) => state.getAllAssignees);
  const { statuses } = useSelector((state: RootState) => state.getAllStatuses);
  const { isLoading } = useSelector((state: RootState) => state.createTicket);
  const { viewTicketId } = useSelector((state: RootState) => state.ui);
  const { isLoading: isLoadingForSolution } = useSelector((state: RootState) => state.giveSolution);

  // Map field.name → store data
  const getOptionsFromStore = (fieldName: string) => {
    switch (fieldName) {
      case "serviceType":
        return serviceTypes?.map((s: any) => ({ value: s.id, label: s.name })) || [];
      case "department":
        return departments?.map((d: any) => ({ value: d.id, label: d.name })) || [];
      case "priority":
        return priorities?.map((p: any) => ({ value: p.id, label: p.name })) || [];
      case "assignee":
        return assignees?.map((p: any) => ({ value: p.id, label: p.fullName })) || [];
      case "status":
        return statuses?.map((p: any) => ({ value: p.status, label: p.status })) || [];
      default:
        return [];
    }
  };

  const handleFetch = async (field: FieldConfig) => {
    if (!field.fetchThunk) return;
    setLoadingField(field.name);
    await dispatch(field.fetchThunk()); // thunk dispatch
    setLoadingField(null);
  };

  return (
    <div className="bg-white shadow rounded-lg px-6 pb-6 pt-3">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 mb-2">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {isMode === "create" && <span>{new Date().toLocaleDateString()}</span>}
          {isMode === "update" && <span className="font-semibold text-black bg-gray-300 px-2 py-2 rounded-lg">Ticket No : {viewTicketId}</span>}
        </div>
        {isMode === "update" && (
          <button onClick={() => store.dispatch(setViewTicketId(""))} className={` px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700`}>
            Back
          </button>
        )}
      </div>

      {/* Form */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit || (() => {})}>
        {({ setFieldValue, values }) => (
          <Form className="grid grid-cols-2 gap-6">
            {formInputs.map((field) => (
              <div key={field.name} className={field.colSpan === 2 ? "col-span-2" : "col-span-1"}>
                <label className="block text-sm font-medium text-gray-800">{field.label}</label>

                {field.type === "select" ? (
                  <Select
                    options={getOptionsFromStore(field.name)}
                    isLoading={loadingField === field.name}
                    onMenuOpen={() => handleFetch(field)}
                    onChange={(option) => setFieldValue(field.name, option?.value)}
                    placeholder={`Select ${field.label}`}
                    isDisabled={isMode === "update"}
                    value={getOptionsFromStore(field.name).find((opt) => opt.value === values[field.name]) || null}
                  />
                ) : field.type === "textarea" ? (
                  <Field
                    as="textarea"
                    disabled={isMode === "update"}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full mt-1 p-2 border rounded-md text-sm h-24 resize-none"
                  />
                ) : field.type === "file" ? (
                  <div>
                    {values[field.name] && typeof values[field.name] === "string" && <p className="text-sm text-gray-500 mb-1">Current File: {values[field.name]}</p>}
                    <input
                      type="file"
                      disabled={isMode === "update"}
                      className="w-full mt-1 px-2 py-1.5 border rounded-md text-sm"
                      onChange={(e) => setFieldValue(field.name, e.currentTarget.files?.[0])}
                    />
                  </div>
                ) : (
                  <Field type="text" disabled={isMode === "update"} name={field.name} placeholder={field.placeholder} className="w-full mt-1 p-2 border rounded-md text-sm" />
                )}

                <ErrorMessage name={field.name} component="p" className="text-red-500 text-xs mt-1" />
              </div>
            ))}

            {/* Actions */}
            {(isMode === "create" || isMode === "solutionCreate") && (
              <div className="col-span-2 flex justify-end gap-3">
                <button
                  type="reset"
                  onClick={() => {
                    if (isMode === "create") {
                      setIsCreateTicket && setIsCreateTicket(false);
                    } else {
                      store.dispatch(setViewTicketId(""));
                      store.dispatch(setLeadServiceTicketId(0));
                    }
                  }}
                  className="px-4 py-1.5 border rounded-md text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || isLoadingForSolution}
                  className={`${isLoading || isLoadingForSolution ? "bg-opacity-50" : ""} px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
                >
                  Submit
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServiceManagementForm;

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../store";
import {
  filterInputDataForManageTicket,
  initialFilterDataForManageTicket,
} from "../../data/service/service-data";
import { getServiceSubTypeById } from "../../store/tickets/get-all-serviceSubType-slice";
import { getAllAssignees } from "../../store/tickets/get-all-assignees-slice";
import { getAllTicketsForAdmin } from "../../store/manage-ticket/get-TicketLeadsData-forAdmin-slice";

interface PropsType {
  onSubmit: (values: any) => void;
}

const ManageTicketFilter: React.FC<PropsType> = ({ onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isApplyEnabled, setIsApplyEnabled] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const { statuses } = useSelector((state: RootState) => state.getAllStatuses);
  const { departments } = useSelector((state: RootState) => state.getAllDepartment);
  const { serviceSubTypes } = useSelector((state: RootState) => state.getServiceSubType);
  const { serviceTypes } = useSelector((state: RootState) => state.getAllServiceType);

  // ✅ Fixed: Proper true/false values
  const assignDropdownData = [
    { value: true, label: "Assigned" },
    { value: false, label: "Not Assigned" },
  ];

  const optionsMap: Record<string, any[]> = {
    typeId: serviceTypes.map((item: any) => ({
      value: item.id,
      label: item.name,
    })),
    subTypeId: serviceSubTypes || [],
    status:
      statuses?.map((item) => ({
        value: item.id,
        label: item.status,
      })) || [],
    department:
      departments?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    isAssigned: assignDropdownData, // ✅ simplified and consistent
  };

  const handleDropdownOpen = (field: any) => {
    const existingData = optionsMap[field.name];
    if (field.fetchThunk && (!existingData || existingData.length === 0)) {
      dispatch(field.fetchThunk());
    }
  };

  return (
    <Formik
      initialValues={initialFilterDataForManageTicket}
      onSubmit={(values) => {
        onSubmit(values);
        setIsApplied(true);
        setIsApplyEnabled(false);
      }}
    >
      {({ setFieldValue, values, resetForm }) => (
        <Form className="w-full bg-gray-100 shadow-sm rounded-lg p-4">
          <div className="flex flex-wrap items-end gap-3">
            {filterInputDataForManageTicket.map((field) => {
              const key = field.name;
              return (
                <div
                  key={field.name}
                  className="flex flex-col min-w-[160px] max-w-[180px]"
                >
                  <label className="text-[11px] font-medium text-gray-600 mb-[2px]">
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <Select
                      isClearable
                      isSearchable
                      name={field.name}
                      onMenuOpen={() => handleDropdownOpen(field)}
                      value={
                        optionsMap[key]?.find(
                          (opt) =>
                            opt.value ===
                            values[field.name as keyof typeof values]
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        setIsApplyEnabled(true);
                        setIsApplied(false);

                        if (field.name === "typeId") {
                          store.dispatch(
                            getServiceSubTypeById(selectedOption?.value)
                          );
                        } else if (field.name === "department") {
                          store.dispatch(
                            getAllAssignees(selectedOption?.value)
                          );
                        }

                        setFieldValue(
                          field.name as keyof typeof values,
                          selectedOption ? selectedOption.value : ""
                        );
                      }}
                      // ✅ Correct mapping to prefer real value
                      options={
                        optionsMap[key]?.map((opt) => ({
                          value: opt.value ?? opt.id,
                          label: opt.label ?? opt.name,
                        })) || []
                      }
                      placeholder="Select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "28px",
                          height: "28px",
                          fontSize: "0.8rem",
                          borderRadius: "6px",
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: "0 4px",
                          height: "28px",
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          height: "28px",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          padding: "2px",
                        }),
                        clearIndicator: (base) => ({
                          ...base,
                          padding: "2px",
                        }),
                        input: (base) => ({
                          ...base,
                          margin: 0,
                          padding: 0,
                        }),
                      }}
                    />
                  ) : (
                    <Field
                      type={field.type}
                      name={field.name}
                      className="border border-gray-300 text-[13px] rounded-md px-2 py-[3px] h-[28px] focus:outline-none focus:ring-1 focus:ring-blue-400"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                        setIsApplyEnabled(true);
                        setIsApplied(false);
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* ✅ Apply / Reset Button */}
            <div className="flex items-center gap-2 mt-[2px]">
              <button
                type={isApplied ? "button" : "submit"}
                disabled={!isApplyEnabled && !isApplied}
                onClick={() => {
                  if (isApplied) {
                    resetForm();
                    setIsApplied(false);
                    setIsApplyEnabled(false);
                    store.dispatch(
                      getAllTicketsForAdmin(initialFilterDataForManageTicket)
                    );
                  }
                }}
                className={`${
                  isApplied
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : isApplyEnabled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } text-sm px-4 py-[4px] rounded-md transition h-[28px]`}
              >
                {isApplied ? "Reset" : "Apply"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ManageTicketFilter;

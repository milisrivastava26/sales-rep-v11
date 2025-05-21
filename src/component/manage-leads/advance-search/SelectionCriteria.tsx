import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Select from "react-select";
import * as Yup from "yup";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { advanceSearchStyle } from "../../../data/manage-leads/advance-search-data";
import { getAllLeadFieldByName } from "../../../store/advance-search/get-allLeadField-byName-slice";
import { resetViewLeadResponse } from "../../../store/advance-search/get-coreViewLead-byQuery-slice";
import toast from "react-hot-toast";
import { getAllLeadNames } from "../../../store/advance-search/get-all-leadName-slice";
import { getAllLeadEmails } from "../../../store/advance-search/get-all-leadEmail-slice";
import { getAllLeadPhones } from "../../../store/advance-search/get-all-leadPhone-slice";
import { getAllLeadCareers } from "../../../store/advance-search/get-all-leadCareer-slice";
import { getAllLeadPrograms } from "../../../store/advance-search/get-all-leadProgram-slice";
import { getAllLeadStates } from "../../../store/advance-search/get-all-leadState-slice";
import { getAllLeadCitys } from "../../../store/advance-search/get-all-leadCity-slice";
import { getAllLeadSourses } from "../../../store/advance-search/get-all-leadSourse-slice";
import { getAllLeadStages } from "../../../store/advance-search/get-all-leadStage-slice";
import { getAllLeadSubStages } from "../../../store/advance-search/get-all-leadSubStage-slice";
import { getAllLeadApplicationStatus } from "../../../store/advance-search/get-all-leadApplicationStatus-slice";

interface selectionCriteriaPropsType {
  setFilterQuery: (e: any) => void;
  filterQuery: {
    fields: Array<{
      type: string;
      mode: string;
      value: any;
      to: string;
      from: string;
    }>;
  };
  getAdvanceSearchData: (e: any) => void;
}

const SelectionCriteria: React.FC<selectionCriteriaPropsType> = ({ setFilterQuery, filterQuery, getAdvanceSearchData }) => {
  const dispatch = store.dispatch;
  const [selectedValue, setSelectedValue] = useState<any>();

  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { responseLeadNameData } = useSelector((state: RootState) => state.getAllLeadNameData);
  const { responseLeadEmailData } = useSelector((state: RootState) => state.getAllLeadEmailsData);
  const { responseLeadPhoneData } = useSelector((state: RootState) => state.getAllLeadPhonesData);
  const { responseLeadCareerData } = useSelector((state: RootState) => state.getAllLeadCareersData);
  const { responseLeadProgramData } = useSelector((state: RootState) => state.getAllLeadProgramsData);
  const { responseLeadApplicationStatusData } = useSelector((state: RootState) => state.getAllLeadApplicationStatusData);
  const { responseLeadCityData } = useSelector((state: RootState) => state.getAllLeadCitysData);
  const { responseLeadSourseData } = useSelector((state: RootState) => state.getAllLeadSoursesData);
  const { responseLeadStageData } = useSelector((state: RootState) => state.getAllLeadStagesData);
  const { responseLeadSubStageData } = useSelector((state: RootState) => state.getAllLeadSubStagesData);
  const { responseLeadStateData } = useSelector((state: RootState) => state.getAllLeadStatesData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fields: filterQuery.fields,
      // [{ type: "", mode: "", value: "" }],
    },
    validationSchema: Yup.object({
      fields: Yup.array().of(
        Yup.object({
          type: Yup.string().required("Required"),
          mode: Yup.string().required("Required"),
          value: Yup.mixed().when("mode", {
            is: (mode: string) => mode === "unique" || mode === "multiple",
            then: () => Yup.mixed().required("Required"),
            otherwise: () => Yup.mixed().notRequired(),
          }),
          to: Yup.string().when("mode", {
            is: "range",
            then: () => Yup.string().required("Required"),
          }),
          from: Yup.string().when("mode", {
            is: "range",
            then: () => Yup.string().required("Required"),
          }),
        })
      ),
    }),
    validateOnChange: false, // Prevent validation on change
    validateOnMount: false, // Prevent validation on mount
    onSubmit: (values) => {
      // console.log("payloadddd", values);
      setFilterQuery(values);
      getAdvanceSearchData(values);
    },
  });

  const { responseAdvanceSearchFieldsData, isLoading: isLoadingForAdvanceSearchField } = useSelector(
    (state: RootState) => state.getAllAdvanceSearchFilterFields
  );

  useEffect(() => {
    formik.values.fields.forEach((field) => {
      if (field.type) {
        store.dispatch(getAllLeadFieldByName(field.type));
      }
    });
  }, []);

  const getModeOptions = () => {
    return [
      { value: "include", label: "Include" },
      { value: "exclude", label: "Exclude" },
    ];
  };

  const isSalesRepUser = !userDetails?.authority?.some((role: string) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER");

  const fetchSelectedApi = (value: string) => {
    setSelectedValue(value);

    if (value === "career") {
      dispatch(getAllLeadCareers());
    } else if (value === "program") {
      dispatch(getAllLeadPrograms());
    } else if (value === "state") {
      dispatch(getAllLeadStates());
    } else if (value === "city") {
      dispatch(getAllLeadCitys());
    } else if (value === "lead_source") {
      dispatch(getAllLeadSourses());
    } else if (value === "name") {
      dispatch(getAllLeadNames());
    } else if (value === "phone") {
      dispatch(getAllLeadPhones());
    } else if (value === "email") {
      dispatch(getAllLeadEmails());
    } else if (value === "lead_stage") {
      dispatch(getAllLeadStages());
    } else if (value === "lead_sub_stage") {
      dispatch(getAllLeadSubStages());
    } else if (value === "application_status") {
      dispatch(getAllLeadApplicationStatus());
    }
  };

  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-2 p-2 w-full mx-auto">
          <FieldArray name="fields">
            {({ push, remove }) => (
              <div className="space-y-2">
                {formik.values.fields.map((field, index) => (
                  <div key={index} className="border px-3 py-2 rounded-md space-y-1 relative">
                    {/* Main Select */}
                    <div className="flex items-center gap-3 w-full">
                      <div className="grid w-full">
                        <label className="text-gray-600 text-xs font-medium">Filter on Fields:</label>
                        <Select
                          options={responseAdvanceSearchFieldsData}
                          onChange={(selected) => {
                            if (
                              isSalesRepUser &&
                              (selected?.value === "salesrep_name" || selected?.value === "salesrep_email" || selected?.value === "salesrep_phone")
                            ) {
                              toast.error("This filter is only applicable for managers and admins");
                              return;
                            }
                            formik.setFieldValue(`fields.${index}.type`, selected?.value || "");
                            fetchSelectedApi(selected?.value);
                            // store.dispatch(getAllLeadFieldByName(selected?.value || ""));
                            formik.setFieldValue(`fields.${index}.value`, "");
                            formik.setFieldValue(`fields.${index}.mode`, "");
                            formik.setFieldValue(`fields.${index}.to`, "");
                            formik.setFieldValue(`fields.${index}.from`, "");
                          }}
                          value={responseAdvanceSearchFieldsData.find((opt) => opt.value === field.type) || null}
                          className="w-full py-0.5"
                          placeholder="Select field"
                          styles={advanceSearchStyle}
                          isLoading={isLoadingForAdvanceSearchField}
                        />
                        {typeof formik.errors.fields?.[index] === "object" && (formik.errors.fields[index] as { type?: string }).type && (
                          <p className="text-red-500 text-sm">
                            {
                              (
                                formik.errors.fields[index] as {
                                  type?: string;
                                }
                              ).type
                            }
                          </p>
                        )}
                      </div>

                      {/* Mode Select (Unique/Multiple) */}
                      {field.type && (
                        <div className="grid w-full">
                          <label className="text-gray-600 text-xs py-0 font-medium">Mode:</label>
                          <Select
                            options={getModeOptions() || []}
                            onChange={(selected) => formik.setFieldValue(`fields.${index}.mode`, selected?.value || "")}
                            value={
                              field.mode
                                ? {
                                    value: field.mode,
                                    label: field.mode.charAt(0).toUpperCase() + field.mode.slice(1),
                                  }
                                : null
                            }
                            className="w-full"
                            placeholder="Select Mode"
                            styles={advanceSearchStyle}
                          />
                          {typeof formik.errors.fields?.[index] === "object" && (formik.errors.fields[index] as { mode?: string }).mode && (
                            <p className="text-red-500 text-sm">
                              {
                                (
                                  formik.errors.fields[index] as {
                                    mode?: string;
                                  }
                                ).mode
                              }
                            </p>
                          )}
                        </div>
                      )}

                      {/* Dynamic Select Based on Mode */}
                      {field.mode && (
                        <div className="grid w-full">
                          <label className="text-gray-600 text-xs py-0 font-medium">Criteria:</label>
                          <Select
                            isMulti
                            options={
                              selectedValue === "name"
                                ? responseLeadNameData
                                : selectedValue === "email"
                                ? responseLeadEmailData
                                : selectedValue === "phone"
                                ? responseLeadPhoneData
                                : selectedValue === "career"
                                ? responseLeadCareerData
                                : selectedValue === "program"
                                ? responseLeadProgramData
                                : selectedValue === "state"
                                ? responseLeadStateData
                                : selectedValue === "city"
                                ? responseLeadCityData
                                : selectedValue === "lead_source"
                                ? responseLeadSourseData
                                : selectedValue === "lead_stage"
                                ? responseLeadStageData
                                : selectedValue === "lead_sub_stage"
                                ? responseLeadSubStageData
                                : selectedValue === "application_status"
                                ? responseLeadApplicationStatusData
                                : []
                            }
                            onChange={(selected) => formik.setFieldValue(`fields.${index}.value`, selected?.map((opt) => opt.value) || [])}

                            value={(selectedValue === "name"
                              ? responseLeadNameData
                              : selectedValue === "email"
                              ? responseLeadEmailData
                              : selectedValue === "phone"
                              ? responseLeadPhoneData
                              : selectedValue === "career"
                              ? responseLeadCareerData
                              : selectedValue === "program"
                              ? responseLeadProgramData
                              : selectedValue === "state"
                              ? responseLeadStateData
                              : selectedValue === "city"
                              ? responseLeadCityData
                              : selectedValue === "lead_source"
                              ? responseLeadSourseData
                              : selectedValue === "lead_stage"
                              ? responseLeadStageData
                              : selectedValue === "lead_sub_stage"
                              ? responseLeadSubStageData
                              : selectedValue === "application_status"
                              ? responseLeadApplicationStatusData
                              : []
                            ).filter((opt) => formik.values.fields[index].value?.includes(opt.value))}
                            className="w-full"
                            placeholder="Select Multiple critria"
                            styles={advanceSearchStyle}
                          />
                          {typeof formik.errors.fields?.[index] === "object" &&
                            (
                              formik.errors.fields?.[index] as {
                                value?: string;
                              }
                            )?.value && (
                              <p className="text-red-500 text-sm">
                                {
                                  (
                                    formik.errors.fields?.[index] as {
                                      value?: string;
                                    }
                                  ).value
                                }
                              </p>
                            )}
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    {formik.values.fields.length > 1 && (
                      <button type="button" onClick={() => remove(index)} className="absolute right-0 top-0">
                        <BiMinus size={16} />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => push({ type: "", mode: "", value: "", to: "", from: "" })}
                    className="flex items-center space-x-1 text-blue-500 text-xs"
                  >
                    <BiPlus size={18} /> <span>Add More</span>
                  </button>
                </div>
              </div>
            )}
          </FieldArray>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end">
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded text-white text-sm">
              Search
            </button>
            <button
              onClick={() => {
                store.dispatch(resetViewLeadResponse());
                setFilterQuery({
                  fields: [
                    {
                      type: "",
                      mode: "",
                      value: "",
                    },
                  ],
                });
              }}
              type="button"
              className="bg-red-500 px-2 py-1 rounded text-white text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default SelectionCriteria;

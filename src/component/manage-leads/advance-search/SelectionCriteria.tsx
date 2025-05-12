import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Select from "react-select";
import * as Yup from "yup";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { advanceSearchStyle } from "../../../data/manage-leads/advance-search-data";
import { getAllLeadFieldByName } from "../../../store/advance-search/get-allLeadField-byName-slice";
import { resetViewLeadResponse } from "../../../store/advance-search/get-coreViewLead-byQuery-slice";

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

const SelectionCriteria: React.FC<selectionCriteriaPropsType> = ({
  setFilterQuery,
  filterQuery,
  getAdvanceSearchData,
}) => {
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
      setFilterQuery(values);
      getAdvanceSearchData(values);
    },
  });

  // console.log(formik.values.fields);

  const {
    responseAdvanceSearchFieldsData,
    isLoading: isLoadingForAdvanceSearchField,
  } = useSelector((state: RootState) => state.getAllAdvanceSearchFilterFields);

  const { responseLeadFieldByNameData } = useSelector(
    (state: RootState) => state.getAllLeadFieldByName
  );

  useEffect(() => {
    // console.log("formik.values.fields", formik.values.fields);
    formik.values.fields.forEach((field) => {
      // console.log("field", field);
      if (field.type) {
        // console.log("field.type", field.type);
        store.dispatch(getAllLeadFieldByName(field.type));
      }
    });
  }, []);

  const getModeOptions = (filedName: string) => {
    const type = responseAdvanceSearchFieldsData.find(
      (item: any) => item.value === filedName
    )?.type;
    // console.log("type", type);
    if (type === "DATE" || type === "INT") {
      return [
        { value: "unique", label: "Unique" },
        { value: "multiple", label: "Multiple" },
        { value: "range", label: "Range" },
      ];
    } else {
      return [
        { value: "unique", label: "Unique" },
        { value: "multiple", label: "Multiple" },
      ];
    }
  };

  const getTypeFromFieldName = (fieldName: string) => {
    const field = responseAdvanceSearchFieldsData.find(
      (item: any) => item.value === fieldName
    );
    return field ? field.type : "";
  };
  return (
    <div>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-2 p-2 w-full mx-auto"
        >
          <FieldArray name="fields">
            {({ push, remove }) => (
              <div className="space-y-2">
                {formik.values.fields.map((field, index) => (
                  <div
                    key={index}
                    className="border px-3 py-2 rounded-md space-y-1 relative"
                  >
                    {/* Main Select */}
                    <div className="flex items-center gap-3 w-full">
                      <div className="grid w-full">
                        <label className="text-gray-600 text-xs font-medium">
                          Filter on Fields:
                        </label>
                        <Select
                          options={responseAdvanceSearchFieldsData}
                          onChange={(selected) => {
                            formik.setFieldValue(
                              `fields.${index}.type`,
                              selected?.value || ""
                            );
                            store.dispatch(
                              getAllLeadFieldByName(selected?.value || "")
                            );
                            formik.setFieldValue(`fields.${index}.value`, "");
                            formik.setFieldValue(`fields.${index}.mode`, "");
                            formik.setFieldValue(`fields.${index}.to`, "");
                            formik.setFieldValue(`fields.${index}.from`, "");
                          }}
                          value={
                            responseAdvanceSearchFieldsData.find(
                              (opt) => opt.value === field.type
                            ) || null
                          }
                          className="w-full py-0.5"
                          placeholder="Select field"
                          styles={advanceSearchStyle}
                          isLoading={isLoadingForAdvanceSearchField}
                        />
                        {typeof formik.errors.fields?.[index] === "object" &&
                          (formik.errors.fields[index] as { type?: string })
                            .type && (
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
                          <label className="text-gray-600 text-xs py-0 font-medium">
                            Mode:
                          </label>
                          <Select
                            options={
                              getModeOptions(
                                formik.values.fields[index].type
                              ) || []
                            }
                            onChange={(selected) =>
                              formik.setFieldValue(
                                `fields.${index}.mode`,
                                selected?.value || ""
                              )
                            }
                            value={
                              field.mode
                                ? {
                                    value: field.mode,
                                    label:
                                      field.mode.charAt(0).toUpperCase() +
                                      field.mode.slice(1),
                                  }
                                : null
                            }
                            className="w-full"
                            placeholder="Select Mode"
                            styles={advanceSearchStyle}
                          />
                          {typeof formik.errors.fields?.[index] === "object" &&
                            (formik.errors.fields[index] as { mode?: string })
                              .mode && (
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
                      {field.mode &&
                        (field.mode === "unique" ? (
                          <div className="grid w-full">
                            <label className="text-gray-600 text-xs py-0 font-medium">
                              Criteria:
                            </label>
                            <Select
                              options={
                                responseLeadFieldByNameData[
                                  formik.values.fields[index].type
                                ] || []
                              }
                              onChange={(selected) =>
                                formik.setFieldValue(
                                  `fields.${index}.value`,
                                  selected?.value || ""
                                )
                              }
                              value={
                                (
                                  responseLeadFieldByNameData[
                                    formik.values.fields[index].type
                                  ] || []
                                ).find(
                                  (opt: any) =>
                                    typeof field.value === "string" &&
                                    opt.value === field.value
                                ) || null
                              }
                              className="w-full"
                              placeholder="Select criteria"
                              styles={advanceSearchStyle}
                            />
                            {typeof formik.errors.fields?.[index] ===
                              "object" &&
                              (
                                formik.errors.fields[index] as {
                                  value?: string;
                                }
                              ).value && (
                                <p className="text-red-500 text-sm">
                                  {
                                    (
                                      formik.errors.fields[index] as {
                                        value?: string;
                                      }
                                    ).value
                                  }
                                </p>
                              )}
                          </div>
                        ) : field.mode === "multiple" ? (
                          <div className="grid w-full">
                            <label className="text-gray-600 text-xs py-0 font-medium">
                              Criteria:
                            </label>
                            <Select
                              isMulti
                              options={
                                responseLeadFieldByNameData[
                                  formik.values.fields[index].type
                                ] || []
                              }
                              onChange={(selected) =>
                                formik.setFieldValue(
                                  `fields.${index}.value`,
                                  selected?.map((opt) => opt.value) || []
                                )
                              }
                              value={(
                                responseLeadFieldByNameData[
                                  formik.values.fields[index].type
                                ] || []
                              ).filter((opt) =>
                                field.value?.includes(opt.value)
                              )}
                              className="w-full"
                              placeholder="Select Multiple critrias"
                              styles={advanceSearchStyle}
                            />
                            {typeof formik.errors.fields?.[index] ===
                              "object" &&
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
                        ) : field.mode === "range" ? (
                          <div className="grid w-full grid-cols-2 gap-4">
                            {/* From Input */}
                            <div className="flex flex-col">
                              <label className="text-gray-600 text-xs py-0 font-medium">
                                From:
                              </label>
                              <input
                                type={
                                  getTypeFromFieldName(
                                    formik.values.fields[index].type
                                  ) === "DATE"
                                    ? "date"
                                    : "text"
                                }
                                className="border px-2 py-1 rounded text-sm"
                                placeholder="Enter From"
                                value={formik.values.fields[index].from || ""}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `fields.${index}.from`,
                                    e.target.value
                                  )
                                }
                              />
                              {/* Error Handling */}
                              {typeof formik.errors.fields?.[index] ===
                                "object" &&
                                (
                                  formik.errors.fields?.[index] as {
                                    from?: string;
                                  }
                                )?.from && (
                                  <p className="text-red-500 text-sm col-span-2">
                                    {
                                      (
                                        formik.errors.fields?.[index] as {
                                          from?: string;
                                        }
                                      ).from
                                    }
                                  </p>
                                )}
                            </div>

                            {/* To Input */}
                            <div className="flex flex-col">
                              <label className="text-gray-600 text-xs py-0 font-medium">
                                To:
                              </label>
                              <input
                                type={
                                  getTypeFromFieldName(
                                    formik.values.fields[index].type
                                  ) === "DATE"
                                    ? "date"
                                    : "text"
                                }
                                className="border px-2 py-1 rounded text-sm"
                                placeholder="Enter To"
                                value={formik.values.fields[index].to || ""}
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    `fields.${index}.to`,
                                    e.target.value
                                  )
                                }
                              />
                              {/* Error Handling */}
                              {typeof formik.errors.fields?.[index] ===
                                "object" &&
                                (
                                  formik.errors.fields?.[index] as {
                                    to?: string;
                                  }
                                )?.to && (
                                  <p className="text-red-500 text-sm col-span-2">
                                    {
                                      (
                                        formik.errors.fields?.[index] as {
                                          to?: string;
                                        }
                                      ).to
                                    }
                                  </p>
                                )}
                            </div>
                          </div>
                        ) : null)}
                    </div>

                    {/* Remove Button */}
                    {formik.values.fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute right-0 top-0"
                      >
                        <BiMinus size={16} />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Button */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      push({ type: "", mode: "", value: "", to: "", from: "" })
                    }
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
            <button
              type="submit"
              className="bg-blue-500 px-2 py-1 rounded text-white text-sm"
            >
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

// {
//   "fields": [
//       {
//           "type": "email",
//           "mode": "unique",
//           "value": "drsinhaimsbhu@gmail.com"
//       }
//   ]
// }

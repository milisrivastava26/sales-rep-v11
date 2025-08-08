import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { resetFilteredTaskResponse } from "../../store/manage-task/get-filtered-task-slice";
import { getApByCareerId } from "../../store/get/get-all-academic-program-by-academic-career-id-slice";

interface Option {
    label: string;
    value: any;
}

interface FormInput {
    name: string;
    label: string;
    type: string;
    options?: Option[];
}

interface Props {
    inputSchema: FormInput[];
    initialValues: Record<string, any>;
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (values: any) => void;
}

const ManageTaskFilter: React.FC<Props> = ({
    inputSchema,
    initialValues,
    validationSchema,
    onSubmit,
}) => {
    const { filterLeadSource } = useSelector((state: RootState) => state.leadSourceValues);
    const { responseForfilter }: { responseForfilter: Option[] } = useSelector(
        (state: RootState) => state.getAllOwner
    );
    const {
        responseForFilterHeadAcademicCareerQuickadd: careerOptions,
    } = useSelector((state: RootState) => state.getAllAcademicCareerForQuickadd);
    const {
        responseForFilterHeadAcademicProgram: programOptions,
    } = useSelector((state: RootState) => state.getAllAcademicProgramByCareer);
    const { filteredTasks } = useSelector((state: RootState) => state.getFilteredTask);

    const [isFilterApplied, setIsFilterApplied] = useState(false);


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ setFieldValue, values, resetForm }) => {
                useEffect(() => {
                    if (filteredTasks.length !== 0) {
                        setIsFilterApplied(true);
                    }
                    else {
                        setIsFilterApplied(false);
                    }
                }, [filteredTasks]);

                const handleReset = () => {
                    resetForm();
                    store.dispatch(resetFilteredTaskResponse());
                    setIsFilterApplied(false);
                };

                return (
                    <Form className="flex flex-wrap items-end gap-4">
                        {inputSchema.map((field) => (
                            <div key={field.name} className="flex flex-col min-w-[180px]">
                                <label className="mb-1 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    {field.label}
                                </label>

                                {field.type === "select" ? (
                                    <Select
                                        isSearchable
                                        isClearable
                                        name={field.name}
                                        options={
                                            field.name === "leadSource"
                                                ? filterLeadSource
                                                : field.name === "salesrepName"
                                                    ? responseForfilter
                                                    : field.name === "career" ?
                                                        careerOptions :
                                                        field.name === "program" ?
                                                            programOptions
                                                            : field.options
                                        }
                                        value={
                                            (field.name === "leadSource"
                                                ? filterLeadSource
                                                : field.name === "salesrepName"
                                                    ? responseForfilter
                                                    : field.name === "career" ?
                                                        careerOptions :
                                                        field.name === "program" ?
                                                            programOptions
                                                            : field.options || []
                                            ).find((opt: any) => opt.value === values[field.name]) || null
                                        }
                                        onChange={(newValue) => {

                                            if (field.name === "career") {
                                                store.dispatch(getApByCareerId(newValue.value));
                                            }

                                            setFieldValue(field.name, newValue ? (newValue as Option).value : "");
                                            setIsFilterApplied(false)
                                        }
                                        }
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                minHeight: "27px",
                                                height: "27px",
                                                padding: "0 5px",
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                fontSize: "13px",
                                            }),
                                            valueContainer: (base) => ({
                                                ...base,
                                                padding: "0 5px",
                                                fontSize: "12px",
                                            }),
                                            input: (base) => ({
                                                ...base,
                                                margin: "0px",
                                                padding: "0px",
                                            }),
                                            indicatorsContainer: (base) => ({
                                                ...base,
                                                height: "27px",
                                            }),
                                        }}
                                    />
                                ) : (
                                    <Field
                                        type="date"
                                        name={field.name}
                                        className="border min-w-[165px] border-[#c9cccd] focus:outline-none focus:border-gray-400 rounded-[0.26rem] px-[6px] py-[1.7px] text-gray-600 text-sm"
                                    />
                                )}

                                <div style={{ minHeight: "18px" }}>
                                    <ErrorMessage
                                        name={field.name}
                                        component="div"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="flex mb-[15px]">
                            {isFilterApplied ? (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="h-[32px] px-4 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition whitespace-nowrap"
                                >
                                    Reset Filters
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="h-[32px] px-4 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition whitespace-nowrap"
                                >
                                    Apply Filters
                                </button>
                            )}
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ManageTaskFilter;

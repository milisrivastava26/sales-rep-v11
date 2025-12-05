import React from "react";
import { Field, FieldArray, ErrorMessage } from "formik";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

interface CompetitiveExamFormProps {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isEditing: boolean;
}

const CompetitiveExamForm: React.FC<CompetitiveExamFormProps> = ({
  values,
  setFieldValue,
  isEditing,
}) => {
  const { responseForCompetitiveExam, isLoading } = useSelector(
    (state: RootState) => state.getAllCompetitiveExam
  );

  const examOptions = responseForCompetitiveExam || [];

  // Find backend "Others"
  const backendOthers = examOptions.find((x: any) => x.value === "Others") || {
    label: "Others",
    value: "Others",
  };

  return (
    <div className="border p-4 rounded-lg bg-gray-50 mt-6">
      {/* Checkbox */}
      <div className="flex items-center gap-2 mb-4">
        <Field type="checkbox" disabled={!isEditing} name="appeared" className="h-5 w-5" />
        <label className="text-gray-700 font-medium">
          Have you appeared for any competitive examination?
        </label>
      </div>

      {values.appeared && (
        <FieldArray name="exams">
          {({ push, remove }) => (
            <div className="space-y-6">
              {values.exams.map((exam: any, index: number) => {
                // Check if dropdown contains the current value
                const matchedOption = examOptions.find(
                  (opt: any) => opt.value === exam.nameOfExam
                );

                // CASE 1: Backend sent unknown value → treat as custom
                const isCustomCurrently =
                  exam.isCustomExam || (!matchedOption && exam.nameOfExam);

                const selectedOption = isCustomCurrently
                  ? backendOthers
                  : matchedOption || null;

                // Sync: backend unknown value → mark custom
                if (!matchedOption && exam.nameOfExam && !exam.isCustomExam) {
                  setFieldValue(`exams[${index}].isCustomExam`, true, false);
                }

                return (
                  <div
                    key={index}
                    className="border p-4 rounded-lg bg-white space-y-4 relative shadow-sm"
                  >
                    {/* Dropdown */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Name of Exam<span className="text-red-500 ml-1">*</span>
                      </label>

                      <Select
                        options={examOptions}
                        isLoading={isLoading}
                        value={selectedOption}
                        isDisabled={!isEditing}
                        onChange={(option: any) => {
                          if (option?.value === "Others") {
                            setFieldValue(`exams[${index}].isCustomExam`, true);
                            setFieldValue(`exams[${index}].nameOfExam`, "");
                          } else {
                            setFieldValue(`exams[${index}].isCustomExam`, false);
                            setFieldValue(
                              `exams[${index}].nameOfExam`,
                              option?.value
                            );
                          }
                        }}
                        placeholder="Select Exam"
                      />

                      <ErrorMessage
                        name={`exams[${index}].nameOfExam`}
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    {/* Custom Text Field */}
                    {isCustomCurrently && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Enter Exam Name<span className="text-red-500 ml-1">*</span>
                        </label>

                        <input
                          type="text"
                          value={exam.nameOfExam}
                          disabled={!isEditing}
                          onChange={(e) => {
                            setFieldValue(`exams[${index}].isCustomExam`, true);
                            setFieldValue(
                              `exams[${index}].nameOfExam`,
                              e.target.value
                            );
                          }}
                          className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
                          placeholder="Enter exam name"
                        />

                        <ErrorMessage
                          name={`exams[${index}].nameOfExam`}
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                    )}

                    {/* Rank */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Rank
                      </label>
                      <Field
                        disabled={!isEditing}
                        name={`exams[${index}].examRank`}
                        className="w-full border rounded p-2"
                      />
                      <span className="mt-1 text-blue-600 font-medium text-xs">Enter only your All India Rank/Overall Score as per the official result. Category-wise Rank/Score is not permitted.</span>
                      <ErrorMessage
                        name={`exams[${index}].examRank`}
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Percentile */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Percentile
                      </label>
                      <Field
                        disabled={!isEditing}
                        name={`exams[${index}].percentage`}
                        className="w-full border rounded p-2"
                      />
                      <ErrorMessage
                        name={`exams[${index}].percentage`}
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Year of Exam<span className="text-red-500 ml-1">*</span>
                      </label>
                      <Field
                        disabled={!isEditing}
                        name={`exams[${index}].yearOfExam`}
                        className="w-full border rounded p-2"
                      />
                      <ErrorMessage
                        name={`exams[${index}].yearOfExam`}
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Delete Button */}
                    {values.exams.length > 1 && (
                      <button
                        type="button"
                        disabled={!isEditing}
                        onClick={() => remove(index)}
                        className="absolute -top-1 right-2 text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add More */}
              <button
                type="button"
                disabled={!isEditing}
                onClick={() =>
                  push({
                    nameOfExam: "",
                    examRank: "",
                    percentage: "",
                    yearOfExam: "",
                    isCustomExam: false,
                  })
                }
                className="flex items-center gap-2 px-2 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FiPlus size={16} />
                Add More
              </button>
            </div>
          )}
        </FieldArray>
      )}
    </div>
  );
};

export default CompetitiveExamForm;

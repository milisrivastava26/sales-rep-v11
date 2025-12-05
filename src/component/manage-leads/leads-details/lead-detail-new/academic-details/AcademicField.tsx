import { Field, ErrorMessage } from "formik";
import SelectField from "./SelectField";

const AcademicField = ({
  field,
  values,
  setFieldValue,
  disableState,
  disableSetters,
  isEditing
}: any) => {
  const {
    isDisabledForTenthPercentage,
    isDisabledForTwelfthPercentage,
    isDisabledForDiplomaPercentage,
    isDisabledForUgPercentage,
    isDisabledForPgPercentage,
  } = disableState;

  // ⭐ AUTO-SET MARKS = "N/A" WHEN DISABLED
  if (isDisabledForTenthPercentage && values.tenthMarksOrGrade !== "N/A") {
    setFieldValue("tenthMarksOrGrade", "N/A");
  }

  if (isDisabledForTwelfthPercentage && values.TwelfthMarksOrGrade !== "N/A") {
    setFieldValue("TwelfthMarksOrGrade", "N/A");
  }

  if (isDisabledForDiplomaPercentage && values.coreDiplomaMarks !== "N/A") {
    setFieldValue("coreDiplomaMarks", "N/A");
  }

  if (isDisabledForUgPercentage && values.coreUgMarks !== "N/A") {
    setFieldValue("coreUgMarks", "N/A");
  }

  if (isDisabledForPgPercentage && values.corePgMarks !== "N/A") {
    setFieldValue("corePgMarks", "N/A");
  }

  return (
    <div className="w-full">
      {field.type === "select" ? (
        <SelectField
          field={field}
          values={values}
          setFieldValue={setFieldValue}
          disableSetters={disableSetters}
          isEditing={isEditing}
        />

      ) : field.type === "checkbox" ? (
        <label className="flex items-center">
          <input className="mr-1" type="checkbox" name={field.name} />
          {field.label}
        </label>
      ) : (
        <>
          <label
            htmlFor={field.name}
            className="block mb-1 ml-1.5 text-gray-700 font-medium"
          >
            {field.label}
            {field.isrequired && <span className="text-red-500 ml-1">*</span>}
          </label>

          <Field
            name={field.name}
            id={field.name}
            type={field.type}
            as={field.type === "textarea" ? "textarea" : "input"}
            disabled={
              (field.name === "tenthMarksOrGrade" && isDisabledForTenthPercentage) ||
              (field.name === "TwelfthMarksOrGrade" && isDisabledForTwelfthPercentage) ||
              (field.name === "coreDiplomaMarks" && isDisabledForDiplomaPercentage) ||
              (field.name === "coreUgMarks" && isDisabledForUgPercentage) ||
              (field.name === "corePgMarks" && isDisabledForPgPercentage) || !isEditing
            }
            className="w-full border border-gray-200 px-2 py-1 rounded-md focus:outline-none focus:border-gray-400"
          />

          {field.description && (
            <p className="text-xs text-blue-600 font-medium my-1">
              {field.description}
            </p>
          )}
        </>
      )}

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default AcademicField;

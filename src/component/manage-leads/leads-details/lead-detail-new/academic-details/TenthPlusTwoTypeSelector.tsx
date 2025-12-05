import { ErrorMessage } from "formik";
import { typesForSectionOptions } from "../../../../../data/lead-details-data-new/academic-data";

const TenthPlusTwoTypeSelector = ({ field, values, handleChange, isEditing }: any) => {
  return (
    <div className="w-full col-span-full border border-gray-300 rounded-xl p-5 my-6 bg-white shadow-sm">
      <label className="block mb-3 text-gray-800 font-semibold">
        What have you done for your 10th +2 education?
        {field.isrequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex flex-wrap gap-3">
        {typesForSectionOptions .map((option: any) => {
          const isSelected = values[field.name] === option.value;
          return (
            <button
              key={option.value}
              type="button"
              disabled={!isEditing}
              onClick={() => handleChange(field.name, option)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default TenthPlusTwoTypeSelector;

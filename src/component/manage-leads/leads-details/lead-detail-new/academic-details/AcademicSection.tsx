import { RootState } from "../../../../../store";
import { onSetDisableForPgInputFields, onSetEnableForPgInputFields } from "../../../../../store/ui/ui-slice";
import AcademicField from "./AcademicField";
import TenthPlusTwoTypeSelector from "./TenthPlusTwoTypeSelector";
import { useDispatch, useSelector } from "react-redux";

interface AcademicSectionProps {
  section: any;
  values: any;
  setFieldValue: any;
  handleChange: (
    name: string,
    option: any,
    setFieldValue?: any
  ) => void;
  disableState: {
    isDisabledForTenthPercentage: boolean;
    isDisabledForTwelfthPercentage: boolean;
    isDisabledForDiplomaPercentage: boolean;
    isDisabledForUgPercentage: boolean;
    isDisabledForPgPercentage: boolean;
  };
  disableSetters: any;
  isEditing: boolean
}

const AcademicSection: React.FC<AcademicSectionProps> = ({
  section,
  values,
  setFieldValue,
  handleChange,
  disableState,
  disableSetters,
  isEditing
}) => {
  const dispatch = useDispatch();

  const {
    isEnableForDiplomaInputFields,
    isEnableForTwelfthInputFields,
    isEnableForUGInputFields,
    isEnableForPgInputFields,
    pgDialog,
  } = useSelector((state: RootState) => state.ui as any);

  // 🚫 Hide sections based on enable flags
  if (
    (section.heading === "Intermediate (12th)" && !isEnableForTwelfthInputFields) ||
    (section.heading === "Diploma" && !isEnableForDiplomaInputFields) ||
    (section.heading === "Graduation" && !isEnableForUGInputFields) ||
    (section.heading === "Post Graduation (PG)" && !isEnableForPgInputFields)
  ) {
    return null;
  }

  // 🚫 When 10th percentage is disabled, show ONLY the 10th section
  if (disableState.isDisabledForTenthPercentage) {
    if (section.heading !== "High School (10th)") {
      return null;
    }
  }

  const isGraduationSection = section.heading === "Graduation";

  const handlePgCheckbox = (checked: boolean) => {
    if (checked) {
      dispatch(onSetEnableForPgInputFields());
    } else {
      dispatch(onSetDisableForPgInputFields());
    }
  };

  return (
    <div className="mb-6">
      {/* Section Heading */}
      <h2 className="font-medium text-base mb-4 bg-[#e2d1ba] px-6 py-1.5 rounded-full inline-block">
        {section.heading || section.groupLabel}
      </h2>

      {/* Section Fields */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {section.inputFields.map((field: any, index: number) => {

          // 🚫 Hide tenth selector when tenth is disabled
          if (
            disableState.isDisabledForTenthPercentage &&
            field.name === "tenth_plus_2_type"
          ) {
            return null;
          }

          return field.name === "tenth_plus_2_type" ? (
            <TenthPlusTwoTypeSelector
              key={index}
              field={field}
              values={values}
              handleChange={handleChange}
              isEditing={isEditing}
            />
          ) : (
            <AcademicField
              key={index}
              field={field}
              values={values}
              setFieldValue={setFieldValue}
              disableState={disableState}
              disableSetters={disableSetters}
              isEditing={isEditing}
            />
          );
        })}
      </div>

      {/* PG Checkbox */}
      {isGraduationSection && pgDialog && (
        <div className="mt-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={isEnableForPgInputFields}
              onChange={(e) => handlePgCheckbox(e.target.checked)}
              disabled={!isEditing}
            />
            <span className="text-gray-800 font-medium">
              Do you want to enter PG details?
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default AcademicSection;

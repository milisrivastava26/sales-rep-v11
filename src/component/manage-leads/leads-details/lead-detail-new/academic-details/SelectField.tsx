import Select from "react-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleSelectChange } from "./helpers";
import { RootState } from "../../../../../store";
import { mainSubjectOptionForTenth, mainSubjectOptionForTwelfth, resultStatusOptions, selectStyles, typesForSectionOptions } from "../../../../../data/lead-details-data-new/academic-data";

const SelectField = ({ field, values, setFieldValue, disableSetters, isEditing }: any) => {
  const { responseForTenthBoard } = useSelector(
    (state: RootState) => state.getAllTenthBoardData
  );
  const { responseForTenthMarkingScheme } = useSelector(
    (state: RootState) => state.coreTenthMarkingScheme
  );
  const { responseForTwelfthBoard } = useSelector(
    (state: RootState) => state.coreTwelfthBoard
  );
  const { responseForTwelfthSchool } = useSelector(
    (state: RootState) => state.coreTwelfthSchool
  );
  const { responseForDiplomaSchool } = useSelector(
    (state: RootState) => state.coreDiplomaSchool
  );
  const { responseForUgUniversity } = useSelector(
    (state: RootState) => state.coreUgUniversity
  );
  const { responseForTenthSchool } = useSelector(
    (state: RootState) => state.coreTenthSchool
  );
  const { responseForUgCollege } = useSelector(
    (state: RootState) => state.getAllUgCollege
  );
  const { responseForPgCollege } = useSelector(
    (state: RootState) => state.getAllPgCollege
  );
  const { responseForPgUniversity } = useSelector(
    (state: RootState) => state.getAllPgUniversity
  );

  const [customValue, setCustomValue] = useState("");
  const [isCustomActive, setIsCustomActive] = useState(false);

  const isBoardField =
    field.name === "coreTenthBoardId" || field.name === "coreTwelfthBoardId";

  const customInputAllowedFields = [
    "school",
    "tenthSchool",
    "twelfthSchool",
    "diplomaSchool",
    "ugUniversity",
    "ugSchool",
    "pgSchool",
    "pgUniversity",
    "coreTenthBoardId",
    "coreTwelfthBoardId",
  ];

  const customKey = `${field.name}_custom`;

  let options: any[] = [];

  switch (field.name) {
    case "school":
    case "tenthSchool":
      options = responseForTenthSchool || [];
      break;
    case "coreTenthBoardId":
      options = responseForTenthBoard || [];
      break;
    case "coreTenthMarkingSchemeId":
      options = responseForTenthMarkingScheme || [];
      break;
    case "tenthMainSubject":
      options = mainSubjectOptionForTenth;
      break;
    case "twelfthSchool":
      options = responseForTwelfthSchool || [];
      break;
    case "coreTwelfthBoardId":
      options = responseForTwelfthBoard || [];
      break;
    case "coreTwelfthMarkingSchemeId":
      options = responseForTenthMarkingScheme || [];
      break;
    case "twelfthMainSubject":
      options = mainSubjectOptionForTwelfth;
      break;
    case "diplomaSchool":
      options = responseForDiplomaSchool || [];
      break;
    case "ugUniversity":
      options = responseForUgUniversity || [];
      break;
    case "ugSchool":
      options = responseForUgCollege || [];
      break;
    case "pgSchool":
      options = responseForPgCollege || [];
      break;
    case "pgUniversity":
      options = responseForPgUniversity || [];
      break;
    case "coreTenthResultStatus":
    case "coreTwelfthResultStatus":
    case "coreDiplomaResultStatus":
    case "coreUgResultStatus":
    case "corePgResultStatus":
      options = resultStatusOptions;
      break;
    case "tenth_plus_2_type":
      options = typesForSectionOptions;
      break;
    default:
      options = [];
  }

  // -------------------------
  // Load initial values correctly
  // -------------------------
  useEffect(() => {
    const selected = values[field.name];
    const customStored = values[customKey];
    const others = options.find((o) => o.label === "Others");

    if (isCustomActive) {
      setCustomValue(customStored || customValue);
      return;
    }

    const matchedOption = options.some(
      (o) => String(o.value) === String(selected)
    );

    if (isBoardField && customStored?.trim() !== "") {
      setIsCustomActive(true);
      setCustomValue(customStored);
    } else if (!matchedOption && selected) {
      setIsCustomActive(true);
      setCustomValue(selected);
    } else if (others && String(selected) === String(others.value)) {
      setIsCustomActive(true);
    } else {
      setIsCustomActive(false);
      setCustomValue("");
    }
  }, [options, values[field.name], values[customKey]]);

  // -------------------------
  // Get selected option
  // -------------------------
  const getSelectedValue = () => {
    const match = options.find(
      (o) => String(o.value) === String(values[field.name])
    );
    if (match) return match;

    if (isCustomActive) {
      return options.find((o) => o.label === "Others") || null;
    }

    return null;
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 ml-1.5 text-gray-700 font-medium">
        {field.label}
        {field.isrequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Select
        name={field.name}
        isClearable
        value={getSelectedValue()}
        options={options}
        styles={selectStyles}
        isDisabled={!isEditing}
        onChange={(selected: any) => {
          if (!selected) {
            setFieldValue(field.name, "");
            if (isBoardField) setFieldValue(customKey, "");
            setIsCustomActive(false);
            return;
          }

          if (selected.label === "Others") {
            setIsCustomActive(true);
            setCustomValue("");

            // Set others ID only one time
            setFieldValue(field.name, selected.value);

            if (isBoardField) setFieldValue(customKey, "");
            return;
          }

          // user chooses normal option → disable custom
          setIsCustomActive(false);
          setCustomValue("");

          if (!customInputAllowedFields.includes(field.name)) {
            handleSelectChange(
              field.name,
              selected,
              setFieldValue,
              disableSetters.setIsDisabledForTenthPercentage,
              disableSetters.setIsDisabledForTwelfthPercentage,
              disableSetters.setIsDisabledForDiplomaPercentage,
              disableSetters.setIsDisabledForUgPercentage,
              disableSetters.setIsDisabledForPgPercentage
            );
            return;
          }

          setFieldValue(field.name, selected.value);
          if (isBoardField) setFieldValue(customKey, "");
        }}
      />

      {isCustomActive && customInputAllowedFields.includes(field.name) && (
        <input
          type="text"
          placeholder={`Enter custom ${field.label}`}
          value={customValue}
          disabled={!isEditing}
          onChange={(e) => {
            const text = e.target.value;
            setCustomValue(text);

            if (isBoardField) {
              // save to _custom only
              setFieldValue(customKey, text);

              // DO NOT set main field again
            } else {
              setFieldValue(field.name, text);
            }
          }}
          className="w-full border mt-2 rounded-md px-2 py-1"
        />
      )}
    </div>
  );
};

export default SelectField;

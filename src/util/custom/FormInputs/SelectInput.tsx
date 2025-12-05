import { useEffect } from "react";
import store from "../../../store";
import {
  onSetErrorHandler,
  uiSliceAction,
} from "../../../store/ui/ui-slice";

interface typeSelectInput {
  cndtVal: any; // filter.name
  options: [] | any; //filter.options
  firstCndtName?: string; // "Date Range"
  secondCndtVal?: any;
  secondCndtName?: any; //"modified_on"
  thirdCndtName?: any; // crated_on
  fourthCndtName?: any;
  isReadOnly: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  nameForSelect: string | any;
  value?: any;
  isModeFor?: string;
  style?: React.CSSProperties | string | any;
  onGetCity?: (val: any) => void;
  onGetAcademicProgram?: (val: any) => void;
  setIsEnabled?: (val: boolean) => void;
  onChangeHandler?: (e: any) => void; // handleDateRangeChange(e)
  onChangeHandlerForSelectedValue?: (val: any) => void;
  isModeUpdate?: boolean;
}
const SelectInput: React.FC<typeSelectInput> = ({
  style,
  cndtVal,
  options,
  isLoading,
  isReadOnly,
  setIsEnabled,
  onChangeHandler,
  onGetCity,
  nameForSelect,
  value,
  isModeFor,
  firstCndtName,
  secondCndtName,
  thirdCndtName,
  onGetAcademicProgram,
  onChangeHandlerForSelectedValue,
  isModeUpdate,
}) => {
  const dispatch = store.dispatch;

  // Handle the change event when an option is selected
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    onChangeHandlerForSelectedValue && onChangeHandlerForSelectedValue(selectedValue);

    if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "currentCoreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "currentCoreStateId" });
    } else if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId" });
      onGetCity && onGetCity(selectedValue);
    } else if (cndtVal === firstCndtName && (isModeFor === "create" || isModeUpdate) && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId2" });
    }
    // this condition is for isModeFor quick add form
    else if (cndtVal === secondCndtName && (isModeFor === "quickAddForm" || isModeFor === "personalDetails")) {
      onGetAcademicProgram && onGetAcademicProgram(selectedValue);
    } else if (cndtVal === thirdCndtName && (isModeFor === "quickAddForm" || isModeFor === "personalDetails") && nameForSelect === "currentCoreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "currentCoreStateId" });
    } else if (cndtVal === thirdCndtName && (isModeFor === "quickAddForm" || isModeFor === "personalDetails") && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId" });
    } else if (cndtVal === thirdCndtName && (isModeFor === "quickAddForm" || isModeFor === "personalDetails") && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: selectedValue, target: "coreStateId2" });
    } else if (cndtVal === firstCndtName && (selectedValue === secondCndtName || selectedValue === thirdCndtName)) {
      onChangeHandler && onChangeHandler(e);
      store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (cndtVal === firstCndtName && (selectedValue !== secondCndtName || selectedValue !== thirdCndtName)) {
      setIsEnabled && setIsEnabled(false);
      store.dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (cndtVal === firstCndtName && (selectedValue === secondCndtName || selectedValue === thirdCndtName)) {
      onChangeHandler && onChangeHandler(e);
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else if (cndtVal === firstCndtName && (selectedValue !== secondCndtName || selectedValue !== thirdCndtName)) {
      // setFilterGet(false);
      setIsEnabled && setIsEnabled(false);
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    } else {
      // setFilterGet(false);
      dispatch(onSetErrorHandler(false));
      dispatch(uiSliceAction.onManageFilterDropdownHandler(false));
    }
  };

  useEffect(() => {
    if (isModeUpdate && nameForSelect === "coreStateId") {
      onGetCity && onGetCity({ stateId: value, target: "coreStateId" });
    } else if (isModeUpdate && nameForSelect === "coreStateId2") {
      onGetCity && onGetCity({ stateId: value, target: "coreStateId2" });
    } else if (isModeUpdate && nameForSelect === "currentCoreStateId") {
      onGetCity && onGetCity({ stateId: value, target: "currentCoreStateId" });
    } else {
    }
  }, [value]);

  useEffect(() => {
    if (isModeUpdate && cndtVal === secondCndtName && nameForSelect === "academicCareerId") {
      onGetAcademicProgram && onGetAcademicProgram(value);
    }
  }, [value]);


  return (
    <>
      <select
        disabled={isReadOnly}
        // className={`${style} ${
        //   (cndtVal === "Lead Source" && isModeFor !== "create" && !isModeUpdate) || cndtVal === "Owner" ? "cursor-not-allowed" : ""
        // }  w-[130px] max-w-[130px]  appearance-none text-nowrap whitespace-nowrap overflow-hidden text-ellipsis `}
        className={`${style} ${
          cndtVal === "Owner" ? "cursor-not-allowed" : ""
        }  w-[130px] max-w-[130px]  appearance-none text-nowrap whitespace-nowrap overflow-hidden text-ellipsis  ${isReadOnly ? "cursor-not-allowed" : ""} `}
        name={nameForSelect}
        value={value}
        onChange={handleChange} // Use onChange for option selection
      >
        <option value="">--select--</option>
        {isLoading && <option>..loading</option>}
        {options.legnth === 0 && <option>Not Found</option>}
        {!isLoading &&
          options.legnth !== 0 &&
          options.map((option: any) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
    </>
  );
};

export default SelectInput;

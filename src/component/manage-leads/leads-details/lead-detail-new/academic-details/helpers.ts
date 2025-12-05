import store from "../../../../../store";
import { onSetEnableForDiplomaInputFields, onSetEnableForTwefthInputFields } from "../../../../../store/ui/ui-slice";


export const handleSelectChange = (
  fieldName: string,
  selectedOption: any,
  setFieldValue: any,
  setIsDisabledForTenthPercentage: any,
  setIsDisabledForTwelfthPercentage: any,
  setIsDisabledForDiplomaPercentage: any,
  setIsDisabledForUgPercentage: any,
  setIsDisabledForPgPercentage: any
) => {
  if (fieldName === "tenth_plus_2_type") {
    if (selectedOption?.value === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    } else if (selectedOption?.value === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }
  }

  const handleAwaited = (markField: string, setter: any) => {
    if (selectedOption?.value === "AWAITED") {
      setFieldValue(markField, "N/A");
      setter(true);   // ← Important: This disables the field
    } else {
      setFieldValue(markField, "");
      setter(false);
    }
  };

  switch (fieldName) {
    case "coreTenthResultStatus":
      handleAwaited("tenthMarksOrGrade", setIsDisabledForTenthPercentage);
      break;
    case "coreTwelfthResultStatus":
      handleAwaited("TwelfthMarksOrGrade", setIsDisabledForTwelfthPercentage);
      break;
    case "coreDiplomaResultStatus":
      handleAwaited("coreDiplomaMarks", setIsDisabledForDiplomaPercentage);
      break;
    case "coreUgResultStatus":
      handleAwaited("coreUgMarks", setIsDisabledForUgPercentage);
      break;
    case "corePgResultStatus":
      handleAwaited("corePgMarks", setIsDisabledForPgPercentage);
      break;
  }

  setFieldValue(fieldName, selectedOption?.value);
};

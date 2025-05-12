import { sectionsConfig } from "../../../data/manage-leads/ManageLeadsData";
import store from "../../../store";
import { onSetFinalDataForForm } from "../../../store/ui/ui-slice";
import { transformData } from "./transformPayloadForPreview";
import transformValuesToNames from "./transformValuesToNames";

export const nextHandlerForPreview = (finalData: any, reduxopt: any) => {
  const { values } = finalData;
  const transformName = transformValuesToNames(values, reduxopt);
  const transformedData = {
    id: 4,
    label: "Preview",
    icon: "settingsIcon",
    contentId: "previewContent",
    contentForPreview: transformData(transformName, sectionsConfig),
  };

  store.dispatch(onSetFinalDataForForm(transformedData));
};

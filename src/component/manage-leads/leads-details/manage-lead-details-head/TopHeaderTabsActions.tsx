import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Activity from "../activity/Activity";
import AddNotes from "../notes/AddNotes";
import TaskSelectors from "../task/TaskSelectors";
import UploadDocs from "../upload-docs/UploadDocs";
import ChangeStage from "../../genral/ChangeStage";
import store, { RootState } from "../../../../store";
import CustomModal from "../../../../util/custom/ui/CustomModal";
import { changeStageData } from "../../../../data/change-stage-data";
import CustomSideDrawer from "../../../../util/custom/ui/CustomSideDrawer";
import { onDisableModalForChangeStage } from "../../../../store/ui/ui-slice";
import { getLeadOwnerValues } from "../../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import { getTaskTypeValues } from "../../../../store/task/get-taskType-slice";
import { getAttachmentTypeValues } from "../../../../store/notes/get-all-coreDocAttachmentType-slice";
import { useParams } from "react-router-dom";
import { getLeadNameValues } from "../../../../store/task/get-allLeadName-slice";

const TopHeaderTabsActions: React.FC = () => {
  let childrenContent: any = "";
  const { leadCaptureId } = useParams();
  // const formikRef = useRef<any>(null);
  const { isDrawerOpen, getHeaderTabIconsName, isShowModalForChangeStage } =
    useSelector(
      (state: RootState) =>
        state.ui as {
          isDrawerOpen: boolean;
          getHeaderTabIconsName: string;
          isShowModalForChangeStage: boolean;
        }
    );
  const closeModalForChangeStage = () =>
    store.dispatch(onDisableModalForChangeStage());

  if (
    getHeaderTabIconsName === "Note" ||
    getHeaderTabIconsName === "NotesEdit"
  ) {
    childrenContent = <AddNotes />;
  }

  if (
    getHeaderTabIconsName === "Tasks" ||
    getHeaderTabIconsName === "taskEdit"
  ) {
    childrenContent = <TaskSelectors />;
  }

  if (getHeaderTabIconsName === "Upload Docs") {
    childrenContent = <UploadDocs />;
  }

  if (
    getHeaderTabIconsName === "Activity" ||
    getHeaderTabIconsName === "ActivityEdit"
  ) {
    childrenContent = <Activity />;
  }

  useEffect(() => {
    if (
      getHeaderTabIconsName === "Tasks" ||
      getHeaderTabIconsName === "taskEdit"
    ) {
      store.dispatch(getLeadOwnerValues());
      store.dispatch(getTaskTypeValues());
      store.dispatch(getLeadNameValues());
    }
  }, [store.dispatch, getHeaderTabIconsName]);

  useEffect(() => {
    if (
      getHeaderTabIconsName === "Note" ||
      getHeaderTabIconsName === "NotesEdit" ||
      getHeaderTabIconsName === "Upload Docs"
    ) {
      store.dispatch(getAttachmentTypeValues());
    }
  }, [leadCaptureId, getHeaderTabIconsName]);

  return (
    <>
      {((isDrawerOpen && getHeaderTabIconsName === "Tasks") ||
        getHeaderTabIconsName === "Note" ||
        getHeaderTabIconsName === "taskEdit" ||
        getHeaderTabIconsName === "NotesEdit" ||
        getHeaderTabIconsName === "Upload Docs" ||
        getHeaderTabIconsName === "Activity" ||
        getHeaderTabIconsName === "ActivityEdit") && (
        <CustomSideDrawer>{childrenContent}</CustomSideDrawer>
      )}

      {isShowModalForChangeStage && (
        <CustomModal
          isMode="testAction"
          isShowModal={isShowModalForChangeStage}
          onHideModal={closeModalForChangeStage}
          data={changeStageData}
        >
          <ChangeStage onHideModal={closeModalForChangeStage} />
        </CustomModal>
      )}
    </>
  );
};

export default TopHeaderTabsActions;

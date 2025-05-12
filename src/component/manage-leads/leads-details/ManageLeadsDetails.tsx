import { useSelector } from "react-redux";
import LeftView from "./LeftView";
import RightView from "./RightView";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import store, { RootState } from "../../../store";
import CustomModal from "../../../util/custom/ui/CustomModal";
import { closeWhatsappMessengerModal, onDisableModalForCalling } from "../../../store/ui/ui-slice";
import CallingLeads from "./CallingLeads";
import { useEffect, useRef } from "react";
import { getCampusInterestedDetailsByEnquiryId } from "../../../store/campus/get-campusInterestedDetails-by-enquiryId-slice";
import { getAcademicCareerValuesForQuickadd } from "../../../store/get/get-all-careerFor-quickAdd-slice";
import { getStateValues } from "../../../store/get/get-all-state-slice";
import { getLeadSourceValues } from "../../../store/lead-capturing/get-allLeadSource-slice";
import { getActiveCampusValues } from "../../../store/get/get-allActiveCampus-slice";
import WhatsAppMessenger from "../genral/WhatsappMessanger";

const ManageLeadsDetails: React.FC = () => {
  const { isLoading } = useSelector(
    (state: RootState) => state.getLeadPropertiesDataById
  );
  const { isShowModalForCalling, whatsappMessengerModal } = useSelector((state: RootState) => state.ui);
  const { isLoading: isLoadingForCheckUpdateStatus } = useSelector(
    (state: RootState) => state.checkForUpdateLeadProperty
  );
  const { isLoading: isLoadingForCampus } = useSelector((state: RootState) => state.getCampusInterestedDetails);
  const {
    isLoading: isLoadingForApplicationStatus,
  } = useSelector(
    (state: RootState) => state.getLeadApplicationStatusDataByLeadId
  );

  const { isLoading: isLoadingProperties } = useSelector(
    (state: RootState) => state.getLeadPropertiesDataById
  );

  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const apiCalledRef = useRef(false);

  useEffect(() => {
    console.log("inisde 1")
    if (apiCalledRef.current === false) {
      store.dispatch(getAcademicCareerValuesForQuickadd());
      store.dispatch(getStateValues());
      store.dispatch(getLeadSourceValues());
      store.dispatch(getActiveCampusValues())
      apiCalledRef.current = true;
    }
  }, []);

  useEffect(() => {
    store.dispatch(getCampusInterestedDetailsByEnquiryId(activeEnquiry[0]?.leadEnquiryId));

  }, [responseOfLeadEnquiryDetailsById])

  const closeModalForCalling = () => store.dispatch(onDisableModalForCalling());
  const closeModalForWhatsapp = () => store.dispatch(closeWhatsappMessengerModal());

  const callStageData = {
    title: "Call",
    cancelButton: "Cancel",
    saveButton: "Save",
  };
  const whatsappData = {
    title: "Whatsapp",
    cancelButton: "Cancel",
    saveButton: "Save",
  };
  return (
    <>
      <div className="flex w-full flex-col lg:flex-row mt-2 gap-3 items-start px-3 sm:px  overflow-hidden h-[calc(100vh-95px)]">
        <div className="w-full lg:w-auto lg:min-w-[400px] h-[calc(100vh-95px)] overflow-y-auto">
          {(isLoading || isLoadingProperties || isLoadingForCheckUpdateStatus || isLoadingForCampus) && (
            <LoadingSpinner
              size={35}
              mainLoading={true}
              message="Fetching Leads Properties !"
              centered={true}
            />
          )}
          {(!isLoading && !isLoadingForCheckUpdateStatus && !isLoadingForCampus && !isLoadingProperties) && <LeftView />}
        </div>

        <div className="w-full border mr-1 rounded-md overflow-hidden mb-3 h-[calc(100vh-95px)] overflow-y-auto">
          {isLoadingForApplicationStatus && (
            <LoadingSpinner
              centered={true}
              size={20}
              message="Loading"
              mainLoading={true}
            />
          )}
          <RightView />
        </div>
      </div>

      {isShowModalForCalling && (
        <CustomModal
          isMode="callingAction"
          isShowModal={isShowModalForCalling}
          onHideModal={closeModalForCalling}
          data={callStageData}
        >
          {/* <ChangeStage onHideModal={closeModalForCalling} /> */}
          <CallingLeads />
        </CustomModal>
      )}
      {whatsappMessengerModal && (
        <CustomModal
          isMode="whatsapp"
          isShowModal={whatsappMessengerModal}
          onHideModal={closeModalForWhatsapp}
          data={whatsappData}
        >
          <WhatsAppMessenger />
        </CustomModal>
      )}
    </>
  );
};

export default ManageLeadsDetails;

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { onGetLeadCaptureId } from "../../store/ui/ui-slice";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getleadDetailsById } from "../../store/view-leads-details/get-leadDetails-byId-slice";
import { getLeadPropertiesById } from "../../store/view-leads-details/get-leadProperties-byLeadId-slice";
import ManageLeadsDetails from "../../component/manage-leads/leads-details/ManageLeadsDetails";
import { getLeadApplicationStatusByLeadId } from "../../store/lead-applicationStatus/get-lead-application-status-by-lead-capture-id-slice";
import { getMaxActiveAppStatus } from "../../store/scholarship-services/get-max-active-application-status-slice";
import { getLeadEnquiryDetailsById } from "../../store/lead-attribute-update/get-leadEnquiryDetails-slice";
import { checkForUpdateLeadProperty } from "../../store/lead-properties/check-for-updateLeadProperty-slice";
import { emptyDataIcon } from "../../data/savgIcons";
import Fallback from "../../util/custom/ui/Fallback";

const ViewManageLeadsPage: React.FC = () => {
  const { leadCaptureId } = useParams();
  const dispatch = store.dispatch;
  const location = useLocation();
  const navigate = useNavigate();

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const isDocumentReviewer = userDetails?.authority?.includes("ROLE_DOCUMENT_REVIEWER")

  const isViaButton = location.state?.viaButton;

  const { isRun: isRunForCreate } = useSelector(
    (state: RootState) => state.addNewLeadTask
  );
  const { isLoading: isLoadingDetails } = useSelector(
    (state: RootState) => state.getleadDetailsDataById
  );

  const { isRun: isRunForCreateNote } = useSelector(
    (state: RootState) => state.addNewNotes
  );
  const { isRun: isRunForLeadOfferLock } = useSelector(
    (state: RootState) => state.lockLeadOffer
  );
  const { isRun: isRunForCreateActivity } = useSelector(
    (state: RootState) => state.addActivity
  );
  const { isRun: isRunForUpdateLeadProperties } = useSelector(
    (state: RootState) => state.LeadPropertiesUpdate
  );
  const { isRun: isRunForManualOutboundCall } = useSelector(
    (state: RootState) => state.createManualCallOutbound
  );
  const { isRun: isRunForChangeEnquiry } = useSelector(
    (state: RootState) => state.changeLeadEnquiryStatus
  );
  const { isLoading: isLoadingForEnquiry, responseOfLeadEnquiryDetailsById } =
    useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const { isRun: isRunForAddressInfo } = useSelector((state: RootState) => state.LeadAddressUpdate);
  const { isRun: isRunForBiographicalInfo } =
    useSelector((state: RootState) => state.addAdditionalDetails);

  const { isRun: isRunForChangeStage } = useSelector((state: RootState) => state.BulkChangeStage)

  useEffect(() => {
    dispatch(getLeadEnquiryDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunForChangeEnquiry, isRunForAddressInfo, isRunForBiographicalInfo]);

  useEffect(() => {
    if (!isViaButton) {
      navigate("/manage-leads-v1");
    }
  }, [location.state, navigate]);

  useEffect(() => {
      dispatch(getLeadPropertiesById(leadCaptureId));
    
  }, [leadCaptureId, isRunForUpdateLeadProperties, isRunForChangeEnquiry, isRunForChangeStage]);

  useEffect(() => {
    if (Object.keys(responseOfLeadEnquiryDetailsById).length !== 0) {
      if (activeEnquiry.length !== 0) {
        const payload = {
          leadCaptureId: leadCaptureId,
          leadEnquiryId: activeEnquiry[0].leadEnquiryId,
        };
        dispatch(onGetLeadCaptureId(leadCaptureId));
        dispatch(getMaxActiveAppStatus(payload));
        dispatch(checkForUpdateLeadProperty(payload));
      }
    }
  }, [leadCaptureId, responseOfLeadEnquiryDetailsById]);

  useEffect(() => {
    if (Object.keys(responseOfLeadEnquiryDetailsById).length !== 0) {
      const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
      const payloadForApplicationStatus = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      dispatch(getLeadApplicationStatusByLeadId(payloadForApplicationStatus));
    }
  }, [
    isRunForLeadOfferLock,
    responseOfLeadEnquiryDetailsById,
    leadCaptureId
  ]);

  useEffect(() => {
    if (!isDocumentReviewer) {
      dispatch(getleadDetailsById(leadCaptureId));
    }
  }, [
    leadCaptureId,
    isRunForManualOutboundCall,
    isRunForCreate,
    isRunForCreateNote,
    isRunForCreateActivity,
  ]);

  const isLoading =
    isLoadingDetails || isLoadingForEnquiry;

  const renderedContent = useMemo(() => {
    return isLoading ? (
      <LoadingSpinner
        size={20}
        mainLoading={false}
        message="Loading..."
        centered={true}
      />
    ) : Object.keys(responseOfLeadEnquiryDetailsById).length !== 0 ? (
      <ManageLeadsDetails />
    ) : (
      <>
        <Fallback
          isCenter={true}
          errorInfo="Data not found"
          icon={emptyDataIcon}
        />
      </>
    );
  }, [isLoading]);

  return <>{renderedContent}</>;
};

export default ViewManageLeadsPage;

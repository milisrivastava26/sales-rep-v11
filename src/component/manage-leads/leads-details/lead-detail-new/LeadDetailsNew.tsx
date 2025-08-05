import React, { useEffect } from "react";
import BiographicalInfo from "./BiographicalInfo";
import AddressInfo from "./AddressInfo";
import store, { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import { getLeadAddressById } from "../../../../store/lead-attribute-update/get-leadAddress-byId-slice";
import { getLeadContactDetailsById } from "../../../../store/lead-attribute-update/get-leadContactDetails-byId-slice";
import { getLeadAcademicDetailsById } from "../../../../store/lead-attribute-update/get-leadAcademicDetails-slice";
import { useSelector } from "react-redux";
import ContactDetailsInfo from "./ContactDetailsInfo";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import InterestShownInfo from "./InterestShownInfo";
import { getAdditionalInfoById } from "../../../../store/lead-attribute-update/get-leadAdditionalDetails-slice";
import SrmuSetInfo from "./SrmuSetInfo";
import { getSrmusetOptionDetails } from "../../../../store/srmuset/get-srmuSetOption-detail-slice";
import AcademicInfo from "./AcademicDetailsInfo";
import GenerateErpId from "./GenerateErpId";
import { getPsEmplId, resetGetPsEmplIdResponse } from "../../../../store/crm-to-ps-integration/get-PsEmplId-slice";
import { getUgAdditionalDetailsById } from "../../../../store/lead-academicDetailsForUG/get-ugAdditionalDetails-slice";

const LeadDetailsNew: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isLoading: isLoadingForBiographical } = useSelector(
    (state: RootState) => state.getAdditionalInfoByIdData
  );
  const { isRun: isRunForAddress } = useSelector(
    (state: RootState) => state.LeadAddressUpdate
  );
  const { isRun: isRunForContact } = useSelector(
    (state: RootState) => state.LeadContactUpdate
  );
  const { isRun: isRunForAcademic } = useSelector(
    (state: RootState) => state.LeadAcademicDetailsUpdate
  );
  const { isLoading: isLoadingForContact } = useSelector(
    (state: RootState) => state.getLeadContactDetailsDataById
  );
  const { isLoading: isLoadingForAddress } = useSelector(
    (state: RootState) => state.getLeadAddressDataById
  );
  const { isLoading: isLoadingForAcademic } = useSelector(
    (state: RootState) => state.getLeadAcademicDetailsDataById
  );
  const { isLoading: isLoadingForInterestShown } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const { isRun } = useSelector(
    (state: RootState) => state.LeadAdditionalInfoUpdate
  );
  const { isRun: isRunForCreateAdditionalInfo } = useSelector(
    (state: RootState) => state.addAdditionalDetails
  );
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const { isRun: isRunGetEmplId } = useSelector((state: RootState) => state.syncDataToPs);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const { isLoading: isLoadingForEmplId } = useSelector((state: RootState) => state.getEmplId);


  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  useEffect(() => {
    store.dispatch(getLeadAcademicDetailsById(leadCaptureId));
    store.dispatch(getUgAdditionalDetailsById(leadCaptureId));
  }, [leadCaptureId, isRunForAcademic]);

  useEffect(() => {
    store.dispatch(getLeadContactDetailsById(leadCaptureId));
  }, [isRunForContact, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getAdditionalInfoById(leadCaptureId));
  }, [isRun, isRunForCreateAdditionalInfo, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getLeadAddressById(leadCaptureId));
  }, [isRunForAddress, leadCaptureId]);

  useEffect(() => {
    store.dispatch(getSrmusetOptionDetails(leadEnquiryId));
  }, [leadEnquiryId]);

  useEffect(() => {
    store.dispatch(resetGetPsEmplIdResponse());
    store.dispatch(getPsEmplId(leadCaptureId));
  }, [leadCaptureId, isRunGetEmplId])


  const isLoading =
    isLoadingForBiographical ||
    isLoadingForContact ||
    isLoadingForAddress ||
    isLoadingForAcademic || isLoadingForEmplId ||
    isLoadingForInterestShown;

  return (
    <>
      {isLoading && (
        <LoadingSpinner
          size={20}
          mainLoading={false}
          message="Fetching Lead Details"
          centered={false}
        />
      )}
      {!isLoading && (
        <>
          <InterestShownInfo />
          <AddressInfo />
          <BiographicalInfo />
          <GenerateErpId />
          <ContactDetailsInfo />
          <SrmuSetInfo />
          <AcademicInfo />
        </>
      )}
    </>
  );
};

export default LeadDetailsNew;

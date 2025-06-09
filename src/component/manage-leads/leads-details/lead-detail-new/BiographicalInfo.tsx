import React, { useEffect, useState } from "react";
import BiographicalInfoForm from "./BiographicalInfoForm";
import store, { RootState } from "../../../../store";
import { getAllCityByStateId } from "../../../../store/get/get-allCity-byStateId-slice";
import { getApByCareerId } from "../../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import {
  biographicalFormInput,
  getInitialValuesForBiographicalInfo,
  transformBiographicalPayload,
  validationSchemaForBiographicalInfo,
} from "../../../../data/lead-details-data-new/leadBiographical-data";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { MdOutlineEdit } from "react-icons/md";
import {
  resetResponseForUpdateLeadAdditionalInfo,
  takeActionsForUpdateLeadAdditionalInfo,
  updateLeadAdditionalInfo,
} from "../../../../store/lead-attribute-update/update-leadAdditionalDetails-slice";
import {
  AddAdditionalDetails,
  resetResposneforAdditionalDetails,
} from "../../../../store/lead-attribute-update/create-leadAdditionalDetails-slice";
import { getCategoryValues } from "../../../../store/get/get-all-category-slice";
import { getAdmitTypeValues } from "../../../../store/get/get-all-admit-type-slice";

import { getMaxActiveAppStatus } from "../../../../store/scholarship-services/get-max-active-application-status-slice";

const BiographicalInfo: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isLoading, responseofLeadBiographicalInfo } = useSelector(
    (state: RootState) => state.getBiographicalInfoByIdData
  );
  const { responseOfLeadAdditionalInfo, resetActions, isError } = useSelector(
    (state: RootState) => state.LeadAdditionalInfoUpdate
  );
  const {
    isLoading: isLoadingForLeadadditionalDetails,
    responseofLeadAdditionalInfo,
  } = useSelector((state: RootState) => state.getAdditionalInfoByIdData);
  const { isError: isErrorForCreate, responseOfAdditionalDetails } =
    useSelector((state: RootState) => state.addAdditionalDetails);
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
  const additionalDetailsId =
    responseofLeadAdditionalInfo.leadAdditionalDetailId;

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    store.dispatch(getCategoryValues());
    store.dispatch(getAdmitTypeValues());
  }, []);

  const dispatch = store.dispatch;
  const getCityHandler = (StateId: any) => {
    dispatch(getAllCityByStateId(StateId));
  };

  const getAcademicProgramHandler = (careerId: any) => {
    dispatch(getApByCareerId(careerId));
  };

  const onUpdateLeadHandler = (data: any) => {
    const { values, actions } = data;

    const payloadForAddAdditionalDetails = transformBiographicalPayload(values, leadEnquiryId, leadCaptureId)


    if (
      Object.values(responseofLeadAdditionalInfo).every((item) => item === null)
    ) {
      store.dispatch(AddAdditionalDetails(payloadForAddAdditionalDetails));

    } else {
      store.dispatch(
        updateLeadAdditionalInfo({ additionalDetailsId, payloadForAddAdditionalDetails })
      );
    }
    store.dispatch(takeActionsForUpdateLeadAdditionalInfo(actions));
  };

  const initialValuesForBiographical =
    responseofLeadBiographicalInfo !== null
      ? getInitialValuesForBiographicalInfo(
        responseofLeadAdditionalInfo,
        leadCaptureId
      )
      : null;

  useEffect(() => {
    if (
      (!isError && responseOfLeadAdditionalInfo) ||
      (!isErrorForCreate && responseOfAdditionalDetails)
    ) {
      if (!isErrorForCreate && responseOfAdditionalDetails) {
        const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
        const payloadForApplicationStatus = {
          leadCaptureId: leadCaptureId,
          leadEnquiryId: leadEnquiryId,
        };
        store.dispatch(getMaxActiveAppStatus(payloadForApplicationStatus));
      }
      setEditing(false);
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadAdditionalInfo());
      store.dispatch(resetResposneforAdditionalDetails());
    }
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {isLoadingForLeadadditionalDetails && (
        <LoadingSpinner
          size={20}
          mainLoading={false}
          message="Loading Details"
          centered={false}
        />
      )}
      {initialValuesForBiographical !== null && !isLoading && (
        <div className="bg-white  mt-5  pb-1 relative">
          <div className="flex justify-between items-center h-[50px] mb-5 px-4 bg-blue-100">
            <h1 className="text-lg font-semibold">Biographical Details</h1>
            {!isEditing && (
              <button
                className=" px-3 py-1.5 font-medium rounded-lg"
                onClick={handleEditClick}
              >
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
          <div className="px-4 pb-4">
            <BiographicalInfoForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValuesForBiographical}
              validationSchema={validationSchemaForBiographicalInfo}
              inputData={biographicalFormInput}
              isEnableForAction={true}
              onGetAcademicProgram={getAcademicProgramHandler}
              onGetCity={getCityHandler}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BiographicalInfo;

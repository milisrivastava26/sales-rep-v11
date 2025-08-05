import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../store";

import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { academicDetailsFormInput, getInitialValuesForAcademicDetails, getValidationSchemaForAcademicDetails } from "../../../../data/lead-details-data-new/leadAcademic-data";
import AcademicInfoForm from "./AcademicDetailsForm";
import { onDisableAllInputFields, onSetEnableForDiplomaInputFields, onSetEnableForTwefthInputFields } from "../../../../store/ui/ui-slice";
import { transformPayloadForAcademicData, transformPayloadForUgAdditionalDetails } from "../../../../util/actions/lead-attribute-transformation/transformLeadDetailsPayloadData";
import { useParams } from "react-router-dom";
import {
  resetResponseForUpdateLeadAcademicDetails,
  takeActionsForUpdateLeadAcademicDetails,
  updateLeadAcademicDetails,
} from "../../../../store/lead-attribute-update/update-leadAcademicDetails-slice";
import { MdOutlineEdit } from "react-icons/md";
import { getTenthBoardValues } from "../../../../store/get/get-all10th-slice";
import { getTenthMarkingSchemeValues } from "../../../../store/get/get-all10thScheme-slice";
import { getTwelfthBoardValues } from "../../../../store/get/get-all-twelfth-board-slice";
import { saveAdditionalUgDetails } from "../../../../store/lead-academicDetailsForUG/save-ugAdditionalDetails-slice";

const AcademicInfo: React.FC = () => {
  const { leadCaptureId } = useParams();
  const { isLoading, responseOfLeadAcademicDetailsById } = useSelector((state: RootState) => state.getLeadAcademicDetailsDataById);
  const [isDisabledForTwelfthMarks, setIsDisabledForTwelfthMarks] = useState(false);
  const [isDisabledForDiplomaMarks, setIsDisabledForDiplomaMarks] = useState(false);
  const [isDisabledForUgMarks, setIsDisabledForUgMarks] = useState(false);
  const [isDisabledForUgAdditionalMarks, setIsDisabledForUgAdditionalMarks] = useState(false);

  const { isEnableForDiplomaInputFields, isEnableForTwelfthInputFields, isEnableForUGInputFields } = useSelector((state: RootState) => state.ui as any);

  const { isError, resetActions, responseOfLeadAcademicDetails } = useSelector((state: RootState) => state.LeadAcademicDetailsUpdate);
  const { additionalUgDetailsById } = useSelector((state: RootState) => state.getUgAdditionalDetailsById);
  const [isEditing, setEditing] = useState(false);
  const [showUGDetails, setShowUGDetails] = useState(false);

  const handleCheckboxChange = () => {
    setShowUGDetails((prev) => !prev);
  };

  const onUpdateLeadHandler = (data: any) => {

    const updatedData = transformPayloadForAcademicData(data.values, isEnableForTwelfthInputFields, isEnableForDiplomaInputFields, isEnableForUGInputFields, leadCaptureId);

    const payloadForAditionalUgDetails = transformPayloadForUgAdditionalDetails(data.values, leadCaptureId);
    if (showUGDetails) {
      store.dispatch(saveAdditionalUgDetails(payloadForAditionalUgDetails));
    }
    store.dispatch(updateLeadAcademicDetails(updatedData));
    store.dispatch(takeActionsForUpdateLeadAcademicDetails(data.actions));
  };

  useEffect(() => {
    store.dispatch(onDisableAllInputFields())
  }, [leadCaptureId])

  useEffect(() => {
    store.dispatch(getTenthBoardValues());
    store.dispatch(getTenthMarkingSchemeValues());
    store.dispatch(getTwelfthBoardValues());
  }, [])

  useEffect(() => {
    if (Object.keys(additionalUgDetailsById).length !== 0) {
      setShowUGDetails(true);
    }
    else {
       setShowUGDetails(false);
    }
  }, [additionalUgDetailsById])

  const initialValuesForAcademicInfo = responseOfLeadAcademicDetailsById !== null ? getInitialValuesForAcademicDetails(responseOfLeadAcademicDetailsById, additionalUgDetailsById) : null;

  const Tenth_plus_2_type = initialValuesForAcademicInfo?.tenth_plus_2_type;
  const twelfthResultStatus = initialValuesForAcademicInfo?.coreTwelfthResultStatus;
  const diplomaResultStatus = initialValuesForAcademicInfo?.coreDiplomaResultStatus;
  const ugResultStatus = initialValuesForAcademicInfo?.coreUgResultStatus;

  useEffect(() => {
    if (Tenth_plus_2_type === "TWELFTH") {
      store.dispatch(onSetEnableForTwefthInputFields());
    }

    if (Tenth_plus_2_type === "DIPLOMA") {
      store.dispatch(onSetEnableForDiplomaInputFields());
    }

    if (twelfthResultStatus === "AWAITED") {
      setIsDisabledForTwelfthMarks(true);
    }
    else {
      setIsDisabledForTwelfthMarks(false);
    }

    if (diplomaResultStatus === "AWAITED") {
      setIsDisabledForDiplomaMarks(true);
    }
    else {
      setIsDisabledForDiplomaMarks(false);
    }
    if (ugResultStatus === "AWAITED") {
      setIsDisabledForUgMarks(true);
    }
    else {
      setIsDisabledForUgMarks(false);
    }

  }, [responseOfLeadAcademicDetailsById]);

  useEffect(() => {
    if (!isError && responseOfLeadAcademicDetails) {
      setEditing(false);
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadAcademicDetails());
    }
  }, [responseOfLeadAcademicDetails]);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {isLoading && <LoadingSpinner size={20} mainLoading={false} message="Loading Details" centered={false} />}
      {initialValuesForAcademicInfo !== null && !isLoading && (
        <div className="bg-white  mt-5 pb-20 relative">
          <div className="flex justify-between items-center h-[50px]  mb-5 px-4 bg-blue-100">
            <h1 className="text-lg font-semibold">Other Details</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
          <div className="px-4">
            <AcademicInfoForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValuesForAcademicInfo}
              validationSchema={getValidationSchemaForAcademicDetails(isEnableForTwelfthInputFields, isEnableForDiplomaInputFields, isEnableForUGInputFields, showUGDetails)}
              inputData={academicDetailsFormInput}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEnableForTwelfth={isEnableForTwelfthInputFields}
              isEnableForDiploma={isEnableForDiplomaInputFields}
              isEnableForUg={isEnableForUGInputFields}
              isEditing={isEditing}
              setEditing={setEditing}
              setIsDisabledForTwelfthMarks={setIsDisabledForTwelfthMarks}
              isDisabledForTwelfthMarks={isDisabledForTwelfthMarks}
              setIsDisabledForDiplomaMarks={setIsDisabledForDiplomaMarks}
              isDisabledForDiplomaMarks={isDisabledForDiplomaMarks}
              setIsDisabledForUgMarks={setIsDisabledForUgMarks}
              isDisabledForUgMarks={isDisabledForUgMarks}
              handleCheckboxChange={handleCheckboxChange}
              showUGDetails={showUGDetails}
              setIsDisabledForUgAdditionalMarks={setIsDisabledForUgAdditionalMarks}
              isDisabledForUgAdditionalMarks={isDisabledForUgAdditionalMarks}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AcademicInfo;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import {
  getInitialValuesForInterestShown,
  validationSchemaForInterestShown,
} from "../../../../data/lead-details-data-new/interestShow-data";
import InterestShownForm from "./InterestShownForm";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { getApRowWiseByCareerId } from "../../../../store/lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityRowWiseByStateId } from "../../../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";
import isEqual from "lodash/isEqual";
import toast from "react-hot-toast";
import {
  ChangeLeadEnquiryStatus,
  resetChangeLeadEnquiryStatusResponse,
} from "../../../../store/lead-merge/change-leadEnquiryStatus-by-captureId-existingEnquiryId-newActiveEnquiryId-slice";
import { resetgetEnquiryChangeWarningResponse } from "../../../../store/lead-merge/get-enquiryChangeWarning-by-captureId-and-EnquiryId-slice";
import { getAcademicCareerValues } from "../../../../store/get/get-all-academic-career-slice";

const InterestShownInfo: React.FC = () => {
  const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [isRowAdded, setIsRowAdded] = useState(false);
  const { isLoading, responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const { ChangeLeadEnquiryStatusResponse, isError } = useSelector(
    (state: RootState) => state.changeLeadEnquiryStatus
  );
  const currentActiveEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
        (item: any) => item.status === "ACTIVE"
      )
    : [];

  const previousActiveEnquiry = {
    academicCareerId: currentActiveEnquiry[0].academicCareerId,
    academicProgramId: currentActiveEnquiry[0].academicProgramId,
    coreCityId: currentActiveEnquiry[0].coreCityId,
    coreStateId: currentActiveEnquiry[0].coreStateId,
    leadCaptureId: currentActiveEnquiry[0].leadCaptureId,
    leadSourceId: currentActiveEnquiry[0].leadSourceId,
    status: currentActiveEnquiry[0].status,
  };

  const initialValues = getInitialValuesForInterestShown(
    responseOfLeadEnquiryDetailsById,
    leadCaptureId
  );

  useEffect(() => {
    store.dispatch(getAcademicCareerValues());
  }, []);
  // to dispatch for the pre selected program and city

  useEffect(() => {
    if (Array.isArray(responseOfLeadEnquiryDetailsById)) {
      responseOfLeadEnquiryDetailsById.forEach((item: any, index: number) => {
        const careerId = item.academicCareerId;
        const stateId = item.coreStateId;

        if (careerId !== "" && careerId !== null) {
          store.dispatch(getApRowWiseByCareerId({ careerId, index }));
        }
        if (stateId !== "" && stateId !== null) {
          store.dispatch(getCityRowWiseByStateId({ stateId: stateId, index }));
        }
      });
    }
  }, [responseOfLeadEnquiryDetailsById]);

  const onUpdateLeadHandler = (data: any) => {
    const { values } = data;
    // const newLeadEnquiry = transformPayloadForInterestShown(values);
    const newActiveEnquiry = values.interest.filter(
      (item: any) => item.active === true
    );
    const newActiveEnquiryObj = {
      academicCareerId: Number(newActiveEnquiry[0].academicCareerId),
      academicProgramId: Number(newActiveEnquiry[0].academicProgramId),
      coreCityId: Number(newActiveEnquiry[0].currentCoreCityId),
      coreStateId: Number(newActiveEnquiry[0].currentCoreStateId),
      leadCaptureId: Number(newActiveEnquiry[0].leadCaptureId),
      leadSourceId: Number(newActiveEnquiry[0].leadSourceId),
      status: newActiveEnquiry[0].active === true ? "ACTIVE" : "INACTIVE",
    };

    if (isEqual(newActiveEnquiryObj, previousActiveEnquiry)) {
      toast.success("Saved successfully! No change detected");
      setEditing(false);
    } else {
      const payload = {
        leadCaptureId: leadCaptureId,
        currentLeadEnquiryId: currentActiveEnquiry[0].leadEnquiryId,
        newLeadEnquiryId: newActiveEnquiry[0].leadEnquiryId,
      };
      store.dispatch(ChangeLeadEnquiryStatus(payload));
    }
  };

  useEffect(() => {
    if (!isError && ChangeLeadEnquiryStatusResponse!=="") {
      setIsRowAdded(false);
      setEditing(false);
      store.dispatch(resetChangeLeadEnquiryStatusResponse());
      store.dispatch(resetgetEnquiryChangeWarningResponse());
    }
  }, [ChangeLeadEnquiryStatusResponse]);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {responseOfLeadEnquiryDetailsById !== null && !isLoading && (
        <div className="bg-white relative  mt-5  pb-1">
          <div className="flex justify-between items-center  h-[50px] relative px-4 bg-blue-100 ">
            <h1 className="text-lg font-semibold">Course Interested</h1>
            {!isEditing && (
              <button
                className=" px-3 py-1.5  font-medium rounded-lg"
                onClick={handleEditClick}
              >
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>

          <div className="">
            <InterestShownForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValues}
              validationschema={validationSchemaForInterestShown}
              isEnableForAction={true}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
              setIsRowAdded={setIsRowAdded}
              isRowAdded={isRowAdded}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InterestShownInfo;

import React, { useEffect, useState } from "react";
import { leftViewData } from "../../../data/manage-leads/leadDetails-data";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { addSpacesToCamelCase } from "../genral/CapitalizeName";
import profile from "../../../assets/profile.png";
import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail, MdModeEdit } from "react-icons/md";
import { onSetOpenModalForCalling } from "../../../store/ui/ui-slice";
import CustomForm from "../../../util/custom/CustomForm";
import {
  getCampusInterestedInInitialValues,
  campusInterestedValidationSchema,
  formValuesForCampusInterestedIn,
  getPersonalDetailsFormData,
  getPersonalDetailsInitialValue,
  personalDetailsValidationSchema,
} from "../../../data/manage-leads/personal-details/personal-details-data";
import { getApByCareerId } from "../../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { getAllCityByStateId } from "../../../store/get/get-allCity-byStateId-slice";
import { RxCross2 } from "react-icons/rx";
import { updateLeadProperties } from "../../../store/lead-properties/update-leadProperties-slice";
import { resetResponseForCampusInterested, saveCampusInterestedInDetails } from "../../../store/campus/save-campusInterestedInDetails-slice";
import { getCampusInterestedDetailsByEnquiryId } from "../../../store/campus/get-campusInterestedDetails-by-enquiryId-slice";
import { getLeadPropertiesById } from "../../../store/view-leads-details/get-leadProperties-byLeadId-slice";

const LeftView: React.FC = () => {
  const { heading } = leftViewData[0];
  const { leadPropertiesDataById } = useSelector(
    (state: RootState) => state.getLeadPropertiesDataById
  );
  const { maxActiveAppStatusResponse } = useSelector(
    (state: RootState) => state.getMaxActiveAppStatusResponse
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingForCampus, setIsEditingForCampus] = useState(false);
  const { isLoading, CheckForUpdateLeadPropertyResponse } = useSelector(
    (state: RootState) => state.checkForUpdateLeadProperty
  );
  const { responseOfLeadEnquiryDetailsById } = useSelector(
    (state: RootState) => state.getLeadEnquiryDetailsDataById
  );
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];
  const {
    responseOfUpdateLeadProperties,
    isError,
    isLoading: isLoadingForUpdateLeadProperties,
  } = useSelector((state: RootState) => state.LeadPropertiesUpdate);

  const { leadCaptureId, salesrepId, salesrepName, ...rest } =
    leadPropertiesDataById;

  const transformedObject: any = {
    Owner: salesrepName,
    ...rest,
  };

  const { getCampusInterestedDetailsResponse, } = useSelector((state: RootState) => state.getCampusInterestedDetails);

  const initialValuesForPersonalDetails = getPersonalDetailsInitialValue(
    leadPropertiesDataById,
    activeEnquiry
  );


  const { responseOfCampusInterested } = useSelector((state: RootState) => state.saveCampusInterestedIn);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveForCampus = (data: any) => {
    const { values } = data;

    const payload = {
      leadEnquiryId: activeEnquiry[0]?.leadEnquiryId,
      coreCampusId: values.coreCampusId,
    }
    console.log("payload", payload);

    store.dispatch(saveCampusInterestedInDetails(payload));
  }


  useEffect(() => {
    if (Object.keys(responseOfCampusInterested).length !== 0) {
      store.dispatch(resetResponseForCampusInterested());
      setIsEditingForCampus(false)
    }
  }, [responseOfCampusInterested])

  useEffect(() => {

    console.log("inisde 2")
    const careerId = activeEnquiry[0]?.academicCareerId;
    const stateId = leadPropertiesDataById.stateId;
    const target = "currentCoreStateId";

    if (stateId !== undefined) {
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }

    if (careerId !== undefined && careerId !== null) {
      store.dispatch(getApByCareerId(careerId));
    }
  }, [leadPropertiesDataById]);

  const onCallHandler = () => {
    store.dispatch(onSetOpenModalForCalling());
  };

  const getAcademicProgramHandler = (careerId: any) => {
    if (careerId !== undefined && careerId !== "" && careerId !== null) {
      store.dispatch(getApByCareerId(careerId));
    }
  };

  const getCityByStateHandler = ({
    stateId,
    target,
  }: {
    stateId: any;
    target: any;
  }) => {
    if (stateId !== undefined && stateId !== "" && stateId !== null) {
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }
  };

  const handleSave = (data: any) => {
    const { values } = data;
    const updatedData = {
      leadCaptureId: leadCaptureId,
      leadEnquiryId: activeEnquiry[0]?.leadEnquiryId,
      email: values.email || "NA",
      name: values.name || "NA",
      careerId: values.academicCareerId || 5,
      programId: values.academicProgramId || 123,
      cityId: values.cityId || 4143,
      stateId: values.currentCoreStateId || 36,
    };

    store.dispatch(updateLeadProperties(updatedData));
  };

  useEffect(() => {
    console.log("inisde 3")
    if (
      !isError &&
      responseOfUpdateLeadProperties !== "" &&
      !isLoadingForUpdateLeadProperties
    ) {
      setIsEditing(false);
    }
  }, [responseOfUpdateLeadProperties]);

  return (
    <>
      <div className="rounded-md bg-white border py-4  ">
        {/* Profile Part */}
        <div className="flex gap-x-4 px-4">
          <div className="w-20 h-20 min-w-20 min-h-20 border-2 rounded-full p-2">
            <img src={profile} alt="profile" />
          </div>

          <div className="mt-">
            <h2 className=" font-semibold ">{activeEnquiry[0]?.leadName}</h2>
            <h2 className="font-semibold break-all">{`Applied for ${activeEnquiry[0]?.programName}`}</h2>
            <div className="flex gap-x-8 mt-2">
              <IoCall
                size={22}
                className="text-[#3b82F6] cursor-pointer"
                onClick={onCallHandler}
              />
              <IoLogoWhatsapp size={22} />
              <MdEmail size={22} />
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="py-2 mt-2">
          <div>
            {Object.entries(transformedObject)
              .slice(0, 1)
              .map((data: any, index: any) => {
                return (
                  <div className=" flex items-start px-4 pb-2" key={index}>
                    <div className=" font-semibold text-sm text-nowrap mt-[1px]">
                      {addSpacesToCamelCase(data[0])} :
                    </div>
                    <div className=" text-sm  break-words ml-1 mt-0.5">
                      {data[1]}
                    </div>
                  </div>
                );
              })}
          </div>

          {transformedObject.leadStageName && (
            <div className=" flex items-start px-4 pb-2">
              <h1 className=" font-semibold text-sm text-nowrap mt-[1px]">
                Stage :
              </h1>
              <h1 className=" text-sm  break-words ml-1 mt-0.5 ">
                {transformedObject.leadStageName}
              </h1>
            </div>
          )}
          {transformedObject.leadSubStage && (
            <div className=" flex items-start px-4 pb-2">
              <h1 className=" font-semibold text-sm text-nowrap mt-[1px]">
                Sub Stage :
              </h1>
              <h1 className=" text-sm  break-words ml-1 mt-0.5 ">
                {transformedObject.leadSubStage}
              </h1>
            </div>
          )}

          <div className=" flex items-start px-4 pb-2">
            <h1 className=" font-semibold text-sm text-nowrap mt-[1px]">
              Application Status :
            </h1>
            <h1 className="text-sm font-medium break-words ml-1 mt-0.5 text-green-600">
              {maxActiveAppStatusResponse
                ? typeof maxActiveAppStatusResponse === "string"
                  ? maxActiveAppStatusResponse + " (Completed)"
                  : JSON.stringify(maxActiveAppStatusResponse)
                : "Pending"}
            </h1>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 bg-[#dbeafe] w-full px-4 py-1 ">
          <div className="font-medium ">{heading}</div>
          {!isEditing && (
            <MdModeEdit
              className="text-2xl cursor-pointer"
              onClick={handleEdit}
            />
          )}
          {isEditing && (
            <RxCross2
              className="text-2xl cursor-pointer"
              onClick={() => {
                setIsEditing(false); store.dispatch(getLeadPropertiesById(leadCaptureId));
              }}
            />
          )}
        </div>
        {!isLoading && CheckForUpdateLeadPropertyResponse !== null && (
          <div className="px-4">
            <CustomForm
              btnText="Save"
              btnType={"submit"}
              initialValues={initialValuesForPersonalDetails}
              inputData={getPersonalDetailsFormData(
                CheckForUpdateLeadPropertyResponse
              )}
              validationSchema={personalDetailsValidationSchema}
              onGetAcademicProgram={getAcademicProgramHandler}
              onGetCity={getCityByStateHandler}
              onSaveAndAddHandler={handleSave}
              isEnableForAction={true}
              isMode="personalDetails"
              isEditing={isEditing}
            />
          </div>
        )}

        {/* campus interested in section */}
        <div>
          <div className="flex justify-between mt-2 items-center mb-4 bg-[#dbeafe] w-full px-4 py-1 ">
            <div className="font-medium ">Campus</div>
            {!isEditingForCampus && (
              <MdModeEdit
                className="text-2xl cursor-pointer"
                onClick={() => setIsEditingForCampus(true)}
              />
            )}
            {isEditingForCampus && (
              <RxCross2
                className="text-2xl cursor-pointer"
                onClick={() => { setIsEditingForCampus(false); store.dispatch(getCampusInterestedDetailsByEnquiryId(activeEnquiry[0]?.leadEnquiryId)) }}
              />
            )}
          </div>

          <div className="px-4">
            <CustomForm
              btnText="Save"
              btnType={"submit"}
              initialValues={getCampusInterestedInInitialValues(getCampusInterestedDetailsResponse)}
              inputData={formValuesForCampusInterestedIn}
              validationSchema={campusInterestedValidationSchema}
              onSaveAndAddHandler={handleSaveForCampus}
              isEnableForAction={true}
              isMode="personalDetails"
              isEditing={isEditingForCampus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftView;

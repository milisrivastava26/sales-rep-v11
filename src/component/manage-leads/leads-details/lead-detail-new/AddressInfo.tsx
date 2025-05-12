import React, { useEffect, useState } from "react";
import store, { RootState } from "../../../../store";
import { getAllCityByStateId } from "../../../../store/get/get-allCity-byStateId-slice";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../util/custom/ui/LoadingSpinner";
import { addressFormInput, getInitialValuesForAddress, validationSchemaForAddress } from "../../../../data/lead-details-data-new/leadAddress-data";
import AddressInfoForm from "./AddressInfoForm";
import { transformAddressData } from "../../../../util/actions/lead-attribute-transformation/transformLeadDetailsPayloadData";
import { resetResponseForUpdateLeadAddress, takeActionsForUpdateLeadAddress, updateLeadAddress } from "../../../../store/lead-attribute-update/update-leadAddress-slice";
import { useParams } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { getMaxActiveAppStatus } from "../../../../store/scholarship-services/get-max-active-application-status-slice";

const AddressInfo: React.FC = () => {
  const { isLoading, responseOfLeadAddressById } = useSelector((state: RootState) => state.getLeadAddressDataById);
  const { isError, resetActions, responseOfUpdateLeadAddress } = useSelector((state: RootState) => state.LeadAddressUpdate);
  const { leadCaptureId } = useParams();
  const [isEditing, setEditing] = useState(false);
  const { responseOfLeadEnquiryDetailsById } =
    useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById)
    ? responseOfLeadEnquiryDetailsById.filter(
      (item: any) => item.status === "ACTIVE"
    )
    : [];

  const dispatch = store.dispatch;
  const getCityHandler = (StateId: any) => {
    dispatch(getAllCityByStateId(StateId));
  };

  const onUpdateLeadHandler = (data: any) => {
    const { values, actions } = data;

    const updatedData = transformAddressData(values);

    store.dispatch(updateLeadAddress(updatedData));
    store.dispatch(takeActionsForUpdateLeadAddress(actions));
  };

  const initialValuesForAddress = responseOfLeadAddressById !== null ? getInitialValuesForAddress(responseOfLeadAddressById, leadCaptureId) : null;

  useEffect(() => {
    const coreStateId = initialValuesForAddress?.coreStateId;
    const coreStateId2 = initialValuesForAddress?.coreStateId2;
    if (coreStateId !== null && coreStateId !== undefined && coreStateId !== "") {
      const stateId = coreStateId;
      const target = "coreStateId";
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }

    if (coreStateId2 !== null && coreStateId2 !== undefined && coreStateId2 !== "") {
      const stateId = coreStateId2;
      const target = "coreStateId2";
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }
  }, [initialValuesForAddress?.coreStateId, initialValuesForAddress?.coreStateId2]);

  useEffect(() => {
    if (!isError && responseOfUpdateLeadAddress) {
      setEditing(false);
      resetActions.resetForm();
      store.dispatch(resetResponseForUpdateLeadAddress());
      const leadEnquiryId = activeEnquiry[0].leadEnquiryId;
      const payloadForApplicationStatus = {
        leadCaptureId: leadCaptureId,
        leadEnquiryId: leadEnquiryId,
      };
      store.dispatch(getMaxActiveAppStatus(payloadForApplicationStatus));
    }
  }, [responseOfUpdateLeadAddress]);

  const handleEditClick = () => {
    setEditing(true);
  };

  return (
    <>
      {isLoading && <LoadingSpinner size={20} mainLoading={false} message="Loading Details" centered={false} />}
      {initialValuesForAddress !== null && !isLoading && (
        <div className="bg-white  mt-5 relative">
          <div className="flex justify-between items-center  min-h-[50px] mb-5 px-4 bg-blue-100 ">
            <h1 className="text-lg font-semibold">Address Details</h1>
            {!isEditing && (
              <button className=" px-6 py-1.5  font-medium rounded-lg" onClick={handleEditClick}>
                <MdOutlineEdit size={20} />
              </button>
            )}
          </div>
          <div className="px-4">
            <AddressInfoForm
              btnText={"Save"}
              btnType={"submit"}
              initialValues={initialValuesForAddress}
              validationSchema={validationSchemaForAddress}
              inputData={addressFormInput}
              isEnableForAction={true}
              onGetCity={getCityHandler}
              onSaveAndAddHandler={onUpdateLeadHandler}
              isEditing={isEditing}
              setEditing={setEditing}
            />
          </div>
        </div>
      )}
    </>
    // <div>hello</div>
  );
};

export default AddressInfo;

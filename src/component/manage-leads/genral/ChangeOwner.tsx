import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { getLeadOwnerValues } from "../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import useForLocation from "../../../hooks/useForLocation";
import {
  resetResponseForLeadOwnerUpdate,
  updateLeadOwner,
} from "../../../store/sales-rep-details(changeOwner)/update-lead-owner-by-id-slice";
import { getLeadCaptureByFullName } from "../../../store/lead-capture/get-allLeadCapture-By-fullName-slice";

interface changeOwnerProps {
  leadCaptureId: number;
  onHideModal: () => void;
}

interface LeadOwnerOption {
  value: number;
  label: string;
}

const ChangeOwner: React.FC<changeOwnerProps> = ({
  leadCaptureId,
  onHideModal,
}) => {
  const { currentURL } = useForLocation();

  const [selectedOption, setSelectedOption] =
    useState<SingleValue<LeadOwnerOption>>();
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const { responseForLeadOwner } = useSelector(
    (state: RootState) => state.getAllLeadOwner
  );
  const { isError, isLoading, responseLeadOwnerUpdate } = useSelector(
    (state: RootState) => state.updateLeadOwner
  );

  useEffect(() => {
    store.dispatch(getLeadOwnerValues());
  }, [currentURL]);

  const changeOwner = () => {
    const id = leadCaptureId;
    const updatedvalue = selectedOption?.value;
    store.dispatch(updateLeadOwner({ id, updatedvalue }));
  };

  const fullName = userDetails?.fullName;

  useEffect(() => {
    if (
      !isError &&
      !isLoading &&
      Object.keys(responseLeadOwnerUpdate).length !== 0
    ) {
      store.dispatch(resetResponseForLeadOwnerUpdate());
      onHideModal();
      if (fullName) {
        const payload = {
          current_salesrep_full_name: fullName,
        };
        store.dispatch(getLeadCaptureByFullName(payload));
      }
    }
  }, [isError, isLoading, responseLeadOwnerUpdate]);

  return (
    <div className="p-4">
      <form>
        <div className="grid w-full pb-5">
          <div className="pb-1">
            <label className="text-black font-medium text-base text-nowrap">
              Update To
            </label>
            <span className="text-red-500 text-base font-bold">*</span>
          </div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={responseForLeadOwner}
          />
        </div>
      </form>

      <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px] ${
          isLoading ? "bg-opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={changeOwner}
        disabled={isLoading}
      >
        Save
      </button>
    </div>
  );
};

export default ChangeOwner;

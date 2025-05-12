import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import { getLeadOwnerValues } from "../../../store/sales-rep-details(changeOwner)/get-all-lead-owner-slice";
import useForLocation from "../../../hooks/useForLocation";
import { ChangeOwnerInBulk } from "../../../store/actions/bulk-change-owner-slice";

interface changeOwnerProps {
  onHideModal: () => void;
  isMode?: string;
}

interface LeadOwnerOption {
  value: number;
  label: string;
}

const BulkChangeOwner: React.FC<changeOwnerProps> = ({
  onHideModal,
  isMode,
}) => {
  const { currentURL } = useForLocation();
  const { getAllCheckSelectedDataFormCustomTable, getLeadsForManageTask } = useSelector(
    (state: RootState) => state.ui
  );

  const key = isMode === "advanceSearch" ? "leadCaptureId" : "lead_capture_id";
  const leadCaptureIds = (getAllCheckSelectedDataFormCustomTable ?? []).map(
    (item: { lead_capture_id: number; leadCaptureId?: number }) => {
      return item[key as keyof typeof item];
    }
  );

  const leadCaptureIdForTask = (getLeadsForManageTask ?? []).map((item: any) => {
    return item.leadCaptureId
  })

  const [selectedOption, setSelectedOption] =
    useState<SingleValue<LeadOwnerOption>>();

  const { responseForLeadOwner } = useSelector(
    (state: RootState) => state.getAllLeadOwner
  );
  // const { isError, responseLeadOwnerUpdate } = useSelector((state: RootState) => state.updateLeadOwner);

  useEffect(() => {
    store.dispatch(getLeadOwnerValues());
  }, [currentURL]);

  const changeOwner = () => {
    const payload = {
      leadCaptureIds: isMode === "manageTask" ? leadCaptureIdForTask : leadCaptureIds,
      ownerId: selectedOption?.value,
    };
    store.dispatch(ChangeOwnerInBulk(payload));
    onHideModal();
  };

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
          {((leadCaptureIds.length === 0 && isMode === "bulkUpdate") || (leadCaptureIdForTask.length === 0 && isMode === "manageTask")) && (
            <span className="text-sm text-red-500 my-2">
              Please Select atleast on lead
            </span>
          )}
        </div>
      </form>

      <button
        disabled={
          (isMode === "bulkUpdate" && leadCaptureIds.length === 0) || (leadCaptureIdForTask.length === 0 && isMode === "manageTask")
        }
        type="submit"
        className={`${(leadCaptureIdForTask.length === 0 && isMode === "manageTask") ? "bg-opacity-50 cursor-not-allowed" : ""
          } bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]`}
        onClick={changeOwner}
      >
        Save
      </button>
    </div>
  );
};

export default BulkChangeOwner;

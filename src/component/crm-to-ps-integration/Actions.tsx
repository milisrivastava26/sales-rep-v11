import React from "react";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";
import { syncDataToPs } from "../../store/crm-to-ps-integration/sync-data-to-ps-slice";

interface propsType {
  leadCaptureId: string | number;
}

const Actions: React.FC<propsType> = ({ leadCaptureId }) => {
  const { isLoading: isLoadingSyncData } = useSelector((state: RootState) => state.syncDataToPs);

  const handleSyncDataToPsId = () => {
    store.dispatch(syncDataToPs(leadCaptureId));
  };

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1.5 ${isLoadingSyncData ? "bg-opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} bg-blue-600 rounded-md text-white text-sm`}
        onClick={handleSyncDataToPsId}
        disabled={isLoadingSyncData}
      >
        Sync data to PS
      </button>
    </div>
  );
};

export default Actions;

import React, { useState } from "react";
import { getPsIntegrationLeadDetails, resetPsIntegrationLeadDetails } from "../../store/crm-to-ps-integration/get-psIntegration-leadDetails-slice";
import store from "../../store";
import { resetSyncDataToPsResponse } from "../../store/crm-to-ps-integration/sync-data-to-ps-slice";
import toast from "react-hot-toast";

const SearchLead: React.FC = () => {
  const [input, setInput] = useState("");

  const handleSearch = async () => {
    const trimmedInput = input.trim();
    store.dispatch(resetPsIntegrationLeadDetails());
    store.dispatch(resetSyncDataToPsResponse());

    if (!/^\d+$/.test(trimmedInput)) {
      toast.error("Please enter digits only");
      return;
    }

    let data = "";

    if (trimmedInput.length === 10) {
      data = `phone=${trimmedInput}`;
    } else {
      data = `leadCaptureId=${trimmedInput}`;
    }

    store.dispatch(getPsIntegrationLeadDetails(data));
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Phone or Lead ID"
        className="border border-gray-300 px-4 py-2 rounded-md w-full"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Search
      </button>
    </div>
  );
};

export default SearchLead;

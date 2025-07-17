import React, { useEffect, useState } from "react";
import SearchLead from "./SearchLead";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import { getPsIntegrationLeadDetailsColumns } from "./PsIntegrationLeadDetailsColumn";

const CrmToPsIntegration: React.FC = () => {
  const { syncDataToPsResponse } = useSelector((state: RootState) => state.syncDataToPs);
  const [columns, setColumns] = useState(getPsIntegrationLeadDetailsColumns(syncDataToPsResponse));
  const { leadDetails, isLoading } = useSelector((state: RootState) => state.getPsIntegrationLeadDetails);

  useEffect(() => {
    setColumns(getPsIntegrationLeadDetailsColumns(syncDataToPsResponse));
  }, [syncDataToPsResponse]);

  return (
    <div className="bg-white py-6 h-screen overflow-x-hidden px-10">
      <h3 className="text-base sm:text-[22px] font-medium">CRM To PS Integration</h3>

      <div className="my-5">
        <SearchLead />
      </div>
      <div>
        <CustomDetailsTable columns={columns} data={leadDetails} isMode="psIntegration" />
        {isLoading && <LoadingSpinner centered={false} mainLoading={false} message="Loading details..." size={20} />}
        {leadDetails.length === 0 && !isLoading && <Fallback isCenter={true} errorInfo="Please search using valid Lead Capture Id or Phone" icon={emptyDataIcon} />}
      </div>
    </div>
  );
};

export default CrmToPsIntegration;

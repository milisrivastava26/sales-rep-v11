import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import Fallback from "../../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../../data/savgIcons";
import { ManageLeadsV2Column } from "./ManageLeadsV2Column";


const ViewFilterLeadsDataV2: React.FC = () => {
  const { isLoading } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const {paginatedLeads, isLoading:isLoadingForGetPaginatedLeads} = useSelector((state:RootState) => state.getPaginatedLeads);
  const data = paginatedLeads?.data;
  return (
    <div className="w-full __fliter_gradient overflow-x-scroll">
      {isLoadingForGetPaginatedLeads || isLoading ? (
        <LoadingSpinner
          centered={false}
          size={20}
          message="loading.."
          mainLoading={true}
        />
      ) : // <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={false} />
      data && data.length > 0 ? (
        <CustomDetailsTable
          columns={ManageLeadsV2Column}
          data={data}
          isMode="manageLeads"
        />
      ) : (
        // <CustomTableSSR columns={ManageLeadsColumn} data={currentData} />
        <div className="bg-white">
          <Fallback
            isCenter={true}
            errorInfo="Data not found"
            icon={emptyDataIcon}
          />
        </div>
      )}
    </div>
  );
};

export default ViewFilterLeadsDataV2;

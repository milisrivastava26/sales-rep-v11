import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { getManageLeadsColumnV1 } from "./table/ManageLeadsColumnV1";
import { CustomDetailsTable } from "../../util/custom/leadsFormat/CustomDetailsTable";

const ViewFilterLeadsData: React.FC = () => {
  const manageLeadsV1Column = getManageLeadsColumnV1();
  const { isLoading } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { paginatedLeads, isLoading: isLoadingForGetPaginatedLeads } = useSelector((state: RootState) => state.getPaginatedLeads);


  const { searchedLeads, isLoading: isLoadingForSearchedLeads } = useSelector((state: RootState) => state.getsearchedLeads);

  const data =
    searchedLeads && searchedLeads.length !== 0
      ? searchedLeads.data
      : paginatedLeads?.data || [];

  return (
    <div className="w-full __fliter_gradient overflow-x-scroll">
      {isLoadingForGetPaginatedLeads || isLoading || isLoadingForSearchedLeads ? (
        <LoadingSpinner
          centered={false}
          size={20}
          message="loading.."
          mainLoading={true}
        />
      ) : // <LoadingSpinner size={20} mainLoading={false} message="Fetching Leads!" centered={false} />
        data && data.length > 0 ? (
          <CustomDetailsTable
            columns={manageLeadsV1Column}
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

export default ViewFilterLeadsData;

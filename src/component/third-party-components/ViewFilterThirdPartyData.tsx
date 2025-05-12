// import { RootState } from "../../store";
// import { useSelector } from "react-redux";
import Fallback from "../../util/custom/ui/Fallback";
import { emptyDataIcon } from "../../data/savgIcons";
import CollageDekhoColumn from "./columns/CollageDekhoColumn";
import LoadingSpinner from "../../util/custom/ui/LoadingSpinner";
import { CustomTableThirdParty } from "../../util/custom/third-party-customs/CustomTableThirdParty";
interface tyeoFor{
  loaderVal:any;
  resValue:any;
 
}
const ViewFilterThirdPartyData: React.FC<tyeoFor>  = ({loaderVal, resValue}) => {
  // const { isLoading: clgDkhoLoader, responseOfGetCollegeDkhoLeads: clgDkhoRes } = useSelector((state: RootState) => state.getCollegeDkhoLeadsData);
 
  console.log("loaderVal", loaderVal)
  return (
    <div className="w-full">
      {loaderVal ? (
        <LoadingSpinner centered={false} size={20} message="loading.." mainLoading={true} />
      ) : resValue && resValue.length > 0 ? (
        <CustomTableThirdParty columns={CollageDekhoColumn} data={resValue} />
      ) : (
        <div className="bg-white">
          <Fallback isCenter={true} errorInfo="Data not found" icon={emptyDataIcon} />
        </div>
      )}
    </div>
  );
};

export default ViewFilterThirdPartyData;

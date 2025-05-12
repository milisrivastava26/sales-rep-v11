import store, { RootState } from "../../../../store";
import { PiColumnsPlusRightThin } from "react-icons/pi";
import { onShowModalForHamburger } from "../../../../store/ui/ui-slice";
import PaginationV1 from "../../../../util/custom/ssr-pagination-v1/PaginationV1";
import SearchV2 from "../../../../util/custom/ssr-pagination-v1/SearchV2";
import { useSelector } from "react-redux";

interface typeFor {
  isMode?: string;
}
const TableHead: React.FC<typeFor> = ({ isMode }) => {
  const dispatch = store.dispatch;

  const { paginatedLeads } = useSelector((state: RootState) => state.getPaginatedLeads);
  const { searchedLeads } = useSelector((state: RootState) => state.getsearchedLeads);

  const totalRecords =
    searchedLeads && searchedLeads.length !== 0
      ? searchedLeads.totalRecords
      : paginatedLeads?.totalRecords || [];

  return (
    <div className="flex justify-between gap-x-7 items-center pb-3">
      <SearchV2 />
      <span className="text-nowrap"> <strong>Total data</strong>: {totalRecords}</span>
      <PaginationV1 />
      {isMode !== "thirdParty" && (
        <div className=" cursor-pointer text-[25px]  column " onClick={() => dispatch(onShowModalForHamburger())}>
          <PiColumnsPlusRightThin />
        </div>
      )}
    </div>
  );
};

export default TableHead;

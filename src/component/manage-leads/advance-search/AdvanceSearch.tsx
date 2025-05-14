import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import SelectionCriteria from "./SelectionCriteria";
import {
  onCloseModalForAdvanceSearchColumn,
  onOpenModalForAdvanceSearch,
  onOpenModalForAdvanceSearchColumn,
  onToggleForAdvanceSearch,
} from "../../../store/ui/ui-slice";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { emptyDataIcon } from "../../../data/savgIcons";
import Fallback from "../../../util/custom/ui/Fallback";
import Search from "../../../util/custom/customSearchPagination/Search";
import {
  ViewCoreLeadColumns,
  defaultAdvanceSearchColumns,
} from "./ViewCoreLeadColumn";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { PiColumnsPlusRightLight } from "react-icons/pi";
import ColumnSelector from "./ColumnSelector";
import CustomModal from "../../../util/custom/ui/CustomModal";
import { advanceSearchHamburgerModalData, buildFilterArrays } from "../../../data/manage-leads/advance-search-data";
import { retrieveFromLocalStorage } from "../../../util/actions/localStorage";
import SectionHeadAdvanceSearch from "./SectionHeadAdvanceSearch";
import { fetchCoreViewLead, resetViewLeadResponse } from "../../../store/advance-search/get-coreViewLead-byQuery-slice";
import PaginationAdvance from "../../../util/custom/advance-search-pagination/PaginationAdvance";

const AdvanceSearch: React.FC = () => {
  const { advanceSearchModal, isModalOpenForAdvanceSearchColumn } = useSelector(
    (state: RootState) => state.ui
  );
  const { responseOfViewLead, isLoading } = useSelector(
    (state: RootState) => state.getCoreViewLead
  );

  const data = (responseOfViewLead && typeof responseOfViewLead === 'object' && 'data' in responseOfViewLead)
    ? (responseOfViewLead as { data: any[] }).data
    : [];

  const [column, setColumn] = useLocalStorage(
    "advancedSearch",
    defaultAdvanceSearchColumns
  );

  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const fullName = userDetails?.fullName;

  const initialValues = retrieveFromLocalStorage(
    "advancedSearchFilterQuery"
  ) || { fields: [{ type: "", mode: "", value: "", to: "", from: "" }] };
  const [filterQuery, setFilterQuery] = useLocalStorage(
    "advancedSearchFilterQuery",
    initialValues
  );
  
  const {paginatedPropsForAdvanceSearch} = useSelector((state:RootState) => state.ui);

  const getAdvanceSearchData = (data: any) => {
    store.dispatch(resetViewLeadResponse());
    const arraysOnly = buildFilterArrays(data?.fields);
    console.log("arraysOnly", arraysOnly);

    const payload = {
      currentSalesrepFullName: fullName,
      pageNumber: paginatedPropsForAdvanceSearch.pageNumber,
      pageSize: paginatedPropsForAdvanceSearch.pageSize,
      ...arraysOnly
    };

    store.dispatch(fetchCoreViewLead(payload));
  };

  useEffect(() => {
    console.log("initialValues", initialValues)
    getAdvanceSearchData(initialValues);
    if (initialValues.fields.length !== 0) {
      store.dispatch(onOpenModalForAdvanceSearch())
    }
  }, [paginatedPropsForAdvanceSearch]);
  const handleColumnChange = (updatedColumns: any[]) => {
    setColumn(updatedColumns);
  };

  const closeModal = () => {
    store.dispatch(onCloseModalForAdvanceSearchColumn());
  };

  return (
    <>
      <div className="mt-3 px-4">
        <div className="flex justify-between items-center px-4 mb-3">
          <button
            className="bg-blue-500 px-4 py-1 rounded text-white text-sm  font-medium"
            onClick={() => store.dispatch(onToggleForAdvanceSearch())}
          >
            Select Criteria
          </button>

          <div >
            <SectionHeadAdvanceSearch />
          </div>

        </div>
        <div
          className={`${advanceSearchModal ? "bg-white block" : "hidden"
            } rounded-lg py-2 px-2 `}
        >
          <div className="">
            <SelectionCriteria
              setFilterQuery={setFilterQuery}
              filterQuery={filterQuery}
              getAdvanceSearchData={getAdvanceSearchData}
            />
          </div>
        </div>

        <div className="mt-2 overflow-hidden bg-white py-2 px-4 rounded-lg">
          <div>
            <div className="flex gap-10 items-center my-3">
              <Search />
              <PaginationAdvance />
              <PiColumnsPlusRightLight
                className="text-4xl cursor-pointer text-gray-700 mr-5"
                onClick={() =>
                  store.dispatch(onOpenModalForAdvanceSearchColumn())
                }
              />
            </div>
            <div className="overflow-scroll">
              <CustomDetailsTable
                columns={column}
                data={data}
                isMode="advanceSearch"
              />
            </div>
          </div>
          {isLoading && (
            <LoadingSpinner
              centered={false}
              mainLoading={false}
              message="Fetching Leads!"
              size={20}
            />
          )}
          {!isLoading && data?.length === 0 && (
            <Fallback
              isCenter={true}
              errorInfo="Data not found"
              icon={emptyDataIcon}
            />
          )}
        </div>
      </div>
      {isModalOpenForAdvanceSearchColumn && (
        <CustomModal
          isMode="advanceSearch"
          isShowModal={isModalOpenForAdvanceSearchColumn}
          onHideModal={closeModal}
          data={advanceSearchHamburgerModalData}
        >
          <ColumnSelector
            allColumns={ViewCoreLeadColumns}
            selectedColumns={column}
            onColumnChange={handleColumnChange}
          />
        </CustomModal>
      )}
    </>
  );
};

export default AdvanceSearch;


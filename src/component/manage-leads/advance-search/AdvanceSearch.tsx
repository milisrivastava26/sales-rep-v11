import React, { useEffect } from "react";
import store, { RootState } from "../../../store";
import { useSelector } from "react-redux";
import SelectionCriteria from "./SelectionCriteria";
import {
  onCloseModalForAdvanceSearchColumn,
  onOpenModalForAdvanceSearchColumn,
  onToggleForAdvanceSearch,
} from "../../../store/ui/ui-slice";
import {
  fetchCoreViewLead,
  resetViewLeadResponse,
} from "../../../store/advance-search/get-coreViewLead-byQuery-slice";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import LoadingSpinner from "../../../util/custom/ui/LoadingSpinner";
import { emptyDataIcon } from "../../../data/savgIcons";
import Fallback from "../../../util/custom/ui/Fallback";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";
import {
  ViewCoreLeadColumns,
  defaultAdvanceSearchColumns,
} from "./ViewCoreLeadColumn";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { PiColumnsPlusRightLight } from "react-icons/pi";
import ColumnSelector from "./ColumnSelector";
import CustomModal from "../../../util/custom/ui/CustomModal";
import { advanceSearchHamburgerModalData } from "../../../data/manage-leads/advance-search-data";
import { retrieveFromLocalStorage } from "../../../util/actions/localStorage";
import SectionHeadAdvanceSearch from "./SectionHeadAdvanceSearch";

const AdvanceSearch: React.FC = () => {
  const { advanceSearchModal, isModalOpenForAdvanceSearchColumn } = useSelector(
    (state: RootState) => state.ui
  );
  const { responseOfViewLead, isLoading } = useSelector(
    (state: RootState) => state.getCoreViewLead
  );
  const [column, setColumn] = useLocalStorage(
    "advancedSearch",
    defaultAdvanceSearchColumns
  );

  const initialValues = retrieveFromLocalStorage(
    "advancedSearchFilterQuery"
  ) || { fields: [{ type: "", mode: "", value: "", to: "", from: "" }] };
  const [filterQuery, setFilterQuery] = useLocalStorage(
    "advancedSearchFilterQuery",
    initialValues
  );

  const initialOp = retrieveFromLocalStorage("operator") || "AND";

  const [operator, setOperator] = useLocalStorage("operator", initialOp);

  let concatenatedValue = "";
  const concatenatedValues: { [key: string]: [string, string] } = {}; // Using an object to store concatenated values per type

  let concatenatedWithAnd = "";

  const getAdvanceSearchData = (data: any) => {
    data.fields.forEach((item: any) => {
      if (Array.isArray(item.value)) {
        // Concatenate values for arrays and store by type

        const concatenatedArrayValue = "('" + item.value.join("', '") + "')";
        concatenatedValues[item.type] = [concatenatedArrayValue, item.mode];
      } else if (item.value) {
        // Concatenate single value (for non-array items)
        concatenatedValue = "('" + item.value + "')";
        concatenatedValues[item.type] = [concatenatedValue, item.mode];
      } else {
        concatenatedValues[item.type] = [
          "'" + item.from + "' AND '" + item.to + "'",
          item.mode,
        ];
      }
    });

    concatenatedWithAnd =
      "WHERE 1=1 AND " +
      Object.entries(concatenatedValues)
        .map((item: any) => {
          return `${item[0]}  ${item[1][1] === "range" ? "BETWEEN" : "IN"} ${
            item[1][0]
          }`;
        })
        .join(` ${operator} `);

    store.dispatch(resetViewLeadResponse());
    const query = {
      query: concatenatedWithAnd,
    };

    store.dispatch(fetchCoreViewLead(query));
  };


  useEffect(() => {
    getAdvanceSearchData(initialValues);
    if(initialValues.fields.length!==0){
      store.dispatch(onToggleForAdvanceSearch())
    }
  }, []);
  const handleColumnChange = (updatedColumns: any[]) => {
    setColumn(updatedColumns);
  };

  const closeModal = () => {
    store.dispatch(onCloseModalForAdvanceSearchColumn());
  };

  return (
    <>
      <div className="mt-3 px-4">
        <div className="flex justify-between items-center px-4">
          <button
            className="bg-blue-500 px-4 py-1 rounded text-white text-sm mb-3 font-medium"
            onClick={() => store.dispatch(onToggleForAdvanceSearch())}
          >
            Select Criteria
          </button>
          <div className="flex gap-4 items-center pr-5">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="operator"
                  value={operator}
                  checked={operator === "AND" ? true : false}
                  id="and"
                  onChange={() => setOperator("AND")}
                />
                <label htmlFor="and">AND</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="operator"
                  value={operator}
                  checked={operator === "OR" ? true : false}
                  id="or"
                  onChange={() => setOperator("OR")}
                />
                <label htmlFor="or">OR</label>
              </div>
            </div>
            <div>
              <SectionHeadAdvanceSearch />
            </div>
          </div>
        </div>
        <div
          className={`${
            advanceSearchModal ? "bg-white block" : "hidden"
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
              <Pagination />
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
                data={responseOfViewLead}
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
          {!isLoading && responseOfViewLead.length === 0 && (
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

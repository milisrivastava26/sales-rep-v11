import { Drawer } from "antd";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import AdvanceSearchFilterV1 from "./AdvanceSearchFilterV1";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { CustomDetailsTable } from "../../../util/custom/leadsFormat/CustomDetailsTable";
import { advanceSearchColumnV1 } from "./AdvanceSearchColumnV1";
import Search from "../../../util/custom/customSearchPagination/Search";
import Pagination from "../../../util/custom/customSearchPagination/Pagination";

const AdvanceSearchV1: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { responseOfAdvancedSearch, isLoading } = useSelector(
    (state: RootState) => state.getAdvancedSearchedLeads
  );

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const tableData = responseOfAdvancedSearch?.data ?? [];

  return (
    <div className="bg-white m-6 p-6 rounded-xl shadow-sm">

      {/* ---------- PAGE HEADING ---------- */}
      <div className="pb-5 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">
          🔍 Advanced Search Panel
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Search, filter, and explore leads with precision.
        </p>
      </div>

      {/* ---------- TOP BAR (BEAUTIFIED) ---------- */}
      <div className="flex items-center justify-between pt-6 pb-4">

        {/* Search + Pagination */}
        <div className="flex items-center w-full gap-8">
          <Search />
          <Pagination />
        </div>

        {/* Filter Button */}
        <button
          onClick={showDrawer}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 duration-200 rounded-lg shadow-sm"
        >
          <FiFilter className="text-xl text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </button>
      </div>

      {/* ---------- LOADING ---------- */}
      {isLoading && (
        <div className="w-full mt-10 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="h-6 bg-gray-200 rounded" />
        </div>
      )}

      {/* ---------- NO DATA ---------- */}
      {!isLoading && tableData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
            alt="No Data"
            className="w-20 opacity-70"
          />
          <p className="mt-3 text-lg">No records found</p>
          <p className="text-sm text-gray-500">Try adjusting filters or search</p>
        </div>
      )}

      {/* ---------- TABLE ---------- */}
      {!isLoading && tableData.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <CustomDetailsTable columns={advanceSearchColumnV1} data={tableData} />
        </div>
      )}

      {/* ---------- DRAWER ---------- */}
      <Drawer
        title="Advanced Filters"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="right"
        width={500}
      >
        <AdvanceSearchFilterV1 onClose={onClose}/>
      </Drawer>
    </div>
  );
};

export default AdvanceSearchV1;

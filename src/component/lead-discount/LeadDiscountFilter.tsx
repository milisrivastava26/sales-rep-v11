import React, { useState } from "react";
import store from "../../store";
import { getDiscountAudits } from "../../store/lead-discount/getDiscountAuditsSlice";
import { getProcessedDiscountAudits } from "../../store/lead-discount/getProcessedDiscountAuditsSlice";

interface Props {
  isMode: string;
}

const LeadDiscountFilter: React.FC<Props> = ({ isMode }) => {
  const [dateRange, setDateRange] = useState({
    fromDate: "",
    toDate: "",
  });

  const triggerFilter = (updatedDateRange: { fromDate: string; toDate: string }) => {
    const { fromDate, toDate } = updatedDateRange;
    if (isMode === "unprocessed") {
      store.dispatch(getDiscountAudits({ startDate: fromDate, endDate: toDate }));
    } else if (isMode === "processed") {
      store.dispatch(getProcessedDiscountAudits({ startDate: fromDate, endDate: toDate }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDateRange = { ...dateRange, [e.target.name]: e.target.value };
    setDateRange(updatedDateRange);
  };

  const handleApplyFilter = () => {
    triggerFilter(dateRange);
  };

  const handleClearFilter = () => {
    setDateRange({ fromDate: "", toDate: "" }); // reset UI
    if (isMode === "unprocessed") {
      store.dispatch(getDiscountAudits());
    } else if (isMode === "processed") {
      store.dispatch(getProcessedDiscountAudits());
    }
  };

  const isFilterApplied = dateRange.fromDate || dateRange.toDate;

  return (
    <div className="flex justify-start items-center px-3 pb-4 gap-4">
      <label htmlFor="from_date">From Date:</label>
      <input
        id="from_date"
        type="date"
        name="fromDate"
        value={dateRange.fromDate}
        onChange={handleDateChange}
        className="border p-2 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="to_date">To Date:</label>
      <input
        id="to_date"
        type="date"
        name="toDate"
        disabled={!dateRange.fromDate}
        value={dateRange.toDate}
        onChange={handleDateChange}
        className="border p-2 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleApplyFilter}
        disabled={!dateRange.fromDate && !dateRange.toDate}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
      >
        Apply Filter
      </button>

      {isFilterApplied && (
        <button onClick={handleClearFilter} className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600">
          Clear
        </button>
      )}
    </div>
  );
};

export default LeadDiscountFilter;

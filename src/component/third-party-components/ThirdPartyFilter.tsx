import store from "../../store";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { getCollegeDkhoLeads } from "../../store/third-party-slices/get-collegeDkhoLeads-slice";
import { getCollegeDuniaLeads } from "../../store/third-party-slices/get-collegeDuniaLeads-slice";
import { getShikshaLeads } from "../../store/third-party-slices/get-shikshaLeads-slice";
import { getTwigzLeads } from "../../store/third-party-slices/get-twigzLeads-slice";
import { getDurgeshLeads } from "../../store/third-party-slices/get-durgeshLeads-slice";
import { getCareerCoachLeads } from "../../store/third-party-slices/get-careerCoachLeads-slice";
import { getCollegeSkyLeads } from "../../store/third-party-slices/get-collegeSkyLeads-slice";
import { getFaisalAliLeads } from "../../store/third-party-slices/get-faisalAli-lead-slice";
import { getAdarshYadavLeads } from "../../store/third-party-slices/get-adarshYadav-leads-slice";
import { getWakarConsultancyLead } from "../../store/third-party-slices/get-wakar-consultancy-leads-slice";
import { getCollegeConnectLeads } from "../../store/third-party-slices/get-collegeConnect-leads-slice";
import { getMeritAdmissionsLeads } from "../../store/third-party-slices/get-meritAdmissions-lead-slice";

interface TyepFor {
  actionVal: () => {};
}

const ThirdPartyFilter: React.FC<TyepFor> = () => {
  const dispatch = store.dispatch;
  const currentDate = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState({
    fromDate: currentDate,
    toDate: "",
  });
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );

  const triggerFilter = (updatedDateRange: {
    fromDate: string;
    toDate: string;
  }) => {
    const role = userDetails.authority[0];
    const { fromDate, toDate } = updatedDateRange;

    // Use provided dates as filters, even if one is empty
    if (role === "ROLE_COLLEGE_DKHO") {
      dispatch(getCollegeDkhoLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_COLLEGE_DUNIA") {
      dispatch(getCollegeDuniaLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_SHIKSHA") {
      dispatch(getShikshaLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_TWIGZ") {
      dispatch(getTwigzLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_DURGESH") {
      dispatch(getDurgeshLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_CAREER_COACH") {
      dispatch(getCareerCoachLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_COLLEGE_SKY") {
      dispatch(getCollegeSkyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_FAISAL_ALI") {
      dispatch(getFaisalAliLeads({ startDate: fromDate, endDate: toDate }))
    }
    else if (role === "ROLE_ADARSH_YADAV") {
      dispatch(getAdarshYadavLeads({ startDate: fromDate, endDate: toDate }))
    }
    else if (role === "ROLE_WAKAR_CONSULTANCY") {
      dispatch(getWakarConsultancyLead({ startDate: fromDate, endDate: toDate }))
    }
    else if (role === "ROLE_COLLEGE_CONNECT") {
      dispatch(getCollegeConnectLeads({ startDate: fromDate, endDate: toDate }))
    }
    else if (role === "ROLE_MERIT_ADMISSIONS") {
      dispatch(getMeritAdmissionsLeads({ startDate: fromDate, endDate: toDate }))
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDateRange = { ...dateRange, [e.target.name]: e.target.value };
    setDateRange(updatedDateRange);
    triggerFilter(updatedDateRange);
  };

  const handleClearFilter = () => {
    const role = userDetails.authority[0];
    setDateRange({ fromDate: "", toDate: "" });
    // Dispatch default API calls when filter is cleared
    if (role === "ROLE_COLLEGE_DKHO") {
      dispatch(getCollegeDkhoLeads());
    } else if (role === "ROLE_COLLEGE_DUNIA") {
      dispatch(getCollegeDuniaLeads());
    } else if (role === "ROLE_SHIKSHA") {
      dispatch(getShikshaLeads());
    } else if (role === "ROLE_TWIGZ") {
      dispatch(getTwigzLeads());
    } else if (role === "ROLE_DURGESH") {
      dispatch(getDurgeshLeads());
    } else if (role === "ROLE_CAREER_COACH") {
      dispatch(getCareerCoachLeads());
    }
    else if (role === "ROLE_COLLEGE_SKY") {
      dispatch(getCollegeSkyLeads());
    }
    else if (role === "ROLE_FAISAL_ALI") {
      dispatch(getFaisalAliLeads())
    }
    else if (role === "ROLE_ADARSH_YADAV") {
      dispatch(getAdarshYadavLeads())
    }
    else if (role === "ROLE_WAKAR_CONSULTANCY") {
      dispatch(getWakarConsultancyLead())
    }
    else if (role === "ROLE_COLLEGE_CONNECT") {
      dispatch(getCollegeConnectLeads())
    }
    else if (role === "ROLE_MERIT_ADMISSIONS") {
      dispatch(getMeritAdmissionsLeads())
    }
  };

  // Determine if any filter is applied (either date has a value)
  const isFilterApplied = dateRange.fromDate || dateRange.toDate;

  return (
    <div className="flex justify-start items-center px-3 py-2 gap-4">
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
      {isFilterApplied && (
        <button
          onClick={handleClearFilter}
          className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default ThirdPartyFilter;

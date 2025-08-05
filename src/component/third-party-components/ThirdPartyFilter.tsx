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
import { getEducationConsultancyLeads } from "../../store/third-party-slices/get-educationConsultancy-lead-slice";
import { getDuniaNowLeads } from "../../store/third-party-slices/get-duniaNow-leads-slice";
import { getCareerGuideLeads } from "../../store/third-party-slices/get-careerGuide-leads-slice";
import { getPrideInfotechLeads } from "../../store/third-party-slices/get-prideInfotech-leads-slice";
import { getRudraCareerGuidanceLeads } from "../../store/third-party-slices/get-rudraCareerGuidance-leads-slice";
import { getNeelanshiConsultancyLeads } from "../../store/third-party-slices/get-neelanshiConsultancy-leads-slice";
import { getAmitConsultancyLeads } from "../../store/third-party-slices/get-amitConsultancy-leads-slice";
import { getAtreekConsultancyLeads } from "../../store/third-party-slices/get-atreekConsultancy-leads-slice";
import { getAjayConsultancyLeads } from "../../store/third-party-slices/get-ajayConsultancy-leads-slice";
import { getCourseYardSolutionLeads } from "../../store/third-party-slices/get-courseYardSolution-leads-slice";
import { getAkshatEducationalServicesLeads } from "../../store/third-party-slices/get-akshatEducationconsultancyLeads-slice";
import { getPiyushShuklaLeads } from "../../store/third-party-slices/get-piyushShuklaLeads-slice";
import { getChandraCollegeLeads } from "../../store/third-party-slices/get-chandraCollege-leads-slice";
import { getPlpsLeads } from "../../store/third-party-slices/get-plpsLeads-slice";
import { getVisionEducationLeads } from "../../store/third-party-slices/get-visionEducation-leads-slice";
import { getProfessionalCareerAcademyLeads } from "../../store/third-party-slices/get-professionalCareerAcademyLeads-slice";
import { getCareerGuidanceInstituteLeads } from "../../store/third-party-slices/get-careerGuidanceInstitute-leads-slice";
import { getYourCampusLeads } from "../../store/third-party-slices/get-getYourCampusLeads-slice";
import { getRcpConsultantLeads } from "../../store/third-party-slices/get-rcpConsultantLeads-slice";
import { getASCareerCounselingLeads } from "../../store/third-party-slices/get-asCareerCounsellingLeads-slice";
import { getRightCareerLeads } from "../../store/third-party-slices/get-rightCareer-leads-slice";

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
    } else if (role === "ROLE_COLLEGE_SKY") {
      dispatch(getCollegeSkyLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_FAISAL_ALI") {
      dispatch(getFaisalAliLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_ADARSH_YADAV") {
      dispatch(getAdarshYadavLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_WAKAR_CONSULTANCY") {
      dispatch(
        getWakarConsultancyLead({ startDate: fromDate, endDate: toDate })
      );
    } else if (role === "ROLE_COLLEGE_CONNECT") {
      dispatch(
        getCollegeConnectLeads({ startDate: fromDate, endDate: toDate })
      );
    } else if (role === "ROLE_MERIT_ADMISSIONS") {
      dispatch(
        getMeritAdmissionsLeads({ startDate: fromDate, endDate: toDate })
      );
    } else if (role === "ROLE_Education_Consultancy") {
      dispatch(
        getEducationConsultancyLeads({ startDate: fromDate, endDate: toDate })
      );
    } else if (role === "ROLE_DUNIA_NOW") {
      dispatch(getDuniaNowLeads({ startDate: fromDate, endDate: toDate }));
    } else if (role === "ROLE_CAREER_GUIDE") {
      dispatch(getCareerGuideLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_PRIDE_INFOTECH") {
      dispatch(getPrideInfotechLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_RUDRA_CAREER_GUIDANCE") {
      dispatch(getRudraCareerGuidanceLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_NEELANSHI_CONSULTANCY") {
      dispatch(getNeelanshiConsultancyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_AMIT_CONSULTANCY") {
      dispatch(getAmitConsultancyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_ATREEK_CONSULTANCY") {
      dispatch(getAtreekConsultancyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_AJAY_CONSULTANCY") {
      dispatch(getAjayConsultancyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_COURSE_YARD_SOLUTIONS") {
      dispatch(getCourseYardSolutionLeads({ startDate: fromDate, endDate: toDate }));
    }
     else if (role === "ROLE_AKSHAT_EDUCATIONAL_SERVICES") {
      dispatch(getAkshatEducationalServicesLeads({ startDate: fromDate, endDate: toDate }));
    }
     else if (role === "ROLE_PIYUSH_SHUKLA") {
      dispatch(getPiyushShuklaLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_CHANDRA_COLLEGE") {
      dispatch(getChandraCollegeLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_PLPS") {
      dispatch(getPlpsLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_VISION_EDUCATION") {
      dispatch(getVisionEducationLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_PROFESSIONAL_CAREER_ACADEMY") {
      dispatch(getProfessionalCareerAcademyLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_CGI") {
      dispatch(getCareerGuidanceInstituteLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_GYC") {
      dispatch(getYourCampusLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_RCP") {
      dispatch(getRcpConsultantLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_ASCC") {
      dispatch(getASCareerCounselingLeads({ startDate: fromDate, endDate: toDate }));
    }
    else if (role === "ROLE_RIGHT_CAREER") {
      dispatch(getRightCareerLeads({ startDate: fromDate, endDate: toDate }));
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
    } else if (role === "ROLE_COLLEGE_SKY") {
      dispatch(getCollegeSkyLeads());
    } else if (role === "ROLE_FAISAL_ALI") {
      dispatch(getFaisalAliLeads());
    } else if (role === "ROLE_ADARSH_YADAV") {
      dispatch(getAdarshYadavLeads());
    } else if (role === "ROLE_WAKAR_CONSULTANCY") {
      dispatch(getWakarConsultancyLead());
    } else if (role === "ROLE_COLLEGE_CONNECT") {
      dispatch(getCollegeConnectLeads());
    } else if (role === "ROLE_MERIT_ADMISSIONS") {
      dispatch(getMeritAdmissionsLeads());
    } else if (role === "ROLE_Education_Consultancy") {
      dispatch(getEducationConsultancyLeads());
    } else if (role === "ROLE_DUNIA_NOW") {
      dispatch(getDuniaNowLeads());
    } else if (role === "ROLE_CAREER_GUIDE") {
      dispatch(getCareerGuideLeads());
    }
    else if (role === "ROLE_PRIDE_INFOTECH") {
      dispatch(getPrideInfotechLeads());
    }
    else if (role === "ROLE_RUDRA_CAREER_GUIDANCE") {
      dispatch(getRudraCareerGuidanceLeads());
    }
    else if (role === "ROLE_NEELANSHI_CONSULTANCY") {
      dispatch(getNeelanshiConsultancyLeads());
    }
    else if (role === "ROLE_AMIT_CONSULTANCY") {
      dispatch(getAmitConsultancyLeads());
    }
    else if (role === "ROLE_ATREEK_CONSULTANCY") {
      dispatch(getAtreekConsultancyLeads());
    }
    else if (role === "ROLE_AJAY_CONSULTANCY") {
      dispatch(getAjayConsultancyLeads());
    }
    else if (role === "ROLE_COURSE_YARD_SOLUTIONS") {
      dispatch(getCourseYardSolutionLeads());
    }
    else if (role === "ROLE_AKSHAT_EDUCATIONAL_SERVICES") {
      dispatch(getAkshatEducationalServicesLeads());
    }
    else if (role === "ROLE_PIYUSH_SHUKLA") {
      dispatch(getAkshatEducationalServicesLeads());
    }
    else if (role === "ROLE_CHANDRA_COLLEGE") {
      dispatch(getChandraCollegeLeads());
    }
    else if (role === "ROLE_PLPS") {
      dispatch(getPlpsLeads());
    }
    else if (role === "ROLE_VISION_EDUCATION") {
      dispatch(getVisionEducationLeads());
    }
    else if (role === "ROLE_PROFESSIONAL_CAREER_ACADEMY") {
      dispatch(getProfessionalCareerAcademyLeads());
    }
    else if (role === "ROLE_CGI") {
      dispatch(getCareerGuidanceInstituteLeads());
    }
    else if (role === "ROLE_GYC") {
      dispatch(getYourCampusLeads());
    }
    else if (role === "ROLE_RCP") {
      dispatch(getRcpConsultantLeads());
    }
    else if (role === "ROLE_ASCC") {
      dispatch(getASCareerCounselingLeads());
    }
    else if (role === "ROLE_RIGHT_CAREER") {
      dispatch(getRightCareerLeads());
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

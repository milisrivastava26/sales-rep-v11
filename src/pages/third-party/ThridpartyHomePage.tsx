import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store";
import ThirdPartyHome from "../../component/third-party-components/ThirdPartyHome";
import { getCollegeDkhoLeads } from "../../store/third-party-slices/get-collegeDkhoLeads-slice";
import { getCollegeDuniaLeads } from "../../store/third-party-slices/get-collegeDuniaLeads-slice";
import { getShikshaLeads } from "../../store/third-party-slices/get-shikshaLeads-slice";
import { getTwigzLeads } from "../../store/third-party-slices/get-twigzLeads-slice";
import { getDurgeshLeads } from "../../store/third-party-slices/get-durgeshLeads-slice";
import { getCareerCoachLeads } from "../../store/third-party-slices/get-careerCoachLeads-slice";
import { getCollegeSkyLeads } from "../../store/third-party-slices/get-collegeSkyLeads-slice";
import { getFaisalAliLeads } from "../../store/third-party-slices/get-faisalAli-lead-slice";
import { getWakarConsultancyLead } from "../../store/third-party-slices/get-wakar-consultancy-leads-slice";
import { getAdarshYadavLeads } from "../../store/third-party-slices/get-adarshYadav-leads-slice";
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

type ApiStateType = {
  isLoading: boolean;
  response: null | any[]; // Allow response to be null or an array
  action: () => any; // Function reference for dispatching API calls
};
const ThirdpartyHomePage: React.FC = () => {
  const dispatch = store.dispatch;
  const { userDetails } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const collegeDkhoData = useSelector(
    (state: RootState) => state.getCollegeDkhoLeadsData
  );
  const collegeDuniaData = useSelector(
    (state: RootState) => state.getCollegeDuniaLeadsData
  );
  const shikshaData = useSelector(
    (state: RootState) => state.getShikshaLeadsData
  );
  const twigzData = useSelector((state: RootState) => state.getTwigzLeads);
  const durgeshData = useSelector(
    (state: RootState) => state.getDurgeshLeadsData
  );
  const careerCoachData = useSelector(
    (state: RootState) => state.getCareerCoachLeads
  );
  const collegeSkyData = useSelector(
    (state: RootState) => state.getCollegeSkyLeads
  );
  const faisalAliLeads = useSelector(
    (state: RootState) => state.getFaisalAliLeads
  );
  const adarshYadavLeads = useSelector(
    (state: RootState) => state.getAdarshYadavLeads
  );
  const wakarConsultancyLeads = useSelector(
    (state: RootState) => state.getWakarConsultancyLeads
  );
  const collegeConnectLeads = useSelector(
    (state: RootState) => state.getCollegeConnectLeads
  );
  const meritAdmissionsLeads = useSelector(
    (state: RootState) => state.getMeritAdmissionsLeads
  );
  const educationConsultancyLeads = useSelector(
    (state: RootState) => state.getEducationConsultancyLeads
  );
  const duniaNowLeads = useSelector(
    (state: RootState) => state.getDuniaNowLeads
  );

  const careerGuideLeads = useSelector(
    (state: RootState) => state.getCareerGuideLeads
  );

  const neelanshiLeads = useSelector((state: RootState) => state.getNeelanshiConsultancyLeads);
  const amitLeads = useSelector((state: RootState) => state.getAmitconsultancyLeads);

  const prideInfotechLeads = useSelector((state: RootState) => state.getPrideInfotechLeads);
  const rudraCareerGuidanceLeads = useSelector((state: RootState) => state.getRudraCaeerGuidanceLeads);
  const atreekConsultancyLeads = useSelector((state: RootState) => state.getAtreekConsultancyLeads);
  const ajayConsultancyLeads = useSelector((state: RootState) => state.getAjayConsultancyLeads);
  const courseYardSolutionLeads = useSelector((state: RootState) => state.getCourseYardSolutionLeads);
  const akshatConsultancyLeads = useSelector((state: RootState) => state.getAkshatEducationalServicesLeads);
  const piyushShuklaLeads = useSelector((state: RootState) => state.getPiyushShuklaLeads);
  const chandraCollegeLeads = useSelector((state:RootState) => state.getChandraCollegeLeads);
  const plpsLeads = useSelector((state:RootState) => state.getPlpsLeads);
  const visionEducationLeads = useSelector((state:RootState) => state.getVisionEducationLeads);
  const professionalCareerLeads = useSelector((state:RootState) => state.getProfessionalCareerAcademyLeads)
  const careerGuidanceInstituteLeads = useSelector((state:RootState) => state.getCareerGuidanceInstituteLeads);
  const yourCampusLeads = useSelector((state:RootState) => state.getYourCampusLeads)
  const rcpConsultantLeads = useSelector((state:RootState) => state.getRcpConsultantLeads);
  const asCareerCounseling = useSelector((state:RootState) => state.getAsCareerCounsellingLeads);
  const rightCareerLeads = useSelector((state:RootState) => state.getRightCareerLeads);

  // State object to store loader, response, and action
  const [apiState, setApiState] = useState<ApiStateType>({
    isLoading: false,
    response: null,
    action: () => { }, // Default empty function
  });

  useEffect(() => {
    if (userDetails?.authority?.length > 0) {
      const currentDate: string = new Date().toISOString().split("T")[0];
      const role = userDetails.authority[0];

      if (role === "ROLE_COLLEGE_DKHO") {
        dispatch(getCollegeDkhoLeads({ startDate: currentDate }));
      } else if (role === "ROLE_COLLEGE_DUNIA") {
        dispatch(getCollegeDuniaLeads({ startDate: currentDate }));
      } else if (role === "ROLE_SHIKSHA") {
        dispatch(getShikshaLeads({ startDate: currentDate }));
      } else if (role === "ROLE_TWIGZ") {
        dispatch(getTwigzLeads({ startDate: currentDate }));
      } else if (role === "ROLE_DURGESH") {
        dispatch(getDurgeshLeads({ startDate: currentDate }));
      } else if (role === "ROLE_CAREER_COACH") {
        dispatch(getCareerCoachLeads({ startDate: currentDate }));
      } else if (role === "ROLE_COLLEGE_SKY") {
        dispatch(getCollegeSkyLeads({ startDate: currentDate }));
      } else if (role === "ROLE_FAISAL_ALI") {
        dispatch(getFaisalAliLeads({ startDate: currentDate }));
      } else if (role === "ROLE_ADARSH_YADAV") {
        dispatch(getAdarshYadavLeads({ startDate: currentDate }));
      } else if (role === "ROLE_WAKAR_CONSULTANCY") {
        dispatch(getWakarConsultancyLead({ startDate: currentDate }));
      } else if (role === "ROLE_COLLEGE_CONNECT") {
        dispatch(getCollegeConnectLeads({ startDate: currentDate }));
      } else if (role === "ROLE_MERIT_ADMISSIONS") {
        dispatch(getMeritAdmissionsLeads({ startDate: currentDate }));
      } else if (role === "ROLE_Education_Consultancy") {
        dispatch(getEducationConsultancyLeads({ startDate: currentDate }));
      } else if (role === "ROLE_DUNIA_NOW") {
        dispatch(getDuniaNowLeads({ startDate: currentDate }));
      } else if (role === "ROLE_CAREER_GUIDE") {
        dispatch(getCareerGuideLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_PRIDE_INFOTECH") {
        dispatch(getPrideInfotechLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_RUDRA_CAREER_GUIDANCE") {
        dispatch(getRudraCareerGuidanceLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_NEELANSHI_CONSULTANCY") {
        dispatch(getNeelanshiConsultancyLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_AMIT_CONSULTANCY") {
        dispatch(getAmitConsultancyLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_ATREEK_CONSULTANCY") {
        dispatch(getAtreekConsultancyLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_AJAY_CONSULTANCY") {
        dispatch(getAjayConsultancyLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_COURSE_YARD_SOLUTIONS") {
        dispatch(getCourseYardSolutionLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_AKSHAT_EDUCATIONAL_SERVICES") {
        dispatch(getAkshatEducationalServicesLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_PIYUSH_SHUKLA") {
        dispatch(getPiyushShuklaLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_CHANDRA_COLLEGE") {
        dispatch(getChandraCollegeLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_PLPS") {
        dispatch(getPlpsLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_VISION_EDUCATION") {
        dispatch(getVisionEducationLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_PROFESSIONAL_CAREER_ACADEMY") {
        dispatch(getProfessionalCareerAcademyLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_CGI") {
        dispatch(getCareerGuidanceInstituteLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_GYC") {
        dispatch(getYourCampusLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_RCP") {
        dispatch(getRcpConsultantLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_ASCC") {
        dispatch(getASCareerCounselingLeads({ startDate: currentDate }));
      }
      else if (role === "ROLE_RIGHT_CAREER") {
        dispatch(getRightCareerLeads({ startDate: currentDate }));
      }
    }
  }, [userDetails, dispatch]);

  useEffect(() => {
    const role = userDetails?.authority?.[0];

    if (role === "ROLE_COLLEGE_DKHO") {
      setApiState({
        isLoading: collegeDkhoData.isLoading,
        response: collegeDkhoData.responseOfGetCollegeDkhoLeads,
        action: () => getCollegeDkhoLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_COLLEGE_DUNIA") {
      setApiState({
        isLoading: collegeDuniaData.isLoading,
        response: collegeDuniaData.responseOfGetCollegeDuniaLeads,
        action: () => getCollegeDuniaLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_SHIKSHA") {
      setApiState({
        isLoading: shikshaData.isLoading,
        response: shikshaData.responseOfGetShikshaLeads,
        action: () => getShikshaLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_TWIGZ") {
      setApiState({
        isLoading: twigzData.isLoading,
        response: twigzData.responseOfGetTwigzLeads,
        action: () => getTwigzLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_DURGESH") {
      setApiState({
        isLoading: durgeshData.isLoading,
        response: durgeshData.responseOfGetDurgeshLeads,
        action: () => getDurgeshLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_CAREER_COACH") {
      setApiState({
        isLoading: careerCoachData.isLoading,
        response: careerCoachData.responseOfGetCareerCoachLeads,
        action: () => getCareerCoachLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_COLLEGE_SKY") {
      setApiState({
        isLoading: collegeSkyData.isLoading,
        response: collegeSkyData.responseOfGetCollegeSkyLeads,
        action: () => getCollegeSkyLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_FAISAL_ALI") {
      setApiState({
        isLoading: faisalAliLeads.isLoading,
        response: faisalAliLeads.responseOfGetFaisalAliLeads,
        action: () => faisalAliLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_ADARSH_YADAV") {
      setApiState({
        isLoading: adarshYadavLeads.isLoading,
        response: adarshYadavLeads.responseOfGetAdarshYadavLeads,
        action: () => adarshYadavLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_WAKAR_CONSULTANCY") {
      setApiState({
        isLoading: wakarConsultancyLeads.isLoading,
        response: wakarConsultancyLeads.responseOfGetWakarConsultancyLead,
        action: () => wakarConsultancyLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_COLLEGE_CONNECT") {
      setApiState({
        isLoading: collegeConnectLeads.isLoading,
        response: collegeConnectLeads.responseOfCollegeConnectLeads,
        action: () => collegeConnectLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_MERIT_ADMISSIONS") {
      setApiState({
        isLoading: meritAdmissionsLeads.isLoading,
        response: meritAdmissionsLeads.responseOfMeritAdmissionsLeads,
        action: () => meritAdmissionsLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_Education_Consultancy") {
      setApiState({
        isLoading: educationConsultancyLeads.isLoading,
        response: educationConsultancyLeads.responseOfEducationConsultancyLeads,
        action: () => educationConsultancyLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_DUNIA_NOW") {
      setApiState({
        isLoading: duniaNowLeads.isLoading,
        response: duniaNowLeads.responseOfDuniaNowLeads,
        action: () => duniaNowLeads, // Assign function (without calling dispatch)
      });
    } else if (role === "ROLE_CAREER_GUIDE") {
      setApiState({
        isLoading: careerGuideLeads.isLoading,
        response: careerGuideLeads.responseOfCareerGuideLeads,
        action: () => careerGuideLeads, // Assign function (without calling dispatch)
      });
    }
    else if (role === "ROLE_PRIDE_INFOTECH") {
      setApiState({
        isLoading: prideInfotechLeads.isLoading,
        response: prideInfotechLeads.responseOfGetPrideInfotechLeads,
        action: () => prideInfotechLeads, // Assign function (without calling dispatch)
      });
    }
    else if (role === "ROLE_RUDRA_CAREER_GUIDANCE") {
      setApiState({
        isLoading: rudraCareerGuidanceLeads.isLoading,
        response: rudraCareerGuidanceLeads.responseOfGetRudraCareerGuidanceLeads,
        action: () => rudraCareerGuidanceLeads, // Assign function (without calling dispatch)
      });
    }
    else if (role === "ROLE_NEELANSHI_CONSULTANCY") {
      setApiState({
        isLoading: neelanshiLeads.isLoading,
        response: neelanshiLeads.responseOfGetNeelanshiConsultancyLeads,
        action: () => neelanshiLeads, // Assign function (without calling dispatch)
      });

    }
    else if (role === "ROLE_AMIT_CONSULTANCY") {
      setApiState({
        isLoading: amitLeads.isLoading,
        response: amitLeads.responseOfAmitConsultancyLeads,
        action: () => amitLeads, // Assign function (without calling dispatch)
      });

    }
    else if (role === "ROLE_ATREEK_CONSULTANCY") {
      setApiState({
        isLoading: atreekConsultancyLeads.isLoading,
        response: atreekConsultancyLeads.responseOfGetAtreekConsultancyLeads,
        action: () => atreekConsultancyLeads, // Assign function (without calling dispatch)
      });

    }
    else if (role === "ROLE_AJAY_CONSULTANCY") {
      setApiState({
        isLoading: ajayConsultancyLeads.isLoading,
        response: ajayConsultancyLeads.responseOfGetAjayConsultancyLeads,
        action: () => ajayConsultancyLeads,
      });

    }
    else if (role === "ROLE_COURSE_YARD_SOLUTIONS") {
      setApiState({
        isLoading: courseYardSolutionLeads.isLoading,
        response: courseYardSolutionLeads.responseOfGetCourseYardSolutionLeads,
        action: () => courseYardSolutionLeads,
      });
    }
    else if (role === "ROLE_AKSHAT_EDUCATIONAL_SERVICES") {
      setApiState({
        isLoading: akshatConsultancyLeads.isLoading,
        response: akshatConsultancyLeads.responseOfGetAkshatEducationalServicesLeads,
        action: () => akshatConsultancyLeads,
      });
    }
    else if (role === "ROLE_PIYUSH_SHUKLA") {
      setApiState({
        isLoading: piyushShuklaLeads.isLoading,
        response: piyushShuklaLeads.responseOfGetPiyushShuklaLeads,
        action: () => piyushShuklaLeads,
      });
    }
    else if (role === "ROLE_CHANDRA_COLLEGE") {
      setApiState({
        isLoading: chandraCollegeLeads.isLoading,
        response: chandraCollegeLeads.responseOfGetChandraCollegeLeads,
        action: () => chandraCollegeLeads,
      });
    }
    else if (role === "ROLE_PLPS") {
      setApiState({
        isLoading: plpsLeads.isLoading,
        response: plpsLeads.responseOfGetPlpsLeads,
        action: () => plpsLeads,
      });
    }
    else if (role === "ROLE_VISION_EDUCATION") {
      setApiState({
        isLoading: visionEducationLeads.isLoading,
        response: visionEducationLeads.responseOfGetVisionEducationLeads,
        action: () => visionEducationLeads,
      });
    }
    else if (role === "ROLE_PROFESSIONAL_CAREER_ACADEMY") {
      setApiState({
        isLoading: professionalCareerLeads.isLoading,
        response: professionalCareerLeads.responseOfGetProfessionalCareerAcademyLeads,
        action: () => professionalCareerLeads,
      });
    }
    else if (role === "ROLE_CGI") {
      setApiState({
        isLoading: careerGuidanceInstituteLeads.isLoading,
        response: careerGuidanceInstituteLeads.responseOfCareerGuidanceInstituteLeads,
        action: () => careerGuidanceInstituteLeads,
      });
    }
     else if (role === "ROLE_GYC") {
      setApiState({
        isLoading: yourCampusLeads.isLoading,
        response: yourCampusLeads.responseOfGetYourCampusLeads,
        action: () => yourCampusLeads,
      });
    }
    else if (role === "ROLE_RCP") {
      setApiState({
        isLoading: rcpConsultantLeads.isLoading,
        response: rcpConsultantLeads.responseOfRcpConsultantLeads,
        action: () => rcpConsultantLeads,
      });
    }
    else if (role === "ROLE_ASCC") {
      setApiState({
        isLoading: asCareerCounseling.isLoading,
        response: asCareerCounseling.responseOfASCareerCounselingLeads,
        action: () => asCareerCounseling,
      });
    }
    else if (role === "ROLE_RIGHT_CAREER") {
      setApiState({
        isLoading: rightCareerLeads.isLoading,
        response: rightCareerLeads.responseOfGetRightCareerLeads,
        action: () => rightCareerLeads,
      });
    }

  }, [
    userDetails,
    collegeDkhoData,
    collegeDuniaData,
    shikshaData,
    twigzData,
    durgeshData,
    careerCoachData,
    collegeSkyData,
    faisalAliLeads,
    adarshYadavLeads,
    wakarConsultancyLeads,
    collegeConnectLeads,
    meritAdmissionsLeads,
    educationConsultancyLeads,
    duniaNowLeads,
    careerGuideLeads,
    prideInfotechLeads,
    rudraCareerGuidanceLeads,
    neelanshiLeads,
    amitLeads,
    atreekConsultancyLeads,
    ajayConsultancyLeads,
    courseYardSolutionLeads,
    akshatConsultancyLeads,
    piyushShuklaLeads,
    chandraCollegeLeads,
    plpsLeads,
    visionEducationLeads,
    professionalCareerLeads,
    careerGuidanceInstituteLeads,
    yourCampusLeads,
    rcpConsultantLeads,
    asCareerCounseling,
    rightCareerLeads
  ]);

  return (
    <ThirdPartyHome
      loaderVal={apiState.isLoading}
      resValue={apiState.response}
      actionVal={apiState.action}
    />
  );
};

export default ThirdpartyHomePage;

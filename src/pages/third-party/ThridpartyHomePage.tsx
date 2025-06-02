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

  const neelanshiLeads = useSelector((state:RootState) => state.getNeelanshiConsultancyLeads);

  const prideInfotechLeads = useSelector((state: RootState) => state.getPrideInfotechLeads);
   const rudraCareerGuidanceLeads = useSelector((state: RootState) => state.getRudraCaeerGuidanceLeads);

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
      else if(role === "ROLE_NEELANSHI_CONSULTANCY") {
        dispatch(getNeelanshiConsultancyLeads({ startDate: currentDate }));
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
    neelanshiLeads
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

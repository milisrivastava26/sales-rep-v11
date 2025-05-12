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
  const durgeshData = useSelector((state: RootState) => state.getDurgeshLeadsData);
  const careerCoachData = useSelector(
    (state: RootState) => state.getCareerCoachLeads
  );
  const collegeSkyData = useSelector(
    (state: RootState) => state.getCollegeSkyLeads
  );

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
      }
      else if (role === "ROLE_COLLEGE_SKY") {
        dispatch(getCollegeSkyLeads({ startDate: currentDate }))
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
    }

    else if (role === "ROLE_COLLEGE_SKY") {
      setApiState({
        isLoading: collegeSkyData.isLoading,
        response: collegeSkyData.responseOfGetCollegeSkyLeads,
        action: () => getCollegeSkyLeads, // Assign function (without calling dispatch)
      });
    }
  }, [userDetails, collegeDkhoData, collegeDuniaData, shikshaData, twigzData, durgeshData, careerCoachData, collegeSkyData]);

  return (
    <ThirdPartyHome
      loaderVal={apiState.isLoading}
      resValue={apiState.response}
      actionVal={apiState.action}
    />
  );
};

export default ThirdpartyHomePage;

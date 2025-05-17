import { url } from "../data/genral-Data";
import { MdError } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import Navbar from "../component/navbar/Navbar";
import Fallback from "../util/custom/ui/Fallback";
import React, { Fragment, useEffect } from "react";
import useForLocation from "../hooks/useForLocation";
import { onSetErrorHandler } from "../store/ui/ui-slice";
import useNetworkStatus from "../hooks/useNetworkStatus";
import LoadingSpinner from "../util/custom/ui/LoadingSpinner";
import { fetchUserDetails } from "../store/auth/loggedIn-user-slice";
import { resetResposneforReissueContract } from "../store/lead-with-decline-offer/save-ReissueContract-byid-slice";
import coreLeadCaptureApi from "../interceptor/coreLeadCaptureApi";
import { resetResponseForPushLeads } from "../store/actions/push-imported-leads";
import NotificationSocket from "../component/notifications/NotificationSocket";
import NotificationPopup from "../component/notifications/NotificationPopup";

const RootLayout: React.FC = () => {
  const { currentURL } = useForLocation();
  const { isConnectionRefused } = useNetworkStatus();
  const { resetFilters } = useSelector((state: RootState) => state.ui);
  const { isRun } = useSelector(
    (state: RootState) => state.saveReissueContract
  );
  const { isAuthenticated, accessToken: token } = useSelector(
    (state: RootState) => state.auth
  );
  const { userDetails, isLoading } = useSelector(
    (state: RootState) => state.getLoggedInUserData
  );
  const { isError, responseOfReissueContract } = useSelector(
    (state: RootState) => state.saveReissueContract
  );

  // Define third-party roles
  const thirdPartyRoles = [
    "ROLE_COLLEGE_DKHO",
    "ROLE_COLLEGE_DUNIA",
    "ROLE_SHIKSHA",
    "ROLE_TWIGZ",
    "ROLE_DURGESH",
    "ROLE_CAREER_COACH",
    "ROLE_COLLEGE_SKY",
    "ROLE_WAKAR_CONSULTANCY",
    "ROLE_FAISAL_ALI",
    "ROLE_ADARSH_YADAV",
    "ROLE_COLLEGE_CONNECT",
    "ROLE_MERIT_ADMISSIONS",
  ];

  // Check if userDetails is available and determine if user is third-party
  const isThirdPartyUser = userDetails?.authority?.some((role: string) =>
    thirdPartyRoles.includes(role)
  );

  const { isLoading: isLoadingForProcesLead, responseOfPushLeads } =
    useSelector((state: RootState) => state.pushImportedLead);
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.replace(url);
    }
    if (token) {
      store.dispatch(fetchUserDetails(token));
    }
    if (typeof resetFilters === "function") {
      resetFilters();
    }

    store.dispatch(onSetErrorHandler(false));
    if (!isError && responseOfReissueContract)
      store.dispatch(resetResposneforReissueContract());
  }, [isAuthenticated, token, isRun]);
  useEffect(() => {
    if (responseOfPushLeads !== "" && !isLoadingForProcesLead) {
      coreLeadCaptureApi.delete("api/crm/lead/leadImportExcel/delete");
      store.dispatch(resetResponseForPushLeads());
    }
  }, [responseOfPushLeads, isLoadingForProcesLead]);

  // Handle loading state (don't show anything until userDetails is available)
  if (
    (isLoading || Object.keys(userDetails).length <= 0) &&
    currentURL === "/"
  ) {
    return (
      <LoadingSpinner
        size={20}
        mainLoading={true}
        message="preparing Dashboard for you "
        centered={true}
      />
    );
  }

  return (
    <Fragment>
      {!isConnectionRefused && (
        <>
          {/* Show Navbar and Outlet only if the user is NOT a third-party user */}
          {!isThirdPartyUser && <>
            <Navbar />
            <NotificationSocket />
            <NotificationPopup />

          </>
          }
          {isAuthenticated && !isThirdPartyUser && (
            <main>
              <Outlet />
            </main>
          )}
        </>
      )}

      {isConnectionRefused && (
        <Fallback
          icon={<MdError color="red" size={40} />}
          errorInfo="Please check your Connection or try again"
        />
      )}
    </Fragment>
  );
};

export default RootLayout;

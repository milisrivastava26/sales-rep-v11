import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { url } from "../../data/genral-Data";
import  { RootState } from "../../store";
import Fallback from "../../util/custom/ui/Fallback";
import useForLocation from "../../hooks/useForLocation";
import useNetworkStatus from "../../hooks/useNetworkStatus";
//  import { fetchUserDetails } from "../../store/auth/loggedIn-user-slice";
import NavbarThirdParty from "../../component/third-party-components/NavbarThirdParty";

const ThirdPartyRootLayout: React.FC = () => {
  const { currentURL } = useForLocation();
  const { isConnectionRefused } = useNetworkStatus();
  const { isAuthenticated, accessToken: token } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.replace(url);
    }
  }, [isAuthenticated, currentURL, token]);
  return (
    <Fragment>
      {!isConnectionRefused && (
        <>
          <NavbarThirdParty />
          {isAuthenticated && (
            <main>
              <Outlet />
            </main>
          )}
        </>
      )}

      {isConnectionRefused && (
        <>
          <Fallback icon={<MdError color="red" size={40} />} errorInfo="Please check your Connection or try again" />
        </>
      )}
    </Fragment>
  );
};

export default ThirdPartyRootLayout;

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import LoadingSpinner from "../util/custom/ui/LoadingSpinner";
import { getAccessToekn, setAuth } from "../store/auth/auth-Slice";
import { baseURL, clientId, redirect_URI } from "../config";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.getLoggedInUserData);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", `${redirect_URI}/login/oauth2/code/unifcrm`);

      axios.post(`${baseURL}:9001/oauth2/token`, params, {
          auth: {
            username: clientId,
            password: "secret",
          },
        })
        .then((response) => {
          const token = response.data.access_token;
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          store.dispatch(getAccessToekn(token));
          store.dispatch(setAuth());
          if (!isLoading) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error.response ? error.response.data : error.message);
        });
    }
  }, [navigate]);

  return (
    <>
      <LoadingSpinner size={35} mainLoading={true} message={isLoading ? "login.." : "Hold On!"} centered={true} />
    </>
  );
};

export default OAuth2RedirectHandler;

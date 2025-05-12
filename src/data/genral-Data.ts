import { baseURL, clientId, redirect_URI } from "../config";

export const url: string =
  `${baseURL}:9001/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect_URI}/login/oauth2/code/unifcrm&response_type=code&scope=openid`;
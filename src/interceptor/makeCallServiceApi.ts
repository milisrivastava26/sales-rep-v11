import axios from "axios";
import { baseURL } from "../config";

const makeCallServiceApi = axios.create({
  baseURL: `${baseURL}:9892/`,
  timeout: 10000,
});

export default makeCallServiceApi;

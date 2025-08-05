import axios from "axios";
import { baseURL } from "../config";

const wpActionsApi = axios.create({
  baseURL: `${baseURL}:4040/`,
  timeout: 10000,
});

export default wpActionsApi;

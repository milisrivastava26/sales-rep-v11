import axios from "axios";
import { baseURL } from "../config";

// Create an Axios instance
const corePaymentInfoApi = axios.create({
  baseURL: `${baseURL}:9895`,
  timeout: 50000,
});


export default corePaymentInfoApi;

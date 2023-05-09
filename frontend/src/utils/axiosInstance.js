import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:2001";
let authToken = localStorage.getItem("authToken")
  ? JSON.parse(localStorage.getItem("authToken"))
  : null;


const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization : `Bearer ${authToken?.access}`}
})

axiosInstance.interceptors.request.use(async req => {
    if (!authToken) {
        authToken = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")): null;
        req.headers.Authorization = `Bearer ${authToken?.access}`
    }
    
    const user = jwt_decode(authToken.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("isExpired :", isExpired)
    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authToken.refresh
    })
    localStorage.setItem('authToken', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`

    return req
})

export default axiosInstance;

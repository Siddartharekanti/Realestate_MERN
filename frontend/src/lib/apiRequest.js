import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/backend", //to reuse this URL many time
    withCredentials:true,  //since we use cookies all the time
    headers: {
        'Content-Type': 'application/json',
      },
})

export default apiRequest



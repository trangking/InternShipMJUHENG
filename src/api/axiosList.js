import axios from "axios";

const instanceList = axios.create({
    baseURL:`${process.env.REACT_APP_API_LIST_URL}`,
})
instanceList.interceptors.request.use(async function(config){
    return config;
});


export default instanceList;
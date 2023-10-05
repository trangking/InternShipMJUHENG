import axios from "axios";


const requisition = axios.create({
    baseURL:`${process.env.REACT_APP_API_REQUISITION_URL}`,
})

requisition.interceptors.request.use(async function(config){
    return config;
});


export default requisition;


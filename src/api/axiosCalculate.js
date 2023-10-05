import axios from "axios";


const instanceCalulate = axios.create({
    baseURL:`${process.env.REACT_APP_API_CAl_URL}`,
})
instanceCalulate.interceptors.request.use(async function(config){
    return config;
});


export default instanceCalulate;
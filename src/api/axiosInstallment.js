import axios from "axios";


const installment = axios.create({
    baseURL:`${process.env.REACT_APP_API_INSTALLMENTPERIODS_URL}`,
})

installment.interceptors.request.use(async function(config){
    return config;
});


export default installment;


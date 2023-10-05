import axios from "../axiosInstallment";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
 getDigitalloan(ContractTypeCode,typecar,BrandCode,value){
    return axios.get(`api/InstallmentPeriods/DigitalLoan?ContractTypeCode=${ContractTypeCode}&CarTypeCode=${typecar[0].AssetTypeCode}&BrandCode=${BrandCode}&RegistrationCarYear=${value}`)
    // return axios.get(`api/InstallmentPeriods/DigitalLoan?ContractTypeCode=01&CarTypeCode=02&BrandCode=BM&RegistrationCarYear=2018`)
 },
 getPUandNaNu(ContractTypeCode){
   return axios.get(`/api/InstallmentPeriods/DigitalLoan?ContractTypeCode=${ContractTypeCode}`)
 }
};
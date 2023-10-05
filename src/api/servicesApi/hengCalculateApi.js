import axios from "../axiosCalculate";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  calculateEIR(
    lockedDate,
    nowDay,
    needMoney,
    installmentPayment,
    interestrate
  ) {
    return axios.get(
      `/api/InstallmentCalculation/NewLoan?FirstPayDate=${lockedDate}&ContractDate=${nowDay}&PrincipalAmount=${needMoney}&InterestRate=${interestrate}&Period=${installmentPayment}`
    );
  },
  calculateFLAT(needMoney, installmentPayment, interestrate) {
    return axios.get(
      `api/InstallmentCalculation/HirePurchase?PrincipalAmount=${needMoney}&InterestRate=${interestrate}&Period=${installmentPayment}`
    );
  },
  calculateTableFLAT(Period) {
    return axios.get(
      `/api/InstallmentCalculation/HirePurchase/DebtTable?FirstPayDate=${Period.dateDayAmount}&ContractTypeId=${Period.ContractTypeCode}&PrincipalAmount=${Period.needMoney}&InterestRate=${Period.interestRate}&Period=${Period.period}`
    );
  },
  calculateTableEIR(Period) {
    return axios.get(
      `/api/InstallmentCalculation/NewLoan/DebtTable?FirstPayDate=${Period.dateDayAmount}&ContractDate=${Period.nowDay}&PrincipalAmount=${Period.needMoney}&InterestRate=${Period.interestRate}&Period=${Period.period}`
    );
  },
};

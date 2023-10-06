import React, { useState, useEffect, createContext, useRef } from "react";
import { Form } from "antd";
import { API } from "../api/servicesApi";

export const MyContextCal = createContext();

const MyProvidercal = ({ children }) => {
  const [needMoney, setneedMoney] = useState(0);
  const [interestrate, setinterestrate] = useState(0);
  const [validateStatus, setValidateStatus] = useState("");
  const [validateStatusSelerter, setvalidateStatusSelerter] = useState("");
  const [helpForm, sethelpForm] = useState("");
  const [helpFormSelecter, sethelpFormSelecter] = useState("");
  const [checkhelpForm, setcheckhelpForm] = useState("");
  const [checkhelpFormSelecter, setcheckhelpFormSelecter] = useState("");
  const [installmentPayment, setinstallmentPayment] = useState(0);
  const [showdateDay, setshowdateDay] = useState("");
  const [Listinstallmentandinterestrate, setListinstallmentandinterestrate] =
    useState([]);
  const [interestrateCode, setInterestrateCode] = useState([]);
  const [ContractTypeCode, setContractTyperCode] = useState("");
  const [RegistrationCarYearID, setRegistrationCarYearID] = useState(0);
  const [helpFormSelecterinterestrate, sethelpFormSelecterinterestrate] =
    useState("");
  const [cardShow, setcardShow] = useState([]);
  const [period, setperiod] = useState(0);
  const [
    validateStatusSelerterinstallment,
    setvalidateStatusSelerterinstallment,
  ] = useState("");
  const [
    checkhelpFormSelecterinstallment,
    setcheckhelpFormSelecterinstallment,
  ] = useState("");
  const [helpFormSelecterinstallment, sethelpFormSelecterinstallment] =
    useState("");
  const [
    validateStatusSelerterinterestrate,
    setvalidateStatusSelerterinterestrate,
  ] = useState("");
  const [
    checkhelpFormSelecterinterestrate,
    setcheckhelpFormSelecterinterestrate,
  ] = useState("");

  const [canCalculate, setCanCalculate] = useState(false);
  const [sentInstallmentandinterestrate, setsentInstallmentandinterestrate] =
    useState([]);
  const [lockedDate, setLockedDate] = useState("");
  const [index, setindex] = useState(0);
  const [initialSlideIndex, setinitialSlideIndex] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  return (
    <MyContextCal.Provider
      value={{
        ContractTypeCode,
        setContractTyperCode,
        needMoney,
        setneedMoney,
        Listinstallmentandinterestrate,
        setListinstallmentandinterestrate,
        RegistrationCarYearID,
        setRegistrationCarYearID,
        period,
        setperiod,
        interestrateCode,
        setInterestrateCode,
        interestrate,
        setinterestrate,
        installmentPayment,
        setinstallmentPayment,
        index,
        setindex,
        sentInstallmentandinterestrate,
        setsentInstallmentandinterestrate,
        validateStatus,
        setValidateStatus,
        checkhelpForm,
        setcheckhelpForm,
        helpForm,
        sethelpForm,
        validateStatusSelerter,
        setvalidateStatusSelerter,
        checkhelpFormSelecter,
        setcheckhelpFormSelecter,
        helpFormSelecter,
        sethelpFormSelecter,
        validateStatusSelerterinstallment,
        setvalidateStatusSelerterinstallment,
        checkhelpFormSelecterinstallment,
        setcheckhelpFormSelecterinstallment,
        helpFormSelecterinstallment,
        sethelpFormSelecterinstallment,
        validateStatusSelerterinterestrate,
        setvalidateStatusSelerterinterestrate,
        checkhelpFormSelecterinterestrate,
        setcheckhelpFormSelecterinterestrate,
        helpFormSelecterinterestrate,
        sethelpFormSelecterinterestrate,
        initialSlideIndex,
        setinitialSlideIndex,
        cardShow,
        setcardShow,
        showdateDay,
        lockedDate,
        setLockedDate,
        setshowdateDay,
        canCalculate,
        setCanCalculate,
        resetCounter,
        setResetCounter,
      }}
    >
      {children}
    </MyContextCal.Provider>
  );
};

export default MyProvidercal;

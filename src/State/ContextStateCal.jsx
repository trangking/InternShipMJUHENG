import React, { useState, useEffect, createContext, useRef } from "react";
import { Form } from "antd";
import { API } from "../api/servicesApi";

export const MyContextCal = createContext();

const MyProvidercal = ({ children }) => {
  const [needMoney, setneedMoney] = useState(0);
  const [interestrate, setinterestrate] = useState(0);
  const [dateDayAmount, setdateDayAmount] = useState("");
  const [validateStatus, setValidateStatus] = useState("");
  const [validateStatusSelerter, setvalidateStatusSelerter] = useState("");
  const [helpForm, sethelpForm] = useState("");
  const [helpFormSelecter, sethelpFormSelecter] = useState("");
  const [checkhelpForm, setcheckhelpForm] = useState("");
  const [checkhelpFormSelecter, setcheckhelpFormSelecter] = useState("");
  const [installmentPayment, setinstallmentPayment] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showdateDay, setshowdateDay] = useState("");
  const [isFormCardVisible, setIsFormCardVisible] = useState(false);
  const [Listinstallmentandinterestrate, setListinstallmentandinterestrate] =
    useState([]);
  const [interestrateCode, setInterestrateCode] = useState([]);
  const [typecarID, settypecarID] = useState("");
  const [brandID, setbrandID] = useState("");
  const [modelID, setmodelID] = useState("");
  const [caryearID, setcaryearID] = useState("");
  const [ContractTypeCode, setContractTyperCode] = useState("");
  const [BrandCode, setBrandCode] = useState("");
  const [RegistrationCarYearID, setRegistrationCarYearID] = useState(0);
  const [nowDay, setnowDay] = useState("");
  const [helpFormSelecterinterestrate, sethelpFormSelecterinterestrate] =
    useState("");
  const [cardShow, setcardShow] = useState([]);
  const [period, setperiod] = useState(0);
  const [modal1Open, setModal1Open] = useState(false);
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
  const [initialCardShow, setInitialCardShow] = useState([]);
  const [initialNeedMoney, setInitialNeedMoney] = useState(0);
  const [initialDateDayAmount, setInitialDateDayAmount] = useState("");
  const [initialContractTypeCode, setInitialContractTypeCode] = useState("");
  const [canCalculate, setCanCalculate] = useState(false);
  const [sentInstallmentandinterestrate, setsentInstallmentandinterestrate] =
    useState([]);
  const [canSelecterbrand, setcanSelecterbrand] = useState(false);
  const [canSelectermodel, setcanSelectermodel] = useState(false);
  const [canSelectercaryear, setcanSelectercaryear] = useState(false);
  const [canSelectermodeldetail, setcanSelectermodeldetail] = useState(false);
  const [lockedDate, setLockedDate] = useState("");
  const calculateButtonRef = useRef(null);
  const [index, setindex] = useState(0);
  const [initialSlideIndex, setinitialSlideIndex] = useState(0);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);
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

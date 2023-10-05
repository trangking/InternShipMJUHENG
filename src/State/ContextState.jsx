import React, { useState, useReducer, createContext, useRef } from "react";
import { Form } from "antd";
import { API } from "../api/servicesApi";

export const MyContext = createContext();
const initialState = {
  ContractMenu: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTRACT_MENU":
      return { ...state, ContractMenu: action.payload };
    default:
      return state;
  }
};
const MyProvider = ({ children }) => {
  const [typecar, settypercar] = useState([]);
  const [brand, setbrand] = useState([]);
  const [model, setmodel] = useState([]);
  const [titleBrand, setTitleBrand] = useState("กรุณาเลือกยี่ห้อรถ");
  const [caryear, setcaryear] = useState([]);
  const [modeldetail, setmodeldetail] = useState([]);
  const [price, setprice] = useState([]);
  const [caryears, setcaryears] = useState("");
  const [persLeasing, setpersLeasing] = useState("");
  const [loadings, setLoadings] = useState([]);
  const [form] = Form.useForm();
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
  const [ContractTypeCode, setContractTyperCode] = useState("01");
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
  const [ContractMenu, setContractMenu] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider
      value={{
        typecar,
        settypercar,
        typecarID,
        settypecarID,
        brand,
        setbrand,
        brandID,
        setbrandID,
        titleBrand,
        setTitleBrand,
        model,
        setmodel,
        modelID,
        setmodelID,
        BrandCode,
        setBrandCode,
        caryear,
        setcaryear,
        caryearID,
        setcaryearID,
        modeldetail,
        setmodeldetail,
        price,
        setprice,
        isLinkDisabled,
        setIsLinkDisabled,
        canSelecterbrand,
        setcanSelecterbrand,
        canSelectermodel,
        setcanSelectermodel,
        canSelectercaryear,
        setcanSelectercaryear,
        canSelectermodeldetail,
        setcanSelectermodeldetail,
        needMoney,
        setneedMoney,
        RegistrationCarYearID,
        setRegistrationCarYearID,
        isFormCardVisible,
        setIsFormCardVisible,
        state,
        dispatch,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

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
  const [needMoney, setneedMoney] = useState(0);
  const [isFormCardVisible, setIsFormCardVisible] = useState(false);
  const [typecarID, settypecarID] = useState("");
  const [brandID, setbrandID] = useState("");
  const [modelID, setmodelID] = useState("");
  const [caryearID, setcaryearID] = useState("");
  const [BrandCode, setBrandCode] = useState("");
  const [RegistrationCarYearID, setRegistrationCarYearID] = useState(0);
  const [canSelecterbrand, setcanSelecterbrand] = useState(false);
  const [canSelectermodel, setcanSelectermodel] = useState(false);
  const [canSelectercaryear, setcanSelectercaryear] = useState(false);
  const [canSelectermodeldetail, setcanSelectermodeldetail] = useState(false);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);
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

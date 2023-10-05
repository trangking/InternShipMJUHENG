import { useContext, useEffect, useRef } from "react";
import { Select } from "antd";
import { MyContextCal } from "../../State/ContextStateCal";
import { MyContext } from "../../State/ContextState";
import { MyContextType } from "../../State/ContextTypeCode";
import { API } from "../../api/servicesApi";
import useFuncition from "./Fuunction";
import moment from "moment";
moment.locale("th");

const useFuncitionCal = () => {
  const { needMoney, setneedMoney } = useContext(MyContextCal);
  const { interestrate, setinterestrate } = useContext(MyContextCal);
  const { setprice } = useContext(MyContext);

  const { validateStatus, setValidateStatus } = useContext(MyContextCal);
  const { validateStatusSelerter, setvalidateStatusSelerter } =
    useContext(MyContextCal);
  const { helpForm, sethelpForm } = useContext(MyContextCal);
  const { helpFormSelecter, sethelpFormSelecter } = useContext(MyContextCal);
  const { checkhelpForm, setcheckhelpForm } = useContext(MyContextCal);
  const { checkhelpFormSelecter, setcheckhelpFormSelecter } =
    useContext(MyContextCal);
  const { installmentPayment, setinstallmentPayment } =
    useContext(MyContextCal);

  const { showdateDay, setshowdateDay } = useContext(MyContextCal);
  const { isFormCardVisible, setIsFormCardVisible } = useContext(MyContext);
  const { Listinstallmentandinterestrate, setListinstallmentandinterestrate } =
    useContext(MyContextCal);
  const { interestrateCode, setInterestrateCode } = useContext(MyContextCal);

  const { RegistrationCarYearID, setRegistrationCarYearID } =
    useContext(MyContextCal);
  const { nowDay, setnowDay } = useContext(MyContextCal);
  const { helpFormSelecterinterestrate, sethelpFormSelecterinterestrate } =
    useContext(MyContextCal);
  const { cardShow, setcardShow } = useContext(MyContextCal);
  const { period, setperiod } = useContext(MyContextCal);

  const {
    validateStatusSelerterinstallment,
    setvalidateStatusSelerterinstallment,
  } = useContext(MyContextCal);
  const {
    checkhelpFormSelecterinstallment,
    setcheckhelpFormSelecterinstallment,
  } = useContext(MyContextCal);
  const { helpFormSelecterinstallment, sethelpFormSelecterinstallment } =
    useContext(MyContextCal);
  const {
    validateStatusSelerterinterestrate,
    setvalidateStatusSelerterinterestrate,
  } = useContext(MyContextCal);
  const {
    checkhelpFormSelecterinterestrate,
    setcheckhelpFormSelecterinterestrate,
  } = useContext(MyContextCal);

  const { canCalculate, setCanCalculate } = useContext(MyContextCal);
  const { sentInstallmentandinterestrate, setsentInstallmentandinterestrate } =
    useContext(MyContextCal);
  const { index, setindex } = useContext(MyContextCal);
  const { initialSlideIndex, setinitialSlideIndex } = useContext(MyContextCal);
  const { resetCounter, setResetCounter } = useContext(MyContextCal);
  const { canSelecterbrand, setcanSelecterbrand } = useContext(MyContext);
  const { canSelectermodel, setcanSelectermodel } = useContext(MyContext);
  const { canSelectercaryear, setcanSelectercaryear } = useContext(MyContext);
  const { canSelectermodeldetail, setcanSelectermodeldetail } =
    useContext(MyContext);
  const { typecar, BrandCode, price, settypecarID } = useFuncition();
  const { isLinkDisabled, setIsLinkDisabled } = useContext(MyContext);
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  const onChangeneedmoney = (value) => {
    try {
      setneedMoney(value);
      if (price && price[0].PercentForLoanCalculate) {
        setIsFormCardVisible(false);
        if (value > price[0].PercentForLoanCalculate) {
          setValidateStatus("warning");
          setcheckhelpForm("warning");
          setIsFormCardVisible(false);
          setCanCalculate(false);
        } else if (value === 0) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
          sethelpForm("กรุณากรอกจำนวนเงินที่ต้องการกู้");
        } else if (value === null) {
          setValidateStatus("error");
          setcheckhelpForm("error");
          setIsFormCardVisible(false);
          setCanCalculate(false);
          sethelpForm("กรุณากรอกจำนวนเงินที่ต้องการกู้");
        } else {
          setValidateStatus("success");
          setcheckhelpForm("success");
          sethelpForm("");
          setCanCalculate(true);
        }
      } else {
        setIsFormCardVisible(true);
      }
    } catch (error) {
      console.error("An error occurred in onChangeneedmoney:", error);
    }
  };
  const formatDate = (year) => {
    const buddhistYear = year + 543;
    return `${buddhistYear} `;
  };
  const generateOptions = () => {
    const currentYearCE = new Date().getFullYear();
    const options = [];

    for (let year = currentYearCE; year >= currentYearCE - 100; year--) {
      options.push(
        <Select.Option key={year} value={year}>
          {formatDate(year)}
        </Select.Option>
      );
    }

    return options;
  };
  const onChangeListinstallmentandinterestrate = async (value) => {
    try {
      const data = await API.installment.getDigitalloan(
        ContractTypeCode,
        typecar,
        BrandCode,
        value
      );
      if (value !== RegistrationCarYearID) {
        setInterestrateCode([]);
        setinstallmentPayment(0);
        setinterestrate(0);
        setIsFormCardVisible(false);
      }
      if (value > 0) {
        setvalidateStatusSelerter("success");
        setcheckhelpFormSelecter("success");
        sethelpFormSelecter("");
      }
      setRegistrationCarYearID(value);
      setListinstallmentandinterestrate(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const dataListinstallmentandinsterrest = async () => {
    const quantities = Listinstallmentandinterestrate.map((item) => ({
      installmentPayment: item.qty,
    }));
    setsentInstallmentandinterestrate(quantities);
  };
  const onChangeinstallmentPayment = async (value) => {
    try {
      const data = await API.requisition.getinterestrate(
        ContractTypeCode,
        typecar,
        BrandCode,
        RegistrationCarYearID,
        value,
        needMoney,
        price
      );
      setperiod(value);
      setInterestrateCode([data.data]);
      setinstallmentPayment(value);
      setindex(value);
      if (value > 0) {
        setvalidateStatusSelerterinstallment("success");
        setcheckhelpFormSelecterinstallment("success");
        sethelpFormSelecterinstallment("");
      }
      if (value !== installmentPayment) {
        setIsFormCardVisible(false);
        setinterestrate(0);
      }
      dataListinstallmentandinsterrest();
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataAndConvert = async () => {
    for (let i = 0; i < sentInstallmentandinterestrate.length; i++) {
      const value = sentInstallmentandinterestrate[i].installmentPayment;

      try {
        const data = await API.requisition.getinterestrate(
          ContractTypeCode,
          typecar,
          BrandCode,
          RegistrationCarYearID,
          value,
          needMoney,
          price
        );

        sentInstallmentandinterestrate[i] = {
          installmentPayment: value,
          interestRate: data.data.interestRate,
        };
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onChangeinterestrate = (value) => {
    setinterestrate(value);
    if (value > 0) {
      setvalidateStatusSelerterinterestrate("success");
      setcheckhelpFormSelecterinterestrate("success");
      sethelpFormSelecterinterestrate("");
    }
  };

  const handleReset = () => {
    setIsFormCardVisible(false);
    settypecarID("");
    setValidateStatus("");
    setcheckhelpForm("");
    sethelpForm("");
    setvalidateStatusSelerter("");
    setcheckhelpFormSelecter("");
    sethelpFormSelecter("");
    setprice([]);
    setvalidateStatusSelerterinstallment("");
    setcheckhelpFormSelecterinstallment("");
    sethelpFormSelecterinstallment("");
    setvalidateStatusSelerterinterestrate("");
    setcheckhelpFormSelecterinterestrate("");
    sethelpFormSelecterinterestrate("");
    setneedMoney(0);
    setRegistrationCarYearID(0);
    setinstallmentPayment(0);
    setinterestrate(0);
    setCanCalculate(false);
    setcanSelecterbrand(false);
    setcanSelectermodel(false);
    setcanSelectercaryear(false);
    setcanSelectermodeldetail(false);
    setIsLinkDisabled(false);
    setResetCounter((prevCounter) => prevCounter + 1);
    setsentInstallmentandinterestrate([]);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return {
    needMoney,
    BrandCode,
    RegistrationCarYearID,
    Listinstallmentandinterestrate,
    interestrateCode,
    installmentPayment,
    interestrate,
    period,
    index,
    sentInstallmentandinterestrate,
    validateStatus,
    checkhelpForm,
    helpForm,
    validateStatusSelerter,
    checkhelpFormSelecter,
    helpFormSelecter,
    validateStatusSelerterinstallment,
    checkhelpFormSelecterinstallment,
    helpFormSelecterinstallment,
    validateStatusSelerterinterestrate,
    checkhelpFormSelecterinterestrate,
    helpFormSelecterinterestrate,
    cardShow,
    initialSlideIndex,
    showdateDay,
    canCalculate,
    isLinkDisabled,
    resetCounter,
    onChangeneedmoney,
    onChangeListinstallmentandinterestrate,
    onChangeinstallmentPayment,
    onChangeinterestrate,
    generateOptions,
    formatDate,
    dataListinstallmentandinsterrest,
    fetchDataAndConvert,
    handleReset,
  };
};

export default useFuncitionCal;

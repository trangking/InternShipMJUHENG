import { useCallback, useContext } from "react";
import { MyContextCal } from "../../State/ContextStateCal";
import Swal from "sweetalert2";
import useFuncitionCal from "../Func/FuncitionCal";
import useFuncition from "./Fuunction";

const useValidateStaus = () => {
  const { validateStatus, setValidateStatus } = useContext(MyContextCal);
  const { validateStatusSelerter, setvalidateStatusSelerter } =
    useContext(MyContextCal);
  const {
    validateStatusSelerterinstallment,
    setvalidateStatusSelerterinstallment,
  } = useContext(MyContextCal);
  const {
    validateStatusSelerterinterestrate,
    setvalidateStatusSelerterinterestrate,
  } = useContext(MyContextCal);
  const { checkhelpForm, setcheckhelpForm } = useContext(MyContextCal);
  const { checkhelpFormSelecter, setcheckhelpFormSelecter } =
    useContext(MyContextCal);
  const {
    checkhelpFormSelecterinstallment,
    setcheckhelpFormSelecterinstallment,
  } = useContext(MyContextCal);
  const {
    checkhelpFormSelecterinterestrate,
    setcheckhelpFormSelecterinterestrate,
  } = useContext(MyContextCal);
  const { helpForm, sethelpForm } = useContext(MyContextCal);
  const { helpFormSelecter, sethelpFormSelecter } = useContext(MyContextCal);
  const { helpFormSelecterinstallment, sethelpFormSelecterinstallment } =
    useContext(MyContextCal);
  const { helpFormSelecterinterestrate, sethelpFormSelecterinterestrate } =
    useContext(MyContextCal);
  const { needMoney, RegistrationCarYearID, installmentPayment, interestrate } =
    useFuncitionCal();
  const { price, setIsFormCardVisible } = useFuncition();
  const superCheck = () => {
    Swal.fire({
      icon: "error",
      title: "ข้อมูลกรอกไม่ครบถ้วน",
      text: "ตรวจสอบข้อมูลให้ครบถ้วน",
    });
  };
  const checkCal = () => {
    if (
      needMoney === 0 ||
      (needMoney === null &&
        RegistrationCarYearID === 0 &&
        installmentPayment === 0 &&
        interestrate === 0)
    ) {
      setcheckhelpForm("error");
      setcheckhelpFormSelecter("error");
      setcheckhelpFormSelecterinstallment("error");
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setValidateStatus("error");
      setvalidateStatusSelerter("error");
      setvalidateStatusSelerterinstallment("error");
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else if (
      RegistrationCarYearID === 0 &&
      installmentPayment === 0 &&
      interestrate === 0
    ) {
      setcheckhelpFormSelecter("error");
      setcheckhelpFormSelecterinstallment("error");
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerter("error");
      setvalidateStatusSelerterinstallment("error");
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else if (installmentPayment === 0 && interestrate === 0) {
      setcheckhelpFormSelecterinstallment("error");
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinstallment("error");
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else if (needMoney === 0 || needMoney === null) {
      setcheckhelpForm("error");
      messageHelp();
      superCheck();
      setValidateStatus("error");
      setIsFormCardVisible(false);
    } else if (RegistrationCarYearID === 0) {
      setcheckhelpFormSelecter("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerter("error");
      setIsFormCardVisible(false);
    } else if (installmentPayment === 0) {
      setcheckhelpFormSelecterinstallment("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinstallment("error");
      setIsFormCardVisible(false);
    } else if (interestrate === 0) {
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else {
      alertMessage();
      setIsFormCardVisible(true);
    }
  };
  const formatCurrency = (value) => {
    const formattedValue = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return formattedValue.replace(/\.00$/, ""); // Remove .00 if it's at the end
  };
  const messageHelp = useCallback(() => {
    if (checkhelpForm === "warning") {
      sethelpForm(
        `กรุณากรอกจำนวนเงินไม่เกิน ${formatCurrency(
          price[0].PercentForLoanCalculate
        )} บาท`
      );
      setIsFormCardVisible(false);
    } else if (
      checkhelpForm === "error" &&
      checkhelpFormSelecter === "error" &&
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpForm("กรุณาระบุวงเงินที่ต้องการ");
      sethelpFormSelecter("กรุณาเลือกปีที่จดทะเบียนรถ");
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (
      checkhelpFormSelecter === "error" &&
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpFormSelecter("กรุณาเลือกปีที่จดทะเบียนรถ");
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (checkhelpForm === "error") {
      sethelpForm("กรุณาระบุวงเงินที่ต้องการ");
    } else if (checkhelpFormSelecter === "error") {
      sethelpFormSelecter("กรุณาเลือกปีที่จดทะเบียนรถ");
    } else if (checkhelpFormSelecterinstallment === "error") {
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
    } else if (checkhelpFormSelecterinterestrate === "error") {
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (checkhelpForm === "success") {
      setValidateStatus("");
      setcheckhelpForm("");
      sethelpForm("");
    } else if (checkhelpFormSelecter === "success") {
      setvalidateStatusSelerter("");
      setcheckhelpFormSelecter("");
      sethelpFormSelecter("");
    } else if (checkhelpFormSelecterinstallment === "success") {
      setvalidateStatusSelerterinstallment("");
      setcheckhelpFormSelecterinstallment("");
      sethelpFormSelecterinstallment("");
    } else if (checkhelpFormSelecterinterestrate === "success") {
      setvalidateStatusSelerterinterestrate("");
      setcheckhelpFormSelecterinterestrate("");
      sethelpFormSelecterinterestrate("");
    }
  }, [
    checkhelpForm,
    checkhelpFormSelecter,
    checkhelpFormSelecterinstallment,
    checkhelpFormSelecterinterestrate,
  ]);
  const alertMessage = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "แสดงจำนวนงวด",
    });
  };
  const checkCalPuandNano = () => {
    if (
      needMoney === 0 ||
      (needMoney === null && installmentPayment === 0 && interestrate === 0)
    ) {
      setcheckhelpForm("error");
      setcheckhelpFormSelecterinstallment("error");
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setValidateStatus("error");
      setvalidateStatusSelerter("error");
      setvalidateStatusSelerterinstallment("error");
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else if (installmentPayment === 0 && interestrate === 0) {
      setcheckhelpFormSelecterinstallment("error");
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinstallment("error");
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else if (needMoney === 0 || needMoney === null) {
      setcheckhelpForm("error");
      messageHelp();
      superCheck();
      setValidateStatus("error");
      setIsFormCardVisible(false);
    } else if (installmentPayment === 0) {
      setcheckhelpFormSelecterinstallment("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinstallment("error");
      setIsFormCardVisible(false);
    } else if (interestrate === 0) {
      setcheckhelpFormSelecterinterestrate("error");
      messageHelp();
      superCheck();
      setvalidateStatusSelerterinterestrate("error");
      setIsFormCardVisible(false);
    } else {
      alertMessage();
      setIsFormCardVisible(true);
    }
  };
  const messageHelpPuandNano = useCallback(() => {
    if (
      checkhelpForm === "error" &&
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpForm("กรุณาระบุวงเงินที่ต้องการ");

      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (
      checkhelpFormSelecterinstallment === "error" &&
      checkhelpFormSelecterinterestrate === "error"
    ) {
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (checkhelpForm === "error") {
      sethelpForm("กรุณาระบุวงเงินที่ต้องการ");
    } else if (checkhelpFormSelecterinstallment === "error") {
      sethelpFormSelecterinstallment("กรุณาเลือกระยะเวลาการผ่อน");
    } else if (checkhelpFormSelecterinterestrate === "error") {
      sethelpFormSelecterinterestrate("กรุณาเลือกอัตราดอกเบี้ย");
    } else if (checkhelpForm === "success") {
      setValidateStatus("");
      setcheckhelpForm("");
      sethelpForm("");
    } else if (checkhelpFormSelecterinstallment === "success") {
      setvalidateStatusSelerterinstallment("");
      setcheckhelpFormSelecterinstallment("");
      sethelpFormSelecterinstallment("");
    } else if (checkhelpFormSelecterinterestrate === "success") {
      setvalidateStatusSelerterinterestrate("");
      setcheckhelpFormSelecterinterestrate("");
      sethelpFormSelecterinterestrate("");
    }
  }, [
    checkhelpForm,
    checkhelpFormSelecter,
    checkhelpFormSelecterinstallment,
    checkhelpFormSelecterinterestrate,
  ]);
  return { messageHelp, checkCal, messageHelpPuandNano, checkCalPuandNano };
};
export default useValidateStaus;

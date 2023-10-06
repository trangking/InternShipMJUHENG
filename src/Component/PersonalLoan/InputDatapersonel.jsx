import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  Suspense,
} from "react";
import "../../styles/HengStyles.css";
import {
  Form,
  Select,
  InputNumber,
  Button,
  DatePicker,
  ConfigProvider,
  Image,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../../api/servicesApi";
import moment from "moment";
import "moment/locale/th";
import "../../styles/tableLoan.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import locale from "antd/es/locale/th_TH";
import useValidateStaus from "../Func/Validate";
import "../../styles/PuandNano.css";
import useFuncition from "../Func/Fuunction";
import useFuncitionCalPuandNano from "../Func/FuncitionPuandNano";
import { MyContextType } from "../../State/ContextTypeCode";
dayjs.locale("th");
moment.locale("th");

const Cardpricelist = React.lazy(() => import("./CardShowPrice"));

const HeadderPU = () => {
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  let TitleHead = "";

  if (ContractTypeCode === "08") {
    TitleHead = (
      <>
        Nano Finance <br />
        สินเชื่อรายย่อยเพื่อการประกอบอาชีพ
      </>
    );
  } else if (ContractTypeCode === "09") {
    TitleHead = (
      <>
        Personal Unsecured Loan(PU) <br />
        สินเชื่อส่วนบุคคล(ไม่มีหลักประกัน)
      </>
    );
  }
  return (
    <div>
      <h1>คำนวณสินเชื่อ</h1>
      <h2>{TitleHead}</h2>
    </div>
  );
};
const SelectorPU = () => {
  const [loadings, setLoadings] = useState([]);
  const [form] = Form.useForm();
  const [cardShow, setcardShow] = useState([]);
  const [nowDay, setnowDay] = useState("");
  const [lockedDate, setLockedDate] = useState("");
  const calculateButtonRef = useRef(null);
  const [initialSlideIndex, setinitialSlideIndex] = useState(0);
  const { isFormCardVisible, setIsFormCardVisible } = useFuncition();
  const {
    needMoney,
    Listinstallmentandinterestrate,
    installmentPayment,
    interestrateCode,
    index,
    sentInstallmentandinterestrate,
    validateStatus,
    helpForm,
    validateStatusSelerterinstallment,
    helpFormSelecterinstallment,
    validateStatusSelerterinterestrate,
    helpFormSelecterinterestrate,
    onChangeneedmoney,
    onChangeinstallmentPayment,
    onChangeinterestrate,
    dataListinstallmentandinsterrest,
    fetchDataAndConvert,
    handleReset,
    dataInstallmentPayment,
  } = useFuncitionCalPuandNano();
  const { messageHelpPuandNano, checkCalPuandNano } = useValidateStaus();
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  const checkinstallpayment = (value) => {
    if (value !== installmentPayment) {
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
      setIsFormCardVisible(false);
    }
  };
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        checkCalPuandNano();
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 800);
  };
  const clickToCal = async () => {
    const yearEng = moment(lockedDate).subtract(543, "years");
    try {
      const cardDataArray = [];
      for (let i = 0; i < sentInstallmentandinterestrate.length; i++) {
        const value = sentInstallmentandinterestrate[i].installmentPayment;
        const data = await API.hengCalculateApi.calculateEIR(
          yearEng.format("YYYY-MM-DD"),
          nowDay,
          needMoney,
          value,
          sentInstallmentandinterestrate[i].interestRate
        );
        cardDataArray.push(data.data);
      }
      setTimeout(() => {
        calculateButtonRef.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      const initialSlideIndex = cardDataArray?.findIndex(
        (item) => item.period === index
      );
      setinitialSlideIndex(initialSlideIndex);
      setcardShow(cardDataArray);
      setIsFormCardVisible(true);
    } catch (err) {
      console.log(err);
    }
  };
  const reestField = () => {
    form.resetFields();
  };
  useEffect(() => {
    dataInstallmentPayment();
    fetchDataAndConvert();
  }, [sentInstallmentandinterestrate]);
  useEffect(() => {
    dataListinstallmentandinsterrest();
    const currentdate = new Date().toLocaleDateString();
    const [month, day, year] = currentdate.split("/");
    const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setnowDay(newDate);
  }, []);

  useEffect(() => {
    messageHelpPuandNano();
  }, [messageHelpPuandNano]);

  useEffect(() => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() + 1;

    let lockedDay;
    let lockedMonth;
    let lockedYear;

    if (dayOfMonth >= 1 && dayOfMonth <= 5) {
      lockedDay = 5;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 6 && dayOfMonth <= 10) {
      lockedDay = 10;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 11 && dayOfMonth <= 15) {
      lockedDay = 15;
      lockedMonth = month + 1;
      lockedYear = year;
    } else if (dayOfMonth >= 16 && dayOfMonth <= 31) {
      lockedDay = 3;
      lockedMonth = month + 2;
      lockedYear = year;
    }

    const formattedLockedDate = `${lockedYear}-${lockedMonth}-${lockedDay}`;
    const convertedDate = moment(formattedLockedDate, "YYYY-MM-DD").add(
      542,
      "years"
    );
    setLockedDate(convertedDate);
  }, []);

  return (
    <>
      <div className="controlinputdataPUandNano">
        <div className="inputdataPuandNao">
          <Form form={form}>
            <div className="controlFormmoney">
              <label>วงเงินที่ต้องการ</label>
              <Form.Item
                data-test="Needmoney-form"
                name="needmoney"
                className="controinput"
                validateStatus={validateStatus}
                help={helpForm}
                hasFeedback
              >
                <InputNumber
                  placeholder="กรุณาระบุวงเงิน"
                  value={needMoney}
                  onChange={onChangeneedmoney}
                  step="1"
                  stringMode
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onKeyDown={(e) => {
                    if (
                      !/\d/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  addonAfter="บาท"
                />
              </Form.Item>

              <label>ระยะเวลาการผ่อน</label>
              <div className="Select-unit-installpaymentandinterestRate">
                <Form.Item
                  data-test="Payment-ID"
                  name="installmentPayment"
                  validateStatus={validateStatusSelerterinstallment}
                  help={helpFormSelecterinstallment}
                  hasFeedback
                >
                  <Select
                    placeholder="กรุณาเลือกงวด"
                    onChange={(value) => {
                      onChangeinstallmentPayment(value);
                      checkinstallpayment(value);
                    }}
                  >
                    {Listinstallmentandinterestrate.map((item, index) => (
                      <Select.Option value={item.qty} key={index}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="unit-round">
                  <span>งวด</span>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <hr></hr>
        <div className="inputdatamoneyPuandNao">
          <Form form={form}>
            <div className="controlFormmoney">
              <label>อัตราดอกเบี้ย</label>
              <div className="Select-unit-installpaymentandinterestRate">
                <Form.Item
                  data-test="interestRate-ID"
                  name="startmoney"
                  validateStatus={validateStatusSelerterinterestrate}
                  help={helpFormSelecterinterestrate}
                  hasFeedback
                  className="controlheight"
                >
                  <Select
                    placeholder="กรุณาเลือกดอกเบี้ย"
                    onChange={onChangeinterestrate}
                  >
                    {interestrateCode?.map((item, index) => (
                      <Select.Option value={item.interestRate} key={index}>
                        {item.interestRate}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="unit-round-start">
                  <span>%ต่อปี</span>
                </div>
              </div>
            </div>

            <div>
              <label>ชำระงวดแรกวันที่</label>

              <Form.Item name="date">
                <ConfigProvider locale={locale}>
                  <DatePicker
                    value={lockedDate ? moment(lockedDate, "YYYY-MM-DD") : null}
                    placeholder="กรุณาเลือกวัน/เดือน/ปี"
                    className="iconcallender"
                    format="DD/MM/YYYY"
                    picker="year"
                    onFocus={(e) => e.target.blur()}
                    disabled
                  />
                </ConfigProvider>
              </Form.Item>
            </div>
          </Form>
          <Button
            data-test="reset-botton"
            type="link"
            className="reset"
            onClick={() => {
              handleReset();
              reestField();
            }}
          >
            <SyncOutlined
              style={{ fontSize: "22px", color: "#1F6734" }}
              className="iconspin"
            />
            รีเซ็ต
          </Button>
          <div>
            <Button
              data-test="submit-botton"
              loading={loadings[0]}
              onClick={() => {
                enterLoading(0);
                clickToCal();
              }}
              className="buttoncal"
              type="primary"
              htmlType="submit"
              ref={calculateButtonRef}
            >
              คำนวณ
            </Button>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="hengimg">
            <Image src="https://promotions.co.th/wp-content/uploads/2019/06/%E0%B9%80%E0%B8%AE%E0%B8%87%E0%B8%A5%E0%B8%B5%E0%B8%AA%E0%B8%8B%E0%B8%B4%E0%B9%88%E0%B8%872.jpg" />
          </div>
        }
      >
        {isFormCardVisible && (
          <Cardpricelist
            cardShow={cardShow}
            needMoney={needMoney}
            initialSlideIndex={initialSlideIndex}
            ContractTypeCode={ContractTypeCode}
            dateDayAmount={lockedDate}
            nowDay={nowDay}
          />
        )}
      </Suspense>
    </>
  );
};

function FromNANO() {
  return (
    <div>
      <HeadderPU />
      <div className="controlForm">
        <div className="FromHpPuandNano">
          <div>
            <SelectorPU />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FromNANO;

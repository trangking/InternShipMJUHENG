import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useContext,
} from "react";
import "../../styles/HengStyles.css";
import {
  Form,
  Select,
  InputNumber,
  Input,
  Button,
  DatePicker,
  Modal,
  ConfigProvider,
  Image,
} from "antd";
import useFuncition from "../Func/Fuunction";
import useFuncitionCal from "../Func/FuncitionCal";
import useValidateStaus from "../Func/Validate";
import { SyncOutlined } from "@ant-design/icons";
import { API } from "../../api/servicesApi";
import moment from "moment";
import "moment/locale/th";
import "../../styles/tableLoan.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import locale from "antd/es/locale/th_TH";
import { MyContext } from "../../State/ContextState";
import { MyContextType } from "../../State/ContextTypeCode";
dayjs.locale("th");
moment.locale("th");

const Cardpricelist = React.lazy(() => import("./CardShowPrice"));
const Popupmodeldeail = React.lazy(() => import("./Popupmodeldetail"));

const HeadderHp = () => {
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  let TitleHead = "";

  if (ContractTypeCode === "10") {
    TitleHead = (
      <>
        Personal Secured Loan(PL)
        <br />
        สินเชื่อส่วนบุคคล(มีหลักทรัพย์ค้ำประกัน)
      </>
    );
  } else if (ContractTypeCode === "01") {
    TitleHead = "Hire Purchase(HP) เช่าซื้อ/เงินกู้";
  }
  return (
    <div>
      <h1>คำนวณสินเชื่อ</h1>
      <h2>{TitleHead}</h2>
    </div>
  );
};
const SelectorHP = () => {
  const [initialSlideIndex, setinitialSlideIndex] = useState(0);
  const [loadings, setLoadings] = useState([]);
  const [form] = Form.useForm();
  const [cardShow, setcardShow] = useState([]);
  const [nowDay, setnowDay] = useState("");
  const [modal1Open, setModal1Open] = useState(false);
  const [lockedDate, setLockedDate] = useState("");
  const calculateButtonRef = useRef(null);
  const { ContractTypeCode, setContractTyperCode } = useContext(MyContextType);
  // const [resetCounter, setResetCounter] = useState(0);
  const {
    typecar,
    brand,
    brandID,
    model,
    caryear,
    modeldetail,
    price,
    fecthTypeproduct,
    onChangetypecar,
    onChangebrand,
    onChangemodel,
    onChangecaryear,
    onChangemodeldetail,
    canSelecterbrand,
    canSelectermodel,
    canSelectercaryear,
    canSelectermodeldetail,
    isLinkDisabled,
    isFormCardVisible,
    setIsFormCardVisible,
  } = useFuncition();
  const {
    needMoney,
    RegistrationCarYearID,
    Listinstallmentandinterestrate,
    interestrateCode,
    installmentPayment,
    index,
    sentInstallmentandinterestrate,
    validateStatus,
    helpForm,
    validateStatusSelerter,
    helpFormSelecter,
    validateStatusSelerterinstallment,
    helpFormSelecterinstallment,
    validateStatusSelerterinterestrate,
    helpFormSelecterinterestrate,
    canCalculate,
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
  } = useFuncitionCal();

  const { messageHelp, checkCal } = useValidateStaus();
  const changeDatatypecar = (value, brandID) => {
    if (value !== brandID) {
      form.setFieldValue("Car-brand", "กรุณาเลือกยี่ห้อรถ");
      form.setFieldValue("model-car", "กรุณาเลือกรุ่นรถ");
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const changeDatabrand = (value, brand) => {
    if (brand !== value) {
      form.setFieldValue("model-car", "กรุณาเลือกรุ่นรถ");
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const changeDatamodel = (value, model) => {
    if (model !== value) {
      form.setFieldValue("year", "กรุณาเลือกปีรถ");
      form.setFieldValue("model-detail", "กรุณาเลือกโฉมรถ");
      form.setFieldValue("exmple-price", "0");
      form.setFieldValue("manageable-amount", "0");
      form.setFieldValue("needmoney", "");
      form.setFieldValue("RegistrationCarYear", "กรุณาเลือกปีที่จดทะเบียนรถ");
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const showprice = () => {
    if (price && price[0] && price[0].PriceAmnt) {
      form.setFieldsValue({
        "exmple-price": price[0].PriceAmnt,
        "manageable-amount": price[0].PercentForLoanCalculate,
      });
    }
  };
  const checkDatainputNeedmoney = (value) => {
    if (price && price[0] && price[0].PercentForLoanCalculate) {
      setIsFormCardVisible(false);
      if (value > price[0].PercentForLoanCalculate) {
        form.setFieldsValue({
          needmoney: 0,
        });
      }
    } else {
      setIsFormCardVisible(true);
    }
  };

  const checkRegistrationCarYearID = (value) => {
    if (value !== RegistrationCarYearID) {
      form.setFieldValue("installmentPayment", "กรุณาเลือกงวด");
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const checkinstallmentPayment = async (value) => {
    if (value !== installmentPayment) {
      form.setFieldValue("startmoney", "กรุณาเลือกดอกเบี้ย");
    }
  };
  const clickToCal = async () => {
    try {
      const cardDataArray = [];
      let SentdataToApi = null;
      for (let i = 0; i < sentInstallmentandinterestrate.length; i++) {
        const value = sentInstallmentandinterestrate[i].installmentPayment;
        if (ContractTypeCode === "01") {
          SentdataToApi = await API.hengCalculateApi.calculateFLAT(
            needMoney,
            value,
            sentInstallmentandinterestrate[i].interestRate
          );
        } else {
          SentdataToApi = await API.hengCalculateApi.calculateEIR(
            lockedDate.format("YYYY-MM-DD"),
            nowDay,
            needMoney,
            value,
            sentInstallmentandinterestrate[i].interestRate
          );
        }
        const data = SentdataToApi;
        cardDataArray.push(data.data);
      }
      const initialSlideIndex = cardDataArray?.findIndex(
        (item) => item.period === index
      );
      setTimeout(() => {
        calculateButtonRef.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      setinitialSlideIndex(initialSlideIndex);
      setcardShow(cardDataArray);
      setIsFormCardVisible(true);
    } catch (err) {
      console.log(err);
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
        checkCal();
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 800);
  };
  const reestField = () => {
    form.resetFields();
  };
  useEffect(() => {
    fecthTypeproduct();
    dataListinstallmentandinsterrest();
    const currentdate = new Date().toLocaleDateString();
    const [month, day, year] = currentdate.split("/");
    const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    setnowDay(newDate);
  }, []);

  useEffect(() => {
    messageHelp();
  }, [messageHelp]);

  useEffect(() => {
    showprice();
  }, [price]);

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

  useEffect(() => {
    fetchDataAndConvert();
  }, [sentInstallmentandinterestrate]);
  return (
    <>
      <div className="controlinputdata">
        <div className="inputdata">
          <Form form={form}>
            <h3>ข้อมูลสินค้า</h3>
            <label>ประเภทรถ</label>
            <Form.Item
              data-test="typecar-ID"
              name="typecar"
              rules={[{ required: true, message: "กรุณาเลือกประเภทรถ" }]}
            >
              <Select
                data-test="scroll-dropdown"
                placeholder="กรุณาเลือกประเภทรถ"
                onChange={(value) => {
                  onChangetypecar(value);
                  changeDatatypecar(value);
                }}
              >
                {typecar.map((item, index) => (
                  <Select.Option value={item.AssetTypeID} key={index}>
                    {item.AssetTypeName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>ยี่ห้อรถ</label>
            <Form.Item data-test="brandcar-ID" name="Car-brand">
              <Select
                placeholder="กรุณาเลือกยี่ห้อรถ"
                onChange={(value) => {
                  onChangebrand(value);
                  changeDatabrand(value);
                }}
                disabled={!canSelecterbrand}
              >
                {brand.map((item, index) => (
                  <Select.Option value={item.BrandID} key={index}>
                    {item.BrandName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>รุ่นรถ</label>
            <Form.Item data-test="modelcar-ID" name="model-car">
              <Select
                placeholder="กรุณาเลือกรุ่นรถ"
                onChange={(value) => {
                  onChangemodel(value);
                  changeDatamodel(value);
                }}
                disabled={!canSelectermodel}
              >
                {model.map((item, index) => (
                  <Select.Option value={item.ModelHDID} key={index}>
                    {item.ModelName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>ปีรถ</label>
            <Form.Item data-test="caryear-ID" name="year">
              <Select
                placeholder="กรุณาเลือกปีรถ"
                onChange={onChangecaryear}
                disabled={!canSelectercaryear}
              >
                {caryear.map((item, index) => (
                  <Select.Option value={item.CarYear} key={index}>
                    {formatDate(item.CarYear)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label>โฉม</label>
            <Form.Item data-test="detailcar-ID" name="model-detail">
              <Select
                placeholder="กรุณาเลือกโฉมรถ"
                onChange={(value) => {
                  onChangemodeldetail(value);
                  showprice();
                }}
                disabled={!canSelectermodeldetail}
              >
                {modeldetail.map((item, index) => (
                  <Select.Option value={item.ModelDTID} key={index}>
                    {item.ModelDTName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              data-test="รายละเอียดสินค้า-Button"
              type="link"
              onClick={() => {
                setModal1Open(true);
              }}
              disabled={!isLinkDisabled}
              className=""
            >
              รายละเอียดสินค้า
            </Button>

            <Modal
              open={modal1Open}
              onCancel={() => setModal1Open(false)}
              centered
              width={1000}
            >
              <Suspense
                fallback={
                  <div className="hengimg">
                    <Image src="https://promotions.co.th/wp-content/uploads/2019/06/%E0%B9%80%E0%B8%AE%E0%B8%87%E0%B8%A5%E0%B8%B5%E0%B8%AA%E0%B8%8B%E0%B8%B4%E0%B9%88%E0%B8%872.jpg" />
                  </div>
                }
              >
                {price[0] && brandID && (
                  <Popupmodeldeail
                    BrandName={
                      brand.find((item) => item.BrandID === brandID)?.BrandName
                    }
                    price={price}
                    onReset={handleReset}
                    resetCounter={resetCounter}
                  />
                )}
              </Suspense>
            </Modal>
          </Form>
        </div>
        <div className="inputdatamoney">
          <Form form={form}>
            <label>ราคากลาง</label>
            <Form.Item name="exmple-price">
              <InputNumber
                value={price.PriceAmnt}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="บาท"
                disabled
              />
            </Form.Item>
            <label>ยอดที่จัดได้</label>
            <Form.Item name="manageable-amount">
              <InputNumber
                value={price.PercentForLoanCalculate}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                addonAfter="บาท"
                disabled
              />
            </Form.Item>
            <label>วงเงินที่ต้องการ</label>
            <Form.Item
              data-test="Needmoney-form"
              name="needmoney"
              className="controinputDisabled"
              validateStatus={validateStatus}
              help={helpForm}
              hasFeedback
            >
              <InputNumber
                placeholder="กรุณาระบุวงเงิน"
                value={needMoney}
                onChange={(value) => {
                  onChangeneedmoney(value);
                  checkDatainputNeedmoney(value);
                }}
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
            <label>ปีที่จดทะเบียนรถ</label>
            <div className="Select-unit-RegistionCarYear">
              <div className="unit-round-cardoc">
                <span>ปี(พ.ศ)</span>
              </div>
              <Form.Item
                data-test="CarYear-ID"
                name="RegistrationCarYear"
                validateStatus={validateStatusSelerter}
                help={helpFormSelecter}
                hasFeedback
              >
                <Select
                  placeholder="กรุณาเลือกปีที่จดทะเบียนรถ"
                  onChange={(value) => {
                    onChangeListinstallmentandinterestrate(value);
                    checkRegistrationCarYearID(value);
                  }}
                >
                  {generateOptions()}
                </Select>
              </Form.Item>
            </div>
            <label>ระยะเวลาการผ่อน</label>
            <div className="Select-unit-installpaymentandinterestRate">
              <Form.Item
                data-test="Payment-ID"
                name="installmentPayment"
                validateStatus={validateStatusSelerterinstallment}
                help={helpFormSelecterinstallment}
                hasFeedback
                className="controlheight"
              >
                <Select
                  placeholder="กรุณาเลือกงวด"
                  onChange={(value) => {
                    onChangeinstallmentPayment(value);
                    checkinstallmentPayment(value);
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
                  onChange={(value) => {
                    onChangeinterestrate(value);
                  }}
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
              disabled={!canCalculate}
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
            index={index}
            dateDayAmount={lockedDate}
            nowDay = {nowDay}
          />
        )}
      </Suspense>
    </>
  );
};

function FromPriceListCar() {
  return (
    <div>
      <HeadderHp />
      <div className="controlForm">
        <div className="FromHp">
          <div>
            <SelectorHP />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FromPriceListCar;

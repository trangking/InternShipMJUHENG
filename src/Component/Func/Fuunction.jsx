import { useContext, useEffect, useRef } from "react";
import { Form } from "antd";
import { API } from "../../api/servicesApi";
import { MyContext } from "../../State/ContextState";

const useFuncition = () => {
  const { typecar, settypercar } = useContext(MyContext);
  const { brand, setbrand } = useContext(MyContext);
  const { model, setmodel } = useContext(MyContext);
  const { caryear, setcaryear } = useContext(MyContext);
  const { modeldetail, setmodeldetail } = useContext(MyContext);
  const { price, setprice } = useContext(MyContext);
  const { isFormCardVisible, setIsFormCardVisible } = useContext(MyContext);
  const { typecarID, settypecarID } = useContext(MyContext);
  const { brandID, setbrandID } = useContext(MyContext);
  const { modelID, setmodelID } = useContext(MyContext);
  const { caryearID, setcaryearID } = useContext(MyContext);
  const { BrandCode, setBrandCode } = useContext(MyContext);
  const { canSelecterbrand, setcanSelecterbrand } = useContext(MyContext);
  const { canSelectermodel, setcanSelectermodel } = useContext(MyContext);
  const { canSelectercaryear, setcanSelectercaryear } = useContext(MyContext);
  const { canSelectermodeldetail, setcanSelectermodeldetail } =
    useContext(MyContext);
  const { isLinkDisabled, setIsLinkDisabled } = useContext(MyContext);
  const fecthTypeproduct = async () => {
    try {
      const res = await API.requeslist.fecthTypeproduct();
      settypercar(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangetypecar = async (value) => {
    try {
      const data = await API.requeslist.getBrand(value);
      await settypecarID(value);
      setbrand(data.data);
      if (value !== brandID) {
        setmodel([]);
        setcaryear([]);
        setmodeldetail([]);
        setprice([]);
      }
      if (typecarID !== value) {
        setcanSelecterbrand(true);
        setcanSelectermodel(false);
        setcanSelectercaryear(false);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangebrand = async (value) => {
    try {
      const data = await API.requeslist.getModel(typecarID, value);
      setbrandID(value);
      await setmodel(data.data);
      if (brandID !== value) {
        setcanSelectermodel(true);
        setcanSelectercaryear(false);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangemodel = async (value) => {
    try {
      const data = await API.requeslist.getYear(typecarID, brandID, value);
      await setcaryear(data.data);
      setmodelID(value);
      setBrandCode(model[0].BnCode);
      if (modelID !== value) {
        setcanSelectercaryear(true);
        setcanSelectermodeldetail(false);
        setIsLinkDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangecaryear = async (value) => {
    try {
      const data = await API.requeslist.getModeldetail(
        typecarID,
        brandID,
        modelID,
        value
      );
      await setmodeldetail(data.data);
      setcaryearID(value);
      if (caryearID !== undefined) {
        setcanSelectermodeldetail(true);
        setIsLinkDisabled(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onChangemodeldetail = async (value) => {
    try {
      const data = await API.requeslist.getPriceList(
        typecarID,
        brandID,
        modelID,
        caryearID,
        value
      );
      await setprice(data.data);
      checkDisableLink();
    } catch (error) {
      console.log(error);
    }
  };
  const checkDisableLink = () => {
    if (modeldetail == []) {
      setIsLinkDisabled(false);
    } else {
      setIsLinkDisabled(true);
    }
  };
  return {
    typecar,
    brand,
    brandID,
    BrandCode,
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
    setcanSelecterbrand,
    setcanSelectermodel,
    setcanSelectercaryear,
    setcanSelectermodeldetail,
    settypecarID,
  };
};

export default useFuncition;

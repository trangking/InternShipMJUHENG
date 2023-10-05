import axios from "../axiosList";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fecthTypeproduct() {
    return axios.get(`/api/AssetTypes/Active`);
  },
  getBrand(value) {
    return axios.get(`/api/Brands?assetTypeID=${value}`);
  },
  getModel(typecarID, value) {
    return axios.get(
      `/api/PriceLists/Models?assetTypeID=${typecarID}&brandID=${value}`
    );
  },
  getYear(typecarID, brandID, value) {
    return axios.get(
      `/api/PriceLists/CarYear?assetTypeID=${typecarID}&brandID=${brandID}&modelID=${value}`
    );
  },
  getModeldetail(typecarID, brandID, modelID, value) {
    return axios.get(
      `/api/PriceLists/ModelDetails?assetTypeID=${typecarID}&brandID=${brandID}&modelID=${modelID}&carYear=${value}`
    );
    // return axios.get(`/api/PriceLists/ModelDetails?assetTypeID=2&brandID=136&modelID=1082&carYear=2020`)
  },
  getPriceList(typecarID, brandID, modelID, caryearID, value) {
    return axios.get(
      `/api/PriceLists/PriceListDetails?assetTypeID=${typecarID}&brandID=${brandID}&modelID=${modelID}&carYear=${caryearID}&modelDetail=${value}`
    );
  },
  getImages(price) {
    return axios.get(
      `api/Models/${price[0].ModelHDID}/Details/${price[0].ModelDTID}/Images`
    );
  },
};

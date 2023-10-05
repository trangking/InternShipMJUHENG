import { Image } from "antd";
import "../../styles/HengStyles.css";
import React, { useEffect, useState } from "react";
import { API } from "../../api/servicesApi";
import "photoswipe/dist/photoswipe.css";
import { Gallery } from "react-photoswipe-gallery";
import Grid from "@mui/material/Grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/swiper.css";

export default function Popupmodeldeail({
  BrandName,
  price,
  onReset,
  resetCounter,
}) {
  const [arrImages, setarrImages] = useState([]);
  const fecthImages = async () => {
    try {
      const data = await API.requeslist.getImages(price);
      setarrImages(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const thaiYear = price[0].CarYear + 543;
  const formatCurrency = (value) => {
    const formattedValue = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
    return formattedValue.replace(/\.00$/, ""); // Remove .00 if it's at the end
  };
  useEffect(() => {
    fecthImages();
  }, [resetCounter]);

  return (
    <>
      <div className="popup">
        <div className="popupleft">
          <div className="HeadModeldetail">
            <h1>{BrandName}</h1>
            <h2>{price[0].ModelName}</h2>
            <div className="popopswiper">
              <div className="popup">
                <Grid
                  container
                  spacing={2}
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  {arrImages.map((item, index) => (
                    <Gallery key={index}>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Image
                          src={`http://192.170.3.10/allaccess/CAR_MODEL/${item.ImagePath}`}
                        />
                      </Grid>
                    </Gallery>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
        <div className="popupright">
          <h3>รายละเอียดสินค้า</h3>
          <hr color="#D1D1D1" />
          <div className="detail">
            <h5>รุ่น/โฉม</h5>
            <div>
              <p>{price[0].ModelDetailName}</p>
            </div>
            <div className="priceShow">
              <div className="carprice">
                <p>
                  ปี (พ.ศ.) <br />
                  <span> {thaiYear}</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  ราคา <br />
                  <span> {formatCurrency(price[0].PriceAmnt)}</span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  %LTV <br />
                  <span>
                    {" "}
                    {parseFloat(price[0].PercentForLoan).toFixed(2)}%
                  </span>
                </p>
              </div>
              <div className="carprice">
                <p>
                  ยอดที่จัดได้ <br />
                  <span>
                    {" "}
                    {formatCurrency(price[0].PercentForLoanCalculate)}
                  </span>
                </p>
              </div>
            </div>
            <h5>คำอธิบาย</h5>
            <p className="descriptiondetail">
              {price[0].Description.split("\r\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>

            <h5>รายละเอียดรถ</h5>
            <p>-</p>
          </div>
        </div>
      </div>
    </>
  );
}

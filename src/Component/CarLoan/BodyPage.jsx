import Navbar from "../Navbar";
import FromPriceListCar from "./PriceListCar";
import MyProvider from "../../State/ContextState";
import MyProvidercal from "../../State/ContextStateCal";
import MyProviderType from "../../State/ContextTypeCode";
export default function Carloans() {
  return (
    <MyProvider>
      <MyProvidercal>
        <MyProviderType>
          <div>
            <Navbar />
            <FromPriceListCar />
          </div>
        </MyProviderType>
      </MyProvidercal>
    </MyProvider>
  );
}

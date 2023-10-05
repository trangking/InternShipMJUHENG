import Navbar from "../Navbar";
import FromNANO from "./InputDatapersonel";
import MyProvider from "../../State/ContextState";
import MyProvidercal from "../../State/ContextStateCal";
import MyProviderType from "../../State/ContextTypeCode";
export default function PersonalLoan() {
  return (
    <MyProvider>
      <MyProvidercal>
        <MyProviderType>
          <div>
            <Navbar />
            <FromNANO />
          </div>
        </MyProviderType>
      </MyProvidercal>
    </MyProvider>
  );
}

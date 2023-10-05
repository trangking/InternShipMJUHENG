import "./App.css";
import React from "react";
import NavBar from "./Component/Navbar";
import MenuCalculate from "./Component/MenuCalculate";
import MyProvider from "./State/ContextState";
import MyProvidercal from "./State/ContextStateCal";
import MyProviderType from "./State/ContextTypeCode";

function App() {
  return (
    <MyProvider>
      <MyProvidercal>
        <MyProviderType>
          <div className="App">
            <div>
              <NavBar />
              <MenuCalculate />
            </div>
          </div>
        </MyProviderType>
      </MyProvidercal>
    </MyProvider>
  );
}

export default App;

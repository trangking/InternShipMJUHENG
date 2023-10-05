import React, { createContext, useEffect, useState } from "react";

export const MyContextType = createContext();

const MyProviderType = ({ children }) => {
  const [ContractTypeCode, setContractTyperCode] = useState(
    localStorage.getItem("contractTypeCode") || null
  );
  useEffect(() => {
    if (ContractTypeCode !== null) {
      localStorage.setItem("contractTypeCode", ContractTypeCode);
    }
  }, [ContractTypeCode]);

  return (
    <MyContextType.Provider value={{ ContractTypeCode, setContractTyperCode }}>
      {children}
    </MyContextType.Provider>
  );
};

export default MyProviderType;

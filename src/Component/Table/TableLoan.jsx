import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { API } from "../../api/servicesApi";
import "../../styles/tableLoan.css";

const TableListPeriods = ({ Period }) => {
  const [vaLue, setValue] = useState([]);
  const [isopenColumEIR, setisopenColumEIR] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return `${date.toLocaleDateString("th-TH", options)} `;
  };

  const formatCurrency = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  const showTable = async () => {
    let ContractToAPi = "";
    try {
      if (Period.ContractTypeCode === "01") {
        ContractToAPi = await API.hengCalculateApi.calculateTableFLAT(Period);
        setisopenColumEIR(false);
      } else {
        ContractToAPi = await API.hengCalculateApi.calculateTableEIR(Period);
        setisopenColumEIR(true);
      }
      const data = ContractToAPi;

      setValue(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showTable();
  }, [Period]);

  return (
    <>
      <div className="headTable">
        <hr></hr>
        <p>ตารางภาระหนี้</p>
        <hr></hr>
      </div>
      <div className="tableLoan">
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="controltable" align="center">
                <TableCell align="center">งวดที่</TableCell>
                <TableCell align="center">วันครบกำหนดชำระ</TableCell>
                <TableCell align="center">ค่างวด</TableCell>
                {isopenColumEIR && (
                  <>
                    <TableCell align="center">เงินนต้นที่ต้องชำระ</TableCell>
                    <TableCell align="center">ชำระเงินต้น</TableCell>
                    <TableCell align="center">ดอกเบี้ย</TableCell>
                    <TableCell align="center">เงินต้นคงเหลือ</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {vaLue.map((item, index) => (
                <TableRow
                  className="controltablecell"
                  key={item.period}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f2f2f2",
                  }}
                >
                  <TableCell align="center">{item.period}</TableCell>
                  <TableCell align="center">
                    {isopenColumEIR && item
                      ? formatDate(item.payDate)
                      : item
                      ? formatDate(item.dueDate)
                      : null}
                  </TableCell>
                  <TableCell align="center">
                    {isopenColumEIR && item
                      ? formatCurrency(item.payInstallment)
                      : item
                      ? formatCurrency(item.installmentAmount)
                      : null}
                  </TableCell>
                  {isopenColumEIR && (
                    <>
                      <TableCell align="center">
                        {item ? formatCurrency(item.bringForward) : null}
                      </TableCell>
                      <TableCell align="center">
                        {item ? formatCurrency(item.payPrincipal) : null}
                      </TableCell>
                      <TableCell align="center">
                        {item ? formatCurrency(item.payInterest) : null}
                      </TableCell>
                      <TableCell align="center">
                        {item ? formatCurrency(item.principalBalance) : null}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TableListPeriods;

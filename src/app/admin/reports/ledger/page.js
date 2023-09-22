"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import ReportsTable from "@/components/admin/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import Breadcrumbs from "@/components/page/breadcrumb";
import print from "print-js";

const Ledger = () => {


  // local state
  const [datas, setDatas] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  // table to PDF
  const printTableToPDF = () => {
    const tableId = "table-to-print";
    printJS({
      printable: tableId,
      type: "html",
      style:
        "Td { border: 1px solid #D1D5DB !important;} Th { border: 1px solid #D1D5DB !important;}",
    });
  };

  // const datas = [
  //   {
  //     Amount: 253.55,
  //     DebitCreditFlag: "D",
  //     Narration:
  //       "CDSL DP Bill for Sep 2022  (Including Monthly AMC) and (Including Pending Monthly AMC charges for the period from February 2022 to August 2022) for demat account no. 1204470013879162",
  //     VoucherDate: 20221002,
  //     VoucherNumber: 24748092,
  //   },
  //   {
  //     Amount: 10736.78,
  //     DebitCreditFlag: "D",
  //     Narration: "FO BILL FOR ",
  //     VoucherDate: 20221003,
  //     VoucherNumber: 12360,
  //   },
  // ];

  const ids = [{ Reports: "/admin/reports" }, { Ledger: "" }];

  const columns = ["Voucher Date", "Voucher Number", "Narration", "Debit/ Credit", "Amount ₹"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchLedger = async () => {
      if (reportType === "Market") { // Live market data endpoint
        console.log('market')
        const response = await handleLiveReportsFetch(
          "ledger",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        // setDatas(response);
      }
      else if (reportType === "Post") { // DB data endpoint
        console.log('post')
        const response = await handleDbReportsFetch(
          "ledger",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        setDatas(response);
      }
      else {
        setDatas([])
      }
    };
    fetchLedger();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className=" flex justify-between">
        <div>
          <Breadcrumbs len={ids.length} ids={ids} />
        </div>
        <div className="flex justify-end space-x-2">
          <div className="relative">
            <FilterComponent props={'ledger'} />
          </div>
          <div>
            <ExportRow
              printTableToPDF={() => {
                printTableToPDF();
              }}
              data={datas}
            />
          </div>
        </div>
      </div>
      <div>
        <FilteredData />
      </div>
      <div className="overflow-auto">
        <div id="table-to-print">
          <ReportsTable columns={columns} datas={datas} />
        </div>
      </div>
    </div>
  );
};

export default Ledger;

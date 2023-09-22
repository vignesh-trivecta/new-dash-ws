"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import ReportsTable from "@/components/admin/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import print from "print-js";
import Breadcrumbs from "@/components/page/breadcrumb";
import { usePathname } from "next/navigation";
import { setPath } from "@/store/reportSlice";

const Holdings = () => {

  // local state
  const [tableData, setTableData] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  console.log(startDate, endDate)

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

  
  const ids = [{ Reports: "/admin/reports" }, { Holdings: "" }];

  const columns = ["Script", "Exchange", "Quantity", "Current Price ₹", "Current Value ₹", "% Change"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchHoldings = async () => {
      if (reportType === "Market") { // Live market data endpoint
        console.log('market')
        const response = await handleLiveReportsFetch(
          "holdings",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        // setData(response);
      }
      else if (reportType === "Post") { // DB data endpoint
        console.log('post')
        const response = await handleDbReportsFetch(
          "holdings",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        setTableData(response);
      }
      else {
        setTableData([])
      }
    };
    fetchHoldings();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className="flex justify-between">
        <div>
          <Breadcrumbs len={2} ids={ids} />
        </div>
        <div className="flex justify-end space-x-2">
          <div className="">
            <FilterComponent props={'holdings'} />
          </div>
          <div>
            <ExportRow
              printTableToPDF={() => {
                printTableToPDF();
              }}
              data={tableData}
            />
          </div>
        </div>
      </div>
      <div>
        <FilteredData />
      </div>
      <div className="overflow-auto">
        <div id="table-to-print">
          <ReportsTable columns={columns} datas={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Holdings;

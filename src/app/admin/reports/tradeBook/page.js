"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import ReportsTable from "@/components/admin/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import tradeDataParser from "@/utils/tradeDataParser";

const TradeBook = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { "Trade Book": "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Trade Time", "Script", "Quantity", "Rate ₹"]
  const pdfColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Trade Time", "Script", "Quantity", "Rate"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchTradeBook = async () => {
      if (reportType === "Market") { // Live market data endpoint
        console.log("Live market")
        const response = await handleLiveReportsFetch(
          "tradebook",
          customerId,
          startDate,
          endDate
        );

        const { mainDatas, tooltipDatas} = tradeDataParser(response);
        setTableData(mainDatas);
        setTooltipData(tooltipDatas);
      }
      else if (reportType === "Post") { // DB data endpoint
        console.log("Post market")
        const response = await handleDbReportsFetch(
          "tradebook",
          customerId,
          startDate,
          endDate
        )
        console.log(response)
        const { mainDatas, tooltipDatas} = tradeDataParser(response);
        setTableData(mainDatas);
        setTooltipData(tooltipDatas);
      }
      else {
        setTableData([])
      }
    };
    fetchTradeBook();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className=" flex justify-between">
        <div>
          <Breadcrumbs 
            len={ids.length} 
            ids={ids} 
          />
        </div>
        <div className="flex justify-end space-x-2">
          <div>
            <ExportRow
              data={tableData}
              columns={excelColumns}
              pdfColumns={pdfColumns}
              fileName={'ledger'}
            />
          </div>
          <div className="relative">
            <FilterComponent 
              props={'tradebook'} 
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <FilteredData />
        </div>
        <div className="overflow-auto">
          <div>
            <ReportsTable 
              columns={excelColumns} 
              datas={tableData} 
              tooltipData={tooltipData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeBook;

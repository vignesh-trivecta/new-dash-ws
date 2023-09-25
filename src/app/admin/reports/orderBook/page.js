"use client";

import React, { useState, useEffect } from "react";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// excel
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import ReportsTable from "@/components/admin/reportsTable";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import Breadcrumbs from "@/components/page/breadcrumb";
import print from "print-js";
import orderDataParser from "@/utils/orderDataParser";

const OrderBook = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);
  // const [datas, setDatas] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  // const tableRef = useRef(null); // excel

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

  const ids = [{ Reports: "/admin/reports" }, { "Order Book": "" }];

  const columns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Order Time", "Script", "Quantity", "Rate ₹", "Order Status", "Market/ Limit"];

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchOrderBook = async () => {
      if (reportType === "Market") { // Live market data endpoint
        console.log('market')
        const response = await handleLiveReportsFetch(
          "orderbook",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        // setDatas(response);

        const { mainDatas, tooltipDatas} = orderDataParser(response);
        console.log(tooltipDatas)
        setTableData(mainDatas);
        setTooltipData(tooltipDatas);

      }
      else if (reportType === "Post") { // DB data endpoint
        console.log('post')
        const response = await handleDbReportsFetch(
          "orderbook",
          customerId,
          startDate,
          endDate
        );

        const { mainDatas, tooltipDatas} = orderDataParser(response);
        setTableData(mainDatas);
        setTooltipData(tooltipDatas);
      }
      else {
        setTableData([])
      }
    };
    fetchOrderBook();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className="flex justify-between">
        <div>
          <Breadcrumbs 
            len={ids.length} 
            ids={ids} 
          />
        </div>
        <div className="flex justify-end space-x-2">
          <div className="relative">
            <FilterComponent 
              props={'orderbook'} 
            />
          </div>
          <div>
            <ExportRow
              printTableToPDF={() => {
                printTableToPDF();
              }}
              data={tableData}
              columns={columns}
              fileName={'orderBook'}
            />
          </div>
        </div>
      </div>
      <div id="table-to-print">
        <div>
          <FilteredData 
            len={ids.length} 
            ids={ids} 
          />
        </div>
        <div className="overflow-auto">
          <div>
            <ReportsTable 
              columns={columns} 
              datas={tableData} 
              tooltipData={tooltipData} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderBook;



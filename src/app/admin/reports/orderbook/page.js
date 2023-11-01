"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import orderDataParser from "@/utils/formatter/orderDataParser";
import OrderBookTable from "@/components/admin/reportTables/orderbookTable";

const OrderBook = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);
  // const [datas, setDatas] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { "Order Book": "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Order Time", "Scripts", "Quantity", "Rate ₹", "Order Status", "Market/ Limit"];
  const pdfColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Order Time", "Scripts", "Quantity", "Rate", "Order Status", "Market/ Limit"];

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

        console.log(response)

        const { mainDatas, tooltipDatas} = orderDataParser(response.orderbook);
        setTableData(mainDatas);
        setTooltipData(tooltipDatas);

      }
      else if (reportType === "Post") { // DB data endpoint
        const response = await handleDbReportsFetch(
          "orderbook",
          customerId,
          startDate,
          endDate
        );
        if (response !== 404 || response !== "Failed to fetch") {
          const { mainDatas, tooltipDatas} = orderDataParser(response);
          setTableData(mainDatas);
          setTooltipData(tooltipDatas);
        }
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
          <div>
            <ExportRow
              data={tableData}
              columns={excelColumns}
              pdfColumns={pdfColumns}
              fileName={'orderbook'}
            />
          </div>
          <div className="relative">
            <FilterComponent 
              props={'orderbook'} 
            />
          </div>
        </div>
      </div>
      <div>
        <div>
          <FilteredData 
            len={ids.length} 
            ids={ids} 
          />
        </div>
        <div className="overflow-auto">
          <div>
            <OrderBookTable 
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



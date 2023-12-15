"use client";

import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import orderDataParser from "@/utils/formatter/orderDataParser";
import OrderBookTable from "@/components/admin/reportTables/orderbookTable";
import { setMessage, setStatus } from "@/store/reportSlice";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const OrderBook = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);

  // redux
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const broker = useSelector((state) => state.report.broker);
  const toggle = useSelector((state) => state.report.toggle);
  const status = useSelector((state) => state.report.status);
  const message = useSelector((state) => state.report.message);

  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { "Order Book": "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Order Time", "Scripts", "Quantity", "Rate ₹", "Order Status", "Market/ Limit"];
  const pdfColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Order Time", "Scripts", "Quantity", "Rate", "Order Status", "Market/ Limit"];
  
  const fetchOrderBook = async () => {

    setShimmerLoading(true);
    dispatch(setMessage(""));
    
    // Introduce a loading timer of 2 seconds (you can adjust the duration as needed)
    const loadingTimer = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000); // 3000 milliseconds = 3 seconds
    });

    await loadingTimer; // Wait for the loading timer to complete

    if (reportType === "Market") { // Live market data endpoint
      const {status, responseJson} = await handleLiveReportsFetch(
        "orderbook",
        customerId,
        startDate,
        endDate,
        broker
      );

      console.log({status, responseJson});

      const { mainDatas, tooltipDatas} = orderDataParser(responseJson.orderbook);
      setTableData(mainDatas);
      setTooltipData(tooltipDatas);
      dispatch(setStatus(status === 200 ? true : false));
      dispatch(setMessage(responseJson.message));
    }
    else if (reportType === "Post") { // DB data endpoint
      const {status, responseJson} = await handleDbReportsFetch(
        "orderbook",
        customerId,
        startDate,
        endDate,
        broker
      )
      
      const { mainDatas, tooltipDatas} = orderDataParser(responseJson);
      setTableData(mainDatas);
      setTooltipData(tooltipDatas);
      dispatch(setStatus(status === 200 ? true : false));
      if (status === 200) {
        dispatch(setMessage("Success"));
      } else if (status === 404) {
        dispatch(setMessage("No data available"));
      }
      else if (status === 500) {
        dispatch(setMessage("Internal Server Error"));
      }
    }
    else {
      setTableData([])
    }

    setShimmerLoading(false);

  };

  // useEffect to fetch table data from backend
  useEffect(() => {
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
            <FilterComponent />
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
              shimmerLoading={shimmerLoading}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-96">
        {
          message 
          ? 
          <Alert
            color={status ? "success" : "warning"}
            rounded
            className="h-12"
            icon={status ? IoCheckmarkDoneCircle : HiInformationCircle}
          >
            <span className="w-4 h-4">{message}</span>
          </Alert>
          : ""
        }
      </div>
    </div>
  );
};

export default OrderBook;



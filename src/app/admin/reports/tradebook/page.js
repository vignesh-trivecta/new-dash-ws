"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import tradeDataParser from "@/utils/formatter/tradeDataParser";
import TradeBookTable from "@/components/admin/reportTables/tradebookTable";
import { setMessage, setStatus } from "@/store/reportSlice";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const TradeBook = () => {

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
  const ids = [{ Reports: "/admin/reports" }, { "Trade Book": "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Trade Time", "Scripts", "Quantity", "Rate ₹"]
  const pdfColumns = ["Remote Order ID", "Exchange", "Buy/ Sell", "Exchange Trade Time", "Scripts", "Quantity", "Rate"]

  // function the fetch the data
  const fetchTradeBook = async () => {

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
        "tradebook",
        customerId,
        startDate,
        endDate,
        broker
      );

      const { mainDatas, tooltipDatas} = tradeDataParser(responseJson.tradeBook);
      setTableData(mainDatas);
      setTooltipData(tooltipDatas);
      dispatch(setStatus(status === 200 ? true : false));
      dispatch(setMessage(responseJson.message));
    }
    else if (reportType === "Post") { // DB data endpoint
      const {status, responseJson} = await handleDbReportsFetch(
        "tradebook",
        customerId,
        startDate,
        endDate,
        broker
      )

      const { mainDatas, tooltipDatas} = tradeDataParser(responseJson);
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
              fileName={'tradebook'}
            />
          </div>
          <div className="relative">
            <FilterComponent />
          </div>
        </div>
      </div>
      <div>
        <div>
          <FilteredData />
        </div>
        <div className="overflow-auto">
          <div>
            <TradeBookTable 
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

export default TradeBook;

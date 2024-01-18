"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDbReportsFetch,
  handleLiveReportsFetch,
} from "@/app/api/reports/route";
import ReportsTable from "@/components/admin/table/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import HoldingTable from "@/components/admin/reportTables/holdingTable";
import { setMessage, setStatus } from "@/store/reportSlice";
import { Alert } from "flowbite-react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { HiInformationCircle } from "react-icons/hi";

const Holding = () => {

  // local state
  const [tableData, setTableData] = useState([]);
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
  const ids = [{ Reports: "/admin/reports" }, { Holding: "" }];

  // column/header data for excel and pdf
  const excelColumns = [ 'Script', 'Script Type', 'Quantity', 'Current Value ₹', 'Date' ];
  const pdfColumns = [ 'Script', 'Script Type', 'Quantity', 'Current Value', 'Date' ];

  // function the fetch the data
  const fetchHolding = async () => {

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
      const {status, data} = await handleLiveReportsFetch(
        "holding",
        customerId,
        startDate,
        endDate,
        broker
      );
      // setData(response);
      dispatch(setStatus(status === 200 ? true : false));
      setTableData(data.holding);
      dispatch(setMessage(data.message));
    }
    else if (reportType === "Post") { // DB data endpoint
      const {status, data} = await handleDbReportsFetch(
        "holding",
        customerId,
        startDate,
        endDate,
        broker
      );
      setTableData(data ?? []);
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
    fetchHolding();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className="flex justify-between">
        <div>
          <Breadcrumbs 
            len={2} 
            ids={ids} 
          />
        </div>
        <div className="flex justify-end space-x-2">
          <div>
            <ExportRow
              data={tableData}
              columns={excelColumns}
              pdfColumns={pdfColumns}
              fileName={'holding'}
            />
          </div>
          <div className="">
            <FilterComponent />
          </div>
        </div>
      </div>
      <div id="table-to-print">
        <div>
          <FilteredData />
        </div>
        <div className="overflow-auto">
          <div >
            <HoldingTable
              datas={tableData} 
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

export default Holding;

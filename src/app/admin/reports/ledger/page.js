"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import LedgerTable from "@/components/admin/reportTables/LedgerTable";
import { setMessage, setStatus } from "@/store/reportSlice";
import { Alert } from "flowbite-react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { HiInformationCircle } from "react-icons/hi";

const Ledger = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);

  // redux
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);
  const broker = useSelector((state) => state.report.broker);
  const status = useSelector((state) => state.report.status);
  const message = useSelector((state) => state.report.message);

  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { Ledger: "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Voucher Date", "Voucher Number", "Narration", "Debit/ Credit", "Amount ₹"]
  const pdfColumns = ["Voucher Date", "Voucher Number", "Narration", "Debit/ Credit", "Amount"]

  // function the fetch the data
  const fetchData = async () => {

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
        "ledger",
        customerId,
        startDate,
        endDate,
        broker
      );
      dispatch(setStatus(status === 200 ? true : false));
      setTableData(responseJson.ledger);
      dispatch(setMessage(responseJson.message));
    }
    else if (reportType === "Post") { // DB data endpoint
      const {status, responseJson} = await handleDbReportsFetch(
        "ledger",
        customerId,
        startDate,
        endDate,
        broker
      );
      setTableData(responseJson ?? []);
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
    fetchData();
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
            <FilterComponent />
          </div>
        </div>
      </div>
      <div id="table-to-print">
        <div>
          <FilteredData />
        </div>
        <div className="overflow-auto">
          <div>
            <LedgerTable 
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

export default Ledger;

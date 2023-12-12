"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const Holding = () => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const broker = useSelector((state) => state.report.broker);
  const toggle = useSelector((state) => state.report.toggle);

  
  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { Holding: "" }];

  // column/header data for excel and pdf
  const excelColumns = [ 'Script', 'Script Type', 'Quantity', 'Current Value ₹', 'Date' ];
  const pdfColumns = [ 'Script', 'Script Type', 'Quantity', 'Current Value', 'Date' ];

  // function the fetch the data
  const fetchHolding = async () => {

    setShimmerLoading(true);

    // Introduce a loading timer of 2 seconds (you can adjust the duration as needed)
    const loadingTimer = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000); // 3000 milliseconds = 3 seconds
    });

    await loadingTimer; // Wait for the loading timer to complete

    if (reportType === "Market") { // Live market data endpoint
      const response = await handleLiveReportsFetch(
        "holding",
        customerId,
        startDate,
        endDate,
        broker
      );
      // setData(response);
      setTableData(response.holding);
    }
    else if (reportType === "Post") { // DB data endpoint
      const response = await handleDbReportsFetch(
        "holding",
        customerId,
        startDate,
        endDate
      );
      setTableData(response);
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
    </div>
  );
};

export default Holding;

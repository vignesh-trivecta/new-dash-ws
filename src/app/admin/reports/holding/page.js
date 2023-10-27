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

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  console.log(reportType)
  
  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { Holding: "" }];

  // column/header data for excel and pdf
  const columns = [ 'Script', 'Script Type', 'Quantity', 'Current Value ₹', 'Date' ];

  // useEffect to fetch table data from backend
  useEffect(() => {
    console.log("enter")
    const fetchHolding = async () => {

      if (reportType === "Market") { // Live market data endpoint
        const response = await handleLiveReportsFetch(
          "holding",
          customerId,
          startDate,
          endDate
        );
        // setData(response);
        console.log(response.holding)
        setTableData(response.holding);
      }
      else if (reportType === "Post") { // DB data endpoint
        console.log("enter")
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
    };
    fetchHolding();
  }, [toggle]);

  console.log(tableData)

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
              columns={columns}
              pdfColumns={columns}
              fileName={'holding'}
            />
          </div>
          <div className="">
            <FilterComponent 
              props={'holding'} 
            />
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
              columns={columns} 
              datas={tableData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holding;

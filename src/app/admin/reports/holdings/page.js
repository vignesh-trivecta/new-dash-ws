"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import ReportsTable from "@/components/admin/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";

const Holdings = () => {

  // local state
  const [tableData, setTableData] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);
  
  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { Holdings: "" }];

  // column/header data for excel and pdf
  const columns = ["Script", "Exchange", "Quantity", "Current Price", "Current Value", "% Change"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchHoldings = async () => {
      if (reportType === "Market") { // Live market data endpoint
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
        const response = await handleDbReportsFetch(
          "holdings",
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
    fetchHoldings();
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
              columns={columns}
              pdfColumns={columns}
              fileName={'holdings'}
            />
          </div>
          <div className="">
            <FilterComponent 
              props={'holdings'} 
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
            <ReportsTable 
              columns={columns} 
              datas={tableData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;

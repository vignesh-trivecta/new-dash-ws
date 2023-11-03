"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import MarginTable from "@/components/admin/reportTables/marginTable";

const Margin = () => {

  // local state
  const [tableData, setTableData] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { Margin: "" }];

  // column/header data for excel and pdf
  const excelColumns = ["Adjusted Ledger Balance ₹", "Gross Holding Value ₹", "Gross Margin ₹", "Available Margin ₹"];
  const pdfColumns = ["Adjusted Ledger Balance", "Gross Holding Value", "Gross Margin", "Available Margin"];

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchMargin = async () => {
      if (reportType === "Market") { // Live market data endpoint
        const response = await handleLiveReportsFetch(
          "margin",
          customerId,
          startDate,
          endDate
        );
        setTableData(response.margin);
      }
      else if (reportType === "Post") { // DB data endpoint
        const response = await handleDbReportsFetch(
          "margin",
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
    fetchMargin();
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
              fileName={'margin'}
            />
          </div>
          <div className="relative">
            <FilterComponent 
              props={'margin'} 
            />
          </div>
        </div>
      </div>
      <div id="table-to-print">
        <div>
          <FilteredData />
        </div>
        <div className="overflow-auto">
          <div>
            <MarginTable 
              datas={tableData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Margin;

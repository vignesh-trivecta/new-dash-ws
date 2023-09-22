"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch } from "@/app/api/reports/route";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import ReportsTable from "@/components/admin/reportsTable";
import print from "print-js";
import FilteredData from "@/components/admin/filteredData";
import Breadcrumbs from "@/components/page/breadcrumb";

const Margin = () => {

  // local state
  const [datas, setDatas] = useState([]);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);

  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

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

  const ids = [{ Reports: "/admin/reports" }, { Margin: "" }];

  const columns = ["Adjusted Ledger Balance ₹", "Gross Holding Value ₹", "Gross Margin ₹", "Available Margin ₹"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchMargin = async () => {
      if (reportType === "Market") { // Live market data endpoint
        console.log('market')
        const response = await handleLiveReportsFetch(
          "margin",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        // setDatas(response);
      }
      else if (reportType === "Post") { // DB data endpoint
        console.log('post')
        const response = await handleDbReportsFetch(
          "margin",
          customerId,
          startDate,
          endDate
        );
        console.log(response);
        setDatas(response);
      }
      else {
        setDatas([])
      }
    };
    fetchMargin();
  }, [toggle]);

  return (
    <div className="container mx-auto mt-4 h-full" style={{ width: "95%" }}>
      <div className=" flex justify-between">
        <div>
          <Breadcrumbs len={ids.length} ids={ids} />
        </div>
        <div className="flex justify-end space-x-2">
          <div className="relative">
            <FilterComponent props={'margin'} />
          </div>
          <div>
            <ExportRow
              printTableToPDF={() => {
                printTableToPDF();
              }}
              data={datas}
            />
          </div>
        </div>
      </div>
      <div>
        <FilteredData />
      </div>
      <div className="overflow-auto">
        <div id="table-to-print">
          <ReportsTable columns={columns} datas={datas} />
        </div>
      </div>
    </div>
  );
};

export default Margin;

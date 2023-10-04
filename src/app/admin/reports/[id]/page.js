"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";
import ReportsTable from "@/components/admin/reportsTable";
import FilteredData from "@/components/admin/filteredData";
import ExportRow from "@/components/page/exportRow";
import FilterComponent from "@/components/page/filterComp";
import Breadcrumbs from "@/components/page/breadcrumb";
import orderDataParser from "@/utils/orderDataParser";
import tradeDataParser from "@/utils/tradeDataParser";
import { holdingColumns, ledgerExcelColumns, ledgerPdfColumns, marginExcelColumns, marginPdfColumns, orderBookExcelColumns, orderBookPdfColumns, tradeBookExcelColumns, tradeBookPdfColumns } from "@/utils/constants";

const Page = ({ params }) => {

  // local state
  const [tableData, setTableData] = useState([]);
  const [tooltipData, setTooltipData] = useState([]);

  // title obtained from params
  const char = (params.id).charAt(0).toUpperCase();
  const title = char + params.id.slice(1);

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);
  const toggle = useSelector((state) => state.report.toggle);

  const param = params.id;

  let excelColumns;
  let pdfColumns;

  if( params.id === 'holding') {
    excelColumns = holdingColumns;
    pdfColumns = holdingColumns;
  } 
  else if (params.id === 'ledger') {
    excelColumns = ledgerExcelColumns;
    pdfColumns = ledgerPdfColumns;
  } 
  else if (params.id === 'margin') {
    excelColumns = marginExcelColumns;
    pdfColumns = marginPdfColumns;
  } 
  else if (params.id === 'orderbook') {
    excelColumns = orderBookExcelColumns;
    pdfColumns = orderBookPdfColumns;
  } 
  else if (params.id === 'tradebook') {
    excelColumns = tradeBookExcelColumns;
    pdfColumns = tradeBookPdfColumns;
  }

  
  // Data for breadcrumb
  const ids = [{ Reports: "/admin/reports" }, { [title]: "" }];

  // column/header data for excel and pdf
  // const columns = ["Script", "Exchange", "Quantity", "Current Price", "Current Value", "% Change"]

  // useEffect to fetch table data from backend
  useEffect(() => {
    const fetchHoldings = async () => {
      if (reportType === "Market") { // Live market data endpoint
        const response = await handleLiveReportsFetch(
          params.id,
          customerId,
          startDate,
          endDate
        );
        if (response.message === "Success") {
          setTableData(response[param]);
        }
        
      }
      else if (reportType === "Post") { // DB data endpoint
        const response = await handleDbReportsFetch(
          params.id,
          customerId,
          startDate,
          endDate
        );
        
        if (params.id === 'orderbook') {
            const { mainDatas, tooltipDatas} = orderDataParser(response);
            setTableData(mainDatas);
            setTooltipData(tooltipDatas);
        }
        else if (params.id === 'tradebook') {
            const { mainDatas, tooltipDatas} = tradeDataParser(response);
            setTableData(mainDatas);
            setTooltipData(tooltipDatas);
        } else {
            setTableData(response);
        }
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
              columns={excelColumns}
              pdfColumns={pdfColumns}
              fileName={params.id}
            />
          </div>
          <div className="">
            <FilterComponent 
              props={params.id} 
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
            <ReportsTable 
                columns={excelColumns} 
                datas={tableData} 
                tooltipData={tooltipData} 
                param={param}
            />
        </div>
      </div>
    </div>
  );
};

export default Page;

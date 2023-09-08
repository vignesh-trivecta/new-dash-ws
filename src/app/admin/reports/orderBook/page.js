'use client';

import React, { useEffect, useState, useRef } from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// excel
import { DownloadTableExcel } from 'react-export-table-to-excel';
// pdf 1
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// pdf 2
import print from 'print-js'
import ReportsTable from '@/components/admin/reportsTable';


const OrderBook = () => {

  const tableRef = useRef(null); // excel

  const convertTableToPDF = () => { // pdf 1
    const input = document.getElementById('table-to-convert'); 
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 0);
      pdf.save('table.pdf'); // Save the PDF with a given name
    });
  };

  const printTableToPDF = () => {
    const tableId = 'table-to-print'; // Replace with your table's ID
    printJS({ printable: tableId, type: 'html' });
  };
  

  const datas = [
    {
      "AtMarket": "N",
      "BuySell": "B",
      "Exch": "N",
      "ExchOrderID": "1300000009880667",
      "ExchOrderTime": "/Date(1658815566000+0530)/",
      "ExchType": "C",
      "OrderStatus": "Pending",
      "Qty": 1,
      "Rate": 12,
      "ScripName": "YESBANK",
    },
];

const columns = Object.keys(datas[0]);
  
  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className='flex justify-between'>
        <h1 className="font-bold">Order Book</h1>
        <div className='flex justify-end space-x-2'>
            <div className='relative'>
              <FilterComponent />
            </div>
            <div>
              <ExportRow printTableToPDF={() => {printTableToPDF()}} />
            </div>
        </div>
      </div>
      {/* <div className='overflow-auto' id="table-to-print" ref={tableRef}>
        <ReportsTable columns={columns} datas={datas} />
      </div> */}
      <div>
            {/* <button> Export excel </button> 
            <button onClick={convertTableToPDF}>Convert to PDF</button>  */}
            {/* <button onClick={printTableToPDF}> 
            </button> */}
        <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
        >


        </DownloadTableExcel>
      </div>
      <div className='overflow-y-scroll'>
      <table className='table-fixed w-full border' >
        <thead className='border bg-gray-50' >
          <tr>
          {
            columns.map((heading, index) => {
              return <th key={index} className='font-medium text-sm w-32 break-words border p-2'>{heading.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).join(' ')}</th>
            })
          }
          </tr>
        </thead>
          <tbody>
          {datas.map((data, index) => (
          <tr className="border" key={index}>
            {Object.values(data).map((value, subIndex) => (
              <td className=" text-sm p-2 break-words border" key={subIndex}>{value}</td>
            ))}
          </tr>
        ))}
            </tbody>
        </table>
      </div>
    </div>
    )
}

export default OrderBook;
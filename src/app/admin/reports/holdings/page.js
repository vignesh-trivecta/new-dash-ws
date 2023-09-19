'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { handleFetchReports } from '@/app/api/reports/route';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';
import print from 'print-js';

const Holdings = () => {

  // local state
  const [data, setData] = useState([]);

  const printTableToPDF = () => {
    const tableId = 'table-to-print'; 
    printJS({ printable: tableId, type: 'html',style: 'Td { border: 1px solid #D1D5DB !important;} Th { border: 1px solid #D1D5DB !important;}' });
  };
  
  const datas = [
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
    {
      "Symbol": "ICICIBANK",
      "CurrentPrice": 818.6,
      "Quantity": 5,
      "CurrentValue": 4093,
      "Exch": "N",
      "PerChange": 0.49,
      },
  ];

  const customerId = useSelector((state) => state.report.customerId);

  const columns = Object.keys(datas[0]);
  // const columns = Object.keys(data[0]);

  useEffect(() => {
    const fetchHoldings = async () => {
      const response = await handleFetchReports("holding", customerId);
      console.log(response);
      // setData(response);
    }
    fetchHoldings();
  }, []);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className='flex justify-between'>
        <h1 className="font-bold">Holdings</h1>
        <div className='flex justify-end space-x-2'>
          <div className=''>
            <FilterComponent />
          </div>
          <div>
            <ExportRow printTableToPDF={() => {printTableToPDF()}} data={datas} />
          </div>
        </div>
      </div>
      <div className='overflow-auto'>
        {/* <table>
          <thead>
            <tr className='border'>
              {
                columns.map((heading, index) => {
                  return <th key={index} className='text-sm border-r'>{heading}</th>
                })
              }
            </tr>
          </thead>
        </table> */}
        <div id="table-to-print">
          <ReportsTable columns={columns} datas={datas} />
        </div>
      </div>
    </div>
  )
}

export default Holdings;
'use client';

import React, {useState} from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';

import print from 'print-js'


const Holdings = () => {

  const printTableToPDF = () => {
    const tableId = 'table-to-print'; // Replace with your table's ID
    printJS({ printable: tableId, type: 'html' });
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

  const columns = Object.keys(datas[0]);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className='flex justify-between'>
        <h1 className="font-bold">Holdings</h1>
        <div className='flex justify-end space-x-2'>
          <div className=''>
            <FilterComponent />
          </div>
          <div>
            <ExportRow printTableToPDF={() => {printTableToPDF()}} />
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
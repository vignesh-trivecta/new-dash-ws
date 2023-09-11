'use client';

import React from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';
import print from 'print-js';

const TradeBook = () => {

  const printTableToPDF = () => {
    const tableId = 'table-to-print';
    printJS({ printable: tableId, type: 'html',style: 'Td { border: 1px solid #D1D5DB !important;} Th { border: 1px solid #D1D5DB !important;}' });
  };

  const datas = [
    {
      "BuySell": "B",
      "Exch": "N",
      "ExchOrderID": "1300000009880667",
      "ExchangeTradeID": "78406569",
      "ExchangeTradeTime": "/Date(1658822702000+0530)/",
      "Qty": 1,
      "Rate": 13.9,
      "ScripName": "YESBANK",
    }
  ]

  const columns = Object.keys(datas[0]);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className=' flex justify-between'>
        <h1 className="font-bold">Trade Book</h1>
        <div className='flex justify-end space-x-2'>
            <div className='relative'>
              <FilterComponent />
            </div>
            <div>
              <ExportRow printTableToPDF={() => {printTableToPDF()}} data={datas} />
            </div>
        </div>
      </div>
      <div className='overflow-auto'>
        <div id="table-to-print">
          <ReportsTable columns={columns} datas={datas} />
        </div>
      </div>
    </div>
  )
}

export default TradeBook;
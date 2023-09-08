'use client';

import React, { useEffect, useState } from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';

const TradeBook = () => {

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
              <ExportRow />
            </div>
        </div>
      </div>
      <div>
        <ReportsTable columns={columns} datas={datas} />
      </div>
    </div>
  )
}

export default TradeBook;
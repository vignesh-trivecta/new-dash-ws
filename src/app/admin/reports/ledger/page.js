'use client';

import React, { useState, useEffect } from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';
import { useSelector } from 'react-redux';
import { handleFetchReports } from '@/app/api/reports/route';
import print from 'print-js';

const Ledger = () => {

  // local state
  const [data, setData] = useState([]);

  const printTableToPDF = () => {
    const tableId = 'table-to-print';
    printJS({ printable: tableId, type: 'html',style: 'Td { border: 1px solid #D1D5DB !important;} Th { border: 1px solid #D1D5DB !important;}' });
  };

  
  const datas = [
    {
      "Amount": 253.55,
      "DebitCreditFlag": "D",
      "Narration": "CDSL DP Bill for Sep 2022  (Including Monthly AMC) and (Including Pending Monthly AMC charges for the period from February 2022 to August 2022) for demat account no. 1204470013879162",
      "VoucherDate": 20221002,
      "VoucherNumber": 24748092
    },
    {
      "Amount": 10736.78,
      "DebitCreditFlag": "D",
      "Narration": "FO BILL FOR ",
      "VoucherDate": 20221003,
      "VoucherNumber": 12360
    }
  ]

  const customerId = useSelector((state) => state.report.customerId);
  const columns = Object.keys(datas[0]);

  useEffect(() => {
    const fetchLedger = async () => {
      const response = await handleFetchReports("ledger", customerId);
      console.log(response);
      // setData(response);
    }
    fetchLedger();
  }, []);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className=' flex justify-between'>
        <h1 className="font-bold">Ledger</h1>
        <div className='flex justify-end space-x-2'>
            <div className='relative'>
              <FilterComponent />
            </div>
            <div>
              <ExportRow  printTableToPDF={() => {printTableToPDF()}} data={datas} />
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

export default Ledger;
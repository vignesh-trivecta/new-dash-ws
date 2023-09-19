'use client';

import { useState, useEffect } from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';
import { useSelector } from 'react-redux';
import { handleFetchReports } from '@/app/api/reports/route';
import print from 'print-js';

const Margin = () => {

  // local state
  const [data, setData] = useState([]);

  const printTableToPDF = () => {
    const tableId = 'table-to-print';
    printJS({ printable: tableId, type: 'html',style: 'Td { border: 1px solid #D1D5DB !important;} Th { border: 1px solid #D1D5DB !important;}' });
  };

  const datas = [
    {
      "ALB": 317.22, 
      "AvailableMargin": 317.22, 
      "GHV": 0, 
      "GrossMargin": 317.22, 
    }
  ]

  const customerId = useSelector((state) => state.report.customerId);
  const columns = Object.keys(datas[0]);

  useEffect(() => {
    const fetchMargin = async () => {
      const response = await handleFetchReports("margin", customerId);
      console.log(response);
      // setData(response);
    }
    fetchMargin();
  }, []);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className=' flex justify-between'>
        <h1 className="font-bold">Margin</h1>
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

export default Margin;
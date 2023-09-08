'use client';

import React, { useEffect, useState } from 'react';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import ReportsTable from '@/components/admin/reportsTable';

const Margin = () => {

  const datas = [
    {
      "ALB": 317.22, 
      "AvailableMargin": 317.22, 
      "GHV": 0, 
      "GrossMargin": 317.22, 
    }
  ]

  const columns = Object.keys(datas[0]);

  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <div className=' flex justify-between'>
        <h1 className="font-bold">Margin</h1>
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

export default Margin;
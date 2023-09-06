'use client';

import React from 'react'
import ExportRow from '@/components/page/exportRow';
import CustomerList from '@/components/admin/customerList';
import FilterComponent from '@/components/page/filterComp';

const Ledger = () => {
  return (
    <div className='container mx-auto mt-4 h-full flex justify-between' style={{width: '95%'}}>
      <h1 className="font-bold">Ledger</h1>
      <div className='flex justify-end space-x-2'>
          <div className='relative'>
            <FilterComponent />
          </div>
          <div>
            <ExportRow />
          </div>
      </div>
    </div>
    )
}

export default Ledger;
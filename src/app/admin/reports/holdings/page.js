'use client';

import CustomerList from '@/components/admin/customerList';
import ExportRow from '@/components/page/exportRow';
import FilterComponent from '@/components/page/filterComp';
import React from 'react';

const Holdings = () => {
  return (
    <div className='container mx-auto mt-4 h-full flex justify-between' style={{width: '95%'}}>
        <h1 className="font-bold">Holdings</h1>
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

export default Holdings;
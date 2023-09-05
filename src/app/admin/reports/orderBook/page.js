'use client';

import React from 'react'
import ExportRow from '@/components/page/exportRow';
import CustomerList from '@/components/admin/customerList';

const OrderBook = () => {
  return (
    <div className='container mx-auto mt-4 h-full' style={{width: '95%'}}>
      <h1 className="font-bold">Order Book</h1>
      <div className='flex justify-end space-x-2'>
        <div className='w-3/12 border h-96 border-gray-200 rounded-md overflow-y-scroll'>
          <CustomerList />
        </div>
        <div>
          <ExportRow />
        </div>
      </div>
    </div>
    )
}

export default OrderBook;
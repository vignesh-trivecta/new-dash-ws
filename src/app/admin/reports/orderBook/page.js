'use client';

import React, { useEffect, useState } from 'react';
import ExportRow from '@/components/page/exportRow';
import CustomerList from '@/components/admin/customerList';
import FilterComponent from '@/components/page/filterComp';

const OrderBook = () => {

  const [clientCode, setClientCode] = useState("CUST001 - Muthu Kumar");
  const [borker, setBroker] = useState("AXIS");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log(clientCode, borker, startDate, endDate)
  }, [toggle]);
  
  console.log(clientCode, borker, startDate, endDate)

  return (
    <div className='container mx-auto mt-4 h-full flex justify-between' style={{width: '95%'}}>
      <h1 className="font-bold">Order Book</h1>


      <div className='flex justify-end space-x-2'>
          <div className='relative'>
            <FilterComponent 
              clientCode={clientCode}
              setClientCode={setClientCode} 
              borker={borker} 
              setBroker={setBroker} 
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              toggle={toggle}
              setToggle={setToggle}
            />
          </div>
          <div>
            <ExportRow />
          </div>
      </div>
    </div>
    )
}

export default OrderBook;
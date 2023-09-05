'use client';

import { useEffect, useState } from 'react';
import { getBasketList } from '@/app/api/basket/route';
import { deleteBasket } from '@/app/api/mainBasket/route';
import { segregate } from '@/utils/priceSegregator';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Tooltip } from 'flowbite-react';
import DeleteBasket from '@/components/admin/deleteBasket';

const Customers = () => {

  // local state
  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);
  const [filteredBasket, setFilteredBasket] = useState('ALL');

  const username = useSelector((state) => state.user.username);

  // useEffect to fetch the view table baskets
  useEffect(() => {
    const fetchBaskets = async() => {
      const response = await getBasketList(filteredBasket);
      setRecords(response);
    }
    fetchBaskets();
  }, [])

  // useEffect to update table after deletion
  useEffect(() => {
    const fetchBaskets = async() => {
        const response = await getBasketList(filteredBasket);
        setRecords(response);
    }
    fetchBaskets();
  }, [handleFetch, filteredBasket])

  records?.sort((a, b) => new Date (b.createdOn) - new Date (a.createdOn));

  return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
        <div className='flex justify-between '>
            <h1 className="font-bold">View Baskets</h1>
            <div className="flex items-center">
                <p className="text-black text-sm dark:text-white mr-2">Filter</p>
                <select name="basketType" id="basketType" value={filteredBasket} onChange={e => {setFilteredBasket(e.target.value)}} className='border border-gray-200 rounded-md w-32 h-8 text-xs'>
                    <option value="ALL" className=''>All</option>
                    <option value="MODEL" className=''>Model</option>
                    <option value="BUY">Buy</option>
                    <option value="SELL">Sell</option>
                </select> 
            </div>
        </div>

      {/* View all Baskets table */}
      {/* <div className="mt-4 ml-8 overflow-x-auto overflow-y-scroll"  style={{ maxHeight: '450px'}}>
          <table className='table-auto w-full border'>
              <thead className="sticky top-0 border bg-gray-50">
                  <tr>
                      <th scope="col" className=" font-medium text-sm text-left p-2">
                          Basket Name
                      </th>
                      <th scope="col" className=" font-medium text-sm text-right p-2">
                          Stock
                      </th>
                      <th scope="col" className=" font-medium text-sm text-right p-2">
                          Investment &#8377;
                      </th>
                      <th scope="col" className=" font-medium text-sm p-2">
                          Created By
                      </th>
                      <th scope="col" className=" font-medium text-sm p-2">
                          Created On
                      </th>
                      <th scope="col" className=" font-medium text-start text-sm p-2">
                          Actions
                      </th>
                  </tr>
              </thead> */}
              <div className='flex mt-8'>
        <div className={'overflow-y-scroll border'} style={{height: '400px'}}>
          <table className='table-fixed w-full ' >
            <thead className='sticky top-0 bg-gray-50' >
              <tr>
                <th className='text-left font-medium text-sm p-2' style={{width:'8%'}}>S.No</th>
                <th className='text-left font-medium text-sm p-2'>Basket Name</th>
                <th className='text-left font-medium text-sm' style={{width:'12%'}}># Scripts</th>
                <th className='text-left font-medium text-sm'>Basket Value &#8377;</th>
                <th className='text-left font-medium text-sm'>Created By</th>
                <th className='text-center font-medium text-sm'>Created On</th>
                <th className='text-center font-medium text-sm'>Actions</th>
              </tr>
            </thead>
              <tbody>
                {records?.map((record, index) => {
                  return  (
                    <tr key={index} className='border-t border-b hover:bg-gray-50'>
                        <th className="text-left text-sm text-black ">
                            <div className="ml-4">
                                {index+1}
                            </div>
                        </th>
                      <td className='text-left'>
                          <div className='text-sm text-black p-2'>{record.basketName}</div>
                      </td>
                      <td className='text-left'>
                          <div className='text-sm text-black p-2 ml-2'>{record.totalNoOrders}</div>
                      </td>
                      <td className='text-center'>
                          <div className='text-sm text-black p-2 mr-20'>{segregate(record.basketInvAmount)}</div>
                      </td>
                      <td className='text-left'>
                          <div className='text-sm text-black p-2'>{record.createdBy}</div>    
                      </td>          
                      <td className='text-center'>
                          <div className='text-sm text-black p-2'>{record.createdOn.split('T')[0]}</div>    
                      </td>  
                      <td className="text-right text-sm ">
                          <div className="flex justify-center items-center">
                              <div className="mr-2">
                                {/* SVG icon for Viewing table */}
                                <Tooltip content="View" >
                                    <Link href={`/admin/baskets/view/${record.basketName}`}>
                                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 12">
                                            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                                            <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                            <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                                            </g>
                                        </svg>
                                    </Link>
                                </Tooltip>
                              </div>
                              {record.createdBy == username 
                                ? 
                                    (
                                        <>
                                            <div className="mr-2">
                                                {/* SVG icon for updating table */}
                                                <Tooltip content="Update" >
                                                    <Link href={`/admin/baskets/view/${record.basketName}/update`} >
                                                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                            <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                                            <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                                        </svg>
                                                    </Link> 
                                                </Tooltip>
                                            </div>
                                            <div className="mr-2">
                                                {/* Delete table */}
                                                <Tooltip content="Delete" >
                                                    <DeleteBasket 
                                                        handleFetch={handleFetch} 
                                                        setHandleFetch={setHandleFetch} 
                                                        basketName={record.basketName} 
                                                    />
                                                </Tooltip>
                                            </div>
                                        </>
                                    )
                                :
                                <>
                                    <div className="mr-2">
                                        {/* SVG icon for updating table */}
                                        <Tooltip content="Update Denied" >
                                            <Link href='#' className='pointer-events-none' >
                                                <svg className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                                </svg>
                                            </Link> 
                                        </Tooltip>
                                    </div>
                                    <div className="mr-2">
                                        {/* SVG icon for deleting table */}
                                        <Tooltip content="Delete Denied" >
                                            <Link href='#' className='pointer-events-none'>
                                            <svg className="w-4 h-4 text-gray-500 hover:text-red-500 dark:text-white" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                            </svg>
                                            </Link> 
                                        </Tooltip>
                                    </div>
                                </>
                              }
                          </div>
                      </td>        
                    </tr>)
                  })}
              </tbody>
          </table>
      </div>
      </div>
    </div>      
  )
}

export default Customers
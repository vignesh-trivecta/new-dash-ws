'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Button, Spinner } from 'flowbite-react';
import { postAxisOrders } from '@/app/api/client/route';
import { HiCheck } from 'react-icons/hi';
import { segregate } from '@/utils/priceSegregator';

const PlaceOrder = () => {

    // url search params
    const searchParams = useSearchParams();
    const ssoId = searchParams.get('ssoId');
    console.log(ssoId);
    
    // local state
    const [showSpinner, setShowSpinner] = useState(true);
    const [show, setShow] = useState(false); // show the order placed page
    const [status, setStatus] = useState(false); // show the spinner or failed page
    const [showBasket, setShowBasket] = useState(false); // show or not show the basket in orders placed page
    const [data, setData] = useState([]);

    // redux
    const basketData = useSelector((state) => state.client.basketData);
    const customerId = basketData.customerId;
    const basketName = basketData.basketName;
    const customerName = basketData.customerName;
    console.log(basketData)

    useEffect(() => {
        const placeAxisOrders = async () => {
            const response = await postAxisOrders(customerId, ssoId, basketName, customerName, basketData.rows);
            console.log(response);
            if (response !== false) {
                setData(response);
                setStatus(true);
            }
        }
        placeAxisOrders();
    }, [])

    return (
        <div>
            {/* {showSpinner
                ? // showing spinner when orders are being placed in the backend
                    (<div className='flex flex-col justify-center items-center h-screen'>
                        <Spinner
                            aria-label="Extra large spinner example"
                            size="xl"
                        />
                        <p>Your request is being processed.</p>
                        <p> Don't leave or close this page.</p>
                    </div>)
                :  // showing login failed when something breaks in backend and throws an error
                    (<div className='flex flex-col justify-center items-center h-screen space-y-10'>
                        <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className=''>Order Placement Failed!</p>
                        </div>
                        <Button className="mt-4">Login again</Button>
                    </div>)
            } */}
            {
                status  // show the spinner or order placed page
                ? // - order placed page
                (<div className='absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center space-y-4 w-full'>
                    <div className='flex items-center justify-center space-x-2'>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <p className='text-sm'>Your order has been placed</p> 
                    </div>
                    <div className='flex justify-between space-x-8'>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-xs'>Basket</div>
                            <div className='text-sm'>{data?.basketName}</div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-xs'>Status</div>
                            <div className='text-sm'>{data?.basketStatus}</div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='text-xs'>{data?.scriptStatus}</div>
                            <div className='text-sm border border-green-200 h-1/2 rounded-md bg-green-200'></div>
                        </div>
                    </div>
                    <div>
                        <p className='text-sm'><button onClick={() => { setShowBasket(true)}} className='underline'>Click</button> here to view executed basket</p>
                    </div>
                    {  // inside of the order placed page
                    showBasket // show or not show the basket in orders placed page by using a button click
                        ? // showing the placed order basket
                        <div className='flex justify-center items-center mt-4 text-xs'>
                            <table className='table-fixed border'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='p-2'>S.No</th>
                                        <th>Script</th>
                                        <th>Price&nbsp;&#8377;</th>
                                        <th className='p-2'>Quantity</th>
                                        <th className='p-2'>Total&nbsp;&#8377;</th>
                                        <th className='p-2'>Stauts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.details.map((record, index) => {
                                            return <tr className='border-b' key={index}>
                                                    <td className='text-center'>{index+1}</td>
                                                    <td className='truncate p-2'>{record?.tradingSymbol}</td>
                                                    <td className='text-right'>{record?.price}</td>
                                                    <td className='text-right pr-4'>{segregate(record?.quantity)}</td>
                                                    <td className='text-right pr-2'>{segregate((record?.price) * (record?.quantity))}</td>
                                                    <td className='text-right pr-2'>{record?.orderStatus}</td>
                                            </tr>
                                        })
                                    }
                                
                                </tbody>
                            </table> 
                        </div> 
                        :  // showing empty page 
                        <></>
                    }
                </div>)
                : // - spinner loading page
                    (<div className='flex flex-col justify-center items-center h-screen'>
                        <Spinner
                            aria-label="Extra large spinner example"
                            size="xl"
                        />
                        <p>Your request is being processed.</p>
                        <p> Don't leave or close this page.</p>
                    </div>)
            }
        </div>
    )
}

export default PlaceOrder;

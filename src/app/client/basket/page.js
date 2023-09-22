'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../../../public/logo1.png";
import { HiCheck } from 'react-icons/hi';
import { Button, Spinner } from 'flowbite-react';
import { clientConfirmsBasket } from '@/app/api/client/route';
import { segregate } from '@/utils/priceSegregator';

const BasketPage = () => {

    // local state
    const [show, setShow] = useState(false); // show the basket page or completed page
    const [status, setStatus] = useState(false); // show the spinner or order placed page
    const [showBasket, setShowBasket] = useState(false); // show or not show the basket in orders placed page
    const [data, setData] = useState([]);
    const [broker, setBroker] = useState('axis');

    // redux
    const basketData = useSelector((state) => state.client.basketData);

    // nextjs router
    const router = useRouter();

    // calculating the value of the basket
    let basketValue = 0;
    const dataValue = basketData?.rows?.map((record, index) => {
        let i = ((record?.limitPrice != 0 ? record?.limitPrice : record?.priceValue) * (record?.quantityValue));
        basketValue = basketValue + i;
    });


    // OAuth login redirect after click on submit button
    const handleConfirm = (e) => {
        e.preventDefault();
        // setShow(true);
        // const response = await clientConfirmsBasket(basketData);
        // console.log(response);
        // if(response){
        //     setData(response);
        //     setShow(true);
        //     setStatus(true);
        // }
        // // setShow(true);

        // IIFL redirect logic
        if (broker === 'iifl') {
            var f = document.createElement('form');
            f.action = 'https://ttweb.indiainfoline.com/trade/Login.aspx';
            f.method = 'POST';
    
            var i1 = document.createElement('input');
            i1.type = 'hidden';
            i1.name = 'VP';
            i1.value = 'https://www.google.co.in/';
            f.appendChild(i1);
    
            var i2 = document.createElement('input');
            i2.type = 'hidden';
            i2.name = 'UserKey';
            i2.value = 'zPBLyrSExfrFMjnNnIvgycdpkTtlaGRv';
            f.appendChild(i2);
    
            document.body.appendChild(f);
            f.submit();
        }
        // axis redirect logic
        else if(broker === 'axis') {
            // router.push("/client/placeOrder");
            setShow(true);
            setStatus(false);
        }
    }

  return (
    <div className='w-full p-4'>
        {show  // show the basket page or completed page
            ? // - completed page
            (status  // show the spinner or order placed page
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
            )
            : // - basket page asking whether to confirm/decline basket
            (<div className='flex flex-col space-y-20'>
                <div className='flex justify-center items-center'>
                    <Image src={Logo} alt="wealth spring logo"  />
                    <div></div>
                </div>
                <div className=''>
                    <div className='flex justify-center space-x-2 text-left'>
                        <p className=' font-semibold mb-4 text-xl'>Basket name: </p>
                        <p className=' font-semibold mb-4 text-xl'>{basketData?.basketName}</p>
                    </div>
                    <div className='flex justify-center'>
                        <div>
                            <p>Basket Value &#8377;</p>
                            <input disabled type='text' value={segregate((basketValue).toFixed(2))} className='w-32 border-gray-200 bg-gray-50 rounded-md text-right' />
                        </div>
                        <div className='ml-4'>
                            <p>Basket Type</p>
                            <input disabled type='text' value={basketData?.rows[0]?.transType} className='w-28 border-gray-200 bg-gray-50 rounded-md' />
                        </div>
                        <div className='ml-4'>
                            <p>No.of Scripts</p>
                            <input disabled type='number' value={basketData?.rows?.length} className='w-28 border-gray-200 bg-gray-50 rounded-md text-right' />
                        </div>
                    </div>
                    {/* Table showing baskets to client */}
                    <div className='flex justify-center items-center mt-4'>
                        <table className='table-fixed border'>
                            <thead className='border-b'>
                                <tr>
                                    <th className='p-2'>S.No</th>
                                    <th>Script</th>
                                    <th>Price &#8377;</th>
                                    <th className='p-2'>Quantity</th>
                                    <th className='p-2'>Total &#8377;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    basketData?.rows?.map((record, index) => {
                                        return (
                                            <tr className='border-b' key={index}>
                                                <td className='text-center'>{index+1}</td>
                                                <td className='truncate p-2'>{record?.instrumentName}</td>
                                                <td className='text-right'>{record?.limitPrice != 0 ? record?.limitPrice : record?.priceValue}</td>
                                                <td className='text-right pr-4'>{segregate(record?.quantityValue)}</td>
                                                <td className='text-right pr-2'>{segregate((record?.limitPrice != 0 ? record?.limitPrice : record?.priceValue) * (record?.quantityValue))}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Button groups */}
                    <div className='flex justify-center space-x-4 mt-4'>
                        <button className='bg-cyan-800 hover:bg-cyan-700 border p-2 rounded-md text-white w-20' onClick={(e) => {handleConfirm(e)}}>Confirm</button>
                        <Button color='gray'>Decline</Button>
                    </div>
                </div>
            </div>)
        }
        
    </div>
  )
}

export default BasketPage

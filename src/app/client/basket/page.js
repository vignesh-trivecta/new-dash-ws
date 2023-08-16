'use client';

import { Button } from 'flowbite-react';
import Image from 'next/image';
import React, { useState } from 'react';9
import logo from "../../../../public/logo1.png";

const BasketPage = () => {

    const [records, setRecords] = useState([]);

  return (
    <div className='w-full p-4'>
        <div className='flex justify-center items-center'>
            <Image src={logo} alt="wealth spring logo"  />
            <div></div>
        </div>
        <p className='text-center mb-4'>Customer's Basket</p>
        <div className='flex justify-center'>
            <div>
                <p>Basket Value</p>
                <input disabled type='number' className='w-28 border-gray-200 bg-gray-50 rounded-md' />
            </div>
            <div className='ml-4'>
                <p>Basket Type</p>
                <input disabled type='text' className='w-28 border-gray-200 bg-gray-50 rounded-md' />
            </div>
            <div className='ml-4'>
                <p>No.of Scripts</p>
                <input disabled type='number' className='w-28 border-gray-200 bg-gray-50 rounded-md' />
            </div>
        </div>
        <div className='flex justify-center items-center mt-4'>
            <table className='table-fixed border'>
                <thead className='border-b'>
                    <tr>
                        <th className='p-2'>S.No</th>
                        <th>Script</th>
                        <th>Price</th>
                        <th>LTP</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b'>
                        <td className='text-center'>1</td>
                        <td className='truncate p-2'>YES BANK</td>
                        <td className='text-right'>115.40</td>
                        <td className='text-right'>115.85</td>
                        <td className='text-right'>452</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='text-center'>2</td>
                        <td className='truncate p-2'>DCB BANK</td>
                        <td className='text-right'>71.50</td>
                        <td className='text-right'>72.10</td>
                        <td className='text-right'>250</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='text-center'>3</td>
                        <td className='truncate p-2'>IOB BANK</td>
                        <td className='text-right'>52.10</td>
                        <td className='text-right'>55.00</td>
                        <td className='text-right'>120</td>
                    </tr>
                    <tr className='border-b'>
                        <td className='text-center'>4</td>
                        <td className='truncate p-2'>AXIS BANK</td>
                        <td className='text-right'>1320.21</td>
                        <td className='text-right'>1325.20</td>
                        <td className='text-right'>54</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='flex justify-center space-x-4 mt-4'>
            <button className='bg-cyan-800 hover:bg-cyan-700 border p-2 rounded-md text-white w-20'>Accept</button>
            <Button color='gray'>Cancel</Button>
        </div>
    </div>
  )
}

export default BasketPage
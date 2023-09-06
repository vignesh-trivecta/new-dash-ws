'use client';

import React, {useState, useRef} from 'react'
import Link from 'next/link';

const Reports = () => {
  
    return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
        <h1 className="font-bold">Reports</h1>
        <ul className='space-y-4 list-disc ml-4 mt-4'>
            <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
            <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
            <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
            <li><Link href={'/admin/reports/margin'}>Margin</Link></li>
            <li><Link href={'/admin/reports/ledger'}>Ledger</Link></li>
        </ul>
        {/* <div className='mt-8 grid grid-cols-4 gap-8'>
            <div>
                <h1 className='mb-2 font-semibold underline'>Category 1</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='mb-2 font-semibold'>Category 2</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='mb-2 font-semibold'>Category 3</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='mb-2 font-semibold'>Category 4</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='mb-2 font-semibold'>Category 5</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
            <div>
                <h1 className='mb-2 font-semibold'>Category 6</h1>
                <ul className='space-y-4 list-disc ml-4'>
                    <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                    <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                    <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
                </ul>
            </div>
        </div> */}
    </div>
  )
}

export default Reports
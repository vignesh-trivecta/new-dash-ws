'use client';

import Link from 'next/link';
import React from 'react';

const ReportsList = () => {
  return (
    <div>
        <ul className='space-y-4 list-disc ml-4 mt-8'>
            <li><Link href={'/admin/reports/holdings'} className='underline text-blue-700'>Holdings</Link></li>
            <li><Link href={'/admin/reports/orderBook'} className='underline text-blue-700'>Order Book</Link></li>
            <li><Link href={'/admin/reports/tradeBook'} className='underline text-blue-700'>Trade Book</Link></li>
            <li><Link href={'/admin/reports/margin'} className='underline text-blue-700'>Margin</Link></li>
            <li><Link href={'/admin/reports/ledger'} className='underline text-blue-700'>Ledger</Link></li>
        </ul>
    </div>
  )
}

export default ReportsList

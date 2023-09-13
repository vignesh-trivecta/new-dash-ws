'use client';

import Link from 'next/link';
import React from 'react';

const ReportsList = () => {
  return (
    <div>
        <ul className='space-y-4 list-disc ml-4 mt-4'>
            <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
            <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
            <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
            <li><Link href={'/admin/reports/margin'}>Margin</Link></li>
            <li><Link href={'/admin/reports/ledger'}>Ledger</Link></li>
        </ul>
    </div>
  )
}

export default ReportsList
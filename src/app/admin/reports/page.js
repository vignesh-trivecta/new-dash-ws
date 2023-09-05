'use client';

import React, {useState, useRef} from 'react'
import Link from 'next/link';

const Reports = () => {
  
    return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
        <h1 className="font-bold">Reports</h1>
        <div className='mt-4'>
            {/* <Tabs.Group
            aria-label="Default tabs"
            style="default"
            ref={props.tabsRef}
            onActiveTabChange={(tab) => props.setActiveTab(tab)}
            >
                <Tabs.Item active title="Holdings" className=''>
                    This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Order Book">
                    This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item title="Trade Book">
                    This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
            </Tabs.Group> */}
            <ul className='space-y-4 list-disc ml-4'>
                <li><Link href={'/admin/reports/holdings'}>Holdings</Link></li>
                <li><Link href={'/admin/reports/orderBook'}>Order Book</Link></li>
                <li><Link href={'/admin/reports/tradeBook'}>Trade Book</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Reports
'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminLogin, setPath } from '@/store/reportSlice';
import ReportsList from '@/components/page/reportsList'
import { partnerLogin } from '@/app/api/reports/route';
import FilterComponent from '@/components/page/filterComp';
import { usePathname } from 'next/navigation';

const Reports = () => {

    const pathName = usePathname();
    setPath(pathName.split('/')[3] ?? '')

    // redux
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.report.adminLogin);

    // function to login the admin to the IIFL page
    const handleClick = async () => {
        // const response = await partnerLogin();
        // if(response) {
        //     setLoggedIn(true);
        // }
        dispatch(setAdminLogin(true));
    }

    return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
        <div className='flex justify-between'>
            <h1 className="font-bold">Reports</h1>
            <FilterComponent />
        </div>
        {/* Showing reports after logged in */}
        <ReportsList />
    </div>
  )
}

export default Reports

'use client';

import { partnerLogin } from '@/app/api/reports/route';
import ReportsList from '@/components/page/reportsList'
import { setAdminLogin } from '@/store/reportSlice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const metadata = {
    title: 'WealthSpring | Reports'
}

const Reports = () => {

    const loggedIn = useSelector((state) => state.report.adminLogin);

    const dispatch = useDispatch();

    const handleClick = async () => {
        // const response = await partnerLogin();
        // if(response) {
        //     setLoggedIn(true);
        // }
        dispatch(setAdminLogin(true));
    }

    return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
        <h1 className="font-bold">Reports</h1>
        {!loggedIn && <p className='my-6'><span className='underline text-blue-500 cursor-pointer' onClick={() => {handleClick()}}>Login</span> to access Customer Reports</p>}
        {loggedIn && <ReportsList />}
    </div>
  )
}

export default Reports
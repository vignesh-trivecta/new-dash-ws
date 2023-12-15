'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminLogin, setMessage, setPath } from '@/store/reportSlice';
import ReportsList from '@/components/page/reportsList'
import FilterComponent from '@/components/page/filterComp';
import { usePathname } from 'next/navigation';
import { Alert } from 'flowbite-react';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { HiInformationCircle } from 'react-icons/hi';

const Reports = () => {

    const pathName = usePathname();
    setPath(pathName.split('/')[3] ?? '');

    // redux
    const dispatch = useDispatch();
    const status = useSelector((state) => state.report.status);
    const message = useSelector((state) => state.report.message);

    // function to login the admin to the IIFL page
    const handleClick = async () => {
        dispatch(setAdminLogin(true));
    }

    useEffect(() => {
        dispatch(setMessage(""));
    })

    return (
    <div className='container mx-auto mt-4' style={{ width: "95%" }}>
        <div className='flex justify-between'>
            <h1 className="font-bold">Reports</h1>
            <FilterComponent />
        </div>
        {/* Showing reports after logged in */}
        <ReportsList />
        <div className="absolute bottom-4 w-96">
        {
          message 
          ? 
          <Alert
            color={status ? "success" : "warning"}
            rounded
            className="h-12"
            icon={status ? IoCheckmarkDoneCircle : HiInformationCircle}
          >
            <span className="w-4 h-4">{message}</span>
          </Alert>
          : ""
        }
      </div>
    </div>
  )
}

export default Reports

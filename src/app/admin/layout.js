'use client'
import DashLayout from '../../components/page/dashLayout';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

const DashboardLayout = ({ children }) => {

  const isAdminLogged = useSelector((state) => state.user.adminLoginStatus);

  return (
    isAdminLogged 
    ? 
      (<div>
          <DashLayout>
            <div className='mt-4 mr-2'>
              { children }
            </div>
          </DashLayout>
          
      </div>)
    :
      <div className='h-screen flex justify-center items-center'>
        <p>Please <Link href="/" className='underline'>Login</Link> to access WealthSpring</p>
      </div>
  )
}

export default DashboardLayout
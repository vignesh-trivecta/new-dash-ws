'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import DashLayout from '../../components/page/dashLayout';

const DashboardLayout = ({ children }) => {

  // checking the admin login status
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
      <div className='h-screen flex justify-center items-center'>  {/* When user is not logged in */}
        <p>Please <Link href="/" className='underline'>Login</Link> to access WealthSpring</p>
      </div>
  )
}

export default DashboardLayout;
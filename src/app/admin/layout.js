'use client'
import DashLayout from '@/components/page/DashLayout'
import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div>
        <DashLayout>
          <div className='mt-4 mr-2'>
            { children }
          </div>
        </DashLayout>
        
    </div>
  )
}

export default DashboardLayout
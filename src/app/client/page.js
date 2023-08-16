'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Client = () => {

  const router = useRouter();

  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    router.push('/client/basket')
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <p className='text-center'>Enter OTP</p>
          <input required type='password' placeholder='One Time Password' className='border-gray-200 rounded-md placeholder-gray-300' />
          <div className='flex justify-center items-center'>
            <button type='submit' className='mt-2 bg-cyan-800 hover:bg-cyan-700 border p-2 rounded-md text-white w-20'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Client
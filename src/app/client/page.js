'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import Logo from "../../../public/logo1.png";
import Image from 'next/image';

const Client = () => {

  const router = useRouter();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    router.push('/client/basket')
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Image src={Logo} alt="wealth spring logo" className='mb-40'  />
      <form onSubmit={handleSubmit} className='mb-20'>
        <div className='flex flex-col'>
          <p className='text-center'>Enter OTP</p>
          <input required type='password' placeholder='One Time Password' className={error ? 'border-red-500 rounded-md placeholder-red-500' : 'mt-2 border-gray-200 rounded-md placeholder-gray-300'} />
          <p className={error ? 'visible text-red-500 text-xs' : 'invisible '}>Wrong OTP!</p>
          <div className='flex justify-center items-center mt-2 space-x-2'>
            <Button type='submit' color='gray' className=''>Resend OTP</Button>
            <Button type='submit' className=' '>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Client
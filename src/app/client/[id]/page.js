'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import Logo from "@/../public/logo1.png";
import Image from 'next/image';
import { generateOtp, validateOtp } from '@/app/api/client/route';
import { useDispatch } from 'react-redux';
import { setBasketData } from '@/store/clientBasketSlice';

const Client = ({ params }) => {

  const basketLink = params.id;

  const router = useRouter();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateOtp(basketLink, otp);
    if(response){
      dispatch(setBasketData(response));
      router.push('/client/basket');
    }
  }

  const otpGeneration = async () => {
    const data = await generateOtp(basketLink);
  }

  useEffect(() => {
    otpGeneration();
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Image src={Logo} alt="wealth spring logo" className='mb-40'  />
      <form onSubmit={handleSubmit} className='mb-20'>
        <div className='flex flex-col'>
          <p className='text-center mt-4'>Enter OTP</p>
          <input required type='password' value={otp} onChange={(e) => { setOtp(e.target.value)}} placeholder='One Time Password' className={error ? 'mt-2 border-red-500 rounded-md placeholder-red-500' : 'mt-2 border-gray-200 rounded-md placeholder-gray-300'} />
          <p className={error ? 'visible text-red-500 text-xs' : 'invisible'}>Wrong OTP!</p>
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
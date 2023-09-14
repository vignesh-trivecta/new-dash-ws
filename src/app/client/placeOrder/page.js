'use client';

import { Button, Spinner } from 'flowbite-react';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PlaceOrder = () => {

    const basketData = useSelector((state) => state.client.basketData);

    const searchParams = useSearchParams();
    const ssoId = searchParams.get('ssoId');

    const [showSpinner, setShowSpinner] = useState(false);
    

    return (
        <div>
            {showSpinner
                ?
                    (<div className='flex flex-col justify-center items-center h-screen'>
                        <Spinner
                            aria-label="Extra large spinner example"
                            size="xl"
                        />
                        <p>Your request is being processed.</p>
                        <p> Don't leave or close this page.</p>
                    </div>)
                :
                    (<div className='flex flex-col justify-center items-center h-screen space-y-10'>
                        <div className='flex flex-col items-center'>
                            <svg className="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <p className=''>Login Failed!</p>
                        </div>
                        <Button className="mt-4">Login again</Button>
                    </div>)
            }
        </div>
    )
}

export default PlaceOrder
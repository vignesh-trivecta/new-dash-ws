'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Button, Spinner } from 'flowbite-react';

const PlaceOrder = () => {

    // url search params
    const searchParams = useSearchParams();
    const ssoId = searchParams.get('ssoId');
    console.log(ssoId);
    
    // local state
    const [showSpinner, setShowSpinner] = useState(true);
    const [show, setShow] = useState(false); // show the order placed page
    const [status, setStatus] = useState(false); // show the spinner or failed page
    const [showBasket, setShowBasket] = useState(false); // show or not show the basket in orders placed page
    
    // redux
    const basketData = useSelector((state) => state.client.basketData);

    return (
        <div>
            {showSpinner
                ? // showing spinner when orders are being placed in the backend
                    (<div className='flex flex-col justify-center items-center h-screen'>
                        <Spinner
                            aria-label="Extra large spinner example"
                            size="xl"
                        />
                        <p>Your request is being processed.</p>
                        <p> Don't leave or close this page.</p>
                    </div>)
                :  // showing login failed when something breaks in backend and throws an error
                    (<div className='flex flex-col justify-center items-center h-screen space-y-10'>
                        <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            <p className=''>Order Placement Failed!</p>
                        </div>
                        <Button className="mt-4">Login again</Button>
                    </div>)
            }
        </div>
    )
}

export default PlaceOrder;

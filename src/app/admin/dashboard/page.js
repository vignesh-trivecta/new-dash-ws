'use client';

import React, { useEffect } from "react";
import { partnerLogin } from "@/app/api/login/route";

const DashCards = () => {   

    // useEffect to login the partner to IIFL whenever the admin logs in
    useEffect(() => {
        const loginPartner = async () => {
            const response = await partnerLogin();
        }
        loginPartner();
    }, []);

    return(
        <div className='container mx-auto mt-2' style={{width: '95%'}}>
            <iframe class="w-full h-[calc(100vh-150px)]" src="https://analytics.zoho.in/open-view/298633000000325786/bea6e30a1d1bc77ab8bfcf877648dd97" frameborder="0" allowfullscreen></iframe>
        </div>
    )
}

export default DashCards;

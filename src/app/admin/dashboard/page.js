'use client';

// import { PieChart } from "@/components/admin/piechart";
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
        <div className='container mx-auto mt-4 overflow-hidden' style={{width: '95%'}}>
            <iframe frameborder={0} width="1000" height="500" src="https://analytics.zoho.in/open-view/298633000000325786/bea6e30a1d1bc77ab8bfcf877648dd97"></iframe>
            {/* <h1 className="font-bold">Dashboard</h1>
            <div className="flex justify-center gap-4">
                <div className="border border-gray-50 mb-4">
                    <Image src={Line} alt="line-chart" width={500} />
                </div>
                <div className="border border-gray-50 mb-4">
                    <Image src={Pie2} alt="pie-chart" width={500} />
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="border border-gray-50">
                    <h1 className="text-center underline">Basket Types</h1>
                    <Image src={Pie} alt="pie-chart" className="pie-chart" width={500} />
                </div>
                <div className="border border-gray-50">
                    <h1 className="text-center underline">Basket Total Value</h1>
                    <Image src={Bar} alt="bar-chart" className="bar-chart" width={500}  />
                </div>
            </div> */}
        </div>
    )
}

export default DashCards;

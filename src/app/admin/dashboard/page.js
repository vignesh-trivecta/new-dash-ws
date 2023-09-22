// import { PieChart } from "@/components/admin/piechart";
import React from "react";
import Pie from "@/../public/pie.jpeg";
import Pie2 from "@/../public/pie2.png";
import Bar from "@/../public/bar.jpeg";
import Line from "@/../public/line.png";
import Image from "next/image";

export const metadata = {
    title: 'Wealth Spring | Dashboard',
}

const DashCards = () => {   
    return(
        <div className='container mx-auto mt-4' style={{width: '95%'}}>
            <h1 className="font-bold">Dashboard</h1>
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
                    <Image src={Pie} className="pie-chart" width={500} />
                </div>
                <div className="border border-gray-50">
                    <h1 className="text-center underline">Basket Total Value</h1>
                    <Image src={Bar} className="bar-chart" width={500}  />
                </div>
            </div>
        </div>
    )
}

export default DashCards;

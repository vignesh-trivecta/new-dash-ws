'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomers } from "@/app/api/basket/route";

const CustomerDetails = () => {

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [ customers, setCustomers ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const customersData = await getCustomers();
          setCustomers(customersData);
          console.log(customersData)
        };
      
        fetchData();
      }, []);      

    return(
       <div className='container mx-auto mt-4' style={{width: '90%'}}>

            <h5 className="font-bold">Customer Details</h5>

            {/* Customer Details table */}
            <div className='flex mt-10'>
        <div className={'overflow-y-scroll'} >
          <table className='table-fixed w-full border' >
            <thead className='sticky top-0 border bg-gray-50' >
              <tr>
                <th className='text-left font-medium text-sm p-2' style={{width:'8%'}}>S.No</th>
                <th className='text-left font-medium text-sm p-2'>Customer ID</th>
                <th className='text-left font-medium text-sm '>Name</th>
                <th className='text-left font-medium text-sm'>Contact 1</th>
                <th className='text-left font-medium text-sm'>Contact 2</th>
                <th className='text-left font-medium text-sm'>Email</th>

              </tr>
            </thead>
              <tbody>
                        {customers?.map((data, index) => {
                            return (
                                <tr key={index} className="bg-white border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <th className="text-left text-sm text-black ">
                                        <div className="ml-4">
                                            {index+1}
                                        </div>
                                    </th>
                                    <td className="p-2 text-sm text-black">
                                        {data.customerId}
                                    </td>
                                    <td className="p-2 text-sm text-black">
                                        <div className="-ml-2">
                                            {data.name}
                                        </div>
                                    </td>
                                    <td className="p-2 text-sm text-black">
                                    <div className="-ml-2">
                                            {data.contactOne}
                                        </div>
                                    </td>
                                    <td className="p-2 text-sm text-black">
                                    <div className="-ml-2">
                                            {data.contactTwo}
                                        </div>
                                    </td>
                                    <td className="p-2 text-sm text-black">
                                        <div className="-ml-10">
                                            {data.email}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default CustomerDetails;
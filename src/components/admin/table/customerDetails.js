"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/app/api/basket/route";

const CustomerDetails = () => {

    // local state
    const [customers, setCustomers] = useState([]);
    const [message, setMessage] = useState("");

    // useEffect to fetch the customers data
    useEffect(() => {
        const fetchData = async () => {
            const {status, data} = await getCustomers();
            if (status !== 200) {
                setMessage(data.messages);
                return;
            }
            setCustomers(data);
            setMessage("");
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <h5 className="font-bold">Customer Details</h5>

            {/* Customer Details table */}
            <div className="h-[calc(100vh-250px)] flex mt-11">
                <div className={"overflow-y-scroll border"}>
                    <table className="table-fixed w-full">
                        <thead className="sticky border-b top-0 bg-gray-50">
                            <tr>
                                <th className="text-left font-medium text-sm p-2 w-10 md:w-12 lg:w-16 break-words">
                                    S.No
                                </th>
                                <th className="text-left font-medium text-sm p-2 break-words">
                                    Customer ID
                                </th>
                                <th className="text-left font-medium text-sm break-words">
                                    Name
                                </th>
                                <th className="text-left font-medium text-sm break-words">
                                    Contact 1
                                </th>
                                <th className="text-left font-medium text-sm break-words">
                                    Contact 2
                                </th>
                                <th className="text-left font-medium text-sm break-words">
                                    Email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <th className="text-left text-sm text-black ">
                                            <div className="ml-4 lg:ml-4">
                                                {index + 1}
                                            </div>
                                        </th>
                                        <td className="p-2 text-sm text-black break-words">
                                            {data.customerId}
                                        </td>
                                        <td className="p-2 text-sm text-black">
                                            <div className="md:-ml-2 lg:-ml-2 break-words">
                                                {data.name}
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm text-black">
                                            <div className="sm:-ml-4 md:-ml-2 lg:-ml-2 break-words">
                                                {data.contactOne}
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm text-black">
                                            <div className="sm:-ml-4 md:-ml-2 lg:-ml-2 break-words">
                                                {data.contactTwo}
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm text-black">
                                            <div className="sm:-ml-4 md:-ml-4 lg:-ml-20 break-words">
                                                {data.email}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
                {
                    message && <div className="mt-4">{message}</div>
                }
        </div>
    );
};

export default CustomerDetails;

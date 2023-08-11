'use client';

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { getBasketList, getBasketValue, getCustomers, mapBasket } from "@/app/api/basket/route";
import { Alert, Button, Modal, Toast, Tooltip } from "flowbite-react";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { setBasketAmount, setBasketBroker, setBasketName } from '@/store/basketSlice'
import { segregate } from "@/utils/priceSegregator";

const CustomerMapping = () => {
    
    // broker inputs 
    const brokers = [
        { name: 'AXIS' },
        { name: 'IIFL' },
    ]

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const adminId = useSelector((state) => state.user.username);

    const [ customers, setCustomers ] = useState([]);
    const [weblink, setWeblink] = useState(false);
    const [message, setMessage] = useState(false);
    const [records, setRecords] = useState([]);
    const [investmentVal, setInvestmentVal] = useState('');
    const [basketVal, setBasketVal] = useState('');
    const [transType, setTransType] = useState('');
    const [broker, setBroker] = useState(brokers[0].name);
    const [basket, setBasket] = useState('');

    const basketName = useSelector((state) => state.basket.basketName);
    
    // modal state variables
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    
    const dispatch = useDispatch();
    const router = useRouter();
    
    // useEffect to fetch the view table baskets
    useEffect(() => {
        const fetchBaskets = async() => {
            const response = await getBasketList();
            setRecords(response);
            console.log(response)
        }
        const fetchData = async () => {
            const customersData = await getCustomers();
            setCustomers(customersData);
            console.log(customersData)
        };
        
        fetchBaskets();
        fetchData();
    }, [])
      
    if(weblink){
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        setTimeout(() => {
            setWeblink(false);
            // router.push("/admin/baskets/create");
        }, 3000)
    }

    if(message){
        dispatch(setBasketAmount(''));
        dispatch(setBasketName(''));
        setTimeout(() => {
            setMessage(false);
            // router.push("/admin/baskets/create");
        }, 3000)
    }

    // handle basket selection
    const handleSelection = async (value) => {
        setBasket(value);
        const response = await getBasketValue(value, adminId);
        setInvestmentVal(response[0].basketInvestAmt);
        setTransType(response[0].transactionType);
    }
    
    // handle customer mapping
    const handleMapping = async (customerId) => {
        const response = await mapBasket(basket, adminId, customerId, broker);
    }

    return(
        <div className='container mx-auto mt-4' style={{width: '90%'}}>

            <h5 className="font-bold mb-2">Map Basket</h5>
            <div className="flex justify-between">
                {/* Basket Names listbox */}
                <div className="">
                    <p className="text-black text-sm dark:text-white mr-2">Select Basket</p>
                        <select
                            name="transactionType"
                            id="transactionType"
                            className='border border-gray-200 rounded-md w-44'
                            defaultValue={'select'}
                            onChange={(e) => {handleSelection(e.target.value)}}
                        >
                            <option value="select">-Select -</option>
                                {records?.map((record) => (
                                    <option key={record.basketName} value={record.basketName}>
                                        {record.basketName}
                                    </option>
                                ))}
                        </select>

                </div>
                <div className="flex flex-col items-left mb-6">
                    <label className="text-black text-sm dark:text-white">Investment &#8377;</label>
                    <input type="text" value={segregate(investmentVal)} disabled className="border border-gray-200 bg-gray-50 text-right rounded-lg w-44" />
                </div>

                {/* Basket Type listbox */}
                <div className="">
                    <p className="text-black text-sm dark:text-white mr-2">Transaction Type</p>
                    <input disabled type="text" value={transType} className="border border-gray-200 rounded-lg w-44 bg-gray-50" />
                </div>

                <div className="flex flex-col items-left mb-6">
                    <p className="text-black text-sm dark:text-white mr-2">Basket value &#8377;</p>
                    <input disabled type="text" value={segregate(200000)} className="border border-gray-200 rounded-lg w-44 text-right bg-gray-50" />
                </div>
            </div>       


            {/* Customer Details table */}
                <div className='flex flex-col mt-2'>
                <div className={'overflow-y-scroll border'}  style={{ height: '300px' }}>
                <table className='table-fixed w-full overflow-y-scroll' >
                    <thead className='sticky top-0 bg-gray-50' >
                    <tr>
                        <th className='font-medium text-sm text-left p-2' >Customer ID</th>
                        <th className='font-medium text-sm text-left' >Name</th>
                        <th className='font-medium text-left text-sm' style={{width: '20%'}}>Email</th>
                        <th className='font-medium text-center text-sm'>Contact</th>
                        <th className='font-medium text-center text-sm'>Broker</th>
                        <th className='font-medium text-left text-sm'>Map Status</th>
                        <th className='font-medium text-left text-sm'>WebLink Status</th>
                        <th className='font-medium text-center text-sm'>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {customers?.map((data, index) => {
                            return (
                                <tr key={index} className='border-t border-b hover:bg-gray-50'>
                                    {/* <td className="p-2 font-medium text-gray-900 dark:text-white">
                                        <input type="radio" name="customer" value={index} id={`customer_${index}`} />
                                    </td> */}
                                    <td className="text-sm text-left text-black p-2">
                                        {data.customerId}
                                    </td>
                                    <td className="text-sm text-left text-black">
                                        {data.name}
                                    </td>
                                    <td className="text-sm text-left text-black">
                                        {data.email}
                                    </td>
                                    <td className="text-sm text-center text-black">
                                        {data.contactOne}
                                    </td>
                                    <td className="text-sm text-center text-black">
                                        <select className="text-xs border-gray-200 rounded-md" value={broker} onChange={e => setBroker(e.target.value)} >
                                            <option className="text-sm" value={'AXIS'}>AXIS</option>
                                            <option className="text-sm" value={'IIFL'}>IIFL</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="ml-8">
                                            <svg className="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5.917 5.724 10.5 15 1.5"/>
                                            </svg>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="ml-8">
                                            <svg className="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5.917 5.724 10.5 15 1.5"/>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className=" flex text-sm text-black mt-2 ml-6">
                                        <Tooltip content="Map Customer">
                                            <button className="ml-2" onClick={() => {handleMapping(data.customerId)}}>
                                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"/>
                                            </svg>
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="Send Weblink">
                                            <button className="ml-4">
                                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                                </svg>
                                            </button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {
                weblink 
                ?   
                    <Alert
                    className="absolute bottom-0 left-2 bg-green-200 text-green-500"
                    icon={HiCheckCircle}
                    rounded
                    >
                        <span className='w-4 h-4 text-green-500'>
                            Weblink sent successfully! 
                        </span>
                    </Alert>
                :   <></>
            }
            {
                message 
                ?   
                <Alert
                className="absolute bottom-0 left-2 bg-green-200 text-green-500"
                icon={HiCheckCircle}
                rounded
                >
                    <span className='w-4 h-4 text-green-500'>
                        Basket mapped successfully!
                    </span>
                </Alert>
                :   <></>
            }
        </div>
        </div>
    );
};

export default CustomerMapping;
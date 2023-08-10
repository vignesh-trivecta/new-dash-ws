'use client';

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import { getBasketList, getCustomers } from "@/app/api/basket/route";
import { Alert, Button, Modal, Toast, Tooltip } from "flowbite-react";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { setBasketAmount, setBasketBroker, setBasketName } from '@/store/basketSlice'
import { segregate } from "@/utils/priceSegregator";

const CustomerMapping = () => {
    
    // broker inputs 
    const broker = [
        { name: 'AXIS' },
        { name: 'IIFL' },
    ]

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const [ customers, setCustomers ] = useState([]);
    const [weblink, setWeblink] = useState(false);
    const [message, setMessage] = useState(false);
    const [selected, setSelected] = useState(broker[0]);
    const [records, setRecords] = useState([]);
    const [investmentVal, setInvestmentVal] = useState('');
    const [basketVal, setBasketVal] = useState('');

    const basketName = useSelector((state) => state.basket.basketName);
    
    // modal state variables
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (selectedItem) => {
        setSelected(selectedItem);
        // Dispatch the value of the selected item to Redux store
        dispatch(setBasketBroker(selectedItem.name));
    };

    useEffect(() => {
        const fetchData = async () => {
          const customersData = await getCustomers();
          setCustomers(customersData);
          console.log(customersData)
        };
      
        fetchData();
    }, []); 
    
    // useEffect to fetch the view table baskets
    useEffect(() => {
        const fetchBaskets = async() => {
        const response = await getBasketList();
        setRecords(response);
        console.log(response)
        }
        fetchBaskets();
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
    const handleSelection = (value) => {
        const res = records.filter((record) => {if (record.basketName == value) return record.basketInvAmount})
        setInvestmentVal(res[0].basketInvAmount);
    }

    return(
        <div className='container mx-auto mt-4' style={{width: '90%'}}>

            <h5 className="font-bold mb-2">Map Basket</h5>
            <div className="flex justify-between">
                {/* Basket Names listbox */}
                <div className="">
                    <p className="text-black text-sm dark:text-white mr-2">Select Basket</p>
                    {records.length > 0 && (
                        <select
                            name="transactionType"
                            id="transactionType"
                            className='border border-gray-200 rounded-md w-44'
                            defaultValue={'select'}
                            onChange={(e) => {handleSelection(e.target.value)}}
                        >
                            <option value="select">-Select -</option>
                                {records.map((record) => (
                                    <option key={record.basketName} value={record.basketName}>
                                        {record.basketName}
                                    </option>
                                ))}
                        </select>
                    )}

                </div>
                <div className="flex flex-col items-left mb-6">
                    <label className="text-black text-sm dark:text-white">Investment &#8377;</label>
                    <input type="text" value={segregate(investmentVal)} disabled className="border border-gray-200 bg-gray-50 text-right rounded-lg w-44" />
                </div>

                {/* Basket Type listbox */}
                <div className="">
                    <p className="text-black text-sm dark:text-white mr-2">Transaction Type</p>
                    <input disabled type="text" value={'BUY'} className="border border-gray-200 rounded-lg w-44 bg-gray-50" />
                </div>

                <div className="flex flex-col items-left mb-6">
                    <p className="text-black text-sm dark:text-white mr-2">Basket value &#8377;</p>
                    <input disabled type="text" value={segregate(200000)} className="border border-gray-200 rounded-lg w-44 text-right bg-gray-50" />
                </div>
            </div>       


            {/* Customer Details table */}
            {/* <div className="overflow-x-auto overflow-y-scroll">
                <table className="table-fixed w-full border">
                    <thead className="sticky top-0 border bg-gray-50">
                        <tr>
                            <th scope="col" className="font-medium text-sm p-2">
                                
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Name
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Email
                            </th>
                            <th scope="col" className="font-medium text-sm text-left p-2">
                                Contact
                            </th>
                        </tr>
                    </thead> */}
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
                                        <select className="text-xs border-gray-200 rounded-md">
                                            <option className="text-sm">AXIS</option>
                                            <option className="text-sm">IIFL</option>
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
                                            <button className="ml-2">
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
            {/* <div className="flex justify-center mt-4">
                <Button onClick={() => props.setOpenModal('pop-up')}   className='ml-8'>Map to Customer</Button>
                <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='flex flex-col'>
                            <div className="flex items-center justify-center">
                            <label className='mr-4'>Choose a Broker:</label>
                                <Listbox value={selected} onChange={handleChange} >
                                    <div className=" mt-1">
                                    <Listbox.Button className="w-32 relative cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-xs">
                                        <span className="block truncate">{selected.name}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            ariaHidden="true"
                                        />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options 
                                        style={{height: '80px'}}
                                        className="absolute mt-1 max-h-32 w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                                        {broker.map((broker, brokerIdx) => (
                                            <Listbox.Option
                                            key={brokerIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-8 pr-4  ${
                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={broker}
                                            >
                                            {({ selected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                    selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {broker.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-amber-600">
                                                    <CheckIcon className="h-3 w-3" ariaHidden="true" />
                                                    </span>
                                                ) : null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                    </div>
                                </Listbox>
                                </div>
                            <div className="flex items-center justify-center mt-4">
                                <p className="">Do you want to send the WebLink to customer?</p>
                            </div>
                            <div className="flex justify-center mt-10 gap-4">
                            <Button onClick={(e) => {props.setOpenModal(undefined); setWeblink(true)}}>
                                Yes
                            </Button>
                            <Button color="gray" onClick={() => {props.setOpenModal(undefined); setMessage(true)}}>
                                No
                            </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div> */}
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
                // <Toast className="absolute bottom-0 left-2 bg-green-400">
                //         <div className='flex items-center'>
                //         <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-green-500 dark:bg-green-800 dark:text-green-200">
                //             <HiCheck className="h-5 w-5" />
                //         </div>
                //         <div className="ml-3 text-sm font-normal text-white">
                //             Basket mapped successfully! 
                            
                //         </div>
                //         </div>
                //         <Toast.Toggle className='bg-green-400 text-white'/>
                //     </Toast>
                :   <></>
            }
        </div>
        </div>
    );
};

export default CustomerMapping;
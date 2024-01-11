'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Button, Label, Modal, Tooltip } from 'flowbite-react';
import SearchDropdown from '@/utils/searchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getEquityPrice, sendQuantity, sendWeightage } from '@/app/api/basket/route';
import { AddRecordMainAPI } from '@/app/api/mainBasket/route';
import { addRecord } from '@/app/api/tempBasket/route';
import { setSelectedStock} from '@/store/addRecordSlice';
import { usePathname } from 'next/navigation';
import { segreagatorWoComma } from '@/utils/formatter/segregatorWoComma';
import { HiInformationCircle } from 'react-icons/hi';
import { amountSplitter } from '@/utils/amountSplitter';

const AddRecord = ({ handleFetch, setHandleFetch, transType, investmentVal, basketVal, basketName, basketCategory,  mainBasketName, records, setMainMessage }) => {

    console.log(investmentVal)
    const pathname = usePathname();
    const baskCat = basketCategory ?? records[0]?.basketCategory;
    
    // modal variables
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    
    // redux state variables
    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.add.selectedStock);
    const adminName = useSelector((state) => state.user.username);
    
    // local state variables
    const [weightage, setWeightage] = useState(undefined);
    const [price, setPrice] = useState('');
    const [limitPrice, setLimitPrice] = useState(price);
    const [exchange, setExchange] = useState('NSE');
    const [orderType, setOrderType] = useState('LIMIT');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const [fetch, setFetch] = useState(false);
    
    // function to handle the exchange radio button
    const handleExchange = async (exchange) => {
        setExchange(exchange);
        const data = await getEquityPrice(selectedStock, exchange);
        setPrice(data);
    }
    
    //function to get the quantity of stocks based on weightage
    const handleChange = async (e) => {
        // setWeightage(e?.target.value || weightage );
        const inputValue = e?.target?.value;
        const id = e?.target?.id;
        
        // makes API call based on id
        if (id === "weightage") {
            setWeightage(inputValue);
            const {status, data} = await sendWeightage(inputValue, investmentVal, price);
            if (status === 200) {
                data?.quantity ? setQuantity(data?.quantity) : setQuantity(0);
            } else {
                if(data?.messages) {
                    setMessage(data.messages);
                } else {
                    setMessage("");
                }
            }
            // check whether input value is between 1 - 100
            if (inputValue > 100 || inputValue < 1 ) {
                setMessage("Weightage must be between 1-100")
            }
        } else if (id === "quantity") {
            setQuantity(inputValue);
            const { status, data } = await sendQuantity(inputValue, investmentVal, price);
            const wieght = data?.weightAge;
            wieght ? setWeightage(wieght) : setWeightage(0);
            if (wieght > 100 || wieght < 1 ) {
                setMessage("Weightage must be between 1-100")
            }
            else {
                setMessage("");
            }
        }
    };
    
    useEffect(() => {
        if (selectedStock !== "") {
            handleExchange(exchange);
        }
    }, [fetch])

    useEffect(() => {
        if (weightage !== "") {
            handleChange();
        }
    }, [price])
    
    // function to submit the modal values and add record to the table
    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = async() => {
            let data;
            let lprice = limitPrice || price;
            if (orderType === "MARKET") {
                lprice = 0;
            }

            if(pathname == '/admin/baskets/create'){
                const {status, messages} = await addRecord(adminName, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, investmentVal, lprice, baskCat);
                if(status === 201){
                    setHandleFetch(!handleFetch);
                    props.setOpenModal(undefined);
                    setWeightage('');
                    setLimitPrice(undefined);
                }
                else {
                    setMessage(messages);
                }
            }
            else {
                const newVal = amountSplitter(basketVal)
                const newBasketName = mainBasketName.split("%20").join(" ");
                const {status, data} = await AddRecordMainAPI(adminName, newBasketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, limitPrice, investmentVal, newVal, baskCat);
                setHandleFetch(!handleFetch);
                if (status === 200) {
                    props.setOpenModal(undefined);
                    setMessage("");
                    setWeightage('');
                    setLimitPrice(undefined);
                } else {
                    setMessage(data.messages);
                }
            }
        }
        
        postData();
    }
    
    return (
        <>
        {/* Add record button */}
        <Button 
            onClick={() => {
                props.setOpenModal('form-elements');
                dispatch(setSelectedStock(''));
                setWeightage(null);
                setPrice('');
                setQuantity('');
                setExchange('NSE');
                setOrderType('LIMIT');
            }}
        >
            Add Record
        </Button>

        {/* Modal for entering new record details to add */}
        <Modal show={props.openModal === 'form-elements'}  popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header >

                {/* BUY/ SELL toggle
                <label className="relative inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value={toggle} onChange={() => {setToggle(!toggle); console.log(toggle)}} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-300"></div>
                    <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">{toggle ? "SELL" : "BUY"}</span>
                </label> */}

            </Modal.Header>
            <Modal.Body>
                {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-10">Add new record</h3> */}
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4 mt-4'>
                        <Label htmlFor="stock" value="Stock" className='text-sm' />
                        <div className=''>
                            <SearchDropdown 
                                id={"stock"} 
                                fetch={fetch} 
                                setFetch={setFetch} 
                                records={records} 
                                setMessage={setMessage}
                                setDisabledButton={setDisabledButton}
                            />
                        </div>

                        {/* Price element */}
                        <div className='relative col-start-3 row-start-1 flex flex-col ml-8'>
                            <div className='flex items-center space-x-2 absolute left-2 px-1 -top-2 bg-white '>
                                <Label htmlFor="price" value="Price" className='text-sm z-10' />
                                {
                                    exchange === "BSE"
                                    ?
                                    <Tooltip content={"LTP is NSE"}>
                                        <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                        </svg>
                                    </Tooltip>
                                    : 
                                    ""
                                }
                            </div>
                            <input 
                                disabled 
                                id='price' 
                                name="price" 
                                value={segreagatorWoComma(price)} 
                                type="string" 
                                className=' text-right pr-2 w-full h-11 bg-gray-50 rounded-md border border-gray-200' 
                            />
                        </div>

                        {/* Exchange element */}
                        <Label value="Exchange" className='col-start-1 row-start-2 text-sm' />
                        <div className=' col-start-2 row-start-2'>
                            <input 
                                required
                                id="bse" 
                                name="exchange" 
                                type='radio' 
                                value="BSE"
                                defaultChecked={exchange === "BSE"}
                                onClick={() => {
                                    handleExchange("BSE");
                            }} />
                            <label htmlFor='bse' className='ml-2 text-sm'>BSE</label>
                            <input 
                                required
                                id="nse" 
                                name="exchange" 
                                type='radio' 
                                value="NSE" 
                                className='ml-2' 
                                defaultChecked={exchange === "NSE"}
                                onClick={() => {
                                    handleExchange("NSE");
                                }} 
                            />
                            <label htmlFor='nse' className='ml-2 text-sm'>NSE</label>
                        </div>
                        
                        {/* Weightage element */}
                        <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-sm' />
                        <div className='rounded-md col-start-2 row-start-3 h-10'>
                            <input
                                required
                                id='weightage' 
                                name="weightage"
                                type='number'
                                value={weightage}
                                onChange={handleChange}
                                className={`${(weightage > 100 || weightage < 1) ? "focus:ring-red-500" : "focus:ring-blue-700"} focus:border-none w-full border border-gray-200 rounded-md text-right`}
                            />
                            {/* <input type='text' id="weightage" placeholder='Enter...' /> */}
                        </div>

                        {/* Order Type element */}
                        <Label value="Order Type" className='col-start-1 row-start-4 text-sm'/>
                        <div className='col-start-2'>
                            <input required id="market" name="orderType" type='radio' value="MARKET" defaultChecked={orderType === "MARKET"} onClick={() => (setOrderType("MARKET"))} />
                            <label htmlFor='market' className='ml-2 text-sm'>MARKET</label>
                            <input required id="limit" name="orderType" type='radio' value="LIMIT" className='ml-2' defaultChecked={orderType === "LIMIT"} onClick={() => (setOrderType("LIMIT"))} />
                            <label htmlFor='limit' className='ml-2 text-sm'>LIMIT</label>
                        </div>

                        {/* Limit value element */}    
                        <div className='relative ml-8'>
                            <Label htmlFor="limitInput" value="Limit Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                            <input 
                                required 
                                disabled={orderType === "MARKET"}
                                id="limitInput" 
                                name="limitInput" 
                                value={limitPrice || price} 
                                onChange={(e) => setLimitPrice(e.target.value)} 
                                type="number" 
                                className={`text-right absolute ml-1 w-40 rounded-md border border-gray-200 ${orderType === "MARKET" ? "bg-gray-50" : ""}`}
                            />       
                        </div>
                            
                        {/* Quantity element */}
                        <div className='relative col-start-3 row-start-3 flex flex-col ml-8'>
                            <Label htmlFor='quantity' value="Quantity" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' />
                            <input 
                                required
                                id='quantity' 
                                name='quantity' 
                                type="number" 
                                value={quantity} 
                                onChange={handleChange} 
                                className=' text-right absolute pl-8 p-2 w-full border border-gray-200 rounded-md' 
                            />
                        </div>
                    </div>

                    {/* Buttons group */}
                    <div className="flex justify-between mt-4">
                        <div>
                            {
                                message 
                                ?   
                                <Alert
                                    color="warning"
                                    rounded
                                    className="h-10 w-56 p-1 flex justify-center max-w-sm text-sm"
                                    icon={HiInformationCircle}
                                >
                                    <span>{message}</span>
                                </Alert>
                                : ""
                            }
                        </div>
                        <div className='flex '>
                            <Button 
                                type='submit' 
                                disabled={disabledButton || (weightage > 100 || weightage < 1) || selectedStock === "" || quantity < 1}
                            >
                                Add
                            </Button>
                            <Button 
                                color="gray"                
                                onClick={() => {
                                    props.setOpenModal(undefined);
                                    dispatch(setSelectedStock(''));
                                    setWeightage(null);
                                    setPrice(0);
                                    setLimitPrice(undefined);
                                    setQuantity('');
                                    setExchange('');
                                    setOrderType('');
                                }}
                                className="ml-2 text-md" 
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </>
    )
}

export default AddRecord;

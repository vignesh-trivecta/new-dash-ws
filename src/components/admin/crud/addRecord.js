'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Label, Modal } from 'flowbite-react';
import SearchDropdown from '@/utils/searchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getEquityPrice, sendWeightage } from '@/app/api/basket/route';
import { AddRecordMainAPI } from '@/app/api/mainBasket/route';
import { addRecord } from '@/app/api/tempBasket/route';
import { setSelectedStock} from '@/store/addRecordSlice';
import { usePathname } from 'next/navigation';
import { segreagatorWoComma } from '@/utils/formatter/segregatorWoComma';
import { HiInformationCircle } from 'react-icons/hi';

const AddRecord = ({ handleFetch, setHandleFetch, transType, investmentVal, basketVal, mainBasketName, records }) => {

    const pathname = usePathname();

    // modal variables
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };
    
    // redux state variables
    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.add.selectedStock);
    const basketName = useSelector((state) => state.basket.basketName);
    // const basketAmount = useSelector((state) => state.basket.basketAmount);
    const adminName = useSelector((state) => state.user.username);
    
    // local state variables
    const [limitPrice, setLimitPrice] = useState('');
    const [weightage, setWeightage] = useState(undefined);
    const [price, setPrice] = useState('');
    const [exchange, setExchange] = useState('NSE');
    const [orderType, setOrderType] = useState('LIMIT');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);

    const [fetch, setFetch] = useState(false);

    // function to handle the exchange radio button
    const handleExchange = async (exchange) => {
        // (setExchange(exchange));
        const data = await getEquityPrice(selectedStock, exchange);
        setPrice(data);
    }


    useEffect(() => {
        if (selectedStock !== "") {
            handleExchange(exchange);
        }
    }, [fetch])

    // Event handler //function to get the quantity of stocks based on weightage
    const handleChange = async (e) => {
        console.log(e?.target.value);
        // setWeightage(e?.target.value || weightage );
        setWeightage(e?.target?.value);
        // const quantity = await sendWeightage(e?.target?.value || weightage, investmentVal, price);
        const quantity = await sendWeightage(e?.target?.value, investmentVal, price);
        setQuantity(quantity);
        console.log(quantity);
        if (e?.target?.value > 100 || e?.target?.value < 1 ) {
            setMessage("Weightage must be between 0-100")
        }
        else {
            setMessage("");
        }
    };

    const isInitialRender = useRef(true);
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
            if(pathname == '/admin/baskets/create'){
                data = await addRecord(adminName, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, investmentVal, limitPrice);
                if(data === true){
                    setHandleFetch(!handleFetch);
                    props.setOpenModal(undefined);
                }
            }
            else {
                data = await AddRecordMainAPI(adminName, mainBasketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, limitPrice, investmentVal, basketVal);
                setHandleFetch(!handleFetch);
                props.setOpenModal(undefined);
            }
        }

        postData();
        setWeightage('');
        setLimitPrice('');
    }
    
    return (
    <>
        {/* Add record button */}
        <Button 
        onClick={() => {
            props.setOpenModal('form-elements');
            dispatch(setSelectedStock(''));
            setWeightage('');
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
                            <Label htmlFor="price" value="Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                            <input disabled id='price' name="price" value={segreagatorWoComma(price)} type="string" className=' text-right pr-2 w-full h-11 bg-gray-50 rounded-md border border-gray-200' />
                        </div>

                        {/* Exchange element */}
                        <Label value="Exchange" className='col-start-1 row-start-2 text-sm' />
                        <div className=' col-start-2 row-start-2'>
                            {/* <input 
                                required
                                id="bse" 
                                name="exchange" 
                                type='radio' 
                                value="BSE"
                                checked={exchange === "BSE"}
                                onClick={() => {
                                    handleExchange("BSE");
                            }} />
                            <label htmlFor='bse' className='ml-1 text-sm'>BSE</label> */}
                            <input 
                                required
                                id="nse" 
                                name="exchange" 
                                type='radio' 
                                value="NSE" 
                                className='ml-1' 
                                defaultChecked={exchange === "NSE"}
                                onClick={() => {
                                    handleExchange("NSE");
                            }} />
                            <label htmlFor='nse' className='ml-1 text-sm'>NSE</label>
                        </div>
                        
                        {/* Weightage element */}
                        <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-sm' />
                        <div className='rounded-md col-start-2 row-start-3 h-10'>
                            <input
                                required
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
                            <label htmlFor='market' className='ml-1 text-sm'>MARKET</label>
                            <input required id="limit" name="orderType" type='radio' value="LIMIT" className='ml-1' defaultChecked={orderType === "LIMIT"} onClick={() => (setOrderType("LIMIT"))} />
                            <label htmlFor='limit' className='ml-1 text-sm'>LIMIT</label>
                        </div>

                        {/* Limit value element */}    
                        {orderType === "LIMIT" && (   
                            <span className='relative ml-8'>
                                <Label htmlFor="limitInput" value="Limit Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                                <input 
                                    required 
                                    id="limitInput" 
                                    name="limitInput" 
                                    value={limitPrice} 
                                    onChange={(e) => setLimitPrice(e.target.value)} 
                                    type="number" 
                                    className=' text-right absolute w-32 rounded-md border border-gray-200' />                                             
                            </span>                             
                        )}

                            
                        {/* Quantity element */}
                        <div className='relative col-start-3 row-start-3 flex flex-col ml-8'>
                            <Label htmlFor='quantity' value="Quantity" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' />
                            <input disabled id='quantity' name='quantity' value={quantity} type="string" className=' text-right absolute pl-8 p-2 w-full bg-gray-50 border border-gray-200 rounded-md' />
                        </div>
                    </div>

                    {/* Buttons group */}
                    <div className="flex justify-between mt-4">
                        <div>
                            <Alert
                                color="warning"
                                rounded
                                className="h-12 w-56 p-1 flex justify-center max-w-sm"
                                icon={HiInformationCircle}
                                >
                                <span>{message}</span>
                            </Alert>
                        </div>
                        <div className='flex '>
                            <Button 
                                type='submit' 
                                disabled={disabledButton || (weightage > 100 || weightage < 1) || selectedStock === ""}
                            >
                                Add
                            </Button>
                            <Button color="gray"                
                                onClick={() => {
                                    props.setOpenModal(undefined);
                                    dispatch(setSelectedStock(''));
                                    setWeightage('');
                                    setPrice('');
                                    setLimitPrice('');
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

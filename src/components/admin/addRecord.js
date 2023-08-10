'use client';

import React, { useState } from 'react';
import { Button, Label, Modal } from 'flowbite-react';
import SearchDropdown from '@/utils/searchDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addRecord, getEquityPrice, sendWeightage } from '@/app/api/basket/route';
import { setSelectedStock} from '@/store/addRecordSlice';

const AddRecord = ({ handleFetch, setHandleFetch, transType }) => {

    // modal variables
    const [openModal, setOpenModal] = useState(false);
    const props = { openModal, setOpenModal };


    
    // redux state variables
    const dispatch = useDispatch();
    const selectedStock = useSelector((state) => state.add.selectedStock);
    // const weightage = useSelector((state) => state.add.weightage);
    const basketName = useSelector((state) => state.basket.basketName);
    const basketAmount = useSelector((state) => state.basket.basketAmount);
    // const price = useSelector((state) => state.add.price);
    // const exchange = useSelector((state) => state.add.exchange);
    // // const transType = useSelector((state) => state.add.transType);
    // const orderType = useSelector((state) => state.add.orderType);
    // const quantity = useSelector((state) => state.add.quantity);
    const adminName = useSelector((state) => state.user.username);
    
    // local state variables
    const [limitPrice, setLimitPrice] = useState('');

    const [weightage, setWeightage] = useState('');
    const [price, setPrice] = useState('');
    const [exchange, setExchange] = useState('');
    const [orderType, setOrderType] = useState('');
    const [quantity, setQuantity] = useState('');

    // const [fectch, setFetch] = useState(false);

    // const [record, setRecord] = useState({
    //     instrumentName: "",
    //     exchange: "",
    //     weightage: "",
    //     orderType: "",
    //     quantity: "",
    // });

    // function to handle the exchange radio button
    const handleExchange = (exchange) => {
        (setExchange(exchange));
        const fetchPrice = async () => {
            const data = await getEquityPrice(selectedStock, exchange);
            (setPrice(data));
            console.log(selectedStock, exchange);
        }
        fetchPrice();
        console.log(price);
    }

    // function to handle the limit price input
    const handleLimitPrice = (e) => {
        setLimitPrice(e.target.value);
    }

    // Event handler
    const handleChange = (e) => {
        const newValue = (e.target.value);

        if(newValue < 1){
            setWeightage(1);
        }
        else{
            setWeightage(newValue);
        }
        quantityAPI();
    };

    //function to get the quantity of stocks based on weightage
    const quantityAPI = async () => {
        const quantity = await sendWeightage(weightage, basketAmount, price);
        (setQuantity(quantity));
        console.log(quantity)
    }

    // function to submit the modal values and add record to the table
    const handleSubmit = (e) => {
        e.preventDefault();
        // setRecord({
        //     "adminId": adminId,
        //     "basketName": basketName,
        //     "instrumentName": selectedStock,
        //     "exchangeUsed": exchange,
        //     "orderType": "Limit",
        //     "transType": orderType,
        //     "quantity": quantity,
        //     "weightage": Number(weightage),
        //     "price": price,
        //     "basketInvAmount": Number(basketAmount)           
        // })
        // need to make the api call here
        // by removing setRecord or can use directly
        // the response received needs to be mapped to Table
        const postData = async() => {
            const data = await addRecord(adminName, basketName,selectedStock, exchange, orderType, transType, quantity, weightage, price, basketAmount, limitPrice);
            if(data.status == 200){
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
            // dispatch(setExchange(''));
            // dispatch(setPrice(null));
            // dispatch(setWeightage(null));
            // dispatch(setQuantity(null));
            // dispatch(setOrderType(''));
            // dispatch(setTransType(''));
            setWeightage('');
            setPrice('');
            setQuantity('');
            setExchange('');
            setOrderType('');
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
                <div className='grid grid-rows-4 grid-cols-3 gap-x- gap-y-4 mt-4'>
                    <Label htmlFor="stock" value="Stock" className='text-sm' />
                    <div className=''>
                        <SearchDropdown id="stock" />
                    </div>

                    {/* Price element */}
                    <div className='relative col-start-3 row-start-1 flex flex-col ml-8'>
                        <Label htmlFor="price" value="Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                        <input disabled id='price' name="price" value={price} type="number" className=' text-right absolute pl-8 w-full bg-gray-50 rounded-md border border-gray-200' />
                    </div>

                    {/* Exchange element */}
                    <Label value="Exchange" className='col-start-1 row-start-2 text-sm' />
                    <div className=' col-start-2 row-start-2'>
                        <input 
                            id="bse" 
                            name="exchange" 
                            type='radio' 
                            value="BSE"
                            checked={exchange === "BSE"}
                            onClick={() => {
                            handleExchange("BSE");
                            console.log('bse')
                        }} />
                        <label htmlFor='bse' className='ml-1 text-sm'>BSE</label>
                        <input id="nse" name="exchange" type='radio' value="NSE" className='ml-1' 
                        checked={exchange === "NSE"}
                        onClick={() => {
                            handleExchange("NSE");
                            console.log('nse')
                        }} />
                        <label htmlFor='nse' className='ml-1 text-sm'>NSE</label>
                    </div>
                    
                    {/* Weightage element */}
                    <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-sm' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <input
                            type='number'
                            value={weightage}
                            onChange={handleChange}
                            className='w-full border border-gray-200 rounded-md text-right'
                            
                        />
                        {/* <input type='text' id="weightage" placeholder='Enter...' /> */}
                    </div>

                    {/* <Label value="Transaction Type" className='col-start-1 row-start-4 text-sm'/> */}
                    {/* <div className='col-start-2'>
                        <input id="buy" name="transType" type='radio' value="BUY" checked={transType === "BUY"} onClick={() => dispatch(setTransType("BUY"))} />
                        <label htmlFor='buy' className='ml-1 text-sm'>BUY</label>
                        <input id="sell" name="transType" type='radio' value="SELL" className='ml-1' checked={transType === "SELL"} onClick={() => dispatch(setTransType("SELL"))} />
                        <label htmlFor='sell' className='ml-1 text-sm'>SELL</label>
                    </div> */}

                    {/* Order Type element */}
                    <Label value="Order Type" className='col-start-1 row-start-4 text-sm'/>
                    <div className='col-start-2'>
                        <input id="market" name="orderType" type='radio' value="MARKET" checked={orderType === "MARKET"} onClick={() => (setOrderType("MARKET"))} />
                        <label htmlFor='market' className='ml-1 text-sm'>MARKET</label>
                        <input id="limit" name="orderType" type='radio' value="LIMIT" className='ml-1' checked={orderType === "LIMIT"} onClick={() => (setOrderType("LIMIT"))} />
                        <label htmlFor='limit' className='ml-1 text-sm'>LIMIT</label>
                    </div>

                    {/* Limit value element */}    
                    {orderType === "LIMIT" && (   
                        <span className='relative ml-8'>
                            <Label htmlFor="limitInput" value="Limit Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                            <input id="limitInput" name="limitInput" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} type="text" className=' text-right absolute w-32 rounded-md border border-gray-200' />                                             
                        </span>                             
                    )}

                        
                    {/* Quantity element */}
                    <div className='relative col-start-3 row-start-3 flex flex-col ml-8'>
                        <Label htmlFor='quantity' value="Quantity" className='absolute left-2 -top-2 bg-white px-1 text-sm z-10' />
                        <input disabled id='quantity' name='quantity' value={quantity} type="string" className=' text-right absolute pl-8 p-2 w-full bg-gray-50 border border-gray-200 rounded-md' />
                    </div>
                </div>

                {/* Buttons group */}
                <div className="flex justify-end mt-4">
                    <button type='submit' onClick={handleSubmit} className="bg-cyan-800 hover:bg-cyan-700 border p-2 rounded-md text-white w-20">Add</button>
                    <Button color="gray"                
                        onClick={() => {
                            props.setOpenModal(undefined);
                            dispatch(setSelectedStock(''));
                            // dispatch(setExchange(''));
                            // dispatch(setPrice(null));
                            // dispatch(setWeightage(null));
                            // dispatch(setQuantity(null));
                            // dispatch(setTransType(''));
                            // dispatch(setOrderType(''));
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
            </Modal.Body>
        </Modal>
    </>
    )
}

export default AddRecord;
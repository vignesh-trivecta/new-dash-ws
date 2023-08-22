'use client';

import AddRecord from '@/components/admin/addRecord';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Tooltip } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketAmount, setBasketName } from '@/store/basketSlice';
import { basketNameCheck } from '@/app/api/basket/route';
import { getRecords } from '@/app/api/tempBasket/route';
import BasketRecords from '@/components/admin/basketRecords';
import SubmitBasket from '@/components/admin/submitBasket';
import { segregate } from '@/utils/priceSegregator';
import { usePathname, useSearchParams } from 'next/navigation';
import { setBasketState } from '@/store/eventSlice';
import { HiInformationCircle, HiCheck, HiCheckCircle } from 'react-icons/hi';

const CreateBasket = () => {

  // modal variables
  // const [openModal, setOpenModal] = useState(false);
  // const props = { openModal, setOpenModal };

  
  let [namecheck, setNameCheck] = useState(true);
  
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // redux state variables
  const adminId = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketAmount = useSelector((state) => state.basket.basketAmount);  
  const basketState = useSelector((state) => state.event.basketState);
  
  // local state variables
  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);
  const [message, setMessage] = useState('');
  const [transType, setTransType] = useState('BUY');
  // const [count, setCount] = useState(0);
  
  // useEffect for getting records after basket save clicked
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setRecords([]);
    dispatch(setBasketAmount(''));
    dispatch(setBasketName(''));
    setMessage(msg4);
    setSaved(false);
  }, [saved])
  
  // useEffect to set the message at center of table
  useEffect(() => {
    if(basketName !== '' && basketAmount !== ''){
      setMessage(msg2);
    }
    else {
      setMessage(msg1);
    }
  }, [basketAmount, basketName]);
  
  // useEffect to check the basketname
  useEffect(() => {
    const check = async () => {
      const response = await basketNameCheck(basketName);
      setNameCheck(response);
    }
    check();
  }, [basketName])
  
  // useEffect to clear the basket name and amount
  useEffect(() => {
    dispatch(setBasketName(""));
    dispatch(setBasketAmount(""));
    // props.setOpenModal("form-elements");
  }, [])
  
  // useffect for add record, update record, delete record
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecords(adminId, basketName);
      setRecords(response || []);
    }
    fetchData();
  }, [handleFetch]);
  
  // comparison to check whether basketVal is greater than investmentVal
  const [comparison, setComparison] = useState(true);
  // const investmentVal = basketAmount.toString();   // formatting input amount

  // getting basket total value
  const [total, setTotal] = useState(0);
  useEffect(()=> {
    // checking url and records to prevent user from navigating
    if(pathname == '/admin/baskets/create' && records?.length !== 0){
      dispatch(setBasketState(true));
    }
    else{
      dispatch(setBasketState(false));
    }
    
    // setting the basket value
    let total = 0;
    let price;

    records?.forEach((record) => {
      if(record.orderType === 'MARKET'){
        price = record.priceValue;
      }
      else{
        price = record.limitPrice;
      }
      total += (price * record.quantityValue);
    })
    setTotal(total);
    
    // condition to set msg5
    if((records?.length !== 0)){
      setMessage(msg5);
    }

    // condition to compare investment and basket value
    if(total > basketAmount){
      setComparison(false);
      setMessage(msg6);
    }
    else{
      setComparison(true);
    }

  }, [records]);
  
  // Conditional rendering for buttons based on comparison and existence of total/basketAmount
  let isButtonDisabled;
  if(basketAmount !== '' && basketName !== ''){
    isButtonDisabled = true;
  }
  else {
    isButtonDisabled = false;
  }
  
  const basketVal = segregate(total);
  
  const msg1 = "Enter Basket Name and Investment Amount";
  const msg2 = "Add scripts to the basket";
  const msg3 = "Basket name exists!";
  const msg4 = "Basket Saved Successfully!";
  const msg5 = "Basket Value is lesser than Investment Amount";
  const msg6 = "Basket Value is higher than Investment Amount";

  return (
    <div className='container mx-auto mt-4' style={{width: '90%'}}>
      <h3 className='mb-2 font-bold'>Create new Basket</h3>
      
      {/* Investment details row */}
      <div className="flex justify-between">
        {
          namecheck 
          ? (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-left">
                <label className="text-black text-sm dark:text-white mr-2">Basket Name</label>
                <input type="text" value={basketName} onChange={(e) => {dispatch(setBasketName(e.target.value))}} className="border border-gray-200 rounded-lg w-44" />
              </div>
              <div className='ml-8 mt-2'>
                <p className='text-xs text-red-500'><div>&nbsp;</div></p>
              </div>
            </div>)
          : (
            <div className="flex flex-col items-start">
              <div className="flex flex-col items-left">
                <label className="text-black text-sm dark:text-white mr-2">Basket Name</label>
                <input type="text" value={basketName} onChange={(e) => {dispatch(setBasketName(e.target.value))}} className="border border-gray-200 focus:border-red-500 focus:ring-0 rounded-lg w-44" />
              </div>
              <div className='mt-2'>
                <p className='text-xs text-red-600'><div>{msg3}</div></p>
              </div>
            </div>)
        }
        <div className="flex flex-col items-left mb-6">
          <label className="text-black text-sm dark:text-white">Investment &#8377;</label>
          <input type="text" value={segregate(basketAmount)} onChange={(e) => {
            // Remove commas from the input value before updating state
            const newValue = e.target.value.replace(/,/g, "");
            dispatch(setBasketAmount(newValue));
          }} className="border border-gray-200 rounded-lg w-44 text-right" />
        </div>

        {/* Basket Type listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">Transaction Type</p>
          <select name="transactionType" id="transactionType" value={transType} className='border border-gray-200 rounded-md w-44' onChange={e => setTransType(e.target.value)}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select> 
      </div>
        <div className="flex flex-col items-left mb-6">
          <p className="text-black text-sm dark:text-white mr-2">Basket Value &#8377;</p>
          <input disabled type="text" value={basketVal} className="border border-gray-200 rounded-lg w-44 bg-gray-50 text-right" />
        </div>
      </div>  
          

      {/* Table showing Create Basket Records */}
      <div className='flex mt-2'>
        <div className={'overflow-y-scroll border'}  style={{ height: '300px' }}>
          <table className='table-fixed w-full' >
            <thead className='sticky top-0 bg-gray-50' >
              <tr>
                <th className='text-left font-medium text-sm p-2'>S.No</th>
                <th className='font-medium text-sm text-left' style={{width: '25%'}}>Scripts</th>
                <th className='font-medium text-sm'>Exchange</th>
                <th className='font-medium text-sm'>Order Type</th>
                <th className='text-right font-medium text-sm'>Weights&nbsp;%</th>
                <th className='text-right font-medium text-sm'>Price &#8377;</th>
                <th className='text-right font-medium text-sm'>Limit Price &#8377;</th>
                <th className='text-right font-medium text-sm'>Quantity</th>
                <th className='font-medium text-sm'>Actions</th>
              </tr>
            </thead>
            { 
              <tbody>

                {/* Component for showing table records */}
                {records && records?.length > 0 ? (records?.map((record, index) => (
                  <BasketRecords
                    key={record.recId} 
                    record={record} 
                    index={index} 
                    handleFetch={handleFetch} 
                    setHandleFetch={setHandleFetch}
                  />
                  
                  ))) : <td colSpan="8" style={{ height: '250px', textAlign: 'center' }}>
                          
                        </td>  
                  }
                  
              </tbody>
            }
          </table>
        </div>
      </div>

        <div className='flex justify-between items-center mt-2'>

          {/* Buttons Component */}
      
            {
            (message !== msg4) 
              ? 
                <div>
                  <Alert
                    color="warning"
                    icon={HiInformationCircle}
                    rounded
                  >
                    <span className='w-4 h-4'>
                      {message}
                    </span>
                  </Alert>
                </div>
              :
                <div>
                  <Alert
                    className='bg-green-200 text-green-500'
                    icon={HiCheckCircle}
                    rounded
                  >
                    <span className='w-4 h-4 text-green-500'>
                      {message}
                    </span>
                  </Alert>
                </div>  
            }
          
          
          {/* Conditional rendering based on comparison and records.length */}
          { comparison && (basketAmount !== '' && basketName !== '')
            ? 
            <div className='flex justify-center'>
              {/* <Button onClick={handleMapping} className='mr-8'>Map to Customer</Button> */}
              <div>
                <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch} transType={transType} />
              </div>
              <div>
                <SubmitBasket saved={saved} setSaved={setSaved} transType={transType} investmentAmount={basketAmount} actualValue={basketVal} />              
              </div>
            </div>

            : <div className='flex justify-center'>
                {/* <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className='mr-8'>Map to Customer</Button>
                </Tooltip> */}
                
                <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className=''>Add Record</Button>
                </Tooltip>
                <Tooltip className='overflow-hidden' content="Enter Basket name and Investment amount!">
                  <Button disabled className='ml-8'>Save</Button>
                </Tooltip>
              </div>
          }

        </div>


    </div>
  )
}

export default CreateBasket;
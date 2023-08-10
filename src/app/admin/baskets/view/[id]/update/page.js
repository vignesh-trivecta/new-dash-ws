'use client';

import { getRecords, getSpecificBasket } from '@/app/api/basket/route';
import BasketRecords from '@/components/admin/basketRecords';
import { segregate } from '@/utils/priceSegregator';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useSearchParams } from 'next/navigation';
import AddRecord from '@/components/admin/addRecord';
import SubmitBasket from '@/components/admin/submitBasket';


const UpdateBasket = ({ params }) => {

    const msg1 = "Enter Basket Name and Investment Value";
    const msg2 = "Add records to the table";
    const adminId = useSelector((state) => state.user.username);
    let value;

    
    // local state variables
    const [records, setRecords] = useState([]);
    const [handleFetch, setHandleFetch] = useState(false);
    const [message, setMessage] = useState('');
    
    const pathname = usePathname();
    
    // useEffect to fetch the table records
    useEffect( () => {
      const gettingRecords = async () => {
        const response = await getSpecificBasket( params.id );
        setRecords(response);
        console.log(response)
        value = records.map((record) => { return record.basketInvestAmt});
        console.log(value)
      };
      gettingRecords();
    }, []);
    
    const [investmentVal, setInvestmentVal] = useState((value));
      // useEffect for getting records after basket save clicked
  const [saved, setSaved] = useState('');
  useEffect(() => {
    setRecords([]);
  }, [saved])

    // useEffect to set the message at center of table
    // useEffect(() => {
    //     if(basketName !== '' && basketAmount !== ''){
    //       setMessage(msg2);
    //     }
    //     else {
    //       setMessage(msg1);
    //     }
    //   }, [basketAmount, basketName]);

    // useffect for add record, update record, delete record
    useEffect(() => {
        const fetchData = async () => {
          const response = await getSpecificBasket( params.id);
          console.log(response)
          setRecords(response || []);
        }
        fetchData();
    }, [handleFetch]);

    // getting basket total value
    const [total, setTotal] = useState(0);
    const [basketState, setBasketState] = useState(false);
    const [comparison, setComparison] = useState(true);
    useEffect(()=> {

      // checking url and records to prevent user from navigating
      if(pathname == '/admin/baskets/create' && records.length !== 0){
        (setBasketState(true));
      }
      else{
        (setBasketState(false));
      }

      let total = 0;
      
      records.forEach((record) => {
        total += (record.priceValue * record.quantityValue);
      })
      setTotal(total);


      if(total > investmentVal){
        setComparison(false);
      }
      else{
        setComparison(true);
      }
    }, [records]);

    // getting investment amount 

    const basketVal = segregate(total);

  return (
    <div className='container mx-auto mt-4' style={{width: '90%'}}>
      <h3 className='mb-2 font-bold'>Update {params.id}</h3>

            {/* Investment details row */}
      <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-left">
                <label className="text-black text-sm dark:text-white mr-2">Basket Name</label>
                <input type="text" disabled value={params.id} className="border border-gray-200 rounded-lg w-44 bg-gray-50" />
              </div>
              <div className='ml-8 mt-2'>
                <p className='text-xs text-red-500'><div>&nbsp;</div></p>
              </div>
            </div>
        <div className="flex flex-col items-left mb-6">
          <label className="text-black text-sm dark:text-white">Investment</label>
          <input disabled type="text" value={(investmentVal)} className="border border-gray-200 rounded-lg w-44 text-right" />
        </div>

        {/* Basket Type listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">Transaction Type</p>
          <select name="transactionType" id="transactionType" className='border border-gray-200 rounded-md w-32'>
            <option value="BUY" selected>BUY</option>
            <option value="SELL">SELL</option>
        </select> 
      </div>
        <div className="flex flex-col items-left mb-6">
          <p className="text-black text-sm dark:text-white mr-2">Basket Value</p>
          <input disabled type="text" value={basketVal} className="border border-gray-200 rounded-lg w-44 bg-gray-50 text-right" />
        </div>
      </div>  

        {/* Table showing Basket Records */}
      <div className='flex mt-2'>
        <div className={'overflow-y-scroll border'}  style={{ height: '300px' }}>
          <table className='table-fixed w-full ' >
            <thead className='sticky top-0  bg-gray-50' >
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
                {records && records.length > 0 ? (records.map((record, index) => (
                  <BasketRecords
                    key={record.recId} 
                    record={record} 
                    index={index} 
                    handleFetch={handleFetch} 
                    setHandleFetch={setHandleFetch}
                    basketName={params.id}
                  />
                  ))) : <td colSpan="8" style={{ height: '250px', textAlign: 'center' }}>
                          {message}
                        </td>  
                  }
                  
              </tbody>
            }
          </table>
        </div>
      </div>

      <div className='flex justify-end items-center mt-8'>

          {/* Buttons Component */}
          
          {/* Conditional rendering based on comparison and records.length */}
            <>
              {/* <Button onClick={handleMapping} className='mr-8'>Map to Customer</Button> */}
              <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch}/>
              <SubmitBasket saved={saved} setSaved={setSaved} />
            </>

        </div>

    </div>
  )
}

export default UpdateBasket
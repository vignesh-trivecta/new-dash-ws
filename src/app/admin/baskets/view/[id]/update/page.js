'use client';

import { getBasketValue, getSpecificBasket } from '@/app/api/basket/route';
import { getRecords } from '@/app/api/tempBasket/route';
import BasketRecords from '@/components/admin/basketRecords';
import { segregate } from '@/utils/priceSegregator';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useSearchParams } from 'next/navigation';
import AddRecord from '@/components/admin/addRecord';
import SubmitBasket from '@/components/admin/submitBasket';
import { Alert, Button, Tooltip } from 'flowbite-react';
import { HiInformationCircle, HiCheck, HiCheckCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const UpdateBasket = ({ params }) => {

  const adminId = useSelector((state) => state.user.username);
    
  // local state variables
  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);
  const [message, setMessage] = useState('');
  const [transType, setTransType] = useState('');
  
  const pathname = usePathname();
  const router = useRouter();
  
  const [investmentVal, setInvestmentVal] = useState('');
  // useEffect to fetch 
  useEffect( () => {
    const gettingRecords = async () => {
      const response = await getBasketValue(params.id, adminId);
      console.log(response)
      setInvestmentVal(response[0].basketInvestAmt);
      setTransType(response[0].transactionType);
    };
    gettingRecords();
  }, []);
  
  // useEffect for getting records after basket save clicked
  const [saved, setSaved] = useState('');
  useEffect(() => {
    setRecords([]);
    setMessage(msg4);
  }, [saved])

    // useEffect to set the message at center of table
    useEffect(() => {
      if(investmentVal !== ''){
        setMessage(msg2);
      }
      else {
        setMessage(msg1);
      }
    }, [investmentVal]);
    
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
      if(pathname == '/admin/baskets/create' && records?.length !== 0){
        (setBasketState(true));
      }
      else{
        (setBasketState(false));
      }
      
      // setting the basket value
      let total = 0;
      records?.forEach((record) => {
        total += (record.priceValue * record.quantityValue);
      })
      setTotal(total);
      
      // condition to compare investment and basket value
      if(total > investmentVal){
        setComparison(false);
      }
      else{
        setComparison(true);
      }

      // condition to set msg5
      if(records?.length !== 0){
        setMessage(msg5);
      }
    }, [records]);
    
    // getting investment amount 
    
    const basketVal = segregate(total);

    const msg1 = "Enter Basket Name and Investment Amount";
    const msg2 = "Add scripts to the basket";
    const msg3 = "Basket name exists!";
    const msg4 = "Basket Saved Successfully!";
    const msg5 = `Basket Value is lesser than Investment Amount`;
    const msg6 = "Basket Value is higher than Investment Amount. Delete some scripts!"
    
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
          <input type="text" value={(investmentVal)} className="border border-gray-200 rounded-lg w-44 text-right" onChange={(e) => setInvestmentVal(e.target.value)} />
        </div>

        {/* Basket Type listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">Transaction Type</p>
          <select name="transactionType" id="transactionType" value={transType} onChange={e => setTransType(e.target.value)} className='border border-gray-200 rounded-md w-32'>
            <option value="BUY">BUY</option>
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
                {records && records?.length > 0 ? (records?.map((record, index) => (
                  <BasketRecords
                    key={record.recId} 
                    record={record} 
                    index={index} 
                    handleFetch={handleFetch} 
                    setHandleFetch={setHandleFetch}
                    basketName={params.id}
                    investmentVal={investmentVal}
                    basketVal={basketVal}
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
          { comparison && (investmentVal !== '')
            ? 
            <div className='flex justify-center space-x-2'>
              {/* <Button onClick={handleMapping} className='mr-8'>Map to Customer</Button> */}
              <div>
                <AddRecord handleFetch={handleFetch} setHandleFetch={setHandleFetch} transType={transType} investmentVal={investmentVal} basketVal={basketVal} mainBasketName={params.id} />
              </div>
              <div>
                {/* <SubmitBasket saved={saved} setSaved={setSaved} transType={transType} investmentAmount={investmentVal} actualValue={basketVal} mainBasketName={params.id} />               */}
                <Button onClick={() => {router.push('/admin/baskets/view')}}>Save & Close</Button>
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

export default UpdateBasket
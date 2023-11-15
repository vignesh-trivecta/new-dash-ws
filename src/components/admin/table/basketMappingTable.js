import React, { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import { mapBasket } from "@/app/api/map/baskets/route";
import { getCustomerStatus } from "@/app/api/map/baskets/route";
import { useSelector } from "react-redux";
import { segregate } from "@/utils/formatter/priceSegregator";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const BasketMappingTable = ({
  data,
  index,
  status,
  setStatus,
  basketName,
  basketVal,
  checkedBaskets,
  setCheckedBaskets,
  setTotalBasketValue,
  investment,
  basketData,
  setBasketData,
  total,
  setTotal,
  customerBasketsData
}) => {
  
  // broker inputs
  const brokers = [{ name: "AXIS" }, { name: "IIFL" }];

  // redux
  const adminId = useSelector((state) => state.user.username);

  // local state
  const [broker, setBroker] = useState(brokers[0].name);
  const [quantity, setQuantity] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [checked, setChecked] = useState(false);
  const [enableRow, setEnableRow] = useState(false);

useEffect(() => {
  const doBasketNamesIntersect = customerBasketsData?.some((item) => item.basketName === data?.basketName);
  if (doBasketNamesIntersect && customerBasketsData) {
    setEnableRow(true)
  }
  else if(!doBasketNamesIntersect && customerBasketsData) {
    setEnableRow(false)
  }
  else {
    setEnableRow(false)
  }
}, [customerBasketsData])


  const handleQuantityChange = (e) => {
    // Remove commas from the input value before updating state
    const newValue = e?.target?.value.replace(/,/g, "") || 0;
    setQuantity(newValue);
    setTotal({...total, [data.basketName] : Number(newValue * data.basketActualValue)});
    
    if (newValue == "" || newValue == 0 || newValue ==  null) {
      console.log('empty');
      delete basketData[data.basketName];
      return;
    }
    setBasketData({
      ...basketData,
      [data.basketName] : Number(newValue)
    })
    console.log(data.basketName)
  }


  // handle customer mapping
  const handleMapping = async (customerId) => {
    console.log("clicked");
    const response = await mapBasket(
      basketName,
      adminId,
      customerId,
      broker,
      basketVal
    );
    const status = await getCustomerStatus(basketName);
    if (status) {
      setStatus(status);
    }
  };

  // handle weblink
  const handleWeblink = async () => {};

  return (
    <tr key={index} className="border-b p-2 hover:bg-gray-100">
      <td className="text-sm text-black text-center font-semibold">
        <input 
          type="checkbox" 
          disabled={enableRow}
          checked={checked || enableRow}
          value={data.basketName} 
          id={data.basketName}
          onChange={(e) => {
            if (checked == false) {
              const newValue = e.target.value;
              setCheckedBaskets([...checkedBaskets, newValue]);
              setChecked(true);
            }
            else {
              const newValue = e.target.value;
              const newList = checkedBaskets.filter(arr => arr != newValue);
              setCheckedBaskets(newList);
              handleQuantityChange(0);
              setChecked(false);
            }
          }}  
        />
      </td>
      <td className="text-sm text-left text-black p-2 break-words">
        {data.basketName}
      </td>
      <td className="text-sm text-center text-black break-words">
        {data.basketCategory}
      </td>
      <td className="text-sm text-center text-black break-words">
        {data.totalNoOrders}
      </td>
      <td className="text-sm text-center text-black break-words">
        {data.transactionType}
      </td>
      <td className="text-sm text-right text-black">
        {segreagatorWoComma(data?.basketActualValue)}
      </td>
      <td className=" text-sm text-black">
        <input 
          type='text' 
          value={segregate(quantity)}
          id='quantity'
          disabled={!checked}
          onChange={(e) => {
            handleQuantityChange(e);
          }}
          className={`ml-10 w-20 h-8 text-right rounded-md ${checked ? ( quantity ? "border-gray-200" :"border-red-500") : "border-gray-200"}`}
        />
      </td>
      {/* <td className="text-sm text-center text-black">
                <select className="text-xs border-gray-200 rounded-md" value={broker} onChange={e => setBroker(e.target.value)} >
                    <option className="text-sm" value={'AXIS'}>AXIS</option>
                    <option className="text-sm" value={'IIFL'}>IIFL</option>
                </select>
            </td>
            <td className=" text-sm text-black">
                <input 
                    id='investment'
                    value={segregate(investment)}
                    disabled={enableInputs}
                    onChange={(e) => {
                        // Remove commas from the input value before updating state
                        const newValue = e.target.value.replace(/,/g, "");
                        setInvestment(newValue);
                        setTotal(basketVal * quantity);
                    }}
                    type='text' 
                    className={`w-20 h-8 text-right border-gray-300 rounded-md`}
                />
            </td>
            <td className=" text-sm text-black">
                <input 
                    id='quantity'
                    value={segregate(quantity)}
                    disabled={enableInputs}
                    onChange={(e) => {
                        // Remove commas from the input value before updating state
                        const newValue = e.target.value.replace(/,/g, "");
                        setQuantity(newValue);
                        setTotal(basketVal * newValue);
                    }}
                    type='text' 
                    className={`ml-2 w-20 h-8 text-right border-gray-300 rounded-md`}
                />
            </td>
            <td className=" text-sm text-black">
                <input 
                    disabled
                    id='total'
                    value={segregate(total)}
                    onChange={(e) => {
                        // Remove commas from the input value before updating state
                        const newValue = e.target.value.replace(/,/g, "");
                        setTotal(newValue)
                    }}
                    type='text' 
                    className={`ml-2 w-20 h-8 text-right border-gray-300 bg-gray-100 rounded-md ${highlight ? 'border-red-500' : 'border-gray-300'}`}
                />
            </td> */}
      {/* Map status */}
      {/* <td>
                <div className="ml-8">
                    {status.find((obj) =>{ return (obj.customerId === data.customerId) }) 
                    ?
                        <svg className="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    : 
                        <svg className="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    }
                </div>  
            </td> */}
      {/* Weblink status */}
      {/* <td>
                <div className="ml-6">
                    <svg className="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </div>
            </td> */}
      {/* Actions button group */}
      {/* Map customer */}
      {/* Send Weblink */}
      {/* <td className=" flex text-sm text-black mt-2 ml-6 space-x-2">
                <Tooltip content="Map Customer">
                    <button disabled={enableButtons} className="" onClick={() => {handleMapping(data.customerId)}}>
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"/>
                    </svg>
                    </button>
                </Tooltip>
                <Tooltip content="Send Weblink">
                    <button disabled={enableButtons} className="">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        </svg>
                    </button>
                </Tooltip>
            </td> */}
    </tr>
  );
};

export default BasketMappingTable;
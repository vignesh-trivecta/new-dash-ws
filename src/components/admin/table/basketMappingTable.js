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
  const [highlightSent, setHighlightSent] = useState(false);

  
const checkSimilarity = () => {
  const doBasketNamesIntersect = customerBasketsData?.some((item) => item.basketName === data?.basketName);
  return doBasketNamesIntersect;
}

useEffect(() => {
  const result = checkSimilarity();
  if (result && customerBasketsData) {
    setEnableRow(true);
    setHighlightSent(true);
  }
  else if(!result && customerBasketsData) {
    setEnableRow(false);
    setHighlightSent(false);
  }
  else {
    setEnableRow(false);
    setHighlightSent(false);
  }
}, [customerBasketsData])


  const handleQuantityChange = (e) => {
    // Remove commas from the input value before updating state
    const newValue = e?.target?.value.replace(/,/g, "") || 0;
    setQuantity(newValue);
    setTotal({...total, [data.basketName] : Number(newValue * data.basketActualValue)});
    
    if (newValue == "" || newValue == 0 || newValue ==  null) {
      delete basketData[data.basketName];
      return;
    }
    setBasketData({
      ...basketData,
      [data.basketName] : Number(newValue)
    })
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
    <tr key={index} className={`border-b p-2 hover:bg-gray-100 ${highlightSent ? "bg-red-100" : ""}`}>
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
              console.log('enter 1')
            }
            else {
              const newValue = e.target.value;
              const newList = checkedBaskets.filter(arr => arr != newValue);
              setCheckedBaskets(newList);
              handleQuantityChange(0);
              setChecked(false);
              console.log('enter 2')
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
    </tr>
  );
};

export default BasketMappingTable;
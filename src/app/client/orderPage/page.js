'use client';

import React, {useEffect, useRef, useState} from 'react';
import { segreagatorWoComma } from '@/utils/formatter/segregatorWoComma';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import { useSelector } from "react-redux";
import Logo from "../../../../public/logo1.png";
import { useRouter, useSearchParams } from "next/navigation";
import { checkPageValidity } from '@/app/api/client/orderPage/route';

const OrderPage = () => {

  
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // url search params
  const searchParams = useSearchParams();
  const ssoId = searchParams.get("ssoId");
  
  const router = useRouter();
  
  // redux
  const basketData = useSelector((state) => state.client.basketData);
  
  // local state
  const [data, setData] = useState([]);
  const [broker, setBroker] = useState(basketData.customerBroker);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [showDeclinePage, setShowDeclinePage] = useState(false);
  const [loadingCButton, setLoadingCButton] = useState(false);
  const [timer, setTimer] = useState("02:00");
  const [timeOver, setTimeOver] = useState(false);
  const [isPageValid, setIsPageValid] = useState(true);
  
  const getBasketValidity = async () => {
    const {data, status} = await checkPageValidity(basketData);
    if (status !== 200) {
      setIsPageValid(false);
      setMessage(data);
    }
  }

  useEffect(() => {
    getBasketValidity();
  }, [])
  
  // calculating the value of the basket
  let basketValue = 0;
  const dataValue = basketData?.rows?.map((record) => {
    let i =
    (record?.limitPrice != 0 ? record?.limitPrice : record?.priceValue) *
    record?.quantityValue;
    basketValue = basketValue + i;
  });
  
  // function to hanlde the order placement
  const handlePlaceOrder = () => {
    router.push(`/client/placeOrder?ssoId=${ssoId}`);
  }
  
  // function to handle the decline button 
  const handleDecline = () => {
    // router.push('/client/response')
    setShowDeclinePage(true);
  }

  // calculate the time between target and current time
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds};
  }

  // function to start the timer and set timer state value
  const startTimer = (e) => {
    let {total, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes)
        + ":" +
        (seconds > 9 ? seconds : "0" + seconds) 
      )
    }
    else {
      // router.push("/client/response")
      setTimeOver(true);
    }
  }

  // function to start setInterval every 1 sec and clear Interval after end
  const clearTimer = (e) => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      startTimer(e);
      if (i > 120) clearInterval(Ref.current);
    }, 1000);
    Ref.current = id;
  }

  // function to set the target timer
  const getDeadLineTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  }

  // useEffect to start countdown timer   
  useEffect(() => {
    clearTimer(getDeadLineTime());
  }, [])


  return (
    isPageValid
    ? 
      (timeOver 
      ?
      (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-lg text-center text-red-700">Order Time Out!</p>
          <p className="text-lg text-center underline">Please close this tab</p>
        </div>
      )
      :
      (
        !showDeclinePage
          ?
          (
            <div className="w-full p-4 h-[100vh] overflow-y-scroll">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="flex">
                <Image src={Logo} alt="wealth spring logo" />
                <div></div>
              </div>
              <div className="flex ml-44">
                <div className=''>Page expires in: <div className='bg-red-500 p-1 rounded-md text-white w-14 inline-block'><span className=''>{timer}</span></div></div>
              </div>
              <div className="p-2">
                <div className="flex sm:justify-center space-x-2 text-left">
                  <p className=" font-semibold text-sm md:text-base">
                    Basket name:{" "}
                  </p>
                  <p className="text-sm md:text-base">
                    {basketData?.basketName}
                  </p>
                </div>
                <div className="flex sm:justify-center space-x-2 text-left">
                  <p className=" font-semibold text-sm md:text-base">
                    Basket Category:{" "}
                  </p>
                  <p className="text-sm md:text-base">
                    {basketData?.basketCategory}
                  </p>
                </div>
                <div className="flex justify-center space-x-10 text-xs md:text-sm mt-4">
                  <div className="">
                    <p>No.of Scripts</p>
                    <input
                      disabled
                      type="number"
                      value={basketData?.rows?.length}
                      className="w-20 sm:w-24 border-gray-200 bg-gray-50 rounded-md text-right text-xs md:text-sm"
                    />
                  </div>
                  <div className="">
                    <p>Basket Type</p>
                    <input
                      disabled
                      type="text"
                      value={basketData?.rows[0]?.transType}
                      className="w-20 sm:w-24 border-gray-200 bg-gray-50 rounded-md text-left text-xs md:text-sm"
                    />
                  </div>
                  <div className="">
                    <p>Basket Value &#8377;</p>
                    <input
                      disabled
                      type="text"
                      value={segreagatorWoComma(basketValue)}
                      className="w-20 sm:w-28 border-gray-200 bg-gray-50 rounded-md text-right text-xs md:text-sm"
                    />
                  </div>
                </div>
                {/* Table showing baskets to client */}
                <div className="flex md:justify-center md:items-center mt-4">
                  <table className="table-fixed border">
                    <thead className="border-b text-xs md:text-sm bg-gray-50">
                      <tr>
                        <th className="md:p-2 p-1">S.No</th>
                        <th className="md:p-2 p-1">Scripts</th>
                        <th className="md:p-2 p-1">Price &#8377;</th>
                        <th className="md:p-2 p-1">Quantity</th>
                        <th className="md:p-2 p-1">Total &#8377;</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs md:text-sm">
                      {basketData?.rows?.map((record, index) => {
                        return (
                          <tr className="border-b hover:bg-gray-100" key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="truncate p-2 break-words">
                              {record?.instrumentName}
                            </td>
                            <td className="text-right">
                              {record?.limitPrice != 0
                                ? segreagatorWoComma(record?.limitPrice)
                                : segreagatorWoComma(record?.priceValue)}
                            </td>
                            <td className="text-right pr-4">
                              {record?.quantityValue}
                            </td>
                            <td className="text-right pr-2">
                              {segreagatorWoComma(
                                (record?.limitPrice != 0
                                  ? record?.limitPrice
                                  : record?.priceValue) * record?.quantityValue
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
    
                {/* Button groups */}
                <div className="flex justify-center space-x-4 mt-4">
                  <Button
                    isProcessing={loadingCButton}
                    disabled={disableButton}
                    onClick={() => {
                      handlePlaceOrder();
                    }}
                  >
                    {loadingCButton ? "Placing..." : "Place Order"}
                  </Button>
                  <Button 
                    color="gray" 
                    disabled={disableButton}
                    onClick={handleDecline} 
                  >
                    Decline
                  </Button>
                </div>
                {/* <p className="text-red-500 font-bold flex justify-center mt-4">
                  {message}
                </p> */}
              </div>
            </div>
          </div>
        )
        :
          (
            <div className="flex flex-col justify-center items-center h-screen">
              <p className="text-lg text-center text-green-700">Thank you!</p>
              {/* <p className="text-lg text-center text-green-700">Your response has been saved.</p> */}
              <p className="text-lg text-center">Please close this tab</p>
            </div>
          )
          )
      )
      :
      (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-lg text-center text-red-700">{message}</p>
          <p className="text-lg text-center">Please close this tab</p>
        </div>
      )
  )
}

export default OrderPage

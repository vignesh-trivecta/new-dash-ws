"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/logo1.png";
import { Button } from "flowbite-react";
import { clientConfirmsBasket, directOrderPlacement, getAxisUrl } from "@/app/api/client/route";
import { clientLogin } from "@/app/api/login/route";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const BasketPage = () => {
  // redux
  const basketData = useSelector((state) => state.client.basketData);
  const customerId = basketData.customerId;

  // local state
  const [data, setData] = useState([]);
  const [broker, setBroker] = useState(basketData.customerBroker);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [loadingCButton, setLoadingCButton] = useState(false);

  // nextjs router
  const router = useRouter();

 // calculating the value of the basket
  let basketValue = 0;
  const dataValue = basketData?.rows?.map((record, index) => {
    let i =
      (record?.limitPrice != 0 ? record?.limitPrice : record?.priceValue) *
      record?.quantityValue;
    basketValue += i;
  });

  // OAuth login redirect after click on submit button
  const handleConfirm = async (e) => {
    setLoadingCButton(true);

    // // IIFL redirect logic
    if (broker === "IIFL") {

      // if (basketData.customerBroker === "IIFL" && basketData.loginStatus === "Y") {
      //   console.log("enter")
      //   // axisDirectOrderPlacement();
      //   router.push("/client/placeOrder");
      // }
      // else if (basketData.customerBroker === "IIFL" && basketData.loginStatus === "N") {
      //   console.log("enter")
      //   const res = await clientLogin(customerId);
      //   if (res) {
      //     console.log("enter")
      //     const response = await clientConfirmsBasket(basketData);
      //     if(response){
      //       console.log("enter")
      //       setData(response);
      //       router.push("/client/placeOrder");
      //     }
      //   }
      // }

      // const res = await clientLogin(customerId);

      var f = document.createElement("form");
      f.action = "https://ttweb.indiainfoline.com/trade/Login.aspx";
      f.method = "POST";

      var i1 = document.createElement("input");
      i1.type = "hidden";
      i1.name = "VP";
      i1.value = "http://localhost:3000/client/orderPagge";
      f.appendChild(i1);

      var i2 = document.createElement("input");
      i2.type = "hidden";
      i2.name = "UserKey";
      i2.value = "iGGlgBzeHZ35T8yxxC5kmW2ziUw7RraD";
      f.appendChild(i2);

      document.body.appendChild(f);
      f.submit();
    }

    // axis redirect logic
    else if (broker === "AXIS") {
        router.push(url);
      // if (basketData.customerBroker === "AXIS" && basketData.loginStatus === "Y") {
      //   // axisDirectOrderPlacement();
      //   // router.push("/client/placeOrder");
      //   router.push(url);
      // }
      // else if (basketData.customerBroker === "AXIS" && basketData.loginStatus === "N") {
      //   router.push(url);
      // }
    }
  };

  const handleDecline = () => {
    router.push('/client/response')
  }

  const getAndSetUrl = async () => {
    // login the customer to AXIS
    const response = await getAxisUrl(basketData.customerId);

    // if-else after customer login over
    if (response) {
      setUrl(response);
    } else {
      setDisableButton(true);
      setMessage(
        `${basketData.customerBroker}` +
          "Server Error! Please try after some time."
      );
    }
  };


  useEffect(() => {
    if (basketData.customerBroker === "AXIS") {
      getAndSetUrl();
    }
  }, []);

  return (
    <div className="w-full p-4 h-[100vh] overflow-y-scroll">
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex">
          <Image src={Logo} alt="wealth spring logo" />
          <div></div>
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
                onClick={(e) => {
                  handleConfirm();
                }}
              >
                {loadingCButton ? "Redirecting..." : "Login to Broker"}
              </Button>
              <Button 
                color="gray" 
                disabled={disableButton}
                onClick={handleDecline} 
              >
                Decline
              </Button>
            </div>
            <p className="text-red-500 font-bold flex justify-center mt-4">
              {message}
            </p>
          </div>
      </div>
    </div>
  );
};

export default BasketPage;

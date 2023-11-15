import React, { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import { mapBasket, sendWeblink } from "@/app/api/map/baskets/route";
import { useSelector } from "react-redux";
import { segregate } from "@/utils/formatter/priceSegregator";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const CustomerMappingTable = ({
  data,
  index,
  enableInputs,
  basketName,
  basketVal,
  scripts,
  enableBroker,
  setMessage,
  status
}) => {

  // redux
  const adminId = useSelector((state) => state.user.username);  

  // local state
  const [broker, setBroker] = useState("");
  const [investment, setInvestment] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [enableMap, setEnableMap] = useState(false);
  const [enableWeblink, setEnableWeblink] = useState(false);
  const [mapCondition, setMapCondition] = useState(false);
  const [webCondition, setWebCondition] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  // useEffect(() => {
  //   setBroker("");
  //   setInvestment("");
  //   setQuantity("");
  //   setTotal("");
  // }, [status])

  useEffect(() => {
    const map = status.map((obj) => {
      const customer = obj.customerId;
      const brk = obj.brokerName;
      const map = obj.mapStatus;
      // const web = obj.webLinkStatus;
      if ((customer == data.customerId) && (brk == broker) && (map)) {
        return true;
      }
    }).includes(true);
    const web = status.map((obj) => {
      const customer = obj.customerId;
      const brk = obj.brokerName;
      const web = obj.webLinkStatus;
      if ((customer == data.customerId) && (brk == broker) && (web)) {
        return true;
      }
    }).includes(true);

    console.log(map, web)

    setMapCondition(map);
    setWebCondition(web);
  },[status, broker])

  // handle customer mapping
  const handleMapping = async (customerId) => {
    const response = await mapBasket(
      basketName,
      adminId,
      customerId,
      broker,
      quantity
    );
    setMessage(response)
    // setBroker("");
    // setInvestment("");
    // setQuantity("");
    // setTotal("");
  };

  // handle broker selection
  const handleBrokerSelection = async (e) => {
    const broker = e.target.value;
    setBroker(broker);
  }

  // handle weblink
  const handleWeblink = async () => {
    const response = await sendWeblink(basketName, adminId, data.customerId, broker, quantity);
    console.log(response);
    setMessage(response)
  };

  useEffect(() => {
    if (Number(investment) !== 0 && Number(quantity) !== 0) {
      // setEnableButtons(false);
      if (mapCondition) {
        setEnableMap(true)
      } else {
        setEnableMap(false);
      }
      if (webCondition) {
        setEnableWeblink(true);
      } else {
        setEnableWeblink(false);
      }
    } else {
      // setEnableButtons(true);
      setEnableMap(true);
      setEnableWeblink(true);
    }

    if (Number(total) > Number(investment)) {
      setHighlight(true);
      setMessage("Basket Total is greater than Investment")
      // setEnableButtons(true);
      setEnableMap(true);
      setEnableWeblink(true);
    } else {
      setHighlight(false);
      setMessage("")
    }
  }, [investment, quantity]);

  return (
    <tr key={index} className="border-b p-2 hover:bg-gray-100">
      <td className="text-sm text-black text-center font-semibold">
        {index + 1}
      </td>
      <td className="text-sm text-left text-black p-2 break-words">
        {data.customerId}
      </td>
      <td className="text-sm text-left text-black break-words">
        {data.name}
      </td>
      <td className="text-sm text-center text-black">
        <select
          className="text-xs border-gray-200 rounded-md"
          value={broker}
          onChange={handleBrokerSelection}
          disabled={enableBroker}
        >
          <option disabled className="text-sm" value={""}>
            - Select -
          </option>
          <option className="text-sm" value={"AXIS"}>
            AXIS
          </option>
          <option className="text-sm" value={"IIFL"}>
            IIFL
          </option>
        </select>
      </td>
      <td className=" text-sm text-black">
        <input
          id="investment"
          value={segregate(investment)}
          disabled={enableInputs}
          onChange={(e) => {
            // Remove commas from the input value before updating state
            const newValue = e.target.value.replace(/,/g, "");
            setInvestment(newValue);
            setTotal(basketVal * quantity);
          }}
          type="text"
          className={`w-28 h-8 text-right border-gray-300 rounded-md text-sm`}
        />
      </td>
      <td className=" text-sm text-black">
        <input
          id="quantity"
          value={segregate(quantity)}
          disabled={enableInputs}
          onChange={(e) => {
            // Remove commas from the input value before updating state
            const newValue = e.target.value.replace(/,/g, "");
            setQuantity(newValue);
            setTotal(basketVal * newValue);
          }}
          type="text"
          className={`ml-2 w-24 h-8 text-right border-gray-300 rounded-md text-sm`}
        />
      </td>
      <td className=" text-sm text-black">
        <input
          disabled
          id="total"
          value={segreagatorWoComma(total)}
          type="text"
          className={`w-28 h-8 text-right border-gray-300 bg-gray-100 rounded-md text-sm ${
            highlight ? "border-red-500" : "border-gray-300"
          }`}
        />
      </td>
      {/* Map status */}
      <td>
        <div className="ml-8">
          { mapCondition ? (
            <svg
              className="w-4 h-4 text-green-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-red-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          )}
          </div>
      </td>
      {/* Weblink status */}
      <td>
        <div className="ml-8">
          { webCondition ? (
            <svg
              className="w-4 h-4 text-green-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-red-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          )}
          </div>
      </td>
      {/* Actions button group */}
      <td className=" flex text-sm text-black mt-2 ml-6 space-x-2">
        {/* Map customer */}
        <Tooltip content="Map Customer">
          <button
            disabled={enableMap}
            className=""
            onClick={() => {
              handleMapping(data.customerId);
            }}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
              />
            </svg>
          </button>
        </Tooltip>
        {/* Send Weblink */}
        <Tooltip content="Send Weblink">
          <button 
            disabled={enableWeblink} 
            className=""
            onClick={() => {
              handleWeblink();
            }}
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
          </button>
        </Tooltip>
      </td>
    </tr>
  );
};

export default CustomerMappingTable;

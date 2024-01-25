"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Button, Tooltip } from "flowbite-react";
import {
  getBasketList,
  getCustomers,
} from "@/app/api/basket/route";
import { segregate } from "@/utils/formatter/priceSegregator";
import BasketMappingTable from "@/components/admin/table/basketMappingTable";
import { fetchByGroupAndSend, fetchDetailsByCustomer, fetchDetailsByGroupName, getBasketGroups, sendMultipleBaskets, unMapMultipleBaskets } from "@/app/api/map/baskets/route";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";
import StaticBasketMappingTable from "@/components/admin/table/staticBasketMappingTable";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import BasketCategory from "@/components/admin/basketCategory";

const BasketMapping = () => {

  // broker inputs
  const brokers = [{ name: "AXIS" }, { name: "IIFL" }];
  
  // redux
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.user.username);

  // local state
  const [basketName, setBasketName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [records, setRecords] = useState([]);
  const [investment, setInvestment] = useState(undefined);
  const [totalBasketValue, setTotalBasketValue] = useState(0);
  const [total, setTotal] = useState({});
  const [basketVal, setBasketVal] = useState("");
  const [broker, setBroker] = useState("");
  const [enableMap, setEnableMap] = useState(true);
  const [enableWeblink, setEnableWeblink] = useState(true);
  const [checkedBaskets, setCheckedBaskets] = useState([]);
  const [errorHighlight, setErrorHighlight] = useState(false);
  const [basketData, setBasketData] = useState({});
  // const [aliasName, setAliasName] = useState("");
  const [basketGroups, setBasketGroups] = useState([]);
  const [basketDetails, setBasketDetails] = useState([]);
  const [selectedBasketGroup, setSelectedBasketGroup] = useState("");
  const [showGNStaticData, setShowGNStaticData] = useState(false);
  const [customerBasketsData, setCustomerBasketsData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [sendingMap, setSendingMap] = useState(false);
  const [sendingWeblink, setSendingWeblink] = useState(false);
  const [buttonName, setButtonName] = useState("Map");
  const [reset, setReset] = useState(false);
  const [inputName, setInputName] = useState("");
  
  const handleResetClick = () => {
    // Toggle the reset state
    setReset((prevReset) => !prevReset);
    setTotalBasketValue(0);
    setTotal(0);
    setErrorMsg("");
    setInputName("");
  };


  // modal state variables
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  
  // nextjs router
  const router = useRouter();

  // messages
  const msg1 = "Mapping Successful";
  const msg2 = "Unmapping Successful";
  const msg3 = "Weblink has been sent Successfully";
  const msg4 = "Basket Total is greater than Investment";
  const msg5 = "Basket already exists";

  // handle selection
  const handleSelection = async (value) => {
    setCustomerId(value);
    setBroker("");
    setInvestment(0);
    // setAliasName("");
    setTotalBasketValue(0);
    setTotal(0);
    setCustomerBasketsData([]);
    setCheckedBaskets([]);
  };

  // handle map click
  const handleMapClick = async () => {
    setSendingMap(true);
    if (buttonName === "Map") {
      const { status, data } = await sendMultipleBaskets(
        basketData,
        adminId,
        customerId,
        broker,
        inputName
      );
      if (status === 200) {
        setButtonName("UnMap");
        setEnableWeblink(false);
        fetchBasketGroups();
      }
      else {
        setButtonName("Map");
        setEnableWeblink(true);
      }
      setSendingMap(false);
      setMessage(data.messages);
    } 
    else {
      const { status, data } = await unMapMultipleBaskets(selectedBasketGroup, customerId);
      if (status === 200) {
        setButtonName("Map");
        setInputName("");
        handleResetClick();
        setEnableWeblink(false);
        fetchBasketGroups();
        setCustomerId("");
        setBroker("");
        setInvestment(0);
        setSelectedBasketGroup("");
      }
      else {
        setButtonName("UnMap");
        setEnableWeblink(true);
      }
      setSendingMap(false);
      setMessage(data.messages);
    }
  };

  // handle Weblink click 
  const handleWebLinkClick = async () => {
    setSendingWeblink(true);
    const { status, data } = await fetchByGroupAndSend(selectedBasketGroup, customerId);
    if (status) {
      setSendingWeblink(false);
      setMessage(data.messages);
    }
  }
  
  // fetch the list of baskets 
  const fetchBaskets = async () => {
    const { status, data } = await getBasketList("MAP");
    setRecords(data);
  };
  
  // fetch the customer data list
  const fetchData = async () => {
    const { status, data } = await getCustomers();
    setCustomers(data);
  };
  
  // get the basket groups name list
  const fetchBasketGroups = async () => {    
    const { status, data } = await getBasketGroups();
    setBasketGroups(data);
  }
  
  // fetch the bakset-group data details
  const getBasketDetails = async () => {
    const { status, data } = await fetchDetailsByGroupName(selectedBasketGroup);
    setBasketDetails(data);
    const total = data?.basketDetailsList?.reduce((acc, curr) => curr.basketActualValue  + acc, 0);
    if (data !== null && data?.customerId !== null) {
      setCustomerId(data.customerId);
      // setAliasName(selectedBasketGroup);
      setTotalBasketValue(total);
      setBroker(data.customerBroker);
      setShowGNStaticData(true);
      setButtonName("UnMap");
      setEnableMap(false);
      setEnableWeblink(false);
    }
  }

  // fetch the basket data for each customer
  const getCustomerBasketsData = async () => {
    const { status, data } = await fetchDetailsByCustomer(selectedBasketGroup, customerId);
    
    if (data !== null && data?.customerId !== null) {
      setCustomerBasketsData(data?.basketDetailsList);
    }
    else {
      setCustomerBasketsData([]);
    }
  }

  // useEffect to fetch the view table baskets
  useEffect(() => {
    fetchBaskets();
    fetchData();
    fetchBasketGroups();
  }, []);

  // useEffect to fetch data based on basket group name selection
  useEffect(() => {
    if (selectedBasketGroup !== "") { 
      getBasketDetails();
    }
  }, [selectedBasketGroup])

  // useEffect to fetch data based on basket group name selection
  useEffect(() => {
    getCustomerBasketsData();
  }, [customerId])

  useEffect(() => {

    if (errorMsg != "") {
      setEnableMap(true);
      setEnableWeblink(true);
      return;
    }
    
    if (Number(totalBasketValue) === 0 || Number(investment) === NaN || inputName === '') {
      setEnableMap(true);
      setEnableWeblink(true);
      if (selectedBasketGroup) {
        setEnableMap(false);
        setEnableWeblink(false);
      }
      return;
    }
    
    if (Number(totalBasketValue) > Number(investment) && Number(totalBasketValue) != 0) {
      setMessage(msg4);
      setEnableMap(true);
      setEnableWeblink(true);
      if (showGNStaticData) {
        setEnableMap(false);
        setEnableWeblink(false);
        return;
      }
      return;
    }
        
    setEnableMap(false);
    setEnableWeblink(false);
  }, [investment, totalBasketValue, inputName]);

  useEffect(() => {
    const result = Object.values(total).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setTotalBasketValue(result);
  }, [total]);

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
      <h5 className="font-bold mb-2">Map Baskets</h5>
      <div className="flex justify-between items-center space-x-4">
        {/* Basket Names listbox */}
        {
          showGNStaticData 
          ?
          (
            <div className="flex flex-col items-left ">
              <label className="text-black text-sm dark:text-white">
                Select Customer
              </label>
              <Tooltip content={customerId}>
              <select
                name="customer"
                id="customer"
                className="border border-gray-200 rounded-md w-36 text-sm"
                disabled
                >
                <option selected>
                  {customerId}
                </option>
              </select>
             </Tooltip>
            </div>
          )
          :
          (
            <div className="flex flex-col items-left ">
              <label className="text-black text-sm dark:text-white">
                Select Customer
              </label>
              <select
                name="customer"
                id="customer"
                className="border border-gray-200 rounded-md w-36 text-sm"
                defaultValue={""}
                value={customerId}
                onChange={(e) => {
                  handleSelection(e.target.value);
                  setMessage("");
                }}
              >
                <option disabled value="">
                  - Select -
                </option>
                {customers?.map((record) => (
                  <option key={customers.customerId} value={customers.customerId}>
                    {record.customerId + " - " + record.name}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        {/* Broker Type */}
        <div className="flex flex-col items-left ">
          <label className="text-black text-sm dark:text-white">Broker</label>
          <select
            className="text-sm border-gray-200 rounded-md w-36 h-10"
            defaultValue={""}
            value={broker}
            disabled={showGNStaticData}
            onChange={(e) => {
              setBroker(e.target.value); 
              setMessage("");
            }}
          >
            <option disabled className="text-sm" value={""}>
              - Select -
            </option>
            { showGNStaticData 
              ?
              (
                <option className="text-sm">
                  {broker}
                </option>
              )
              :
              (brokers.map((data,index) => {
                return <option key={index} value={data.name}>
                        {data.name}
                      </option> 
              }))
            }
          </select>
        </div>

        {/* investment value */}
        <div className="flex flex-col items-left ">
          <label className="text-black text-sm dark:text-white">
            Investment/ Sale Value &#8377;
          </label>
          <input
            type="text"
            disabled={showGNStaticData}
            value={segregate(investment)}
            onChange={(e) => {
              // setMessage("");
              // Remove commas from the input value before updating state
              const newValue = e.target.value.replace(/,/g, "");
              setInvestment(newValue);
            }}
            className="border border-gray-200  text-right rounded-lg w-36 text-sm"
          />
        </div>

        {/* Basket Group Name */}
        {/* <div className="flex flex-col items-left ">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket Group Name
          </p>
          <input
            type="text"
            value={aliasName}
            disabled={showGNStaticData}
            onChange={(e) =>{ 
              setMessage("");
              setAliasName(e?.target.value);
            }}
            className="border border-gray-200  text-right rounded-lg w-36 text-sm"
          />
        </div> */}

        
        {/* Basket Group Name */}
        <div className="flex flex-col items-left ">
          <div className="flex items-center">
            <p className="text-black text-sm dark:text-white mr-2">
              Basket Group Name
            </p>
            <Tooltip content={"Name should be less than 20 characters"}>
              <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
            </Tooltip>
          </div>
          <div className="relative w-44 z-10 border rounded-md">
            <BasketCategory 
              selected={selectedBasketGroup}
              setSelected={setSelectedBasketGroup}
              isDisabled={true}
              pageName={"basketMapping"}
              setErrorMsg={setErrorMsg}
              customerId={customerId}
              broker={broker}
              investment={investment}
              setEnableMap={setEnableMap}
              setEnableWeblink={setEnableWeblink}
              inputName={inputName}
              setInputName={setInputName}
            />
          </div>
          <div className="text-red-500 text-xs absolute top-52">
            {errorMsg ? errorMsg : ""}
          </div>
        </div>


        {/* Buttons group */}
        <div className="mt-4">
          <Button isProcessing={sendingMap} size={'sm'} disabled={enableMap} onClick={handleMapClick}>
            <div className="w-10 flex justify-center">{buttonName}</div>
          </Button>
        </div>

        {/* Group basket selector */}
        {/* <div className="flex flex-col items-left ">
          <label className="text-black text-sm dark:text-white">Select Basket Group</label>
          <select
            name="basketGroups"
            id="basketGroups"
            className="border border-gray-200 rounded-md w-36 text-sm"
            defaultValue=""
            value={selectedBasketGroup}
            onChange={(e) => {
              setSelectedBasketGroup(e?.target.value);
              setEnableWeblink(false);
              // setShowGNStaticData(true);
              setMessage("");
            }}
          >
            <option disabled value="">
              - Select -
            </option>
            {basketGroups?.map((record, index) => (
              <option key={index} value={record.groupName}>
                {record.groupName}
              </option>
            ))}
          </select>
        </div> */}
          
        <div className="mt-4">
          <Button isProcessing={sendingWeblink} size={'sm'} onClick={handleWebLinkClick} disabled={enableWeblink}>
            {sendingWeblink ? "Sending" : "Weblink"}
          </Button>
        </div>
        
        <Tooltip content="Reset">
          <button 
            className="mt-4 bg-cyan-700 hover:bg-cyan-600 rounded-md p-1.5 text-white hover:cursor-pointer"
            onClick={() => {
              setShowGNStaticData(false);
              // setAliasName("");
              setTotalBasketValue(0);
              setInvestment(0);
              setSelectedBasketGroup("");
              setEnableWeblink(true);
              setCustomerId("");
              setBroker("");
              setMessage("");
              setButtonName("Map");
              handleResetClick();
            }} 
          >
            Reset
          </button>
        </Tooltip>
      </div>

      {/* Customer Details table */}
      <div className="flex flex-col mt-8">
        <div className={"overflow-y-scroll border h-[calc(100vh-320px)]"}>
          <table className="table-fixed w-full overflow-y-scroll overflow-x-scroll">
            <thead className="border-b sticky top-0 bg-gray-50">
              <tr>
                <th className="font-medium text-sm w-16 ml-4 p-2">#</th>
                <th className="font-medium text-sm text-left break-words w-32">
                  Basket Name
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Basket Category
                </th>
                {/* <th className="font-medium text-left text-sm w-44 break-words">
                  Email
                </th> */}
                <th className="font-medium text- text-sm break-words">
                  # Scripts
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Transaction Type
                </th>
                <th className="font-medium mr-4 text-sm break-words">
                  Basket value &#8377;
                </th>
                <th className="font-medium text-sm break-words"># Basket Units</th>
              </tr>
            </thead>
            <tbody className="" style={{ width: "100%" }}>
              {
                !showGNStaticData
                ?
                  (records?.map((data, index) => {
                    return (
                      <BasketMappingTable
                        data={data}
                        index={index}
                        status={status}
                        setStatus={setStatus}
                        basketName={basketName}
                        basketVal={basketVal}
                        checkedBaskets={checkedBaskets}
                        setCheckedBaskets={setCheckedBaskets}
                        totalBasketValue={totalBasketValue}
                        setTotalBasketValue={setTotalBasketValue}
                        investment={investment}
                        basketData={basketData}
                        setBasketData={setBasketData}
                        total={total}
                        setTotal={setTotal}
                        basketDetails={basketDetails.basketDetailsList}
                        customerBasketsData={customerBasketsData}
                        reset={reset}
                      />
                    );
                  }))
                :
                  (
                      basketDetails?.basketDetailsList?.map((data, index) => {
                        return (
                          <StaticBasketMappingTable 
                            data={data} 
                            index={index}
                          />
                        )
                      })
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="w-96">
        {message === msg1 || message === msg2 || message === msg3
          ?
            <Alert
              color="success"
              rounded
              className="h-12"
              icon={IoCheckmarkDoneCircle}
            >
              <span className="w-4 h-4">{message}</span>
            </Alert>
          :
            (
              message 
              ? 
              <Alert
              color="warning"
              rounded
              className="h-12"
              icon={HiInformationCircle}
            >
              <span className="w-4 h-4">{message}</span>
              </Alert>
              : ""
            )
          }
        </div>

        {/* Disabled basket value */}
        <div className="flex items-center ">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket Total &#8377;
          </p>
          <input
            disabled
            type="text"
            value={segreagatorWoComma(totalBasketValue)}
            className={`border rounded-lg w-44 text-right bg-gray-50 text-sm ${
              errorHighlight ? "border-red-500 " : "border-gray-200"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default BasketMapping;

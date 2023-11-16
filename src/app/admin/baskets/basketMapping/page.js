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
import { fetchByGroupAndSend, fetchDetailsByCustomer, fetchDetailsByGroupName, getBasketGroups, sendMultipleBaskets } from "@/app/api/map/baskets/route";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";
import StaticBasketMappingTable from "@/components/admin/table/staticBasketMappingTable";
import { FcRefresh } from "react-icons/fc";

const BasketMapping = () => {
  // broker inputs
  const brokers = [{ name: "AXIS" }, { name: "IIFL" }];
  const customersList = [];

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
  const [aliasName, setAliasName] = useState("");
  const [basketGroups, setBasketGroups] = useState([]);
  const [basketDetails, setBasketDetails] = useState([]);
  const [selectedBasketGroup, setSelectedBasketGroup] = useState("");
  const [showGNStaticData, setShowGNStaticData] = useState(false);
  const [customerBasketsData, setCustomerBasketsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendingMap, setSendingMap] = useState(false);
  const [sendingWeblink, setSendingWeblink] = useState(false);

  // modal state variables
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  
  // nextjs router
  const router = useRouter();

  // handle selection
  const handleSelection = async (value) => {
    setCustomerId(value);
    setBroker("");
    setInvestment(0);
    setAliasName("");
    setTotalBasketValue(0);
    setCustomerBasketsData([]);
    setCheckedBaskets([]);
  };

  // handle map click
  const handleMapClick = async () => {
    setSendingMap(true);
    const response = await sendMultipleBaskets(
      basketData,
      adminId,
      customerId,
      broker,
      aliasName
    );
    if (response) {
      setSendingMap(false);
      setMessage(response);
      fetchBasketGroups();
    }
    else {
      setSendingMap(false);
      setMessage("Server Error!")
    }
  };

  // handle Weblink click 
  const handleWebLinkClick = async () => {
    setSendingWeblink(true);
    const response = await fetchByGroupAndSend(selectedBasketGroup, customerId);
    if (response) {
      setSendingWeblink(false);
      setMessage(response);
    }
    else {
      setSendingWeblink(false);
      setMessage("Server Error!")
    }
  }
  
  // fetch the list of baskets 
  const fetchBaskets = async () => {
    const response = await getBasketList();
    setRecords(response);

  };
  
  // fetch the customer data list
  const fetchData = async () => {
    const customersData = await getCustomers();
    setCustomers(customersData);
  };
  
  // get the basket groups name list
  const fetchBasketGroups = async () => {    
    const res = await getBasketGroups();
    setBasketGroups(res);
  }
  
  // fetch the bakset-group data details
  const getBasketDetails = async () => {
    const response = await fetchDetailsByGroupName(selectedBasketGroup);
    setBasketDetails(response);
    const total = response?.basketDetailsList?.reduce((acc, curr) => curr.basketActualValue  + acc, 0)
    if (response !== null && response?.customerId !== null) {
      setCustomerId(response.customerId);
      setAliasName(selectedBasketGroup);
      setTotalBasketValue(total);
      setBroker(response.customerBroker);
    }
  }

  // fetch the basket data for each customer
  const getCustomerBasketsData = async () => {
    const response = await fetchDetailsByCustomer(selectedBasketGroup, customerId);

    if (response !== null && response?.customerId !== null) {
      setCustomerBasketsData(response?.basketDetailsList);
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

    if (Number(totalBasketValue) === 0 || Number(investment) === NaN || aliasName === '') {
      setEnableMap(true);
      return;
    }

    if (Number(totalBasketValue) > Number(investment)) {
      setEnableMap(true);
      return;
    }
    
    if (showGNStaticData) {
      setEnableMap(true);
      return;
    }

    setEnableMap(false);
  }, [investment, totalBasketValue, aliasName]);

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
              <select
                name="customer"
                id="customer"
                className="border border-gray-200 rounded-md w-36 text-sm"
                disabled
              >
                <option disabled>
                  {customerId}
                </option>
              </select>
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
            onChange={(e) => setBroker(e.target.value)}
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
            Investment &#8377;
          </label>
          <input
            type="text"
            disabled={showGNStaticData}
            value={segregate(investment)}
            onChange={(e) => {
              // Remove commas from the input value before updating state
              const newValue = e.target.value.replace(/,/g, "");
              setInvestment(newValue);
            }}
            className="border border-gray-200  text-right rounded-lg w-36 text-sm"
          />
        </div>

        {/* Basket Alias Name */}
        <div className="flex flex-col items-left ">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket Group Name
          </p>
          <input
            type="text"
            value={aliasName}
            disabled={showGNStaticData}
            onChange={(e) => setAliasName(e?.target.value)}
            className="border border-gray-200  text-right rounded-lg w-36 text-sm"
          />
        </div>

        {/* Buttons group */}
        <div className="mt-4">
          <Button isProcessing={sendingMap} size={'sm'} disabled={enableMap} onClick={handleMapClick}>
            Map
          </Button>
        </div>

        {/* Group basket selector */}
        <div className="flex flex-col items-left ">
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
              setShowGNStaticData(true);
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
        </div>
          
        <div className="mt-4">
          <Button isProcessing={sendingWeblink} size={'sm'} onClick={handleWebLinkClick} disabled={enableWeblink}>
            {sendingWeblink ? "Sending" : "Send Weblink"}
          </Button>
        </div>
        
        <Tooltip content="Reset">
          <div 
            className="mt-4 border border-cyan-800 rounded-md p-2 hover:cursor-pointer"
            onClick={() => {
              setShowGNStaticData(false);
              setAliasName("");
              setTotalBasketValue(0);
              setInvestment(0);
              setSelectedBasketGroup("");
              setEnableWeblink(true);
              setCustomerId("");
              setBroker("");
              setMessage("");
            }} 
          >
            <FcRefresh 
              color="white"
            />
          </div>
        </Tooltip>
      </div>

      {/* Customer Details table */}
      <div className="flex flex-col mt-2">
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
                <th className="font-medium text-sm break-words"># Units</th>
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
          <Alert
            color="warning"
            rounded
            className="h-12"
            icon={HiInformationCircle}
          >
            <span className="w-4 h-4">{message}</span>
          </Alert>
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

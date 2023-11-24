"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import {
  getBasketList,
  getBasketValue,
  getCustomers,
} from "@/app/api/basket/route";
import {getCustomerStatus} from "@/app/api/map/baskets/route";
import CustomerMappingTable from "@/components/admin/table/customerMappingTable";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const CustomerMapping = () => {

  // redux
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.user.username);

  // local state
  const [basketName, setBasketName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [weblinkSIP, setWeblinkSIP] = useState(false);
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);
  const [basketCategory, setBasketCategory] = useState("");
  const [scripts, setScripts] = useState(0);
  const [basketVal, setBasketVal] = useState("");
  const [transType, setTransType] = useState("");
  const [enableBroker, setEnableBroker] = useState(true);
  const [enableInputs, setEnableInputs] = useState(basketName == "");
  const [status, setStatus] = useState([]);

  // modal state variables
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  // nextjs router
  const router = useRouter();

  // messages
  const msg1 = "Basket mapped to customer successfully.";
  const msg2 = "Email sent successfully.";

  console.log(message)
 
  // if (weblink) {
  //   dispatch(setBasketAmount(""));
  //   setBasketName("");
  //   setTimeout(() => {
  //     setWeblink(false);
  //     // router.push("/admin/baskets/create");
  //   }, 3000);
  // }

  // if (message) {
  //   dispatch(setBasketAmount(""));
  //   setBasketName("");
  //   setTimeout(() => {
  //     setMessage(false);
  //     // router.push("/admin/baskets/create");
  //   }, 3000);
  // }

  const getStatus = async (value) => {
    const statusResponse = await getCustomerStatus(value);
    setStatus(statusResponse);
  }

  // handle basket selection
  const handleBasketSelection = async (value) => {
    setEnableBroker(false);
    setBasketName(value);

    const response = await getBasketValue(value, adminId);
    
    setTransType(response[0]?.transactionType);
    setBasketVal(response[0]?.basketActualValue);
    setScripts(response[0]?.noOfScripts);
    setBasketCategory(response[0]?.basketCategory);
    setEnableInputs(false);

    getStatus(value);
  };

  // useEffect to fetch the view table baskets
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBasketList();
      setRecords(response);

      const customersData = await getCustomers();
      setCustomers(customersData);
    };

    fetchData();
  }, []);

  
  const isInitialRender = useRef(true);
  useEffect(() => {
    // Check if it's not the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    getStatus(basketName);
  }, [message]);

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
      <h5 className="font-bold mb-2">Map Customer</h5>
      <div className="flex justify-between">
        {/* Basket Names listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">
            Select Basket
          </p>
          <select
            className="border border-gray-200 rounded-md w-44 text-sm"
            defaultValue={""}
            onChange={(e) => {
              handleBasketSelection(e.target.value);
              setMessage("");
            }}
          >
            <option disabled value="">
              - Select -
            </option>
            {records?.map((record) => (
              <option key={record.basketName} value={record.basketName}>
                {record.basketName}
              </option>
            ))}
          </select>
        </div>

        {/* Disabled Basket Category */}
        <div className="flex flex-col items-left ">
          <label className="text-black text-sm dark:text-white">
            Basket Category
          </label>
          <input
            type="text"
            value={basketCategory}
            disabled
            className="border border-gray-200 bg-gray-50 text-left rounded-lg w-44 text-sm"
          />
        </div>

        {/* Disabled Scripts number */}
        <div className="flex flex-col items-left ">
          <label className="text-black text-sm dark:text-white">
            # Scripts
          </label>
          <input
            type="text"
            value={scripts}
            disabled
            className="border border-gray-200 bg-gray-50 text-right rounded-lg w-44 text-sm"
          />
        </div>


        {/* Basket Type listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">
            Transaction Type
          </p>
          <input
            disabled
            type="text"
            value={transType}
            className="border border-gray-200 rounded-lg w-44 bg-gray-50 text-sm"
          />
        </div>

        {/* Disabled basket value */}
        <div className="flex flex-col items-left ">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket value &#8377;
          </p>
          <input
            disabled
            type="text"
            value={segreagatorWoComma(basketVal)}
            className="border border-gray-200 rounded-lg w-44 text-right bg-gray-50 text-sm"
          />
        </div>
      </div>

      {/* Customer Details table */}
      <div className="flex flex-col mt-2">
        <div className={"overflow-y-scroll border h-[calc(100vh-320px)]"}>
          <table className="table-fixed w-full overflow-y-scroll overflow-x-scroll">
            <thead className="border-b sticky top-0 bg-gray-50 z-10">
              <tr>
                <th className="font-medium text-sm text-left p-2 break-words w-16">
                  S.No
                </th>
                <th className="font-medium text-sm text-left p-2 break-words">
                  Customer ID
                </th>
                <th className="font-medium text-sm text-left break-words">
                  Name
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Broker
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Investment &#8377;
                </th>
                <th className="font-medium text-center text-sm break-words">
                  # Basket Units
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Basket Total &#8377;
                </th>
                <th className="font-medium text-left text-sm break-words">
                  Map Status
                </th>
                <th className="font-medium text-left text-sm break-words">
                  WebLink Status
                </th>
                <th className="font-medium text-center text-sm break-words">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="" style={{ width: "100%" }}>
              {customers?.map((data, index) => {
                return (
                  <CustomerMappingTable
                    data={data}
                    index={index}
                    enableInputs={enableInputs}
                    basketName={basketName}
                    basketVal={basketVal}
                    scripts={scripts}
                    enableBroker={enableBroker}
                    setMessage={setMessage}
                    status={status}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-2 w-96">
          {message === msg1 || message === msg2
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
      </div>
    </div>
  );
};

export default CustomerMapping;

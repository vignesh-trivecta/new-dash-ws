"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasketAmount } from "@/store/basketSlice";
import { useRouter } from "next/navigation";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Alert, Button } from "flowbite-react";
import {
  getBasketList,
  getBasketValue,
  getCustomers,
} from "@/app/api/basket/route";
import { getCustomerStatus } from "@/app/api/basket/route";
import { segregate } from "@/utils/formatter/priceSegregator";
import BasketMappingTable from "@/components/admin/table/basketMappingTable";
import { sendMultipleBaskets } from "@/app/api/map/baskets/route";

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
  const [weblink, setWeblink] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [records, setRecords] = useState([]);
  const [investment, setInvestment] = useState(null);
  const [totalBasketValue, setTotalBasketValue] = useState(0);
  const [total, setTotal] = useState({});
  const [scripts, setScripts] = useState(0);
  const [basketVal, setBasketVal] = useState("");
  const [transType, setTransType] = useState("");
  const [broker, setBroker] = useState(brokers[0].name);
  const [enableInputs, setEnableInputs] = useState(customerId == "");
  const [enableButtons, setEnableButtons] = useState(true);
  const [enableMap, setEnableMap] = useState(basketName == "");
  const [enableWeblink, setEnableWeblink] = useState(basketName == "");
  const [checkedBaskets, setCheckedBaskets] = useState([]);
  const [errorHighlight, setErrorHighlight] = useState(false);
  const [basketData, setBasketData] = useState({});

  // modal state variables
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  // nextjs router
  const router = useRouter();

  // useEffect to fetch the view table baskets
  useEffect(() => {
    const fetchBaskets = async () => {
      const response = await getBasketList();
      setRecords(response);
    };
    const fetchData = async () => {
      const customersData = await getCustomers();
      setCustomers(customersData);
    };

    fetchBaskets();
    fetchData();
  }, []);

  useEffect(() => {
    if (Number(totalBasketValue) == Number(investment)) {
      setEnableButtons(true);
      setMessage("");
    } else if (Number(totalBasketValue) > Number(investment)) {
      setErrorHighlight(true);
      setMessage("Basket Total is higher than Investment")
      setEnableButtons(true);
    } else {
      setMessage("");
      setErrorHighlight(false);
      setEnableButtons(false);
    }
    if (Number(totalBasketValue) === 0) {
      setEnableButtons(true);
    }
  }, [investment, totalBasketValue]);

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

  // handle selection
  const handleSelection = async (value) => {
    setCustomerId(value);
    setEnableInputs(false);
    // const response = await getBasketValue(value, adminId);
    // // setInvestmentVal(response[0]?.basketInvestAmt);
    // setTransType(response[0]?.transactionType);
    // setBasketVal(response[0]?.basketActualValue);
    // setEnableInputs(false);

    // const status = await getCustomerStatus(value);
    // if (status) {
    //   setStatus(status);
    // }
  };

  // handle map click
  const handleMapClick = async () => {
    const response = await sendMultipleBaskets(
      basketData,
      adminId,
      customerId,
      broker
    );
    console.log(response);
  };

  useEffect(() => {
    console.log(basketData)
    console.log(Object.keys(basketData))
    const result = Object.values(total).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setTotalBasketValue(result);
  }, [total]);

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
      <h5 className="font-bold mb-2">Map Baskets</h5>
      <div className="flex justify-between">
        {/* Basket Names listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">
            Select Customer
          </p>
          <select
            name="customer"
            id="customer"
            className="border border-gray-200 rounded-md w-44 text-sm"
            defaultValue={""}
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

        {/* Broker Type */}
        <div className="flex flex-col items-left mb-6">
          <label className="text-black text-sm dark:text-white">Broker</label>
          <select
            className="text-xs border-gray-200 rounded-md w-44 h-10"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
          >
            <option className="text-sm" value={"AXIS"}>
              AXIS
            </option>
            <option className="text-sm" value={"IIFL"}>
              IIFL
            </option>
          </select>
        </div>

        {/* investment value */}
        <div className="flex flex-col items-left mb-6">
          <label className="text-black text-sm dark:text-white">
            Investment &#8377;
          </label>
          <input
            type="text"
            value={segregate(investment)}
            onChange={(e) => {
              // Remove commas from the input value before updating state
              const newValue = e.target.value.replace(/,/g, "");
              setInvestment(newValue);
            }}
            className="border border-gray-200  text-right rounded-lg w-44 text-sm"
          />
        </div>

        {/* Basket Type listbox */}
        {/* <div className="">
          <p className="text-black text-sm dark:text-white mr-2">
            Transaction Type
          </p>
          <input
            disabled
            type="text"
            value={transType}
            className="border border-gray-200 rounded-lg w-44 bg-gray-50 text-sm"
          />
        </div> */}

        {/* Disabled basket value */}
        <div className="flex flex-col items-left mb-6">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket Total &#8377;
          </p>
          <input
            disabled
            type="text"
            value={segregate(totalBasketValue)}
            className={`border rounded-lg w-44 text-right bg-gray-50 text-sm ${
              errorHighlight ? "border-red-500 " : "border-gray-200"
            }`}
          />
        </div>

        <div className="flex justify-between mt-4 space-x-4">
          <Button disabled={enableButtons} onClick={handleMapClick}>
            Map
          </Button>
          <Button disabled={enableButtons}>Send Weblink</Button>
        </div>
      </div>

      {/* Customer Details table */}
      <div className="flex flex-col mt-2">
        <div className={"overflow-y-scroll border"} style={{ height: "300px" }}>
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
                <th className="font-medium text-sm break-words">Quantity</th>
                {/* <th className="font-medium mr-4 text-sm break-words">
                  Broker
                </th>
                <th className="font-medium mr-4 text-sm break-words">
                  Investment &#8377;
                </th>
                <th className="font-medium mr-4 text-sm break-words">
                  # Baskets
                </th>
                <th className="font-medium mr-4 text-sm break-words">
                  Total Basket value &#8377;
                </th>
                <th className="font-medium text-left text-sm break-words">
                  Map Status
                </th>
                <th className="font-medium text-left text-sm break-words">
                  WebLink Status
                </th> */}
              </tr>
            </thead>
            <tbody className="" style={{ width: "100%" }}>
              {records?.map((data, index) => {
                return (
                  <BasketMappingTable
                    data={data}
                    index={index}
                    status={status}
                    setStatus={setStatus}
                    enableInputs={enableInputs}
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
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-2 w-96">
        <Alert
          color="warning"
          rounded
          className="h-12"
          icon={HiInformationCircle}
        >
          <span className="w-4 h-4">{message}</span>
        </Alert>
      </div>
    </div>
  );
};

export default BasketMapping;

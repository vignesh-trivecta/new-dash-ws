"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBasketState } from "@/store/eventSlice";
import { setBasketName } from "@/store/basketSlice";
import { usePathname } from "next/navigation";
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi";
import { Alert, Button, Tooltip } from "flowbite-react";
import { basketNameCheck } from "@/app/api/basket/route";
import { getRecords } from "@/app/api/tempBasket/route";
import AddRecord from "@/components/admin/crud/addRecord";
import BasketRecords from "@/components/admin/table/basketRecords";
import SubmitBasket from "@/components/admin/crud/submitBasket";
import { segregate } from "@/utils/formatter/priceSegregator";
import BasketCategory from "@/components/admin/basketCategory";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const CreateBasket = () => {
  // basket status messages
  const msg1 = "Enter Basket name, Investment, Category";
  const msg2 = "Add scripts to the basket";
  const msg3 = "Basket name exists!";
  const msg4 = "Basket Saved Successfully!";
  const msg5 = "Basket Value is lesser than Investment Amount";
  const msg6 = "Basket Value is higher than Investment Amount";
  const msg7 = "Unable to save basket! Try agian";
  const msg8 = "Name should be less than 20 characters";
  const msg9 = "Type and Add to create a new basket category";

  // getting the url path
  const pathname = usePathname();

  // redux
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.user.username);
  const basketName = useSelector((state) => state.basket.basketName);
  const basketState = useSelector((state) => state.event.basketState);

  // local state variables
  const [nameCheck, setNameCheck] = useState(true);
  const [records, setRecords] = useState([]);
  const [handleFetch, setHandleFetch] = useState(false);
  const [message, setMessage] = useState("");
  const [transType, setTransType] = useState("BUY");
  const [total, setTotal] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [basketAmount, setBasketAmount] = useState("");
  const [comparison, setComparison] = useState(true); // comparison to check whether basketVal is greater than investmentVal
  const [basketCategory, setBasketCategory] = useState("");

  // basket value variable
  const basketVal = segreagatorWoComma(total);

  // useEffect for getting records after basket save clicked
  useEffect(() => {
    if (saveMsg == "Success") {
      setRecords([]);
      setBasketAmount("");
      dispatch(setBasketName(""));
      setBasketCategory("");
      setMessage(msg4);
    } else {
      setMessage(saveMsg);
    }
  }, [saved]);

  // useEffect to set the message at center of table
  useEffect(() => {
    if (basketName !== "" && basketAmount !== "" && basketCategory !== "") {
      setMessage(msg2);
    } else if (!saved) {
      setMessage(msg1);
    }
  }, [basketAmount, basketName]);

  // useEffect to check the basketname
  useEffect(() => {
    const check = async () => {
      const response = await basketNameCheck(basketName);
      setNameCheck(response);
      if (!response) {
        setMessage(msg3);
      }
    };
    check();
  }, [basketName]);

  // useEffect to clear the basket name and amount
  useEffect(() => {
    dispatch(setBasketName(""));
    setBasketAmount("");
    // props.setOpenModal("form-elements");
  }, []);

  const isInitialRender = useRef(true);
  // useffect for add record, update record, delete record
  useEffect(() => {
    // Check if it's not the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const fetchData = async () => {
      const {status, data} = await getRecords(adminId, basketName);
      if (status === 200) {
        setRecords(data);
      } else {
        setRecords([]);
        setMessage(data?.messages ? data?.messages : "");
      }
    };
    fetchData();
  }, [handleFetch]);

  // useEffect to check url and then prevent user from navigating to other pages
  useEffect(() => {
    // checking url and records to prevent user from navigating
    if (pathname == "/admin/baskets/create" && records?.length !== 0) {
      dispatch(setBasketState(true));
    } else {
      dispatch(setBasketState(false));
    }

    // setting the total basket value
    let total = 0;
    let price;

    records?.forEach((record) => {
      price =  record.limitPrice || record.priceValue;
      total += price * record.quantityValue;
    });
    setTotal(total);

    // condition to set msg5
    if (records?.length !== 0) {
      setMessage(msg5);
    }

    // condition to compare investment and basket value
    if (total > basketAmount) {
      setComparison(false);
      setMessage(msg6);
    } else {
      setComparison(true);
    }
  }, [records]);

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
      <h3 className="mb-2 font-bold">Create new basket</h3>

      {/* Investment details row */}
      <div className="flex justify-between">
        {/* Basket Name input */}
        {/* {nameCheck ? ( // checking whether the entered name already exists in the database or not */}
          <div className="flex flex-col ">
            <div className="flex flex-col items-left">
              <div className="flex items-center space-x-1">
                <label className="text-black text-sm dark:text-white">
                  Basket Name
                </label>
                <Tooltip content={msg8}>
                  <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                </Tooltip>
              </div>
              <input
                type="text"
                value={basketName}
                onChange={(e) => {
                  if ((e.target.value.length) > 20) {
                    setMessage(msg8);
                  } else {
                    dispatch(setBasketName(e.target.value));
                  }
                }}
                className={nameCheck ? "border border-gray-200 rounded-lg w-24 md:w-44 text-sm" : "border border-gray-200 focus:border-red-500 focus:ring-0 rounded-lg w-24 md:w-44 text-sm"}
              />
            </div>
            <div className="m-2">
              <p className="text-xs text-red-500">
                {nameCheck ? `` : msg3}
              </p>
            </div>
          </div>
        
        {/* Investment value input to be entered by admin */}
        <div className="flex flex-col items-left mb-6">
          <label className="text-black text-sm dark:text-white">
            Investment/ Sale Value &#8377;
          </label>
          <input
            type="text"
            disabled={!nameCheck}
            value={segregate(basketAmount)}
            onChange={(e) => {
              // Remove commas from the input value before updating state
              const newValue = e.target.value.replace(/,/g, "");
              setBasketAmount(newValue);
            }}
            className="border border-gray-200 rounded-lg w-24 md:w-44 text-right text-sm"
          />
        </div>

        {/* Basket Category listbox */}
        <div className="">
          <div className="flex items-center space-x-1">
            <label className="text-black text-sm dark:text-white">
              Basket Category
            </label>
            <Tooltip content={msg9}>
              <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
            </Tooltip>
          </div>
          <div className="relative w-44 z-10 border rounded-md">
            <BasketCategory
              selected={basketCategory}
              setSelected={setBasketCategory}
              isDisabled={nameCheck}
              pageName={"create"}
            />
            {/* <div className="relative bottom-10 z-20">Add</div> */}
          </div>
          {/* <select
            name="transactionType"
            id="transactionType"
            value={""}
            className="border border-gray-200 rounded-md  w-24 md:w-44 text-sm"
            onChange={(e) => setTransType(e.target.value)}
          >
            <option value="BUY">Pharma</option>
            <option value="SELL">Energy</option>
          </select> */}
        </div>

        {/* Transaction Type listbox */}
        <div className="">
          <p className="text-black text-sm dark:text-white mr-2">
            Transaction Type
          </p>
          <select
            name="transactionType"
            id="transactionType"
            value={transType}
            disabled={!nameCheck}
            className="border border-gray-200 rounded-md focus:outline-0 w-24 md:w-44 text-sm focus:border-gray-200 focus:ring-0"
            onChange={(e) => setTransType(e.target.value)}
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>

        {/* Basket value input */}
        <div className="flex flex-col items-left mb-6">
          <p className="text-black text-sm dark:text-white mr-2">
            Basket Value &#8377;
          </p>
          <input
            disabled
            type="text"
            value={(basketVal)}
            className="border border-gray-200 rounded-lg  w-24 md:w-44 bg-gray-50 text-right text-sm"
          />
        </div>
      </div>

      {/* Table showing Create Basket Records */}
      <div className="flex mt-2">
        <div className={"overflow-y-scroll border border-b h-[calc(100vh-350px)]"}>
          <table className="table-fixed w-full">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="text-left font-medium text-sm p-2">S.No</th>
                <th
                  className="font-medium text-sm text-left"
                  style={{ width: "25%" }}
                >
                  Scripts
                </th>
                <th className="font-medium text-sm">Exchange</th>
                <th className="font-medium text-sm">Order Type</th>
                <th className="text-right font-medium text-sm">
                  Weights&nbsp;%
                </th>
                <th className="text-right font-medium text-sm">
                  Price &#8377;
                </th>
                <th className="text-right font-medium text-sm">
                  Limit Price &#8377;
                </th>
                <th className="text-right font-medium text-sm">Quantity</th>
                <th className="font-medium text-sm">Actions</th>
              </tr>
            </thead>
            {
              <tbody>
                {/* Component for showing table records */}
                {records && records?.length > 0 ? (
                  // show table with records
                  records?.map((record, index) => (
                    <BasketRecords
                      key={record.recId}
                      record={record}
                      index={index}
                      handleFetch={handleFetch}
                      setHandleFetch={setHandleFetch}
                      basketName={basketName}
                      investmentVal={basketAmount}
                      basketVal={total}
                      setMessage={setMessage}
                    />
                  ))
                ) : (
                  // show empty table
                  <tr
                    colSpan="8"
                    className=" h-[calc(100vh-650px)] text-center"
                  ></tr>
                )}
              </tbody>
            }
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        {/* Message area showing the status of basket operations */}
        {message !== msg4 ? (
          <div>
            <Alert className="w-96 h-auto" color="warning" icon={HiInformationCircle} rounded>
              <span className="w-4 h-4">{message}</span>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert
              className="bg-green-200 text-green-500 w-96 h-auto"
              icon={HiCheckCircle}
              rounded
            >
              <span className="w-4 h-4 text-green-500">{message}</span>
            </Alert>
          </div>
        )}

        {/* Conditional rendering based on comparison and records.length */}
        {comparison &&
        basketAmount !== "" &&
        basketName !== "" &&
        basketCategory !== "" ? (
          // showing active buttons
          <div className="flex justify-center">
            <div>
              <AddRecord
                handleFetch={handleFetch}
                setHandleFetch={setHandleFetch}
                transType={transType}
                investmentVal={basketAmount}
                basketName={basketName}
                basketCategory={basketCategory}
                records={records}
              />
            </div>
            <div>
              <SubmitBasket
                saved={saved}
                setSaved={setSaved}
                transType={transType}
                investmentAmount={basketAmount}
                actualValue={basketVal}
                basketCategory={basketCategory}
                saveMsg={saveMsg}
                setSaveMsg={setSaveMsg}
              />
            </div>
          </div>
        ) : (
          // Showing disabled buttons with tooltip message
          <div className="flex justify-center">
            <Tooltip
              className="overflow-hidden"
              content={`${message === "Basket Value is higher than Investment Amount" ? "Basket Value is higher than Investment Amount" : "Enter Basket name and Investment amount!"}`}
            >
              <Button disabled className="">
                Add Record
              </Button>
            </Tooltip>
            <Tooltip
              className="overflow-hidden"
              content={`${message === "Basket Value is higher than Investment Amount" ? "Basket Value is higher than Investment Amount" : "Enter Basket name and Investment amount!"}`}
            >
              <Button disabled className="ml-8">
                Save
              </Button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBasket;

"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Alert, Button, Label, Modal, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getEquityPrice, sendQuantity, sendWeightage } from "@/app/api/basket/route";
import { updateRecordMainAPI } from "@/app/api/mainBasket/route";
import { updateRecordAPI } from "@/app/api/tempBasket/route";
import Link from "next/link";
import { setSelectedStock } from "@/store/addRecordSlice";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getInstrumentDetails } from "@/app/api/basket/route";
import { usePathname } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const UpdateRecord = ({
  recId,
  instrumentName,
  exchange,
  transType,
  orderType,
  weightage,
  price,
  lp,
  quantity,
  handleFetch,
  setHandleFetch,
  basketName,
  investmentVal,
  basketVal,
}) => {
  // modal state values
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  // for getting url pathname
  const pathname = usePathname();

  // redux store variables
  const dispatch = useDispatch();
  const basketAmount = useSelector((state) => state.basket.basketAmount);
  const adminId = useSelector((state) => state.user.username);
  const selectedStock = useSelector((state) => state.add.selectedStock);

  // local state variables
  let lquantity = quantity; // used to resolve localQuantity not showing when updateRecord component is mounted first time
  let lweightage = weightage; // used to resolve localWeightage not showing when updateRecord component is mounted first time
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [localWeightage, setLocalWeightage] = useState(weightage);
  const [localPrice, setLocalPrice] = useState(price);
  const [localExchange, setLocalExchange] = useState(exchange);
  const [localOrderType, setLocalOrderType] = useState(orderType);
  const [toggle, setToggle] = useState(transType);
  const [limitPrice, setLimitPrice] = useState(lp);
  const [fetch, setFetch] = useState(false);

  //search dropdown - local state variables
  const [stocksList, setStocksList] = useState([]);
  const [query, setQuery] = useState("");
  const [localStock, setLocalStock] = useState(instrumentName);
  const [message, setMessage] = useState("");

  const filteredStocksList =
    query === ""
      ? stocksList
      : stocksList.filter((stock) =>
          stock.instrumentName
            .toLowerCase()
            .replace(/\s+/g, "")
            .startsWith(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleChange = (value) => {
    dispatch(setSelectedStock(value));
    setFetch(!fetch);
    setLocalStock(value);
  };

  // handling update button click to update the records
  const handleUpdate = (e) => {
    e.preventDefault();
    const localtransType = toggle;
    const postDataAPI = async () => {
      let lprice = limitPrice;
      if (localOrderType === "MARKET") {
          lprice = 0;
      }

      if (pathname == "/admin/baskets/create") {
        let val1 = String(basketAmount).split(",").join("");
        let val2 = String(basketVal).split(",").join("");
        const {status, data} = await updateRecordAPI(
          recId,
          basketName,
          adminId,
          localStock,
          localExchange,
          localOrderType,
          localtransType,
          localQuantity,
          localWeightage,
          localPrice,
          val1,
          val2,
          lprice
        );
        if (status === 200) {
          setHandleFetch(!handleFetch);
          props.setOpenModal(undefined);
        }
        else {
          setMessage("Record Update failed!")
        }
      } else {
        let val1 = String(investmentVal).split(",").join("");
        let val2 = String(basketVal).split(",").join("");
        const {status, data} = await updateRecordMainAPI(
          recId,
          basketName,
          adminId,
          localStock,
          localExchange,
          localOrderType,
          localtransType,
          localQuantity,
          localWeightage,
          localPrice,
          val1,
          val2,
          lprice
        );
        if (status === 200) {
          setHandleFetch(!handleFetch);
          props.setOpenModal(undefined);
        }
        else {
          setMessage("Record Update failed!")
        }
      }
    };
    postDataAPI();
  };

  // handling exchange radio button selection
  const handleExchange = (exchange) => {
    setLocalExchange(exchange);
    const fetchPrice = async () => {
      const data = await getEquityPrice(localStock, "NSE");
      setLocalPrice(data);
    };
    fetchPrice();
  };

  // handling orderType radio button selection
  const handleOrderType = (type) => {
    // if (type === "MARKET") {
    //   setLimitPrice("0");
    // }
    setLocalOrderType(type); // Update localOrderType when a radio button is clicked
  };

  // Weightage event handler
  const handleOnChange = async (e) => {
    const inputValue = e?.target?.value;
    const id = e?.target?.id;

    if (id === "weightage") {
      setLocalWeightage(inputValue);
      // multiple OR statements used to handle 'undefined' being sent to api call issue
      const {status, data} = await sendWeightage(
        inputValue || localWeightage,
        basketAmount || investmentVal,
        localPrice
      );
      const qty = data?.quantity;
      qty ? setLocalQuantity(qty) : setLocalQuantity(0);
      if (inputValue > 100 || inputValue < 1) {
        setMessage("Weightage must be between 1-100")
      }
      else {
        setMessage("");
      }
    } 
    else if (id === "quantity") {
      setLocalQuantity(inputValue);
      const { status, data } = await sendQuantity(
        inputValue || localQuantity,
        basketAmount || investmentVal,
        localPrice
      );
      const weight = data.weightAge;
      weight ? setLocalWeightage(weight) : setLocalWeightage(0);
      if (weight > 100 || weight < 1) {
        setMessage("Weightage must be between 1-100")
      }
      else {
        setMessage("");
      }
    }
  };

  const handlePriceChange = async (weightage) => {
    const { status, data } = await sendWeightage(
      weightage || localWeightage,
      basketAmount || investmentVal,
      localPrice
    );
    const qty = data?.quantity;
    qty ? setLocalQuantity(qty) : setLocalQuantity(0);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const {status, data} = await getInstrumentDetails();
      if (status !== 200) {
        setStocksList([]);
      }
      setStocksList(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleExchange(localExchange);
  }, [fetch]);

  useEffect(() => {
    handlePriceChange(localWeightage);
    setLimitPrice(localPrice);
  }, [localPrice]);

  return (
    <div>
      {/* SVG icon for updating */}
      <Link
        href="#"
        onClick={() => {
          props.setOpenModal("update-form-elements");
        }}
      >
        <svg
          className="w-4 h-4 text-gray-500 hover:text-gray-800 dark:text-white"
          ariaHidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
          <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
        </svg>
      </Link>

      {/* Modal for updating a record */}
      <Modal
        show={props.openModal === "update-form-elements"}
        popup
        onClose={() => {
          props.setOpenModal(undefined);
        }}
      >
        <Modal.Header>
          {/* <label className="relative inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value={toggle} onClick={handleTransType} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300"></div>
                    <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">{toggle}</span>
                </label> */}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-rows-4 grid-cols-3 gap-x- gap-y-4 mt-4">
              {/* Search Dropdown */}
              <Label htmlFor="stock" value="Stock" className="text-sm" />
              <div className="">
                <div className="">
                  <Combobox
                    value={localStock}
                    onChange={(newValue) => {
                      handleChange(newValue);
                    }}
                  >
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default  rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border border-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-md"
                          displayValue={(stock) => stock}
                          onChange={(event) => setQuery(event.target.value)}
                          name={"stock"}
                          id={"stock"}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            ariaHidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options
                          className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          style={{ height: "150px" }}
                        >
                          {filteredStocksList?.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredStocksList?.map((stock, index) => (
                              <Combobox.Option
                                key={index}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 text-sm ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={stock.instrumentName}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {stock.instrumentName}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          ariaHidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
              </div>

              {/* Price element */}
              <div className='relative col-start-3 row-start-1 flex flex-col ml-8'>
                <div className='flex items-center space-x-2 absolute left-2 px-1 -top-2 bg-white '>
                  <Label htmlFor="price" value="Price" className='text-sm z-10' />
                  {
                    localExchange === "BSE"
                    ?
                    <Tooltip content={"LTP is NSE"}>
                      <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                      </svg>
                    </Tooltip>
                    : 
                    ""
                  }
                </div>
                <input 
                  disabled 
                  id='price' 
                  name="price" 
                  value={segreagatorWoComma(localPrice)} 
                  type="string" 
                  className=' text-right pr-2 w-full h-11 bg-gray-50 rounded-md border border-gray-200' 
                />
              </div>

              {/* Exchange element */}
              <Label
                value="Exchange"
                className="col-start-1 row-start-2 text-sm"
              />
              <div className=" col-start-2 row-start-2">
                <input
                  id="bse"
                  name="exchange"
                  type="radio"
                  value="BSE"
                  defaultChecked={localExchange === "BSE"}
                  onClick={() => {
                    handleExchange("BSE");
                  }}
                />
                <label htmlFor="bse" className="ml-2 text-sm">
                  BSE
                </label>
                <input
                  id="nse"
                  name="exchange"
                  type="radio"
                  value="NSE"
                  className="ml-2"
                  defaultChecked={localExchange === "NSE"}
                  onClick={() => {
                    handleExchange("NSE");
                  }}
                />
                <label htmlFor="nse" className="ml-2 text-sm">
                  NSE
                </label>
              </div>

              {/* Weightage element */}
              <Label
                htmlFor="weightage"
                value="Weightage %"
                className="col-start-1 row-start-3 text-sm"
              />
              <div className="rounded-md col-start-2 row-start-3 h-10">
                <input
                  id="weightage"
                  type="number"
                  value={localWeightage ?? weightage}
                  onChange={(e) => handleOnChange(e)}
                  className={`${(localWeightage > 100 || localWeightage < 1) ? "focus:ring-red-500" : "focus:ring-blue-700"} focus:border-none w-full border border-gray-200 rounded-md text-right`}
                />
              </div>
              {/* <Label htmlFor="weightage" value="Weightage %" className='col-start-1 row-start-3 text-md' />
                    <div className='rounded-md col-start-2 row-start-3 h-10'>
                        <Weightage lweightage={weightage} />
                    </div> */}

              {/* <Label value="Transaction Type" className='col-start-1 row-start-4 text-md'/>
                    <div className='col-start-2'>
                        <input 
                            id="buy" 
                            name="transType" 
                            type='radio' 
                            value="BUY" 
                            checked={localTransType === "BUY"} 
                            onClick={() => handleTransType("BUY")} 
                        />
                        <label htmlFor='buy' className='ml-1'>BUY</label>
                        <input 
                            id="sell" 
                            name="transType" 
                            type='radio' 
                            value="SELL" 
                            checked={localTransType === "SELL"} 
                            className='ml-1' 
                            onClick={() => handleTransType("SELL")}  
                        />
                        <label htmlFor='sell' className='ml-1'>SELL</label>
                    </div> */}

              {/* Order type element */}
              <Label
                value="Order Type"
                className="col-start-1 row-start-4 text-sm"
              />
              <div className="col-start-2">
                <input
                  id="market"
                  name="orderType"
                  type="radio"
                  value="MARKET"
                  defaultChecked={localOrderType === "MARKET"}
                  onClick={() => handleOrderType("MARKET")}
                />
                <label htmlFor="market" className="ml-2 text-sm">
                  MARKET
                </label>
                <input
                  id="limit"
                  name="orderType"
                  type="radio"
                  value="LIMIT"
                  className="ml-2"
                  defaultChecked={localOrderType === "LIMIT"}
                  onClick={() => handleOrderType("LIMIT")}
                />
                <label htmlFor="limit" className="ml-2 text-sm">
                  LIMIT
                </label>
              </div>

              {/* Quantity element */}
              <div className="relative col-start-3 row-start-3 flex flex-col ml-8">
                <Label
                  htmlFor="quantity"
                  value="Quantity"
                  className="absolute left-2 -top-2 bg-white px-1 text-sm z-10"
                />
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={localQuantity || lquantity}
                  onChange={(e) => handleOnChange(e)}
                  className="absolute pl-8 p-2 w-full border border-gray-200 rounded-md text-right"
                />
              </div>

              {/* Limit value element */}    
              <div className='relative ml-8'>
                  <Label htmlFor="limitInput" value="Limit Price" className='absolute left-2 bg-white px-1 -top-2 text-sm z-10' />
                  <input 
                    required 
                    disabled={localOrderType === "MARKET"}
                    id="limitInput" 
                    name="limitInput" 
                    value={limitPrice} 
                    onChange={(e) => setLimitPrice(e.target.value ?? undefined)} 
                    type="number" 
                    className={`text-right absolute ml-1 w-40 rounded-md border border-gray-200 ${localOrderType === "MARKET" ? "bg-gray-50" : ""}`}
                  />       
              </div>
            </div>

            {/* Modal Butttons */}
            <div className="flex justify-between mt-4">
              <div>
                {
                  message 
                  ? <Alert
                      color="warning"
                      rounded
                      className="h-10 w-56 p-1 flex justify-center max-w-sm text-sm"
                      icon={HiInformationCircle}
                      >
                      <span>{message}</span>
                    </Alert>
                  : ""
                }
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  disabled={(localWeightage > 100 || localWeightage < 1) || (localOrderType === "LIMIT" && !limitPrice) || (localOrderType === "LIMIT" && limitPrice < 1) || (localQuantity < 1)}
                >
                  Update
                </Button>
                <Button
                  color="gray"
                  onClick={() => {
                    props.setOpenModal(undefined);
                    setLocalStock(instrumentName);
                    setLocalPrice(price);
                    setLocalExchange(exchange);
                    setLocalOrderType(orderType);
                    setLocalQuantity(quantity);
                    setLocalWeightage(weightage);
                    setLimitPrice(lp);
                    setToggle(transType);
                    dispatch(setSelectedStock(instrumentName));
                  }}
                  className="ml-2 text-md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateRecord;

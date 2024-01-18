"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Alert, Button, Label, Modal, TextInput, Tooltip } from "flowbite-react";
import { basketNameCheck, cloneBasket, getSpecificBasket } from "@/app/api/basket/route";
import { segregate } from "@/utils/formatter/priceSegregator";
import Breadcrumbs from "@/components/page/breadcrumb";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";
import ValiditySelector from "@/utils/validitySelector";
import BasketType from "@/components/page/basketType";
import { HiInformationCircle } from "react-icons/hi";

const ViewTable = ({ params }) => {
  const basketName = params.id.split("%20").join(" ");

  // local state variables
  const [records, setRecords] = useState([]);
  const [res, setRes] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  // modal elements
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const adminId = useSelector((state) => state.user.username);
  const modelBasket = useSelector((state) => state.basket.modelBasket);
  const basketValidity = useSelector((state) => state.basket.basketValidity);

  const router = useRouter();

  // useEffect to fetch the table records
  useEffect(() => {
    const gettingRecords = async () => {
      const {status, data} = await getSpecificBasket(basketName);
      if (status === 200) {
        setRecords(data);
      }
      else {
        setMessage(data.messages);
        setRecords([]);
      }
    };
    gettingRecords();
  }, []);

  // useEffect to fetch the table records after deletion or when res changes
  // useEffect(() => {
  //   const gettingRecords = async () => {
  //     if (res === "loading") {
  //       // Fetch the records after a brief delay to allow the deletion to complete on the server
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }
  //     const response = await getSpecificBasket(basketName);
  //     setRecords(response);
  //   };
  //   gettingRecords();
  // }, [res, params.id]);

  const ids = [
    { "View Baskets": "/admin/baskets/view" },
    { [`${basketName} : ${records[0]?.basketCategory}`]: `` },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await cloneBasket(
      basketName,
      input,
      adminId,
      modelBasket,
      basketValidity
    );
    if (response) {
      setOpenModal(undefined);
      router.push("/admin/baskets/view");
    }
    else {
      setError(true);
      setMessage("Failed to clone basket");    }
  };

  const checkBasketAlreadyExists = async (input) => {
    const response = await basketNameCheck(input);
    if (response) {
      setError(false);
      setMessage("");
      setIsButtonDisabled(false);
    }
    else {
      setError(true);
      setMessage("Basket Name already exists!");
      setIsButtonDisabled(true);
    }
  }

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
      {/* <>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Not Saved!
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            <p>Are you sure you want to delete this Basket?</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex justify-center space-x-4 sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto"
                      onClick={(e) => {
                        handleDelete(e)
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700 shadow-sm  sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </> */}

      {/* modal for entering new basket name - Clone Basket */}
      <>
        <Modal
          show={props.openModal === "form-elements"}
          size="sm"
          popup
          onClose={() =>{ 
            props.setOpenModal(undefined)
            setError(false);
            setMessage("");
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="z-12">
                <div className=" flex mb-2 items-center space-x-1">
                  <Label htmlFor="email" value="New basket name" />
                  <Tooltip content={"Name should be less than 20 characters"}>
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                  </Tooltip>
                </div>
                <TextInput
                  required
                  id="email"
                  maxLength={20}
                  className="border-red-500"
                  autoFocus
                  autoComplete="off"
                  // value={""}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    setInput(inputValue);
                    checkBasketAlreadyExists(inputValue);
                    // setNewBasketName(e.target.value);
                  }}
                />
                <div className="mt-2 h-4">
                  { message
                    ? <p className="text-red-500 text-xs">
                      {message}
                    </p>
                    : <p>{""}</p>
                  }
                </div>
                <div>
                  <BasketType />
                </div>
              </div>

              <div className="w-full flex justify-center items-center space-x-4 z-10">
                <button
                  className="rounded-md bg-cyan-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 shadow-sm"
                  disabled={isButtonDisabled}
                >
                  Clone
                </button>
                <button
                  className="text-sm border border-gray-200 p-2.5 rounded-md"
                  onClick={() => {
                    setOpenModal(undefined);
                    setError(false);
                    setMessage("");
                    setIsButtonDisabled(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>

      <div className="flex justify-between">
        <div>
          <Breadcrumbs len={ids.length} ids={ids} />
        </div>
        <button
          className="flex border border-gray-200 p-2 rounded-md hover:bg-gray-100"
          onClick={() => setOpenModal("form-elements")}
        >
          <svg
            className="w-6 h-6 text-gray-500 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18a.969.969 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9l4-4m-4 5h5m3-4h5V1m5 1v12a.97.97 0 0 1-.933 1H9.933A.97.97 0 0 1 9 14V5l4-4h5.067A.97.97 0 0 1 19 2Z"
            />
          </svg>
          <span className="ml-2">Clone Basket</span>
        </button>
      </div>

      {/* Specific Basket Details table */}
      <div className="flex mt-6">
        <div className={"overflow-y-scroll border h-[calc(100vh-250px)]"}>
          <table className="table-fixed w-full ">
            <thead className="border-b sticky top-0 bg-gray-50">
              <tr>
                <th
                  className="text-left font-medium text-sm p-2"
                  style={{ width: "8%" }}
                >
                  S.No
                </th>
                <th
                  className="text-left font-medium text-sm p-2"
                  style={{ width: "25%" }}
                >
                  Scripts
                </th>
                <th className="text-left font-medium text-sm">Exchange</th>
                <th className="text-left font-medium text-sm">Order Type</th>
                <th className="text-left font-medium text-sm">Weights %</th>
                <th className="text-center font-medium text-sm">
                  Price &#8377;
                </th>
                <th className="text-center font-medium text-sm">
                  Limit Price &#8377;
                </th>
                <th className="text-center font-medium text-sm">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {records && records?.length > 0 ? (
                records?.map((record, index) => (
                  <tr className="border-t border-b hover:bg-gray-100">
                    <th className="text-left text-sm text-black ">
                      <div className="ml-4">{index + 1}</div>
                    </th>
                    <td className="text-left">
                      <div className="p-2 text-sm text-black">
                        {record.instrumentName}
                      </div>
                    </td>
                    <td className="text-left">
                      <div className="p-2 text-sm text-black">
                        {record.exchangeUsed}
                      </div>
                    </td>
                    <td className="text-left">
                      <div className="p-2 text-sm text-black">
                        {record.orderType}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="p-2 mr-4 text-sm text-black">
                        {record.weightValue}
                      </div>
                    </td>
                    <td className="text-right align-middle">
                      <div className="p-2 mr-8 text-sm text-black">
                        {segreagatorWoComma(record.priceValue)}
                      </div>
                    </td>
                    <td className="text-right align-middle">
                      <div className="p-2 mr-8 text-sm text-black">
                        {segreagatorWoComma(record.limitPrice ? record.limitPrice : 0)}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="p-2 mr-10 text-sm text-black">
                        {segregate(record.quantityValue)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td
                  colSpan="8"
                  style={{ height: "250px", textAlign: "center" }}
                >
                  No table data
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="absolute bottom-4 w-96">
        {
          message 
          ? 
          <Alert
            color={"warning"}
            rounded
            className="h-12"
            icon={HiInformationCircle}
          >
            <span className="w-4 h-4">{message}</span>
          </Alert>
          : ""
        }
      </div>
    </div>
  );
};

export default ViewTable;

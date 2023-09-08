'use client';

import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { getInstrumentDetails } from "@/app/api/basket/route"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "@/store/addRecordSlice";

export default function CustomerSearch({ id }) {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
 
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.add.selectedStock);

  const filteredList = 
    query === ""
    ? list
    : list.filter((stock) =>
        stock?.instrumentName
          .toLowerCase()
          .replace(/\s+/g, "")
          .startsWith(query.toLowerCase().replace(/\s+/g, ""))
  )


    
  useEffect(() => {
    const fetchData = async () => {
      const list = await getInstrumentDetails();
      setList(list);
    };
  
    fetchData();
  }, []);

  const handleChange = (value) => {
    dispatch(setSelectedStock(value));
  }
  

  return (
    <div className="">
      <Combobox value={selectedStock } onChange={(newValue) => {handleChange(newValue)}}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default  rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border border-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-md"
              displayValue={(stock) => stock}
              onChange={(event) => setQuery(event.target.value)}
              name={id}
              id={id}
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" style={{height: "150px"}}>
              {filteredList && filteredList?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
                ) : (
                filteredList?.map((stock, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 text-sm ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
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
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" ariaHidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )
            }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

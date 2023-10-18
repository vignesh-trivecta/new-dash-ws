"use client";

import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { getBasketCategories } from "@/app/api/basket/route";

export default function ViewFilterBasketCategory({basketCategory, setBasketCategory, handleFetch, setHandleFetch}) {
  const [basketCategoryList, setBasketCategoryList] = useState([]);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? basketCategoryList
      : basketCategoryList.filter((basket) =>
          basket.basketCategory
            .toLowerCase()
            .replace(/\s+/g, "")
            .startsWith(query.toLowerCase().replace(/\s+/g, ""))
        );

  // to get the basket category
  useEffect(() => {
    async function getCategory() {
      const response = await getBasketCategories();
      if (response) {
        setBasketCategoryList(response);
      }
    }
    getCategory();
    setSelected(basketCategory);
  }, []);

  return (
    <div className="">
      <Combobox value={selected} onChange={(selected) => {
        setSelected(selected);
        setBasketCategory(selected);
        setHandleFetch(!handleFetch);
      }}>
        <div className="relative mt-1 h-8">
          <div className="relative h-8 w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={selected}
              onChange={(event) =>{ 
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-600"
                aria-hidden="true"
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
            <Combobox.Options className="absolute mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {filteredPeople.length === 0 && query !== "" ? (
                <button
                  className="relative cursor-pointer text-left py-2 px-4 text-gray-700 w-full"
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  {`Add "${query}"`}
                </button>
              ) : (
                filteredPeople.map((basket, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={basket.basketCategory}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {basket.basketCategory}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button, Dropdown, Label } from "flowbite-react";
import { getBasketCategories } from "@/app/api/basket/route";
import { BiFilterAlt } from "react-icons/bi";

const ViewFilterComponent = ({}) => {
    
    // local state
    const [basketCategoryList, setBasketCategoryList] = useState([]);
    const [basketCategory, setBasketCategory] = useState("ALL");
    const [filteredBasket, setFilteredBasket] = useState("ALL");


    // handling customer selection for basket category
    const handleCustomerSelection = (e) => {
        e.preventDefault();
        const newValue = e.target.value;
        setBasketCategory(newValue);
    }

    // function to reset filter menu options
    const resetFilters = () => {
        setBasketCategory("");
        setFilteredBasket("");
    }

    // function handling when filter button is clicked
    const handleFilter = async (e) => {
        e.preventDefault();

    }

    // useEffect to fetch basket category data to show in dropdown
    useEffect(() => {
        const fetchData = async () => {
            const response = await getBasketCategories();
            const result = response.map((obj) => obj.basketCategory);
            setBasketCategoryList(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={handleFilter}>
            {/* Start of Filter dropdown */}
            <Dropdown
                placement="bottom"
                renderTrigger={() => (
                    <div className="hover:cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
                        <BiFilterAlt className="h-5 w-5 text-gray-500" />
                    </div>
                    )}
                className="px-6 py-4 w-max"
            >   
                <div className="flex justify-between">
                    <h1 className="mb-2 font-semibold">Filter</h1>
                </div>
                <div className="space-y-2">

                    {/* Basket Category */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Basket Category</label>
                        <select 
                            className="rounded-md border-gray-200 text-sm"
                            value={basketCategory}
                            onChange={(e) => {handleCustomerSelection(e)}}
                            required
                        >
                            <option disabled value={""} className=" text-sm">- Select -</option>
                            <option value={"ALL"} className=" text-sm">All</option>
                            {
                                basketCategoryList?.map((id, index) => (
                                    <option 
                                        key={index} 
                                        value={id} 
                                        className=" text-sm"
                                    >
                                        {id}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Basket Type */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Basket Type</label>
                        <select
                            name="basketType"
                            id="basketType"
                            value={filteredBasket}
                            onChange={(e) => {
                            setFilteredBasket(e.target.value);
                            }}
                            className="border border-gray-200 rounded-md text-sm"
                        >
                            <option disabled value="">-Select -</option>
                            <option value="ALL">All</option>
                            <option value="MODEL">Model</option>
                            <option value="BUY">Buy</option>
                            <option value="SELL">Sell</option>
                        </select> 
                    </div>
            
                </div>

                {/* Buttons group */}
                <div className="mt-4 flex space-x-2 justify-center"> 
                    <button
                        type="submit"
                        className="text-sm bg-cyan-800 hover:bg-cyan-700 border p-1 rounded-md text-white w-16"
                    >
                        Filter
                    </button>
                    <Button
                        size={"sm"}
                        color={"gray"}
                        onClick={() => {resetFilters()}}
                    >
                        Reset
                    </Button>
                </div>
            </Dropdown> 
            </form>
        </div>
    )
}

export default ViewFilterComponent;

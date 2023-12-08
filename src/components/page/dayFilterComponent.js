"use client";

import { useState, useEffect } from "react";
import { Dropdown, Label } from "flowbite-react";
import { BiFilterAlt } from "react-icons/bi";

const DayFilterComponent = ({documentType, setDocumentType, handleFetch, setHandleFetch}) => {
    
    // local state
    

    // function handling when filter button is clicked
    const handleFilter = async (e) => {
        e.preventDefault();
        setHandleFetch(!handleFetch);
    }

    return (
        <div className="">
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

                    {/* Basket Type */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Select Document Type</label>
                        <select
                            required
                            name="documentType"
                            id="documentType"
                            value={documentType}
                            onChange={(e) => {
                                setDocumentType(e.target.value);
                            }}
                            className="border border-gray-200 rounded-md text-sm"
                        >
                            <option disabled value="">-Select -</option>
                            <option value="NSE">NSE</option>
                            <option value="BSE">BSE</option>
                        </select> 
                    </div>
            
                </div>

                {/* Buttons group */}
                <div className="mt-4 flex space-x-2 justify-center"> 
                    <button
                        type="submit"
                        className="text-sm bg-cyan-800 hover:bg-cyan-700 border p-1 rounded-md text-white w-16"
                    >
                        Upload
                    </button>
                </div>
            </Dropdown> 
            </form>
        </div>
    )
}

export default DayFilterComponent;

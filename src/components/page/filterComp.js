"use client";

import { useState, useEffect } from "react"
import { Button, Dropdown, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setBroker, setCustomerId, setDateType, setEndDate, setStartDate, setToggle } from "@/store/reportSlice";
import { getCustomers } from "@/app/api/basket/route";
import { usePathname } from "next/navigation";
import { BiFilterAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterComponent = () => {

    const pathName = usePathname();
    
    // redux state
    const dispatch = useDispatch();
    const customerId = useSelector((state) => state.report.customerId);
    const broker = useSelector((state) => state.report.broker);
    const dateType = useSelector((state) => state.report.dateType);
    const startDate = useSelector((state) => state.report.startDate);
    const endDate = useSelector((state) => state.report.endDate);
    const toggle = useSelector((state) => state.report.toggle);
    
    // local state
    const [isOpen, setIsOpen] = useState(false);
    const [localBroker, setLocalBroker] = useState(broker);
    const [list, setList] = useState([]);
    // const [now, setNow] = useState(false);

    // function to reset filter menu options
    const resetFilters = () => {
        setIsOpen(!isOpen);
        dispatch(setCustomerId(list[0]));
        setLocalBroker("AXIS");
        dispatch(setBroker("AXIS"));
        dispatch(setStartDate(new Date().setDate(new Date().getDate() - 1)));
        dispatch(setEndDate(new Date().setDate(new Date().getDate() - 1)));
        dispatch(setToggle(!toggle));
    }

    // useEffect to fetch data to show in table
    useEffect(() => {
        const fetchData = async () => {
            const customersData = await getCustomers();
            let arr = [];
            for(let i=0; i<customersData.length; i++) {
                arr.push(customersData[i].customerId + " - " + customersData[i].name)
            }
            setList(arr);
        };

        fetchData();

        // finding current time and allowing Date radio button to be displayed
        // only when current IST time is greater than 3pm or 15:00 hrs
        // const currentTime = new Date();
        // const currentOffset = currentTime.getTimezoneOffset();
        // const ISTOffset = 330;   // IST offset UTC +5:30 
        // const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        // // IST Time now represents the time in IST coordinates
        // const hoursIST = ISTTime.getHours()
        // const minutesIST = ISTTime.getMinutes()
        // if((hoursIST >= 15) && (minutesIST >= 0)){
        //     setNow(true);
        // }
        // else {
        //     setNow(false);
        // }

    }, []);

    return (
        <div>
            <Dropdown
                placement="bottom"
                renderTrigger={() => (
                    <div className="hover:cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
                        <BiFilterAlt className="h-5 w-5 text-gray-500" />
                    </div>
                    )}
                className="p-4 w-max"
            >
                <h1 className="mb-2 font-semibold">Filter</h1>
                <div className="space-y-2">

                    {/* Customer Id */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Customer Id</label>
                        <select 
                            className="rounded-md border-gray-200 text-sm"
                            value={customerId}
                            onChange={(e) => {dispatch(setCustomerId(e.target.value))}}
                        >
                            {
                                list.map((id, index) => (
                                    <option 
                                        key={index} 
                                        value={id} 
                                    >
                                        {id}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    {/* Broker */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Broker</label>
                        <select value={localBroker} onChange={(e) => {setLocalBroker(e.target.value); dispatch(setBroker(e.target.value))}} className="border border-gray-200 rounded-md w-full text-sm" name="broker" id="broker" >
                            <option value="AXIS">AXIS</option>
                            <option value="IIFL">IIFL</option>
                        </select> 
                    </div>
                    
                    {/* Dates radio button */}
                    <div>
                        {
                        // now 
                        // && 
                        pathName === "/admin/reports/ledger"
                        && 
                        <>
                            <Label value="Date" className="col-start-1 row-start-2 text-sm" />
                            <div className=" col-start-2 row-start-2">
                                <input 
                                required
                                    id="today" 
                                    name="date" 
                                    type="radio" 
                                    value="today"
                                    defaultChecked={dateType === "today"}
                                    onClick={() => {
                                        dispatch(setDateType("today"));
                                }} />
                                <label htmlFor="today" className="ml-1 text-sm">Today</label>
                                <input 
                                required
                                    id="custom" 
                                    name="date" 
                                    type="radio" 
                                    value="custom" 
                                    className="ml-1" 
                                    defaultChecked={dateType === "custom"}
                                    onClick={() => {
                                        dispatch(setDateType("custom"));
                                }} />
                                <label htmlFor="custom" className="ml-1 text-sm">Custom</label>
                            </div>
                        </>
                        }
                    </div>
 
                    {dateType === "custom" && 
                    <div>

                        <div className="flex flex-col">
                            <label className="font-medium text-sm">From</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={startDate}
                                onChange={(date) => dispatch(setStartDate(date))}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date("1995-12-17T03:24:00")}
                                maxDate={startDate}
                                className="text-sm border-gray-200 rounded-md z-2"
                            /> 
                        </div>                       
                        <div className="flex flex-col">
                            <label className="font-medium text-sm">To</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={endDate}
                                onChange={(date) => dispatch(setEndDate(date))}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                maxDate={new Date().setDate(new Date().getDate() - 1)}
                                className="text-sm border-gray-200 rounded-md"
                            />                        
                        </div>
                    </div>
                    }
                </div>

                {/* Buttons group */}
                <div className="mt-4 flex space-x-2 justify-center"> 
                    <Button
                        size={"sm"}
                    >
                        Filter
                    </Button>
                    <Button
                        size={"sm"}
                        color={"gray"}
                        onClick={() => {resetFilters()}}
                    >
                        Reset
                    </Button>
                </div>
            </Dropdown> 
        </div>
    )
}

export default FilterComponent;
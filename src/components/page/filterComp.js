"use client";

import { useState, useEffect } from "react";
import { Button, Dropdown, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setBroker, setCustomerId, setDateType, setEndDate, setReportType, setStartDate, setToggle } from "@/store/reportSlice";
import { getCustomers } from "@/app/api/basket/route";
import { usePathname } from "next/navigation";
import { BiFilterAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBroker, handleDbReportsFetch, handleLiveReportsFetch } from "@/app/api/reports/route";

const FilterComponent = ({props, fetch, setFetch}) => {

    // to get url pathname
    const pathName = usePathname();
    
    // redux state
    const dispatch = useDispatch();
    const customerId = useSelector((state) => state.report.customerId);
    const broker = useSelector((state) => state.report.broker);
    const dateType = useSelector((state) => state.report.dateType);
    const reportType = useSelector((state) => state.report.reportType);
    const startDate = useSelector((state) => state.report.startDate);
    const endDate = useSelector((state) => state.report.endDate);
    const toggle = useSelector((state) => state.report.toggle);
    const path = useSelector((state) => state.report.path);
    
    // local state
    const [now, setNow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [localCustomerId, setLocalCustomerId] = useState(customerId);
    const [localBroker, setLocalBroker] = useState(broker);
    const [localReportType, setLocalReportType] = useState('');
    const [localDateType, setLocalDateType] = useState(dateType);
    const [localStartDate, setLocalStartDate] = useState(startDate);
    const [localEndDate, setLocalEndDate] = useState(endDate);
    const [list, setList] = useState([]);



        // // finding current time and allowing Date radio button to be displayed
        // // only when current IST time is greater than 3pm or 15:00 hrs
        // const currentTime = new Date();
        // const currentOffset = currentTime.getTimezoneOffset();
        // const ISTOffset = 330;   // IST offset UTC +5:30 
        // const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        // // // IST Time now represents the time in IST coordinates
        // const hoursIST = ISTTime.getHours()
        // const minutesIST = ISTTime.getMinutes()
        // console.log(hoursIST, minutesIST)
        // if((hoursIST > 9) && (hoursIST <16)){
        //     setNow(true);
        // }
        // else {
        //     setNow(false);
        // }


    // function to reset filter menu options
    const resetFilters = () => {
        setIsOpen(!isOpen);
        setLocalCustomerId("");
        dispatch(setCustomerId(""));
        setLocalBroker("");
        dispatch(setBroker(""));
        setLocalReportType('');
        dispatch(setReportType(''));
        setLocalStartDate(new Date(new Date().setDate(new Date().getDate() - 1)));
        setLocalEndDate(new Date(new Date().setDate(new Date().getDate() - 1)));
        dispatch(setStartDate(new Date(new Date().setDate(new Date().getDate() - 1))));
        dispatch(setEndDate(new Date(new Date().setDate(new Date().getDate() - 1))));
        dispatch(setToggle(!toggle));
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        console.log(startDate, endDate, localReportType)
        dispatch(setToggle(!toggle));
        dispatch(setCustomerId(localCustomerId));
        dispatch(setBroker(localBroker));
        dispatch(setReportType(localReportType));
        dispatch(setDateType(localDateType));
        dispatch(setStartDate(localStartDate));
        dispatch(setEndDate(localEndDate));

        if (pathName !== '/admin/reports') {
            if (localReportType === 'Market') {
                const response = await handleLiveReportsFetch(props ?? '', localCustomerId, localStartDate, localEndDate);
                console.log(response)
            }
            else if (localReportType === 'Post') {
                console.log(props ?? '', localCustomerId, localStartDate, localEndDate)
                const response = handleDbReportsFetch(props ?? '', localCustomerId, localStartDate, localEndDate);
                console.log(response);
            }
        }
        else {
            console.log("you are on reports page");
        }
        dispatch(setToggle(!toggle));
    }

    const handleCustomerSelection = async (e) => {
        setLocalCustomerId(e.target.value);
        const response = await getBroker((e.target.value).split(' ')[0]);
        if (response) {
            setLocalBroker(response);
        }
        else {
            setLocalBroker("");
        }
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


    }, []);

    useEffect(() => {
        // finding current time and allowing Date radio button to be displayed
        // only when current IST time is greater than 3pm or 15:00 hrs
        const currentTime = new Date();
        const currentOffset = currentTime.getTimezoneOffset();
        const ISTOffset = 330;   // IST offset UTC +5:30 
        const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        // // IST Time now represents the time in IST coordinates
        const hoursIST = ISTTime.getHours()
        const minutesIST = ISTTime.getMinutes()
        console.log(hoursIST, minutesIST, now)
        if((hoursIST > 9) && (hoursIST <16)){
            setNow(true);
        }
        else {
            setNow(false);
        }
    })

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
                className="p-4 w-max"
            >
                <h1 className="mb-2 font-semibold">Filter</h1>
                <div className="space-y-2">

                    {/* Customer Id */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Customer Id</label>
                        <select 
                            className="rounded-md border-gray-200 text-sm"
                            value={localCustomerId}
                            onChange={(e) => {handleCustomerSelection(e)}}
                            required
                        >
                            <option disabled value="">-Select -</option>
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
                        <select value={localBroker} required onChange={(e) => {setLocalBroker(e.target.value)}} className="border border-gray-200 rounded-md w-full text-sm" name="broker" id="broker" >
                            <option disabled value="">-Select -</option>
                            <option value="AXIS">AXIS</option>
                            <option value="IIFL">IIFL</option>
                        </select> 
                    </div>

                    {/* Report Type */}
                    <div className="flex flex-col">
                        <label className="font-medium text-sm">Report Type</label>
                        <select value={localReportType} required onChange={(e) => {setLocalReportType(e.target.value)}} className="border border-gray-200 rounded-md w-full text-sm" name="broker" id="broker" >
                            <option disabled value="">-Select -</option>
                            <option value="Market">Market Hours</option>
                            <option value="Post">Post Market</option>
                        </select> 
                    </div>
                    
                    {/* Dates radio button */}
                    <div>
                        {
                        // (now && pathName === "/admin/reports/ledger" ) 
                        // && 
                        <>
                            <Label value="Date" className="col-start-1 row-start-2 text-sm" />
                            <div className=" col-start-2 row-start-2">
                                <input 
                                required
                                    id="today" 
                                    name="date" 
                                    type="radio" 
                                    value="today"
                                    defaultChecked={localDateType === "today"}
                                    onClick={() => {
                                        setLocalDateType("today");
                                }} />
                                <label htmlFor="today" className="ml-1 text-sm">Today</label>
                                <input 
                                required
                                    id="custom" 
                                    name="date" 
                                    type="radio" 
                                    value="custom" 
                                    className="ml-1" 
                                    defaultChecked={localDateType === "custom"}
                                    onClick={() => {
                                        setLocalDateType("custom");
                                }} />
                                <label htmlFor="custom" className="ml-1 text-sm">Custom</label>
                            </div>
                        </>
                        }
                    </div>
                    
                    {/* show this date pickers if datetype is custom */}
                    {localDateType === "custom" && 
                    <div>

                        <div className="flex flex-col">
                            <label className="font-medium text-sm">From</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={localStartDate}
                                onChange={(date) => setLocalStartDate(date)}
                                selectsStart
                                startDate={localStartDate}
                                endDate={localEndDate}
                                minDate={new Date("1995-12-17T03:24:00")}
                                maxDate={localEndDate}
                                className="text-sm border-gray-200 rounded-md z-2"
                            /> 
                        </div>                       
                        <div className="flex flex-col">
                            <label className="font-medium text-sm">To</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={localEndDate}
                                onChange={(date) => setLocalEndDate(date)}
                                selectsEnd
                                startDate={localStartDate}
                                endDate={localEndDate}
                                minDate={localStartDate}
                                maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                className="text-sm border-gray-200 rounded-md"
                            />                        
                        </div>
                    </div>
                    }
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

export default FilterComponent;

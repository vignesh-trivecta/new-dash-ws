'use client';

import { useState, useEffect } from "react"
import { BiFilterAlt } from "react-icons/bi";
import { Button, Dropdown } from 'flowbite-react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { setBroker, setClientCode, setDateType, setEndDate, setStartDate, setToggle } from "@/store/reportSlice";

const FilterComponent = () => {


    // redux state
    const dispatch = useDispatch();
    const clientCode = useSelector((state) => state.report.clientCode);
    const broker = useSelector((state) => state.report.broker);
    const dateType = useSelector((state) => state.report.dateType);
    const startDate = useSelector((state) => state.report.startDate);
    const endDate = useSelector((state) => state.report.endDate);
    const toggle = useSelector((state) => state.report.toggle);

    // local state
    const [isOpen, setIsOpen] = useState(false);
    const [localBroker, setLocalBroker] = useState(broker);
    const [list, setList] = useState([]);

    // function to reset filter menu options
    const resetFilters = () => {
        setIsOpen(!isOpen);
        dispatch(setClientCode('CUST001 - Muthu Kumar'));
        setLocalBroker('AXIS');
        dispatch(setBroker('AXIS'));
        dispatch(setStartDate(new Date()));
        dispatch(setEndDate(new Date()));
        dispatch(setToggle(!toggle));
    }

    // useEffect to fetch data to show in table
    useEffect(() => {
        const fetchData = async () => {
            setList(
                [
                  { customerId: 'CUST001 - Muthu Kumar' },
                  { customerId: 'CUST002 - Raji Vinod' },
                  { customerId: 'CUST003 - Aadhan Madhankumar' },
                  { customerId: 'CUST004 - Shravan Madhankumar' },
                  { customerId: 'CUST005 - Rekha Kumar' },
                  { customerId: 'CUST006 - Sathish Mishra' },
                  { customerId: 'CUST007 - Rajesh Ram' },
                  { customerId: 'CUST008 - Kannan Suresh' },
                  { customerId: 'CUST009 - Kamal Mishra' },
                  { customerId: 'CUST010 - Elango Ganesh' },
                  { customerId: 'CUST011 - Yoganath' },
                  { customerId: 'CUST012 - Ganesh Ram' }
                ])
        }
        fetchData();
    }, []);

    return (
        <div>
            <Dropdown
                placement="bottom"
                renderTrigger={() => (
                    <div className='hover:cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200'>
                        <BiFilterAlt className='h-5 w-5 text-gray-500' />
                    </div>
                    )}
                className='p-4 w-max'
            >
                <h1 className='mb-2 font-semibold'>Filter</h1>
                <div className='space-y-2'>

                    {/* Client Code */}
                    <div className="flex flex-col">
                        <label className='font-medium text-sm'>Client Code</label>
                        <select 
                            className="rounded-md border-gray-200 text-sm"
                            value={clientCode}
                            onChange={(e) => {dispatch(setClientCode(e.target.value))}}
                        >
                            {
                                list.map((id) => (
                                    <option 
                                        key={id.customerId} 
                                        value={id.customerId} 
                                    >
                                        {id.customerId}
                                    </option>
                                ))
                            }
                        </select>
                        {/* <SearchDropdown localClientCode={localClientCode} setLocalClientCode={setLocalClientCode} /> */}
                        {/* <div>
                        <Combobox value={localClientCode} onChange={(newValue) => {handleChange(newValue)}}>
                            <div className="relative mt-1">
                            <div className="relative w-full cursor-default  rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                <Combobox.Input
                                    className="w-full border border-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-md"
                                    displayValue={(customerId) => customerId}
                                    onChange={(event) => {handleInputChange(event)}}
                                    name={'customerId'}
                                    id={'customerId'}
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
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full h-20 overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                        value={stock.customerId}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                            className={`block truncate ${
                                                selected ? "font-medium" : "font-normal"
                                            }`}
                                            >
                                            {stock.customerId}
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
                                    )))}
                                </Combobox.Options>
                                </Transition>
                                </div>
                            </Combobox>
                        </div> */}
                        {/* <CustomerSearch id={'customerId'} /> */}
                    </div>

                    {/* Broker */}
                    <div className='flex flex-col'>
                        <label className='font-medium text-sm'>Broker</label>
                        <select value={localBroker} onChange={(e) => {setLocalBroker(e.target.value); dispatch(setBroker(e.target.value))}} className='border border-gray-200 rounded-md w-full text-sm' name="broker" id="broker" >
                            <option value="AXIS">AXIS</option>
                            <option value="IIFL">IIFL</option>
                        </select> 
                    </div>
                    
                    {/* Dates radio button */}
                    <div>
                        <p className='font-medium text-sm'>Date</p>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <input type="radio" name="date" value="today" onChange={() => dispatch(setDateType('today'))} />
                                <label htmlFor="date">Today</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio" name="date" value="custom" onChange={() => dispatch(setDateType('custom'))} />
                                <label htmlFor="date">Custom</label>
                            </div>
                        </div>
                    </div>
 
                    {dateType === "custom" && 
                    <div>

                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>From</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={startDate}
                                onChange={(date) => dispatch(setStartDate(date))}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date("1995-12-17T03:24:00")}
                                maxDate={startDate}
                                className='text-sm border-gray-200 rounded-md z-2'
                            /> 
                        </div>                       
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>To</label>
                            <DatePicker
                                dateFormat="dd-MMM-yyyy"
                                selected={endDate}
                                onChange={(date) => dispatch(setEndDate(date))}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date("1995-12-17T03:24:00")}
                                maxDate={startDate}
                                className='text-sm border-gray-200 rounded-md'
                            />                        
                        </div>
                    </div>
                    }
                </div>

                {/* Buttons group */}
                <div className='mt-4 flex space-x-2 justify-center'> 
                    <Button
                        size={'sm'}
                    >
                        Filter
                    </Button>
                    <Button
                        size={'sm'}
                        color={'gray'}
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
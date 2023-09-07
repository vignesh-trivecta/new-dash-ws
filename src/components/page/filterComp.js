'use client';

import React, {useEffect, useState} from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { Button, Dropdown } from 'flowbite-react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import SearchDropdown from '@/utils/searchDropdown';

const FilterComponent = ({clientCode, setClientCode, broker, setBroker, startDate, setStartDate, endDate, setEndDate, toggle, setToggle}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [localClientCode, setLocalClientCode] = useState(clientCode);
    const [localBroker, setLocalBroker] = useState(broker);
    // const [localStartDate, setLocalStartDate] = useState("");
    // const [localEndDate, setLocalEndDate] = useState("");

    const resetFilters = () => {
        setIsOpen(!isOpen);
        setClientCode('CUST001 - Muthu Kumar');
        setLocalClientCode('CUST001 - Muthu Kumar');
        setLocalBroker('AXIS');
        setBroker('AXIS');
        setStartDate(new Date());
        setEndDate(new Date());
        setToggle(!toggle);
    }

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
                        <div>
                            <label className='font-medium text-sm'>Client Code</label>
                            <SearchDropdown localClientCode={localClientCode} setLocalClientCode={setLocalClientCode} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>Broker</label>
                            <select value={localBroker} onChange={(e) => {setLocalBroker(e.target.value)}} className='border border-gray-200 rounded-md w-full text-sm' name="broker" id="broker" >
                                <option value="AXIS">AXIS</option>
                                <option value="IIFL">IIFL</option>
                            </select> 
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>From</label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className='border-gray-200 rounded-md z-2'
                            /> 
                        </div>                       
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>To</label>
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className='border-gray-200 rounded-md'
                            />                        
                        </div>
                    </div>
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
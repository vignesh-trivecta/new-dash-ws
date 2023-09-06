'use client';

import React, {useState} from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { Button, Dropdown } from 'flowbite-react';

const FilterComponent = () => {

    let [isOpen, setIsOpen] = useState(false)

    return (
        <div>

                <Dropdown
                    placement="bottom"
                    renderTrigger={() => (
                        <div className='hover:cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200'>
                            <BiFilterAlt className='h-5 w-5 text-gray-500' />
                        </div>
                      )}
                    className='p-4'
                >
                    <h1 className='mb-2 font-semibold'>Filter</h1>
                    <div className='space-y-2'>
                        <div>
                            <label className='font-medium text-sm'>Client Code</label>
                            <input className='border border-gray-200 rounded-md h-8' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>Broker</label>
                            <select name="broker" id="broker" value={''} className='border border-gray-200 rounded-md w-full text-sm'>
                                <option value="BUY">AXIS</option>
                                <option value="SELL">IIFL</option>
                            </select> 
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>From</label>
                            <input type='date' className='border-gray-200 rounded-md text-sm' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-medium text-sm'>To</label>
                            <input type='date' className='border-gray-200 rounded-md text-sm' />
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
                        >
                            Reset
                        </Button>
                    </div>
                </Dropdown>
            
        </div>
  )
}



export default FilterComponent;
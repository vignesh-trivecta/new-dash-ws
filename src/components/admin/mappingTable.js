import React, { useState } from 'react'
import { Tooltip } from 'flowbite-react'
import { getCustomerStatus, mapBasket } from '@/app/api/basket/route';
import { useSelector } from 'react-redux';

const MappingTable = ({ data, index, status, setStatus }) => {

    // broker inputs 
    const brokers = [
        { name: 'AXIS' },
        { name: 'IIFL' },
    ]

    const adminId = useSelector((state) => state.user.username);
    const basketName = useSelector((state) => state.basket.basketName);

    const [broker, setBroker] = useState(brokers[0].name);

    // handle customer mapping
    const handleMapping = async (customerId) => {
        console.log('enter handlemapping')
        const response = await mapBasket(basketName, adminId, customerId, broker);
        console.log(response);
        const status = await getCustomerStatus(basketName);
        console.log(basketName, status)
        if(status){
            setStatus(status);
        }
        else{
            console.log('error')
        }
    }

    // handle weblink
    const handleWeblink = async () => {
        
    }

    return (
        <tr key={index} className='border-b p-2 hover:bg-gray-100'>
            <td className="text-sm text-left text-black p-2 break-words">
                {data.customerId}
            </td>
            <td className="text-sm text-left text-black break-words">
                {data.name}
            </td>
            <td className="text-sm text-left text-black break-words">
                {data.email}
            </td>
            <td className="text-sm text-center text-black break-words">
                {data.contactOne}
            </td>
            <td className="text-sm text-center text-black">
                <select className="text-xs border-gray-200 rounded-md" value={broker} onChange={e => setBroker(e.target.value)} >
                    <option className="text-sm" value={'AXIS'}>AXIS</option>
                    <option className="text-sm" value={'IIFL'}>IIFL</option>
                </select>
            </td>
            {/* Map status */}
            <td>
                <div className="ml-8">
                    {status.find((obj) =>{ return (obj.customerId === data.customerId) }) 
                    ?
                        <svg className="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    : 
                        <svg className="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    }
                </div>  
            </td>
            {/* Weblink status */}
            <td>
                <div className="ml-8">
                    <svg className="w-4 h-4 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </div>
            </td>
            {/* Actions button group */}
            {/* Map customer */}
            <td className=" flex text-sm text-black mt-2 md: lg:ml-4 ">
                <Tooltip content="Map Customer">
                    <button className="ml-2" onClick={() => {handleMapping(data.customerId)}}>
                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"/>
                    </svg>
                    </button>
                </Tooltip>
                {/* Send Weblink */}
                <Tooltip content="Send Weblink">
                    <button className="ml-4">
                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        </svg>
                    </button>
                </Tooltip>
            </td>
        </tr>
    )
}

export default MappingTable
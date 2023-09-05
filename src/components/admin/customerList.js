'use client';

import SearchDropdown from '@/utils/searchDropdown';
import React, { useState } from 'react'

const CustomerList = () => {

  const [selected, setSelected] = useState(0);

  const data = [
    'CUST001 - Muthu Kumar',
    'CUST002 - Raji Vinod',
    'CUST003 - Aadhan Madhankumar',
    'CUST004 - Shravan Madhankumar',
    'CUST005 - Rekha Kumar',
    'CUST006 - Sathish Mishra',
    'CUST007 - Rajesh Ram',
    'CUST008 - Kannan Suresh',
    'CUST009 - Kamal Mishra',
    'CUST010 - Elango Ganesh',
    'CUST011 - Yoganath',
    'CUST012 - Ganesh Ram',
    'CUST008 - Kannan Suresh',
    'CUST009 - Kamal Mishra',
    'CUST010 - Elango Ganesh',
    'CUST011 - Yoganath',
    'CUST012 - Ganesh Ram',
  ];

  return (
    <div className='p-2'>
      {/* <SearchDropdown /> */}
        <ul className='hover:cursor-pointer'>
            {data.map((cust, index) => (
              <li className={`hover:bg-gray-100 p-2 text-sm truncate ${selected == index ? 'bg-gray-200' : ''}`} key={index} onClick={() => {setSelected(index)}}>
                {cust}
              </li>))
            }
        </ul>
    </div>
  )
}

export default CustomerList;
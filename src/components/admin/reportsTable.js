'use client';

import React from 'react';
import { Tooltip } from 'flowbite-react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import formatDate from '@/utils/format-date';
import stringFormatter from '@/utils/stringFormatter';

const ReportsTable = ({columns, datas, toooltipData}) => {
  return (
    <div>
      {
        (datas?.length !== 0)
        ?
        <Table className="border mt-4 overflow-hidden">
          <Thead className="border">
            <Tr className="border">
              {
                columns?.map((heading, index) => {
                  return (
                    <Th 
                      key={index} 
                      className=' text-sm font-medium p-2 bg-gray-50'
                    >
                      {heading.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/).join(' ')}
                    </Th>
                  )
                })    
              }
            </Tr>
          </Thead>
          <Tbody>
            {datas?.map((data, index) => (
              <Tr 
                className="border hover:bg-gray-100" 
                key={index}
              >
                {Object.values(data)?.map((value, subIndex) => (
                  <Td 
                    className={`text-sm p-2 ${typeof(value) == 'string' ? 'text-center' : 'text-center'}`} 
                    key={subIndex}
                  >
                    {stringFormatter(value)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        :
        <div className='mt-4'>
          <p>No records found!</p>
        </div>  
      }
    </div>
  )
}

export default ReportsTable;

'use client';

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from '@/utils/stringFormatter';
import { usePathname } from 'next/navigation';

const ReportsTable = ({columns, datas, tooltipData}) => {

  const pathName = usePathname();

  const renderTooltipContent = (index) => {
    if (pathName === "/admin/reports/orderBook") {
      return `Exchange Order Id: ${tooltipData && tooltipData[index]?.exchangeOrderId} <br /> Exchange Type: ${tooltipData && tooltipData[index]?.exchangeType}`;
    } else if (pathName === "/admin/reports/tradeBook") {
      return `Exchange Order Id: ${tooltipData && tooltipData[index]?.exchangeOrderId} <br /> Exchange Trade Id: ${tooltipData && tooltipData[index]?.exchangeTradeId}`;
    }
    return;
  }
  
  return (
    <>
    <div>
      {
        (datas?.length !== 0) && datas
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
                data-tooltip-id="my-tooltip"
                data-tooltip-html={
                  renderTooltipContent(index)
                }
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
      <ReactTooltip id="my-tooltip" />
    </div>
    </>
  )
}

export default ReportsTable;

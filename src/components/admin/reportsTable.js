import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from '@/utils/stringFormatter';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const ReportsTable = ({columns, datas, tooltipData}) => {

  const pathName = usePathname();

  const time = useSelector((state) => state.user.timeFormat);
 
  const renderTooltipContent = (index) => {
    if (pathName === "/admin/reports/orderbook") {
      return `Exchange Order Id: ${tooltipData && tooltipData[index]?.exchangeOrderId} <br /> Exchange Type: ${tooltipData && tooltipData[index]?.exchangeType}`;
    } else if (pathName === "/admin/reports/tradebook") {
      return `Exchange Order Id: ${tooltipData && tooltipData[index]?.exchangeOrderId} <br /> Exchange Trade Id: ${tooltipData && tooltipData[index]?.exchangeTradeId}`;
    }
    return;
  }
  
  return (
    <>
    <div className='mt-4' style={{ height: '380px' }}>
      {
        (datas?.length !== 0) && datas
        ?
        <div className={'overflow-y-scroll border'}  style={{ height: '380px' }}>
        <Table className="" >
          <Thead className="">
            <Tr className="">
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
                    {stringFormatter(value, time)}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        </div>
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

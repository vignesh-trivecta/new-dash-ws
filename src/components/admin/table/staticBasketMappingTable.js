import { segregate } from '@/utils/formatter/priceSegregator'
import { segreagatorWoComma } from '@/utils/formatter/segregatorWoComma'
import React from 'react'

const StaticBasketMappingTable = ({data, index}) => {
    return (
        <tr key={index} className="border-b p-2 hover:bg-gray-100">
          <td className="text-sm text-black text-center font-semibold">
            <input 
              type="checkbox" 
              defaultChecked={true}
              value={data.basketName} 
              id={data.basketName}
            />
          </td>
          <td className="text-sm text-left text-black p-2 break-words">
            {data.basketName}
          </td>
          <td className="text-sm text-center text-black break-words">
            {data.basketCategory}
          </td>
          <td className="text-sm text-center text-black break-words">
            {data.noOfScripts}
          </td>
          <td className="text-sm text-center text-black break-words">
            {data.transactionType}
          </td>
          <td className="text-sm text-right text-black">
            {segreagatorWoComma((data?.basketActualValue) / (data?.noOfUnits))}
          </td>
          <td className=" text-sm text-black">
            <input 
              id='quantity'
              value={segregate(data?.noOfUnits)}
              disabled={true}
              type='text' 
              className={`ml-10 w-20 h-8 text-right rounded-md border-gray-200`}
            />
          </td>
        </tr>
  )
}

export default StaticBasketMappingTable

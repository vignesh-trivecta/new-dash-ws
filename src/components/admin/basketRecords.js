import UpdateRecord from './updateRecord';
import { segregate } from '@/utils/priceSegregator';
import DeleteRecord from './deleteRecord';

const BasketRecords = ({ record, index, handleFetch, setHandleFetch, basketName, investmentVal, basketVal }) => {
  return (
    <tr className='border-t border-b hover:bg-gray-50'>
      <th className='text-left'>
        <div className='ml-4 text-sm text-black'>{index+1}</div>
      </th>
      <td className='text-left'>
        <div className='text-sm text-black'>{record.instrumentName}</div>
      </td>
      <td className='text-center'>
        <div className='text-sm text-black'>{record.exchangeUsed}</div>
      </td>
      <td className='text-left'>
        <div className='text-sm text-black ml-4'>{record.orderType}</div>
      </td>
      <td className='text-right mr-4'>
        <div className='text-sm text-black'>{record.weightValue}</div>              
      </td>
      <td className='text-right'>
        <div className='text-sm text-black'>{segregate(record.priceValue)}</div>
      </td>
      <td className='text-right'>
        <div className='text-sm text-black'>{segregate(record.limitPrice)}</div>
      </td>
      <td className='text-right'>
        <div className='text-sm text-black'>{segregate(record.quantityValue)}</div>
      </td>
      <td className="p-2 flex gap-2 ml-4">
        < UpdateRecord 
          recId={record.recId} 
          instrumentName={record.instrumentName} 
          exchange={record.exchangeUsed}
          transType={record.transType}
          orderType={record.orderType}
          weightage={record.weightValue}
          price={record.priceValue}
          lp={record.limitPrice}
          quantity={record.quantityValue}
          handleFetch={handleFetch} 
          setHandleFetch={setHandleFetch}
          mainBasketName={basketName}
          investmentVal={investmentVal}
          basketVal={basketVal}
        />

        < DeleteRecord 
          recId={record.recId} 
          mainBasketName={basketName}
          handleFetch={handleFetch} 
          setHandleFetch={setHandleFetch}
        />
      </td>
    </tr>
  )
}

export default BasketRecords;
import UpdateRecord from "../crud/updateRecord";
import { segregate } from "@/utils/formatter/priceSegregator";
import DeleteRecord from "../crud/deleteRecord";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";

const BasketRecords = ({
  record,
  index,
  handleFetch,
  setHandleFetch,
  basketName,
  mainBasketName,
  investmentVal,
  basketVal,
  setMessage
}) => {
  return (
    <tr className="border-t border-b hover:bg-gray-100">
      <th className="text-left">
        <div className="ml-4 text-sm text-black">{index + 1}</div>
      </th>
      <td className="text-left">
        <div className="text-sm text-black">{record.instrumentName}</div>
      </td>
      <td className="text-center">
        <div className="text-sm text-black">{record.exchangeUsed}</div>
      </td>
      <td className="text-left">
        <div className="text-sm text-black ml-4">{record.orderType}</div>
      </td>
      <td className="text-right mr-4">
        <div className="text-sm text-black">{record.weightValue}</div>
      </td>
      <td className="text-right">
        <div className="text-sm text-black">{segreagatorWoComma(record.priceValue)}</div>
      </td>
      <td className="text-right">
        <div className="text-sm text-black">{segreagatorWoComma(record.limitPrice) || 0}</div>
      </td>
      <td className="text-right">
        <div className="text-sm text-black">{segregate(record.quantityValue)}</div>
      </td>
      <td className="p-2 flex gap-2 ml-4">
        <UpdateRecord
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
          basketName={basketName}
          investmentVal={investmentVal}
          basketVal={basketVal}
        />

        <DeleteRecord
          recId={record.recId}
          mainBasketName={mainBasketName}
          basketName={basketName}
          handleFetch={handleFetch}
          setHandleFetch={setHandleFetch}
          setMessage={setMessage}
        />
      </td>
    </tr>
  );
};

export default BasketRecords;

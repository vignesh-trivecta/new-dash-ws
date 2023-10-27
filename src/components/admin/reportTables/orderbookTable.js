import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from "@/utils/formatter/stringFormatter";
import { useSelector } from "react-redux";

const OrderBookTable = ({ datas, tooltipData }) => {

  console.log(datas)

  const time = useSelector((state) => state.user.timeFormat);
  const [isLoading, setIsLoading] = useState(true);

  const renderTooltipContent = (index) => {
      return `Exchange Order Id: ${
        tooltipData && tooltipData[index]?.exchangeOrderId
      } <br /> Exchange Type: ${
        tooltipData && tooltipData[index]?.exchangeType
      }`;

  };

  useEffect(() => {
    // Simulate a loading delay for the shimmer effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="mt-4" style={{ height: "380px" }}>
      {isLoading ? (
        // <TableShimmer datas={datas} /> // Render your shimmer loading UI here
        <></>
      ) : datas && datas?.length !== 0 ? (
        <div className="overflow-y-scroll border" style={{ height: "380px" }}>
          <Table className="">
            <Thead className="">
              <Tr 
              className=""
              >
                <Th className="p-2 font-medium text-sm">
                    S. No
                </Th>
                <Th className="p-2 font-medium text-sm">
                Remote Order ID
                </Th>
                <Th className="text-left p-2 font-medium text-sm">
                Exchange
                </Th>
                <Th className="p-2 font-medium text-sm">
                Buy/ Sell
                </Th>
                <Th className="p-2 font-medium text-sm">
                Exchange Order Time
                </Th>
                <Th className="pr-12 font-medium text-sm">
                Scripts
                </Th>
                <Th className="pr-12 font-medium text-sm">
                Quantity
                </Th>
                <Th className="pr-12 font-medium text-sm">
                Rate ₹
                </Th>
                <Th className="pr-12 font-medium text-sm">
                Order Status
                </Th>
                <Th className="pr-12 font-medium text-sm">
                Market/ Limit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {datas &&
                datas?.map((data, index) => (
                  <Tr
                    className="border hover:bg-gray-100"
                    key={index}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-html={renderTooltipContent(index)}
                  > 
                    <Td className="text-center text-sm">
                        {index + 1}
                    </Td>
                    <Td className="p-2 pl-4 text-sm text-left ">
                        {data.remoteOrderId}
                    </Td>
                    <Td className="pl-4 text-sm">
                        {data.exchange}
                    </Td>
                    <Td className="text-right pr-4 text-sm">
                        {data.buyorsell}
                    </Td>
                    <Td className="text-right pr-10 text-sm">
                        {stringFormatter(data.exchangeOrderTime)}
                    </Td>
                    <Td className="text-sm">
                        {data.scripName}
                    </Td>
                    <Td className="text-sm text-right pr-16">
                        {data.quantity}
                    </Td>
                    <Td className="text-sm text-right pr-14">
                        {data.rate}
                    </Td>
                    <Td className="text-sm">
                        {data.orderStatus}
                    </Td>
                    <Td className="text-sm text-left pl-8">
                        {data.atMarket}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        <div className="mt-8">No data available!</div>
      )}
      <ReactTooltip id="my-tooltip" />
    </div>
  );
};

export default OrderBookTable;

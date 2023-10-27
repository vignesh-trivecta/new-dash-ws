import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from "@/utils/formatter/stringFormatter";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import TableShimmer from "../../page/layout/tableShimmer";

const HoldingTable = ({ columns, datas }) => {
  console.log(columns, datas);

  const time = useSelector((state) => state.user.timeFormat);
  const [isLoading, setIsLoading] = useState(true);

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
              <Tr className="">
                <Th className="p-2 font-medium text-sm">
                    S. No
                </Th>
                <Th className="p-2 font-medium text-sm">
                    Script
                </Th>
                <Th className="text-left p-2 font-medium text-sm">
                    Script Type
                </Th>
                <Th className="p-2 font-medium text-sm">
                    Quantity
                </Th>
                <Th className="p-2 font-medium text-sm">
                    Current Value ₹
                </Th>
                <Th className="pr-12 font-medium text-sm">
                    Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {datas &&
                datas?.map((data, index) => (
                  <Tr
                    className="border hover:bg-gray-100"
                    key={index}
                  > 
                    <Td className="text-center text-sm">
                        {index + 1}
                    </Td>
                    <Td className="p-2 pl-12 text-sm text-left ">
                        {data.instrumentName}
                    </Td>
                    <Td className="pl-4 text-sm">
                        {data.scripType}
                    </Td>
                    <Td className="text-right pr-14 text-sm">
                        {data.quantity}
                    </Td>
                    <Td className="text-right pr-20 text-sm">
                        {data.faceValue}
                    </Td>
                    <Td className="text-sm">
                        {stringFormatter(data.asofDate)}
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

export default HoldingTable;

import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from "@/utils/formatter/stringFormatter";
import TableShimmer from "../../page/layout/tableShimmer";

const HoldingTable = ({ datas, shimmerLoading }) => {

  return (
    <div className="mt-4">
      {shimmerLoading ? (
        <TableShimmer datas={datas} /> // Render your shimmer loading UI here
        // <></>
      ) : datas && datas?.length !== 0 ? (
        <div className="overflow-y-scroll border h-[calc(100vh-300px)]">
          <Table className="">
            <Thead className="bg-gray-50">
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

import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { segregate } from "@/utils/formatter/priceSegregator";
import TableShimmer from "@/components/page/layout/tableShimmer";

const MarginTable = ({ datas, shimmerLoading }) => {

  return (
    <div className="mt-4">
      {shimmerLoading ? (
        <TableShimmer datas={datas} /> // Render your shimmer loading UI here
      ) :       
      datas && datas?.length !== 0 ? (
        <div className="overflow-y-scroll border h-[calc(100vh-300px)]">
          <Table className="">
            <Thead className="bg-gray-50">
              <Tr className="">
                <Th className="p-2 font-medium text-sm">
                    S. No
                </Th>
                <Th className="p-2 font-medium text-sm">
                  Adjusted Ledger Balance ₹
                </Th>
                <Th className="text-left p-2 font-medium text-sm">
                  Gross Holding Value ₹
                </Th>
                <Th className="p-2 font-medium text-sm">
                  Gross Margin ₹
                </Th>
                <Th className="p-2 font-medium text-sm">
                  Available Margin ₹
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
                    <Td className="p-2 pr-20 text-sm text-right ">
                        {segregate(data.alb)}
                    </Td>
                    <Td className="pr-4 text-sm text-center">
                        {segregate(data.ghv)}
                    </Td>
                    <Td className="text-right pr-14 text-sm">
                        {segregate(data.grossMargin)}
                    </Td>
                    <Td className="text-right pr-20 text-sm">
                        {segregate(data.availableMargin)}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
      ) : (
        <div className="mt-8">No data available!</div>
      )}
    </div>
  );
  
};

export default MarginTable;

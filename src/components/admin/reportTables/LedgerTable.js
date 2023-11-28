import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import stringFormatter from "@/utils/formatter/stringFormatter";
import { useSelector } from "react-redux";
import { segreagatorWoComma } from "@/utils/formatter/segregatorWoComma";
import TableShimmer from "@/components/page/layout/tableShimmer";

const LedgerTable = ({ datas, shimmerLoading }) => {

  const time = useSelector((state) => state.user.timeFormat);

  return (
    <div className="mt-4">
      {shimmerLoading ? (
        <TableShimmer datas={datas} /> // Render your shimmer loading UI here
      ) : datas && datas?.length !== 0 ? (
        <div className="overflow-y-scroll border h-[calc(100vh-300px)]">
          <Table className="">
            <Thead className="bg-gray-50">
              <Tr className="">
                <Th className="p-2 font-medium text-sm">
                    S. No
                </Th>
                <Th className="p-2 font-medium text-sm">
                Voucher Date
                </Th>
                <Th className="text-left p-2 font-medium text-sm">
                Voucher Number
                </Th>
                <Th className="p-2 font-medium text-sm">
                Narration
                </Th>
                <Th className="p-2 font-medium text-sm">
                Debit/ Credit
                </Th>
                <Th className="p-2 font-medium text-sm">
                Amount ₹
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
                    <Td className="p-2 pr-8 text-sm text-right ">
                        {stringFormatter(data.voucherDate)}
                    </Td>
                    <Td className="pr-8 text-sm text-right">
                        {data.voucherNumber}
                    </Td>
                    <Td className="text-left pr-14 text-sm">
                        {stringFormatter(data.narration)}
                    </Td>
                    <Td className="text-right pr-10 text-sm">
                        {data.debitCreditFlag.startsWith("D") ? "Debit" : "Credit"}
                    </Td>
                    <Td className="text-sm text-right pr-10">
                        {segreagatorWoComma(data.amount)}
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

export default LedgerTable;

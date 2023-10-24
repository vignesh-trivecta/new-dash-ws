import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import stringFormatter from "@/utils/formatter/stringFormatter";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import TableShimmer from "../../page/layout/tableShimmer";

const ReportsTable = ({ columns, datas, tooltipData, param }) => {
  console.log(columns, datas, tooltipData);
  const pathName = usePathname();
  const time = useSelector((state) => state.user.timeFormat);
  const [isLoading, setIsLoading] = useState(true);

  const renderTooltipContent = (index) => {
    if (pathName === "/admin/reports/orderbook") {
      return `Exchange Order Id: ${
        tooltipData && tooltipData[index]?.exchangeOrderId
      } <br /> Exchange Type: ${
        tooltipData && tooltipData[index]?.exchangeType
      }`;
    } else if (pathName === "/admin/reports/tradebook") {
      return `Exchange Order Id: ${
        tooltipData && tooltipData[index]?.exchangeOrderId
      } <br /> Exchange Trade Id: ${
        tooltipData && tooltipData[index]?.exchangeTradeId
      }`;
    }
    return "";
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
              <Tr className="">
                {columns?.map((heading, index) => (
                  <Th
                    key={index}
                    className="text-sm font-medium p-2 bg-gray-50"
                  >
                    {heading
                      .split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/)
                      .join(" ")}
                  </Th>
                ))}
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
                    {Object.values(data)?.map((value, subIndex) => (
                      <Td
                        className={`text-sm p-2 ${
                          typeof value === "number"
                            ? "text-right"
                            : (/[A-Z]/g.test(value) && /[A-Z]/g.exec(value).length > 3 ? "text-left" : "text-center")
                        }`}
                        key={subIndex}
                      >
                        {stringFormatter(value, time, param)}
                      </Td>
                    ))}
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

export default ReportsTable;

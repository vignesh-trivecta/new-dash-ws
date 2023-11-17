import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import stringFormatter from "@/utils/formatter/stringFormatter";
import { useSelector } from "react-redux";
import { segregate } from "@/utils/formatter/priceSegregator";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

const MarginTable = ({ datas }) => {

  const time = useSelector((state) => state.user.timeFormat);
  const [isLoading, setIsLoading] = useState(true);
  console.log(datas)

  useEffect(() => {
    // Simulate a loading delay for the shimmer effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []); // Run this effect only once when the component mounts

  // const columnHelper = createColumnHelper();

  // const columns = [
  //   columnHelper.accessor("index", {
  //     header: "S. No",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("alb", {
  //     header: "Adjusted Ledger Balance ₹",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("ghv", {
  //     header: "Gross Holding Value ₹",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("grossMargin", {
  //     header: "Gross Margin ₹",
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnHelper.accessor("availableMargin", {
  //     header: "Available Margin ₹",
  //     cell: ({ cell: { value } }) => {
  //       const hour = Math.floor(value / 60);
  //       const min = Math.floor(value % 60);
  //       return (
  //         <>
  //           {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
  //           {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
  //         </>
  //       );
  //     }
  //   }),
  // ];

  // const data = [

  //   {
  
  //     alb: 317.22,
  
  //     ghv: 0,
  
  //     grossMargin: 317.22,
  
  //     availableMargin: 317.22
  
  //   },
  
  //   {
  
  //     alb: 314.22,
  
  //     ghv: 0,
  
  //     grossMargin: 314.22,
  
  //     availableMargin: 314.22
  
  //   },
  
  //   {
  
  //     alb: 311.2,
  
  //     ghv: 0,
  
  //     grossMargin: 311.22,
  
  //     availableMargin: 311.2
  
  //   }
  
  // ]

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <div className="mt-4" style={{ height: "380px" }}>
      {isLoading ? (
        // <TableShimmer datas={datas} /> // Render your shimmer loading UI here
        <></>
      ) : 

    //   (<div>
    //   <table className="w-full border" >
    //     <thead className="border bg-gray-200">
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <tr key={headerGroup.id}>
    //           {headerGroup.headers.map((header) => (
    //             <th key={header.id} className="font-normal text-base p-2">
    //               {header.isPlaceholder
    //                 ? null
    //                 : flexRender(
    //                     header.column.columnDef.header,
    //                     header.getContext()
    //                   )}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody>
    //       {table.getRowModel().rows.map((row) => (
    //         <tr key={row.id} className="hover:bg-gray-100">
    //           {row.getVisibleCells().map((cell) => (
    //             <td key={cell.id} className="text-center border-b text-sm p-2">
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </td>
    //           ))}
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>)
      
      datas && datas?.length !== 0 ? (
        <div className="overflow-y-scroll border" style={{ height: "380px" }}>
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

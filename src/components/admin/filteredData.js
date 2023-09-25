import React from 'react'
import { useSelector } from 'react-redux'

const FilteredData = () => {

    // redux 
    const customerId = useSelector((state) => state.report.customerId);
    const broker = useSelector((state) => state.report.broker);
    const reportType = useSelector((state) => state.report.reportType);
    const startDate = useSelector((state) => state.report.startDate);
    const endDate = useSelector((state) => state.report.endDate);

    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let formattedStartDate = '';
    if (startDate instanceof Date) {
      formattedStartDate = startDate.getDate() + "-" + months[startDate.getMonth()] + "-" + startDate.getFullYear();
    } else {
      formattedStartDate = ''; // Handle the case where startDate is not a Date object
    }
    
    let formattedEndDate = '';
    if (endDate instanceof Date) {
      formattedEndDate = endDate.getDate() + "-" + months[endDate.getMonth()] + "-" + endDate.getFullYear();
    } else {
      formattedEndDate = ''; // Handle the case where endDate is not a Date object
    }
    

    return (
      <div className='flex space-x-6'>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium break-words">Customer Id</label>
            <input disabled type="text" value={customerId.split('-')[0]} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium break-words">Customer Name</label>
            <input disabled type="text" value={customerId.split('-')[1]} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium">Broker</label>
            <input disabled type="text" value={broker} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium">Report Type</label>
            <input disabled type="text" value={(reportType === 'Market' ? "Market Hours" : (reportType !== "" ? "Post Market" : ""))} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium">From</label>
            <input disabled type="text" value={reportType ? formattedStartDate : ''} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
        <div>
            <label className="text-black text-sm dark:text-white mr-2 font-medium">To</label>
            <input disabled type="text" value={reportType ? formattedEndDate : ''} className="hover:cursor-default border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-36 text-sm" />
        </div>
      </div>
    )
}

export default FilteredData

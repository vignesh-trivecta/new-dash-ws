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
        <div className='flex '>
            <div>
                <label className="text-black text-sm dark:text-white mr-2 font-medium">Customer</label>
                <input type="text" value={customerId} className="border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-44 text-sm" />
            </div>
            <div>
                <label className="text-black text-sm dark:text-white mr-2 font-medium">Broker</label>
                <input type="text" value={broker} className="border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-44 text-sm" />
            </div>
            <div>
                <label className="text-black text-sm dark:text-white mr-2 font-medium">Report Type</label>
                <input type="text" value={(reportType === 'Market' ? "Market Hours" : (reportType !== "" ? "Post Market" : ""))} className="border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-44 text-sm" />
            </div>
            <div>
                <label className="text-black text-sm dark:text-white mr-2 font-medium">From</label>
                <input type="text" value={reportType ? formattedStartDate : ''} className="border border-gray-200 bg-gray-50 rounded-lg w-24 md:w-44 text-sm" />
            </div>
            <div>
                <label className="text-black text-sm dark:text-white mr-2 font-medium">To</label>
                <input type="text" value={reportType ? formattedEndDate : ''} className="border border-gray-200 bg-gray-50 hover:cursor-not-allowed rounded-lg w-24 md:w-44 text-sm" />
            </div>
        </div>
    )
}

export default FilteredData
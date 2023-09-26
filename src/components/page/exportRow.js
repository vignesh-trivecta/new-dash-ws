'use client';

import { BiExport } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { Button } from "flowbite-react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import stringFormatter from "@/utils/stringFormatter";
import PrintPDF from "../admin/jsonPdf";

export default function ExportRow({data, columns, pdfColumns, fileName}) {

  let [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <button 
        onClick={() => {setIsOpen(true)}}
        className="rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
          <BiExport className=" h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
        {
          isOpen 
          && 
          <ExportModal 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            data={data} 
            columns={columns} 
            pdfColumns={pdfColumns}
            fileName={fileName} 
          />
        }
    </div>
  )
}


export const ExportModal = ({isOpen, setIsOpen, data, columns, pdfColumns, fileName}) => {

  const [selected, setSelected] = useState('xls');
  const csvLinkRef = useRef();

  // redux
  const customerId = useSelector((state) => state.report.customerId);
  const broker = useSelector((state) => state.report.broker);
  const reportType = useSelector((state) => state.report.reportType);
  const startDate = useSelector((state) => state.report.startDate);
  const endDate = useSelector((state) => state.report.endDate);

  const now = stringFormatter(new Date().toISOString())

  const header = [
    ["Customer Id", "Customer Name", "Broker", "Report Type", "From", "To", "Report Generated On"],
    [customerId.split('-')[0], customerId.split('-')[1], broker, reportType, stringFormatter(startDate.toISOString()).split(' ')[0], stringFormatter(endDate.toISOString()).split(' ')[0], now],
  ]


  const csvData = [
    header[0],
    header[1],
    ['', '', ''],
    columns,
  ]

  for(let i=0; i<data.length; i++) {
    csvData.push(Object.values(data[i]))
  }
    
  function handleExport() {
    if(selected == "pdf"){
      return;
      // return <PrintPDF data={data} columns={columns} fileName={fileName} />
    }
    else if(selected == "xls") {
      csvLinkRef.current.link.click();
    }
  }

  function handleClick(e) {
    setSelected(e.target.value);
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <CSVLink
        filename={`${fileName}.xls`}
        ref={csvLinkRef}
        data={csvData}
        className="btn btn-primary"
      >
      </CSVLink>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="space-y-8 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Export As
                  </Dialog.Title>
                  <div className="mt-2 flex items-center justify-center space-x-4">
                    <label className="" htmlFor="xls">
                      <input value='xls' checked={selected === "xls"} onChange={handleClick} type="radio" className="mr-1" name="xls" id="xls" />
                      XLS
                    </label>
                    <label className="" htmlFor="pdf">
                      <input value='pdf' checked={selected === "pdf"} onChange={handleClick} type="radio" className="mr-1" name="pdf" id="pdf" />
                      PDF
                    </label>
                  </div>

                  <div className="mt-4 flex space-x-2 justify-center">
                    <div
                      onClick={handleExport}
                      className='bg-cyan-800 hover:bg-cyan-700 border pl-4 pt-1 rounded-md text-white w-20 h-9'
                    > 
                    {
                      (selected == "pdf") ? (<PrintPDF data={data} columns={pdfColumns} fileName={fileName} />) : "Export"
                    }
                    </div>
                    <Button
                      size={'sm'}
                      color={'gray'}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


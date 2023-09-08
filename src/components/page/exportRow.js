'use client';

import { BiExport } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from "flowbite-react";

export default function ExportRow({printTableToPDF}) {

  let [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <button 
        onClick={() => {setIsOpen(true)}}
        className="rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200">
          <BiExport className=" h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
        {
          isOpen && <ExportModal isOpen={isOpen} setIsOpen={setIsOpen} printTableToPDF={printTableToPDF} />
        }
    </div>
  )
}


export const ExportModal = ({isOpen, setIsOpen, printTableToPDF}) => {

  const [selected, setSelected] = useState('xls');

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
                    Export as
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
                    <label className="" htmlFor="email">
                      <input value='email' checked={selected === "email"} onChange={handleClick} type="radio" className="mr-1" name="email" id="email" />
                      Email
                    </label>
                  </div>

                  <div className="mt-4 flex space-x-2 justify-center">
                    <Button
                      size={'sm'}
                      onClick={printTableToPDF}
                    >
                      Export
                    </Button>
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


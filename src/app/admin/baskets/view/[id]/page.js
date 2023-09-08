'use client';

import { cloneBasket, getSpecificBasket } from '@/app/api/basket/route';
import { deleteBasket } from '@/app/api/mainBasket/route';
import { segregate } from '@/utils/priceSegregator';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

const ViewTable = ({ params }) => {
  
  const basketName = (params.id).split('%20').join(' ');
  let input;

  // local state variables
  const [records, setRecords] = useState([]);
  const [res, setRes] = useState(false);


  // modal elements
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const adminId = useSelector((state) => state.user.username);
  const router = useRouter();
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null);

  // useEffect to fetch the table records
  useEffect( () => {
    const gettingRecords = async () => {
      const response = await getSpecificBasket( basketName );
      setRecords(response);
    };
    gettingRecords();
  }, []);

  // useEffect to fetch the table records after deletion or when res changes
  useEffect(() => {
    const gettingRecords = async () => {
      if (res === 'loading') {
        // Fetch the records after a brief delay to allow the deletion to complete on the server
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      const response = await getSpecificBasket(basketName);
      setRecords(response);
    };
    gettingRecords();
  }, [res, params.id]);


  const handleClone =  () => {
    props.setOpenModal(undefined);
  }  

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log('enter');
  //     await deleteBasket(params.id, adminId);
  //     setOpen(false);
  //     // Set the records state to an empty array to clear the table immediately
  //     setRecords([]);
  //     // Set a loading state while fetching the updated records
  //     setRes('loading');
  //     router.push('/admin/baskets/view');
  //   } catch (error) {
  //     console.error('Error deleting basket:', error);
  //   }
  // };
  

  return (
    <div className='container mx-auto mt-4' style={{width: '95%'}}>
      {/* <>
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Not Saved!
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="text-sm text-gray-500">
                            <p>Are you sure you want to delete this Basket?</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex justify-center space-x-4 sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 ring-1 ring-inset ring-gray-300 sm:ml-3 sm:w-auto"
                      onClick={(e) => {
                        handleDelete(e)
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-700 shadow-sm  sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      </> */}

      {/* modal for entering new basket name */}
      <>
        <Modal show={props.openModal === 'form-elements'} size="sm" popup onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header />
          <Modal.Body >
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="New Basket Name" />
                </div>
                <TextInput id="email" className='' autoFocus
                onChange={(e) => {
                  input = e.target.value;
                  // setNewBasketName(e.target.value);
                  }} required />
              </div>
              
              <div className="w-full flex justify-center items-center space-x-4">
                <Button onClick={async() => {let response= await cloneBasket(basketName, input, adminId); setOpenModal(undefined); router.push('/admin/baskets/view')}}>Clone</Button>
                <Button color='gray' onClick={() => {setOpenModal(undefined)}}>Cancel</Button>
              </div>
              
            </div>
          </Modal.Body>
        </Modal>
      </>

      <div className='flex justify-between'>
        <h1 className='font-bold'>{basketName}</h1>
        <button className='flex border border-gray-200 p-2 rounded-md hover:bg-gray-100' onClick={() => setOpenModal('form-elements')} >
          <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18a.969.969 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9l4-4m-4 5h5m3-4h5V1m5 1v12a.97.97 0 0 1-.933 1H9.933A.97.97 0 0 1 9 14V5l4-4h5.067A.97.97 0 0 1 19 2Z"/>
          </svg>
          <span className='ml-2'>Clone Basket</span>
        </button>
      </div>

      {/* Specific Basket Details table */}
      <div className='flex mt-6'>
        <div className={'overflow-y-scroll border'} >
          <table className='table-fixed w-full ' >
            <thead className='sticky top-0  bg-gray-50' >
              <tr>
                <th className='text-left font-medium text-sm p-2' style={{width:'8%'}}>S.No</th>
                <th className='text-left font-medium text-sm p-2' style={{width: '25%'}}>Scripts</th>
                <th className='text-left font-medium text-sm'>Exchange</th>
                <th className='text-left font-medium text-sm'>Order Type</th>
                <th className='text-left font-medium text-sm'>Weights %</th>
                <th className='text-center font-medium text-sm'>Price &#8377;</th>
                <th className='text-center font-medium text-sm'>Limit Price &#8377;</th>
                <th className='text-center font-medium text-sm'>Quantity</th>
              </tr>
            </thead>
            <tbody>
            {records && records?.length > 0 
              ? (records?.map((record, index) => (
                <tr className='border-t border-b hover:bg-gray-100'>
                  <th className="text-left text-sm text-black ">
                      <div className="ml-4">
                          {index+1}
                      </div>
                  </th>
                  <td className='text-left'>
                    <div className='p-2 text-sm text-black'>{record.instrumentName}</div>
                  </td>
                  <td className='text-left'>
                    <div className='p-2 text-sm text-black'>{record.exchangeUsed}</div>
                  </td>
                  <td className='text-left'>
                    <div className='p-2 text-sm text-black'>{record.orderType}</div>
                  </td>
                  <td className='text-center'>
                    <div className='p-2 mr-4 text-sm text-black'>{record.weightValue}</div>              
                  </td>
                  <td className='text-right align-middle'>
                    <div className='p-2 mr-8 text-sm text-black'>{segregate(record.priceValue)}</div>
                  </td>
                  <td className='text-right align-middle'>
                    <div className='p-2 mr-8 text-sm text-black'>{segregate(record.limitPrice ? record.limitPrice : 0)}</div>
                  </td>
                  <td className='text-right'>
                    <div className='p-2 mr-10 text-sm text-black'>{segregate(record.quantityValue)}</div>
                  </td>
                </tr>
              ))) 
              : <td colSpan="8" style={{ height: '250px', textAlign: 'center' }}>
                  No table data
                </td>  
            }
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default ViewTable
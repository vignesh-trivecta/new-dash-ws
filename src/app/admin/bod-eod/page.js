'use client';

import { callToUploadDoc } from '@/app/api/reports/route';
import DayFilterComponent from '@/components/page/dayFilterComponent'
import { Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';

const BodEod = () => {

  const [ documentType, setDocumentType] = useState("");
  const [message, setMessage] = useState("");
  const [handleFetch, setHandleFetch] = useState(false);

  const uploadDoc = async () => {
    const response = await callToUploadDoc();
    if (response) {
      setMessage(response)
    }
    else {
      setMessage("Error Occured! Try after some time.")
    }
  }

  useEffect(() => {
    if (documentType !== "") {
      uploadDoc();
    }
  }, [handleFetch])

  return (
    <div className="container mx-auto mt-4 " style={{ width: "95%" }}>
      <div className='flex justify-between items-center'>
        <h5 className="font-bold mb-2">Beginning/ End of Day</h5>
        <div className=''>
          <DayFilterComponent
            documentType={documentType}
            setDocumentType={setDocumentType}
            handleFetch={handleFetch}
            setHandleFetch={setHandleFetch}
          />
        </div>
      </div>
      <div className="absolute bottom-16 w-96">
        <Alert
          color="warning"
          rounded
          className="h-12"
          icon={HiInformationCircle}
        >
          <span className="w-4 h-4">{message}</span>
        </Alert>
      </div>
    </div>
  )
}

export default BodEod
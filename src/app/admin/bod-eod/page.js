'use client';

import { callToUploadDoc, executeScheduleTasks } from '@/app/api/bod-eod/route';
import DayFilterComponent from '@/components/page/dayFilterComponent'
import { Alert, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const BodEod = () => {

  const [documentType, setDocumentType] = useState("");
  const [message, setMessage] = useState("");
  const [handleFetch, setHandleFetch] = useState(false);
  const [status, setStatus] = useState(false);

  const uploadDoc = async () => {
    const {status, data} = await callToUploadDoc();
        
    setMessage(data.messages);
    if (status === 200) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }

  const handleClick = async (broker) => {
    setMessage("");
    setStatus(false); 


    const {res, status} = await executeScheduleTasks(broker);
    
    setMessage(res);
    if (status === 200) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }
 
  useEffect(() => {
    if (documentType !== "") {
      uploadDoc();
    }
  }, [handleFetch])

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
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
      <div className='mt-4'>
        <div className='space-y-4'>
          <Button id="iifl" onClick={() => handleClick("IIFL")}>
            Update IIFL Reports
          </Button>
          <Button id="axis" onClick={() => handleClick("AXIS")}>
            Update AXIS Reports
          </Button>
        </div>
      </div>
      <div className="absolute bottom-16 w-96">
        {
          message 
          ? 
          <Alert
            color={status ? "success" : "warning"}
            rounded
            className="h-16"
            icon={status ? IoCheckmarkDoneCircle : HiInformationCircle}
          >
            <span>{message}</span>
          </Alert>
          : ""
        }
      </div>
    </div>
  )
}

export default BodEod

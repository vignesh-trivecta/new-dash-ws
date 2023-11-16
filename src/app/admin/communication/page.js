'use client';

import { getCustomers } from '@/app/api/basket/route';
import { sendCommunication } from '@/app/api/communication/route';
import { Alert, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';

const Communication = () => {

  const channels = ["EMAIL","SMS", "WHATSAPP"];

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [msgChannel, setMsgChannel] = useState("EMAIL");
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    if (e.target.id === "customer") {
      setCustomerId(e.target.value);
    } else if (e.target.id === "msgChannel") {
      setMsgChannel(e.target.value);
    } else if (e.target.id === "message") {
      if (e.target.value.length > 300) {
        setError("Message limit exceeds!");
      }
      else {
        setMessage(e.target.value);
        setError("");
        setAlertMessage("");
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await sendCommunication(customerId, message);
    setAlertMessage(res);
    setLoading(false);
    setMessage("");
  }

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await getCustomers();
      setCustomers(customersData);
    };
    fetchData();
  }, [])

  return (
    <div className="container mx-auto mt-4" style={{ width: "95%" }}>
    <form onSubmit={handleSubmit}>
      <h5 className="font-bold mb-2">Communication</h5>
      <div className='flex items-stretch gap-4'>
        <div>
            <p>Select Customer</p>
            <select
              name="customer"
              id="customer"
              className="border border-gray-200 rounded-md w-44 text-sm"
              required
              defaultValue={"EMAIL"}
              onChange={(e) => handleChange(e)}
            >
            <option disabled value="">
              - Select -
            </option>
            {customers?.map((record) => (
              <option key={customers.customerId} value={customers.customerId}>
                {record.customerId + " - " + record.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Select Channel</p>
          <select 
            name="msgChannel"
            id="msgChannel"
            required 
            className='border border-gray-200 rounded-md w-44 text-sm'
            defaultValue={msgChannel}
            onChange={(e) => handleChange(e)}
          >
              <option disabled value={""}>- Select -</option>
              {
                channels.map((channel, index) => <option key={index} value={channel}>{channel}</option>)
              }
          </select>
        </div>
      </div>
      <div className='flex gap-4'>
        <textarea 
          required 
          id="message" 
          name='message'
          value={message}
          className={`mt-4 resize-none rounded-md border-gray-300 ${error ? "outline-red-500 outline outline-1" : ""}`}
          rows={10} 
          cols={50}
          maxLength={300}
          placeholder='Enter your message here...'
          onChange={(e) => handleChange(e)}
        >
        </textarea>
        <Button type="submit" className="self-end" disabled={error} isProcessing={loading}>
          {loading ? "Sending..": "Send"}
        </Button>
      </div>
      <div className='absolute bottom-16 w-2/6'>
        <Alert
          color="warning"
          rounded
          className="h-12"
          icon={HiInformationCircle}
        >
          <span className="w-4 h-4">{error || alertMessage}</span>
        </Alert>
      </div>
    </form>
    </div>
  )
}

export default Communication
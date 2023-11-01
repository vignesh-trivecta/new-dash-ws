'use client';

import { getCustomers } from '@/app/api/basket/route';
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

const Communication = () => {

  const channels = ["SMS", "WHATSAPP"];

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [msgChannel, setMsgChannel] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "customer") {
      setCustomerId(e.target.value);
    } else if (e.target.id === "msgChannel") {
      setMsgChannel(e.target.value);
    } else if (e.target.id === "message") {
      setMessage(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  }

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await getCustomers();
      setCustomers(customersData);
    };
    fetchData();
  }, [])

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-4" style={{ width: "95%" }}>
      <h5 className="font-bold mb-2">Communication</h5>
      <div className='flex items-stretch gap-4'>
        <div>
            <p>Select Customer</p>
            <select
              name="customer"
              id="customer"
              className="border border-gray-200 rounded-md w-44 text-sm"
              required
              defaultValue={""}
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
            defaultValue={""}
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
          className='mt-4 resize rounded-md border-gray-300' 
          rows={10} 
          cols={50}
          maxLength={1200}
          placeholder='Enter your message here...'
          onChange={(e) => handleChange(e)}
        >
        </textarea>
        <Button type="submit" className="self-end">
          Send
        </Button>
      </div>
    </form>
  )
}

export default Communication
'use client';

import { getCustomers } from '@/app/api/basket/route';
import { sendCommunication } from '@/app/api/communication/route';
import { Alert, Button, Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Communication = () => {

  // message channels
  const channels = ["EMAIL","SMS", "WHATSAPP"];

  // local state
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [msgChannel, setMsgChannel] = useState("");
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  // messages
  const msg1 = "Email sent successfully.";

  const handleChange = (e) => {

    if (e.target.id === "customer") {
      const input = e?.target?.value;
      setCustomerId(input);
      const data = customers.filter((data) => data.customerId == input.split(" ")[0]);
      setCustomerData(data);
    } 
    else if (e.target.id === "msgChannel") 
    { 
      const channel = e?.target?.value;
      setMsgChannel(channel);
    } 
    else if (e.target.id === "message") 
    {
      if (e.target.value.length > 1000) {
        setAlertMessage("Message limit exceeds!");
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
    setMsgChannel("");
    setCustomerId("");
  }
  
  const displayTitle = () => {
    switch(msgChannel) {
      case "EMAIL":
        return "Email ID";
      case "SMS":
        return "Mobile No";
      case "WHATSAPP":
        return "Whatsapp No";
      default:
        return "Email ID";
    }
  }
          
  const displayData = (channel) => {
    switch(channel) {
      case "EMAIL":
        setInfo(customerData[0]?.email);
        break;
      case "SMS":
        setInfo(customerData[0]?.contactOne);
      break;
      case "WHATSAPP":
        setInfo(customerData[0]?.contactOne);
        break;
      default:
        setInfo("");
        break;
    }
  }

  useEffect(() => {
    displayData(msgChannel);
  }, [customerData, msgChannel])
 

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getCustomers();
      setCustomers(data);
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
            defaultValue={msgChannel}
            onChange={(e) => handleChange(e)}
          >
              <option disabled value={""}>- Select -</option>
              {
                channels.map((channel, index) => <option key={index} value={channel}>{channel}</option>)
              }
          </select>
        </div>
        <div className='flex flex-col'>
          <label>
            {
              displayTitle()
            }
          </label>
          <Tooltip content={info}>
            <input 
              value={info}
              disabled
              className='border border-gray-200 rounded-md w-44 text-sm h-9 pl-2 truncate'
            />

          </Tooltip>
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
          cols={58}
          maxLength={251}
          placeholder='Enter your message here...'
          onChange={(e) => handleChange(e)}
        >
        </textarea>
        <Button type="submit" className="self-end" disabled={error} isProcessing={loading}>
          {loading ? "Sending..": "Send"}
        </Button>
      </div>
      <div className='absolute bottom-16 w-2/6'>
        {
          alertMessage
          ? 
            (
              alertMessage === msg1 
              ?
                <Alert
                  color="success"
                  rounded
                  className="h-12"
                  icon={IoCheckmarkDoneCircle}
                >
                  <span className="w-4 h-4">{alertMessage}</span>
                </Alert>
              :
                <Alert
                  color="warning"
                  rounded
                  className="h-12"
                  icon={HiInformationCircle}
                >
                  <span className="w-4 h-4">{alertMessage}</span>
                </Alert>
            )
          : ""
        }
      </div>
    </form>
    </div>
  )
}

export default Communication

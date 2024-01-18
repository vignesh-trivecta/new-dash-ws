import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;
const PORT_AXIS = process.env.NEXT_PUBLIC_AXIS_CLIENT_LOGIN_PORT;
const PORT_IIFL = process.env.NEXT_PUBLIC_IIFL_REPORTS_PORT;

// API endpoint to get broker based on customer Id
export const getBroker = async (customerId) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: encrypt(JSON.stringify({
        customerId: customerId,
      }))
    };
    const response = await fetch(
      `http://${DOMAIN}:${PORT}/client/broker-info`,
      requestOptions
    );
    const status = response.status;

    const jsonData = await response.json();
    const data = decrypt(jsonData.payload);
    return { status, data };

  } catch (error) {
    errorLogger(error);
  }
};

// API endpoint to activate or disable today radio button
// based on the market condition
export const isMarketOpen = async () => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  
    const response = await fetch(`http://${DOMAIN}:${PORT}/market/check`, requestOptions);
    const status = response.status;

    const jsonData = await response.json();
    const data = decrypt(jsonData.payload);
    return { status, data };

  } catch (error) {
    errorLogger(error) 
  }
}


// General function handling POST request for all endpoints
// post market hours fetch from Database
export const handleDbReportsFetch = async (
  requestName,
  customerId,
  startDate,
  endDate,
  broker
) => {
  try {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: encrypt(JSON.stringify({
        customerId: customerId.split(" ")[0],
        fromDate: startDate?.toISOString().split('T')[0],
        toDate: endDate?.toISOString().split('T')[0],
      }))
    };

    let reqUrl;
    broker === "AXIS" ? reqUrl = "axis/db" : reqUrl = "iifl/db";

    const response = await fetch(
      `http://${DOMAIN}:${PORT}/${reqUrl}/${requestName}`,
      requestOptions
    );
    const status = response.status;

    const jsonData = await response.json();
    const data = decrypt(jsonData.payload);
    return { status, data };
    
  } catch (error) {
    errorLogger(error);
    return {status: 500, responseJson: []};
  }
};

// General function handling POST request for all endpoints
// live data fetch from exchange
export const handleLiveReportsFetch = async (
  requestName,
  customerId,
  startDate,
  endDate,
  broker
) => {

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: encrypt(JSON.stringify({
        customerId: customerId.split(' ')[0],
        fromDate: startDate.toISOString().split('T')[0],
        toDate: endDate.toISOString().split('T')[0],
      }))
    };
    
    let reqUrl, port;
    broker === "AXIS" ? port = PORT_AXIS : port = PORT_IIFL;
    broker === "AXIS" ? reqUrl = "axis/live" : reqUrl = "partner/live";

    let response = await fetch(
      `http://${DOMAIN}:${port}/${reqUrl}/${requestName}`,
      requestOptions
    );
    const status = response.status;

    const jsonData = await response.json();
    const data = decrypt(jsonData.payload);
    return { status, data };

  } catch (error) {
    errorLogger(error);
    return {status: 500, data:{ [requestName]: [], message: "Server Error! Try after some time"}};
  }
};


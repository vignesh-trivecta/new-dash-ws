// API endpoint to get broker based on customer Id
export const getBroker = async (customerId) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: customerId,
      }),
    };
    const response = await fetch(
      "http://localhost:8083/client/broker-info",
      requestOptions
    );

    if (response.status === 200) {
      const responseText = await response.json();
      return responseText.customerBroker;
    } else {
      return false;
    }
  } catch (error) {
    return false;
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
  
    const response = await fetch("http://localhost:8083/market/check", requestOptions);

    if (response.status === 200) {
      const responseText = await response.json();
      return responseText.marketStatus;
    }
    else return null;
  } catch (error) {
    return null;  
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
      body: JSON.stringify({
        customerId: customerId.split(" ")[0],
        fromDate: startDate?.toISOString().split('T')[0],
        toDate: endDate?.toISOString().split('T')[0],
      }),
    };

    let reqUrl;
    broker === "AXIS" ? reqUrl = "axis/db" : reqUrl = "iifl/db";

    const response = await fetch(
      `http://localhost:8083/${reqUrl}/${requestName}`,
      requestOptions
    );

    let responseJson = "";
    const status = response.status;
    if (status === 200) {
     responseJson = await response.json();
    }
    
    return {status, responseJson};
    
  } catch (error) {
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
      body: JSON.stringify({
        customerId: customerId.split(' ')[0],
        fromDate: startDate.toISOString().split('T')[0],
        toDate: endDate.toISOString().split('T')[0],
      }),
    };
    
    let reqUrl, endpoint;
    broker === "AXIS" ? reqUrl = "axis/live" : reqUrl = "partner/live";
    broker === "AXIS" ? endpoint = 8090 : endpoint = 8085;

    let response = await fetch(
      `http://localhost:${endpoint}/${reqUrl}/${requestName}`,
      requestOptions
    );

    console.log(response);

    const status = response.status;
    const responseJson = await response.json();
    console.log(status, responseJson)
    return {status, responseJson};

  } catch (error) {
    return {status: 500, responseJson:{ [requestName]: [], message: "Server Error! Try after some time"}};
  }
};


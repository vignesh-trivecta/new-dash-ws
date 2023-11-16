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
  } catch (error) {
    console.log(error)
    return;  
  }
}

// General function handling POST request for all endpoints
// post market hours fetch from Database
export const handleDbReportsFetch = async (
  requestName,
  customerId,
  startDate,
  endDate
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

    const response = await fetch(
      `http://localhost:8083/iifl/db/${requestName}`,
      requestOptions
      );


    if (response.status === 200) {
      const responseText = await response.json();
      return responseText;
    } 
    else if (response.status === 404) {
      //return response.status;
    }
    else {
      //return response.status;
    }
  } catch (error) {
    console.log(error)
    //return error.message;
  }
};

// General function handling POST request for all endpoints
// live data fetch from exchange
export const handleLiveReportsFetch = async (
  requestName,
  customerId,
  startDate,
  endDate
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
    const response = await fetch(
      `http://localhost:8085/partner/live/${requestName}`,
      requestOptions
    );

    if (response.status === 200) {
      const responseText = await response.json();
      return responseText;
    } 
    else if (response.status === 404) {
      return [];
    }
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

// API endpoint to upload the Exchange data to DB
export const callToUploadDoc = async () => {
  try {
    const response = await fetch("http://localhost:8087/excel/update");

    if (response.status === 200) {
      const responseText = await response.text();
      return responseText;
    } 
    else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// API endpoint to login the partner into IIFL programatically
export const partnerLogin = async () => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "http://localhost:8085/partner/login",
      requestOptions
    );

    if (response.ok) {
      const responseText = await response.text();
      const data = JSON.parse(responseText);
      return data;
    } else {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${errorText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// // API endpoint to get the holding data
// export const clientHoldings = async (customerId) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 "customerId": customerId,
//             }
//         }
//         const response = await fetch("http://localhost:8085/partner/client/holding", requestOptions);

//         if (response.ok) {
//             const responseText = await response.text();
//             const data = JSON.parse(responseText);
//             return data;
//         } else {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch data: ${errorText}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// // API endpoint to get the order book data
// export const clientOrderBook = async (customerId) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 "customerId": customerId,
//             }
//         }
//         const response = await fetch("http://localhost:8085/partner/client/orderbook", requestOptions);

//         if (response.ok) {
//             const responseText = await response.text();
//             const data = JSON.parse(responseText);
//             return data;
//         } else {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch data: ${errorText}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// // API endpoint to get the trade book data
// export const clientTradeBook = async (customerId) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 "customerId": customerId,
//             }
//         }
//         const response = await fetch("http://localhost:8085/partner/client/tradebook", requestOptions);

//         if (response.ok) {
//             const responseText = await response.text();
//             const data = JSON.parse(responseText);
//             return data;
//         } else {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch data: ${errorText}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// // API endpoint to get the margin data
// export const clientMargin = async (customerId) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 "customerId": customerId,
//             }
//         }
//         const response = await fetch("http://localhost:8085/partner/client/margin", requestOptions);

//         if (response.ok) {
//             const responseText = await response.text();
//             const data = JSON.parse(responseText);
//             return data;
//         } else {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch data: ${errorText}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// // API endpoint to get the ledger data
// export const clientLedger = async (customerId) => {
//     try {
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 "customerId": customerId,
//             }
//         }
//         const response = await fetch("http://localhost:8085/partner/client/ledger", requestOptions);

//         if (response.ok) {
//             const responseText = await response.text();
//             const data = JSON.parse(responseText);
//             return data;
//         } else {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch data: ${errorText}`);
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

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

    if (response) {
      const responseText = await response.json();
      return responseText.customerBroker;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

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
      return response.status;
    }
    else {
      return response.status;
    }
  } catch (error) {
    return error.message;
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
        customerId: customerId,
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
      return response.status;
    }
    else {
      return response.status;
    }
  } catch (error) {
    return error.message;
  }
};

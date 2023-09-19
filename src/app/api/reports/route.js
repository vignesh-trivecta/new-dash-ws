// API endpoint to login the partner into IIFL programatically
export const partnerLogin = async () => {

    try{
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
        };
        const response = await fetch("http://localhost:8085/partner/login", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            const data = JSON.parse(responseText);
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error)
    }
}

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


// General function handling POST request for all endpoints
export const handleFetchReports = async (requestName, customerId) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                "customerId": customerId,
            }
        }
        const response = await fetch(`http://localhost:8085/partner/client/${requestName}`, requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            const data = JSON.parse(responseText);
            return data;
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to fetch data: ${errorText}`);
        }
    } catch (error) {
        console.log(error)
    }
}
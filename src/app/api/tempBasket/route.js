import { encrypt } from "@/utils/aesEncryptor";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

// API call to fetch all records of a basket in temporary table
export const getRecords = async(adminName, basketName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "adminId": adminName,
                    "basketName": basketName
                }
            )
        };
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/list`, requestOptions);

        if (response.status === 200) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data;
        } else {
            return [];
        }
    }
    catch(error){
        console.log(error)
    }
}


// API call to add a new record in temporary table
export const addRecord = async(adminName, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, investmentVal, limitPrice, basketCategory ) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: (JSON.stringify(
                {
                    "adminId": adminName,
                    "basketName": String(basketName),
                    "instrumentName": selectedStock,
                    "exchangeUsed": exchange,
                    "orderType": orderType,
                    "transType": transType,
                    "quantity": quantity,
                    "weightage": Number(weightage),
                    "price": price, 
                    "basketInvAmount": Number(investmentVal),
                    "limitPrice" : Number(limitPrice),
                    "basketCategory": basketCategory,       
                }
            ))
        };

        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp`, requestOptions);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}


// API  call to update a record in temporary table
export const updateRecordAPI = async(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, val1, val2, limitPrice ) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "recId": recId,
                "basketName": String(basketName),
                "adminName": adminId,
                "instrumentName": selectedStock,
                "exchangeUsed": exchange,
                "orderType": orderType,
                "transType": transType,
                "quantity": quantity,
                "weightage": Number(weightage),
                "price": price,
                "basketInvAmount": Number(val1),       
                "basketActualValue" : Number(val2),
                "limitPrice": limitPrice    
            })
        };
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/up`, requestOptions);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}


// API call to delete a record from temporary table
export const deleteRecord = async(recId, basketName, adminName) => {
    try{
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  "recId": recId,
                  "basketName": basketName,
                  "adminName": adminName
                })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/del`, requestOptions);

        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

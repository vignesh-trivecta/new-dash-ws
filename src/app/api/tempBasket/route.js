import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

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
            body: encrypt(JSON.stringify(
                {
                    "adminId": adminName,
                    "basketName": basketName
                }
            ))
        };
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/list`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error){
        errorLogger(error);
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
            body: encrypt(JSON.stringify(
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
        const status = response.status;

        if (status === 201) {
            return {status, messages: true};
        } else {            
            const jsonData = await response.json();
            const data = decrypt(jsonData.payload);
            return {status, messages: data.messages};
        }
    }
    catch(error){
        errorLogger(error);
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
            body: encrypt(JSON.stringify({
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
            }))
        };
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/up`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return {status, data};
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
            body: encrypt(JSON.stringify({
                  "recId": recId,
                  "basketName": basketName,
                  "adminName": adminName
                }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/temp/del`, requestOptions);
        const status = response.status;
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error){
        return false;
    }
}

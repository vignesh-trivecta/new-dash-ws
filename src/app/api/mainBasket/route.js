import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

// API call to delete a basket completely from main table
export const deleteBasket = async(basketName, adminId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
                "adminId" : adminId,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/full-basket/delete`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = await decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error)
    {
        errorLogger(error);
    }
}

// API call to add a record in Main table
export const AddRecordMainAPI = async( adminId, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, limit, investmentVal, basketVal, basketCategory ) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "adminName": adminId,
                "basketName": String(basketName),
                "instrumentName": selectedStock,
                "exchangeUsed": exchange,
                "orderType": orderType,
                "transType": transType,
                "quantityValue": quantity,
                "weightValue": Number(weightage),
                "priceValue": price,
                "limitPrice": limit , 
                "basketInvestAmt": Number(investmentVal),       
                "basketActualValue" : basketVal,
                "basketCategory": basketCategory,
            }))
        };

        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/add-a-row`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = await decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to update a record in Main table
export const updateRecordMainAPI = async(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, val1, val2, limitPrice ) => {
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
                "limitPrice": Number(limitPrice)          
            }))
        };
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/update`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error){
        return false;
    }
}

// API call to delete a record in Main table
export const deleteRecordMainAPI = async(recId, basketName, adminId ) => {
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
            }))
        };

        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/delete`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return {status, data};
    }
    catch(error){
        errorLogger(error);
    }
}

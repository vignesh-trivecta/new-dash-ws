import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

// API call to submit the whole basket to backend
export const submitBasket = async (adminName, basketName, modelBasket, basketValidity, transType, investmentAmount, basketActualValue, basketCategory, basketRequests) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "adminName": adminName,
                "basketName": basketName,
                "basketModel": modelBasket,
                "basketValidity": basketValidity, 
                "transType": transType,
                "basketInvestAmt": Number(investmentAmount),
                "basketActualValue": Number(basketActualValue),
                "basketCategory": basketCategory,
                "basketRequests": basketRequests,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/create`, requestOptions);
        const status = response.status;
        
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to get the list of basket details
export const getBasketList = async(filteredBasket) => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let response;
        switch(filteredBasket){
            case 'ALL':
                response = await fetch(`http://${DOMAIN}:${PORT}/view/basketlist`, requestOptions);
                break;
            case 'MODEL':
                response = await fetch(`http://${DOMAIN}:${PORT}/view/basketlist/model`, requestOptions);
                break;
            case 'BUY':
                response = await fetch(`http://${DOMAIN}:${PORT}/view/basketlist/buy`, requestOptions);
                break;
            case 'SELL':
                response = await fetch(`http://${DOMAIN}:${PORT}/view/basketlist/sell`, requestOptions);
                break;
            case 'MAP':
                response = await fetch(`http://${DOMAIN}:${PORT}/view/map/section/basketlist`, requestOptions);
                break;
            default:
                response = await fetch(`http://${DOMAIN}:${PORT}/view/basketlist`, requestOptions);
                break;
        }
        
        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            return [];
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

// API call to get the specific basket and its details
export const getSpecificBasket = async(basketName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/view/basket`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error)
    {
        errorLogger(error);
    }
}

// API call to clone a basket
export const cloneBasket = async (basketName, newBasketName, adminId, modelBasket, basketValidity) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketName,
                "newBasketName": newBasketName,
                "adminId": adminId,
                "basketModel": modelBasket,
                "basketValidity": basketValidity
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/clone`, requestOptions);

        if(response.status === 200){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error) {
        return false;
    }
}

// API call to check whether the basket name already exists or not
export const basketNameCheck = async (basketName) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/namecheck`, requestOptions);
        if(response.status === 200){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error) {
        return false;
    }
}

// API call for getting the price of Script
export const getEquityPrice = async (instrumentName, exchange) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "instrumentName": instrumentName,
                "exchangeValue": exchange,
            }))
        };

        const response = await fetch(`http://${DOMAIN}:${PORT}/equity-price`, requestOptions);

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return data?.price;
    }
    catch(error){
        errorLogger(error);
    }

}

// API call to get the scripts details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch(`http://${DOMAIN}:${PORT}/instruments`);
        const status = response.status;
        
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
        
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to post the weightage and get the quantity
export const sendWeightage = async(weightage, totalAmount, priceofAsset) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "weightAge": weightage,
                "totalAmount": Number(totalAmount),
                "priceofAsset": priceofAsset,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/quantity-calc`, requestOptions);
        const status = response.status;
        
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to post the quantity and get the weightage
export const sendQuantity = async(quantity, totalAmount, priceofAsset) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "quantity": quantity,
                "totalAmount": totalAmount,
                "priceofAsset": priceofAsset,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/weightage/rebalancing`, requestOptions);
        const status = response.status;
        
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to get the Customer details
export const getCustomers = async() => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/customer/details`, requestOptions);

        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// get basket investment value and basket value
export const getBasketValue = async(basketName, adminId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketName,
                "adminId": adminId,
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/details`, requestOptions);

        if(response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            return [];
        }
    }
    catch(error){
        return [];
    }
}


// API call to get the basket category list
export const getBasketCategories = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/basket/category`, requestOptions);

        const status = response.status;
        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error) {
        errorLogger(error);
    }
}

// API call to add a category to the basket category list
export const addBasketCategory = async (query) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "basketCategory": query,
                "basketDescription": "New basket name",
            })
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/add/basket-category`, requestOptions);

        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(error) {
        return false
    }
}

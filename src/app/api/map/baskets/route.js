import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

// API to map a basket to a customer
export const mapBasket = async(basketName, adminId, customerId, broker, quantity) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
                "adminId": adminId,
                "customerId": customerId,
                "brokerName": broker,
                "basketUnits": quantity
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/customer/map`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API to un-map a basket from a customer
export const unMapBasket = async(basketName, adminId, customerId, broker, quantity) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
                "adminId": adminId,
                "customerId": customerId,
                "brokerName": broker,
                "basketUnits": quantity
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/customer/single/unmap`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to send weblink to a customer
export const sendWeblink = async(basketName, adminId, customerId, brokerName, basketUnits) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketName": basketName,
                "adminId": adminId,
                "customerId": customerId,
                "brokerName": brokerName,
                "basketUnits": basketUnits,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/send/weblink`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to get the mapping, weblink status of customers based on baksetName
export const getCustomerStatus = async (basketName) => {
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
        const response = await fetch(`http://${DOMAIN}:${PORT}/mappedstatus`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API endpoint to map the multiple baskets to a customer
export const sendMultipleBaskets = async (basketData, adminId, customerId, brokerName, selectedBasketGroup) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "basketData": basketData,
                "adminId": adminId,
                "customerId": customerId.split(" ")[0],
                "brokerName": brokerName,
                "groupName": selectedBasketGroup,
            }))
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/customer/map/multiple`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    
    catch (error) {
        errorLogger(error);
    }
}


// API endpoint to map the multiple baskets to a customer
export const unMapMultipleBaskets = async (selectedBasketGroup, customerId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "groupName": selectedBasketGroup,
                "customerId": customerId.split(" ")[0],
            }))
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/customer/multiple/unmap`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    
    catch (error) {
        errorLogger(error);
    }
}


// API endpoint to select a basket group name and send weblink
export const fetchByGroupAndSend = async (groupName, customerId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "groupName": groupName,
                "customerId": customerId.split(" ")[0],
            }))
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/fetch/groupName`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    
    catch (error) {
        errorLogger(error);
    }
}

// API endpoint to get the all the basket groupnames
export const getBasketGroups = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/groupname`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    } catch (error) {
        errorLogger(error);
    }
}

// API endpoint to get the baskets details by group-basket name
export const fetchDetailsByGroupName = async (groupName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "groupName": groupName,
            }))
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/fetch/groupName/details`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    
    catch (error) {
        errorLogger(error);
    }
}

// API endpoint to get the baskets details by group-basket name
export const fetchDetailsByCustomer = async (groupName, customerId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "groupName": groupName,
                "customerId": customerId.split(" ")[0],
            }))
        }

        const response = await fetch(`http://${DOMAIN}:${PORT}/fetch/map/details/customer`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    
    catch (error) {
        errorLogger(error);
    }
}

import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT1 = process.env.NEXT_PUBLIC_IIFL_INTEGR_PORT;
const PORT2 = process.env.NEXT_PUBLIC_CLIENT_LOGIN_PORT;
const PORT3 = process.env.NEXT_PUBLIC_AXIS_CLIENT_LOGIN_PORT;

// API call to generate the otp
export const generateOtp = async(basketLink) => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://${DOMAIN}:${PORT2}/basket/` + basketLink, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
        return {status: 500, data: "Otp generation failed"};
    }
}

// API call to post the OTP and validate
export const validateOtp = async(basketLink, otp) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: encrypt(JSON.stringify({
                "otp": Number(otp),
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT2}/basket/` + basketLink, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

// API call to make when client confirms the basket shown to them
// mock of IIFL login
export const clientConfirmsBasket = async(basketData) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketData.basketName,
                "customerName": basketData.customerName,
                "customerId": basketData.customerId,
                "rows": basketData.rows,
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT1}/place/order`, requestOptions);

        if (response.status === 200) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data;
        } else {
            const errorText = await response.text();
            return false;
        }
    }
    catch(error){
        return false;
    }
}

// API call to get the redirect URL for axis 
export const getAxisUrl = async (customerId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "customerId": customerId,
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT3}/axis/client/login`, requestOptions);

        if (response.status === 200) {
            const responseText = await response.json();
            return responseText.url;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

// API call to place the AXIS customer orders 
export const postAxisOrders = async (customerId, ssoId, basketName, customerName, basketData) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "customerId": customerId,
                "ssoId": ssoId,
                "basketName": basketName,
                "customerName": customerName,
                "rows": basketData
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT3}/axis/client/tokens`, requestOptions);

        if (response.status === 200) {
            const responseText = await response.json();
            return responseText.body;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

// API endpoint to make AXIS direct order placement
export const directOrderPlacement = async (customerId, basketName, customerName, basketData) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "customerId": customerId,
                "basketName": basketName,
                "customerName": customerName,
                "rows": basketData
            })
        }
        const response = await fetch(`http://${DOMAIN}:${PORT3}/axis/client/direct-order-placement`, requestOptions);

        if (response.status === 200) {
            const responseText = await response.json();
            return responseText;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

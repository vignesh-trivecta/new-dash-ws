// API call to generate the otp
export const generateOtp = async(basketLink) => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch("http://localhost:8086/basket/" + basketLink, requestOptions);
        
        const data = await response.text();
        const code = response.status;
        return {data, code};
    }
    catch(error){
        return {data: "Otp generation failed", code: 500};
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
            body: JSON.stringify({
                "basketLink": basketLink,
                "otp": otp,
            })
        }
        const response = await fetch("http://localhost:8086/basket/" + basketLink, requestOptions);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            return false;
        }
    }
    catch(error){
        return 'server error';
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
        const response = await fetch("http://localhost:8084/place/order", requestOptions);

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
        console.log(error);
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
        console.log(customerId)
        const response = await fetch("http://localhost:8090/axis/client/login", requestOptions);

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
        const response = await fetch("http://localhost:8090/axis/client/tokens", requestOptions);

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
    console.log(customerId, basketName, customerName, basketData)
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
        const response = await fetch("http://localhost:8090/axis/client/direct-order-placement", requestOptions);

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

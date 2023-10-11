// API call to generate the otp
export const generateOtp = async(basketLink) => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch("http://localhost:8083/basket/" + basketLink, requestOptions);
        console.log(response);
        if(response.ok){
            return true;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        return console.log(error);
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


        if(response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            console.log(data)
            return data;
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
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
        console.log(response);

        if(response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            console.log(data);
            return data;
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
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
        const response = await fetch("http://localhost:8090/axis/client/login", requestOptions);
        console.log(response);

        if(response.status === 200) {
            const responseText = await response.json();
            return responseText.url;
        } else {
            return false;
        }
    }
    catch(error){
        console.log(error);
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
        console.log(customerId, ssoId, basketName, customerName, basketData)
        const response = await fetch("http://localhost:8090/axis/client/tokens", requestOptions);
        console.log(response);

        if(response.status === 200) {
            const responseText = await response.json();
            console.log(responseText.body)
            return responseText.body;
        } else {
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

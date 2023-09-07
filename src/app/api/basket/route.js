// API call to submit the whole basket to backend
export const submitBasket = async (adminName, basketName, modelBasket, basketValidity, basketRequests, transType, investmentAmount, basketActualValue) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "adminName": adminName,
                "basketName": basketName,
                "basketModel": modelBasket,
                "basketValidity": basketValidity, 
                "basketRequests": basketRequests,
                "transType": transType,
                "basketInvestAmt": Number(investmentAmount),
                "basketActualValue": Number(basketActualValue),
            })
        }
        const response = await fetch('http://localhost:8083/basket/create', requestOptions);
        console.log(adminName, basketName, modelBasket, basketValidity, transType, Number(investmentAmount), Number(basketActualValue))
        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.log(error);
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
                response = await fetch("http://localhost:8083/view/basketlist", requestOptions);
                console.log(response);
                break;
            case 'MODEL':
                response = await fetch("http://localhost:8083/view/basketlist/model", requestOptions);
                console.log(response);
                break;
            case 'BUY':
                response = await fetch("http://localhost:8083/view/basketlist/buy", requestOptions);
                console.log(response);
                break;
            case 'SELL':
                response = await fetch("http://localhost:8083/view/basketlist/sell", requestOptions);
                console.log(response);
                break;
            default:
                response = await fetch("http://localhost:8083/view/basketlist", requestOptions);
                console.log(response);
                break;
        }

        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
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
            body: JSON.stringify({
                "basketName": basketName,
            })
        }
        const response = await fetch("http://localhost:8083/view/basket", requestOptions);
        console.log(basketName, response);

        if(response.ok){
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

// API call to clone a basket
export const cloneBasket = async (basketName, newBasketName, adminId) => {
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
            })
        }
        const response = await fetch("http://localhost:8083/basket/clone", requestOptions);
        console.log(basketName, newBasketName, adminId);
        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error) {
        console.log(error);
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
            body: JSON.stringify({
                "basketName": basketName,
            })
        }
        const response = await fetch("http://localhost:8083/basket/namecheck", requestOptions);
        console.log(basketName);
        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error) {
        console.log(error);
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
            body: JSON.stringify({
                "instrumentName": instrumentName,
                "exchangeValue": exchange,
            })
        };

        const response = await fetch("http://localhost:8083/equity-price", requestOptions);
        
        if (response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data.price;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
    }

}

// API call to get the scripts details
export const getInstrumentDetails = async () => {
    try{
        const response = await fetch("http://localhost:8083/instruments")
        
        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
        
    }
    catch(error){
        console.log(error)
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
            body: JSON.stringify({
                "weightAge": weightage,
                "totalAmount": totalAmount,
                "priceofAsset": priceofAsset,
            })
        }
        console.log(weightage, totalAmount, priceofAsset)
        const response = await fetch("http://localhost:8083/quantity-calc", requestOptions);

        if(response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data.quantity;
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
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
        const response = await fetch("http://localhost:8083/customer/details", requestOptions);

        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
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
        const response = await fetch("http://localhost:8083/basket/details", requestOptions);

        if(response.ok) {
            const responseText = await response.text();
            return JSON.parse(responseText);
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
    }
}

// API to map a basket to a customer
export const mapBasket = async(basketName, adminId, customerId, brokerName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketName,
                "adminId": adminId,
                "customerId": customerId,
                "brokerName": brokerName,
            })
        }
        console.log(basketName, adminId, customerId, brokerName)
        const response = await fetch("http://localhost:8083/customer/map", requestOptions);
        console.log(response)
        if(response.ok) {
            return true;
        } else {
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

// API call to send weblink to a customer
export const sendWeblink = async() => {
    
}

// API call to get the mapping, weblink status of customers based on baksetName
export const getCustomerStatus = async (basketName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketName,
            })
        }
        const response = await fetch("http://localhost:8083/mappedstatus", requestOptions);
        if(response.ok){
            const responseText = await response.text();
            console.log(JSON.parse(responseText))
            return JSON.parse(responseText);
        }
        else{
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

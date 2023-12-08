import { decrypt } from "@/utils/aesDecryptor";

// API call to submit the whole basket to backend
export const submitBasket = async (adminName, basketName, modelBasket, basketValidity, transType, investmentAmount, basketActualValue, basketCategory, basketRequests) => {
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
                "transType": transType,
                "basketInvestAmt": Number(investmentAmount),
                "basketActualValue": Number(basketActualValue),
                "basketCategory": basketCategory,
                "basketRequests": basketRequests,
            })
        }
        const response = await fetch('http://localhost:8083/basket/create', requestOptions);
        if (response.status == 200) {
            return true;
        }
        else return false;

    }
    catch(error){
        return false;
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
                break;
            case 'MODEL':
                response = await fetch("http://localhost:8083/view/basketlist/model", requestOptions);
                break;
            case 'BUY':
                response = await fetch("http://localhost:8083/view/basketlist/buy", requestOptions);
                break;
            case 'SELL':
                response = await fetch("http://localhost:8083/view/basketlist/sell", requestOptions);
                break;
            default:
                response = await fetch("http://localhost:8083/view/basketlist", requestOptions);
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
        if(response.ok){
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
        
        if(response.status === 200){
            const jsonData = await response.json();
            return (jsonData);
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
        const response = await fetch("http://localhost:8083/quantity-calc", requestOptions);

        if(response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data.quantity;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
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

        if(response.status === 200){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            return false;
        }
    }
    catch(error){
        return false;
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

        const response = await fetch("http://localhost:8083/basket/category", requestOptions);
        if (response.status == 200) {
            const data = await response.json();
            return data;
        }
        else return false;
    }
    catch(error) {
        return false;
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

        const response = await fetch("http://localhost:8083/add/basket-category", requestOptions);

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

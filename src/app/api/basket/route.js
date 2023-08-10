// API call to fetch all records of a basket in temp table
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
        const response = await fetch("http://localhost:8083/basket/temp/list", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error)
        console.log(adminName, basketName)
    }
}


// API call to add a new record
export const addRecord = async(adminName, basketName,selectedStock, exchange, orderType, transType, quantity, weightage, price, basketAmount, limitPrice ) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "adminId": adminName,
                "basketName": String(basketName),
                "instrumentName": selectedStock,
                "exchangeUsed": exchange,
                "orderType": orderType,
                "transType": transType,
                "quantity": quantity,
                "weightage": Number(weightage),
                "price": price, 
                "basketInvAmount": Number(basketAmount)     ,
                "limitPrice" : Number(limitPrice)      
            })
        };

        const response = await fetch("http://localhost:8083/basket/temp", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            console.log(orderType);
            console.log(data)
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
    }
}


// API  call to update a record in table
export const updateRecordAPI = async(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, basketAmount ) => {
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
                "basketInvAmount": Number(basketAmount),           
            })
        };

        const response = await fetch("http://localhost:8083/basket/temp/up", requestOptions);

        if (response.ok) {
            const responseText = await response.text();
            console.log(responseText);
            return responseText;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
    }
}


// API call to delete a record from table
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
        const response = await fetch("http://localhost:8083/basket/temp/del", requestOptions);

        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

// API call to submit the whole basket to backend
export const submitBasket = async (adminName, basketName, modelBasket, basketValidity, basketRequests) => {
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
            })
        }
        const response = await fetch('http://localhost:8083/basket/create', requestOptions);
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
export const getBasketList = async() => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch("http://localhost:8083/view/basketlist", requestOptions);

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
            console.log(jsonData)
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

// API call to delete a basket completely from main table
export const deleteBasket = async(basketName, adminId) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketName": basketName,
                "adminId" : adminId,
            })
        }
        const response = await fetch("http://localhost:8083/basket/full-basket/delete", requestOptions);

        if(response.ok){
            return true;
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

// API call to update a record in Main table
export const updateRecordMainAPI = async(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, basketAmount ) => {
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
                "basketInvAmount": Number(basketAmount), 
                "limitPrice":0,          
            })
        };

        const response = await fetch("http://localhost:8083/basket/update", requestOptions);
        console.log(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, basketAmount)

        if (response.ok) {
            const responseText = await response.text();
            console.log('response sent')
            return responseText;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
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

// API call for getting the price of Equity
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
            console.log("Response ok", data);
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

// API call to get the stocks details
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
            console.log(data.quantity)
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
            console.log(jsonData)
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
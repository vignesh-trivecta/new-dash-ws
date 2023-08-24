// API call to fetch all records of a basket in temporary table
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
            console.log(data)
            return data;
        } else {
            const errorText = await response.text();
            console.log(errorText);
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error)
    }
}


// API call to add a new record in temporary table
export const addRecord = async(adminName, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, investmentVal, limitPrice ) => {
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
                "basketInvAmount": Number(investmentVal),
                "limitPrice" : Number(limitPrice)      
            })
        };

        const response = await fetch("http://localhost:8083/basket/temp", requestOptions);

        if (response.ok) {
            return true;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
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
                "basketInvAmount": Number(val1),       
                "basketActualValue" : Number(val2),
                "limitPrice": limitPrice    
            })
        };
        const response = await fetch("http://localhost:8083/basket/temp/up", requestOptions);

        if (response.ok) {
            return true;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        console.log(error);
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
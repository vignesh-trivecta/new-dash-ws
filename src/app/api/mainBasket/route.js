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

        if(response.status === 200){
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

// API call to add a record in Main table
export const AddRecordMainAPI = async( adminId, basketName, selectedStock, exchange, orderType, transType, quantity, weightage, price, limitPrice, investmentVal, basketVal, basketCategory ) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "adminName": adminId,
                "basketName": String(basketName),
                "instrumentName": selectedStock,
                "exchangeUsed": exchange,
                "orderType": orderType,
                "transType": transType,
                "quantityValue": quantity,
                "weightValue": Number(weightage),
                "priceValue": price,
                "limitPrice": limitPrice , 
                "basketInvestAmt": Number(investmentVal),       
                "basketActualValue" : basketVal,
                "basketCategory": basketCategory,
            })
        };

        const response = await fetch("http://localhost:8083/basket/add-a-row", requestOptions);
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

// API call to update a record in Main table
export const updateRecordMainAPI = async(recId, basketName, adminId, selectedStock, exchange, orderType, transType, quantity, weightage, price, val1, val2, limitPrice ) => {
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
                "limitPrice": Number(limitPrice)          
            })
        };
        const response = await fetch("http://localhost:8083/basket/update", requestOptions);

        if (response.ok) {
            return true;
        } else {
            return false;
        }
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
            body: JSON.stringify({
                "recId": recId,
                "basketName": String(basketName),
                "adminName": adminId,         
            })
        };

        const response = await fetch("http://localhost:8083/basket/delete", requestOptions);

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }
    catch(error){
        return false;
    }
}

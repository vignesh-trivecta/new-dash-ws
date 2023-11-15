// API to map a basket to a customer
export const mapBasket = async(basketName, adminId, customerId, broker, quantity) => {
    console.log(basketName, adminId, customerId, broker, quantity)
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
                "brokerName": broker,
                "basketUnits": quantity
            })
        }
        const response = await fetch("http://localhost:8083/customer/map", requestOptions);
        if(response.status === 200) {
            const data = await response.text();
            console.log(data)
            return data;
        } else {
            const data = await response.text();
            console.log(data)
            return data;
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

// API call to send weblink to a customer
export const sendWeblink = async(basketName, adminId, customerId, brokerName, basketUnits) => {
    console.log(basketName, adminId, customerId, brokerName, basketUnits)
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
                "basketUnits": basketUnits,
            })
        }
        const response = await fetch("http://localhost:8083/send/weblink", requestOptions);
        console.log(response);

        if(response.status === 200){
            const responseText = await response.text();
            console.log(responseText)
            return responseText;
        }
        else{
            const data = await response.text();
            console.log(data);
            return data;
        }
    }
    catch(error){
        return false;
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
            body: JSON.stringify({
                "basketName": basketName,
            })
        }
        const response = await fetch("http://localhost:8083/mappedstatus", requestOptions);

        if(response.status === 200){
            const responseText = await response.json();
            return responseText;
        }
        else{
            return [];
        }
    }
    catch(error){
        return [];
    }
}

// API endpoint to map the multiple baskets to a customer
export const sendMultipleBaskets = async (basketData, adminId, customerId, brokerName, groupName) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketData": basketData,
                "adminId": adminId,
                "customerId": customerId.split(" ")[0],
                "brokerName": brokerName,
                "groupName": groupName,
            })
        }
        console.log(basketData, adminId, customerId, groupName);

        const response = await fetch("http://localhost:8083/customer/map/multiple", requestOptions);
        console.log(response);
        
        if(response.status == 200){
            const jsonData = await response.text();
            return jsonData;
        }
        else {
            const jsonData = await response.text();
            return jsonData;
        }
    }
    
    catch (error) {
        console.log(error.message);
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
            body: JSON.stringify({
                "groupName": groupName,
                "customerId": customerId.split(" ")[0],
            })
        }

        const response = await fetch("http://localhost:8083/fetch/groupName", requestOptions);
        
        if(response.status == 200){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            const jsonData = await response.json();
            return jsonData;
        }
    }
    
    catch (error) {
        console.log(error.message);
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
        const response = await fetch("http://localhost:8083/groupname", requestOptions);

        if (response.status === 200) {
            const res = await response.json();
            return res;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
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
            body: JSON.stringify({
                "groupName": groupName,
            })
        }

        const response = await fetch("http://localhost:8083/fetch/groupName/details", requestOptions);
        
        if(response.status == 200){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            return null;
        }
    }
    
    catch (error) {
        return null;
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
            body: JSON.stringify({
                "groupName": groupName,
                "customerId": customerId.split(" ")[0],
            })
        }

        const response = await fetch("http://localhost:8083/fetch/map/details/customer", requestOptions);
        
        if(response.status == 200){
            const jsonData = await response.json();
            return jsonData;
        }
        else {
            return null;
        }
    }
    
    catch (error) {
        return null;
    }
}
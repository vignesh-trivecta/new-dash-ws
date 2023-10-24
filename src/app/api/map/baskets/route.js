export const sendMultipleBaskets = async (basketData, adminId, customerId, brokerName) => {
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
            })
        }
        console.log(basketData, adminId, customerId, brokerName);
        console.log(JSON.stringify({
            "basketData": basketData,
            "adminId": adminId,
            "customerId": customerId.split(" ")[0],
            "brokerName": brokerName,
        }))
        const response = await fetch("http://localhost:8083/customer/map/multiple", requestOptions);
        console.log(response);

        const jsonData = await response.text();
        console.log(jsonData)
        
        // if(response.ok){
        //     const jsonData = await response.json();
        //     console.log(jsonData)
        //     return jsonData;
        // }
        // else {
        //     const errorText = await response.text();
        //     throw new Error(`Failed to fetch data: ${errorText}`);
        // }
    }
    
    catch (error) {
        console.log(error);
    }
}
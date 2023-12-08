// API call to check page validity
export const checkPageValidity = async(basketData) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "customerId": basketData.customerId,
                "basketName": basketData.basketName,
            })
        }
        const response = await fetch("http://localhost:8086/page/validity", requestOptions);
        const status = response.status;
        console.log(response);

        if (response.status === 200) {
            const data = await response.text();
            return {data, status};
        } else {
            const errorText = await response.text();
            console.log(errorText)
            return {data: errorText, status};
        }
    }
    catch(error){
        return {data: "Check Failed", status: 500};
    }
}

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CLIENT_LOGIN_PORT;

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
        const response = await fetch(`http://${DOMAIN}:${PORT}/page/validity`, requestOptions);
        const status = response.status;

        if (response.status === 200) {
            const data = await response.text();
            return {data, status};
        } else {
            const errorText = await response.text();
            return {data: errorText, status};
        }
    }
    catch(error){
        return {data: "Check Failed", status: 500};
    }
}

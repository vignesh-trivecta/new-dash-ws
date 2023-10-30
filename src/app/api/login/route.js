// API to login the admin into wealth spring
export const loginAPI = async (token) => {

    try{
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        };

        const response = await fetch("http://localhost:8082/admin/login", requestOptions);
        const responseText = await response.json();

        return responseText;
    }
    catch(error){
        return error.message;
    }
}

// API to login the IIFL partner account
export const partnerLogin = async () => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch("http://localhost:8085/partner/login", requestOptions);
        
    } catch (error) {
        return error.message;
    }
}

// API call to login the client to IIFL programtically
export const clientLogin = async(customerId) => {
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
        console.log(customerId)
        const response = await fetch("http://localhost:8084/client/login", requestOptions);

        console.log(response)
        if(response.status === 200) {
            return true;
        } 
        return false;
    }
    catch(error){
        console.log(error);
    }
}

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
        console.log(response)

        if (response.status === 200) {
            const responseText = await response.text();
            const data = JSON.parse(responseText);
            console.log(data)
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
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
        console.log(response)

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
        const response = await fetch("http://localhost:8084/client/login", requestOptions);

        console.log(response)
        if(response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    catch(error){
        console.log(error);
    }
}

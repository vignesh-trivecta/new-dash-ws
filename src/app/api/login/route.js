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

        if (response.ok) {
            const responseText = await response.text();
            const data = JSON.parse(responseText);
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

        const respone = await fetch("http://localhost:8085/partner/login", requestOptions);

    } catch (error) {
        return error.message;
    }
}

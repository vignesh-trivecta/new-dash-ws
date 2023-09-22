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
        console.log(error)
    }
}

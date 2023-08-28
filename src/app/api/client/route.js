// API call to generate the otp
export const generateOtp = async(basketLink) => {
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch("http://localhost:8083/basket/" + basketLink, requestOptions);
        if(response.ok){
            return true;
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${errorText}`);
        }
    }
    catch(error){
        return console.log(error);
    }
}

// API call to post the OTP and validate
export const validateOtp = async(basketLink, otp) => {
    try{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "basketLink": basketLink,
                "otp": otp,
            })
        }
        const response = await fetch("http://localhost:8086/basket/" + basketLink, requestOptions);


        if(response.ok) {
            const responseText = await response.text();
            let data = JSON.parse(responseText);
            return data;
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }
    }
    catch(error){
        console.log(error);
    }
}
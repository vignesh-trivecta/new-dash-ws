import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";

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
            body: encrypt(JSON.stringify({
                "customerId": basketData.customerId,
                "basketName": basketData.basketName,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT}/page/validity`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };
    }
    catch(error){
        return {data: "Check Failed", status: 500};
    }
}

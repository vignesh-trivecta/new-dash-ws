import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT1 = process.env.NEXT_PUBLIC_ADMIN_LOGIN_PORT;
const PORT2 = process.env.NEXT_PUBLIC_IIFL_INTEGR_PORT;
const PORT3 = process.env.NEXT_PUBLIC_IIFL_REPORTS_PORT;

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

        
        const response = await fetch(`http://${DOMAIN}:${PORT1}/admin/login`, requestOptions);
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

        const response = await fetch(`http://${DOMAIN}:${PORT3}/partner/login`, requestOptions);
        
    } catch (error) {
        errorLogger(error);
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
            body: encrypt(JSON.stringify({
                "customerId": customerId,
            }))
        }
        const response = await fetch(`http://${DOMAIN}:${PORT2}/client/login`, requestOptions);
        const status = response?.status;

        const jsonData = await response?.json();
        const data = decrypt(jsonData?.payload);
        return { status, data };
    }
    catch(error){
        errorLogger(error);
    }
}

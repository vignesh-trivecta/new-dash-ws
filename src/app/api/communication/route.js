import { decrypt } from "@/utils/aesDecryptor";
import { encrypt } from "@/utils/aesEncryptor";
import { errorLogger } from "@/utils/errorLogger";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

// API endpoint to send the communication
export const sendCommunication = async (customerId, message) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: encrypt(JSON.stringify({
                "customerId": customerId.split(" ")[0],
                "message": message,
            }))
        }
        
        const response = await fetch(`http://${DOMAIN}:${PORT}/communication`, requestOptions);
        const status = response.status;

        const jsonData = await response.json();
        const data = decrypt(jsonData.payload);
        return { status, data };

    } catch (error) {
        errorLogger(error);
    }
}

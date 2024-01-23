import { encrypt } from "./aesEncryptor";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_CORE_COMP_PORT;

export const errorLogger = async (error) => {
    await fetch(`http://${DOMAIN}:${PORT}/frontend/log`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: encrypt(JSON.stringify({
            "payload": error
        }))
    });
}
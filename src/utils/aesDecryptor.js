import CryptoJS from "crypto-js";

export function decrypt (payload) {
    const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_AES_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV);
    const decrypted = CryptoJS.AES.decrypt(payload, key, {iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);
    const result = JSON.parse(decrypted);
    return result;
}
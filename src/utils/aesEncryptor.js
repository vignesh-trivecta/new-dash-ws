import CryptoJS from "crypto-js";

export function encrypt (payload) {
    const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_AES_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV);
    let data = CryptoJS.AES.encrypt(payload, key, { iv: iv }).toString();
    return JSON.stringify({"payload": data});
}
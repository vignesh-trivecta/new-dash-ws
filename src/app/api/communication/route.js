
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
            body: JSON.stringify({
                "customerId": customerId.split(" ")[0],
                "message": message,
            })
        }
        
        const response = await fetch(`http://${DOMAIN}:${PORT}/communication`, requestOptions);

        if (response.status === 200) {
            const res = await response.text();
            return res;
        }
        else {
            const res = await response.json();
            return res;
        }

    } catch (error) {
        return "Failed to send email."
    }
}

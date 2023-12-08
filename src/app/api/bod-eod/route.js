// bod- eod => Schedule tasks call
export const executeScheduleTasks = async () => {
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch("http://13.200.85.83:8085/execute", requestOptions);

        const res = await response.text();
        const status = response.status
        return {res, status};

    } catch (error) {
        return {res: "Error executing scheduled tasks", status: 500};
    }
}
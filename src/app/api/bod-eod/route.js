
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const PORT = process.env.NEXT_PUBLIC_PRICE_UPDATER_PORT;
const PORT_AXIS = process.env.NEXT_PUBLIC_AXIS_CLIENT_LOGIN_PORT;
const PORT_IIFL = process.env.NEXT_PUBLIC_IIFL_REPORTS_PORT;

// bod- eod => Schedule tasks call
export const executeScheduleTasks = async (broker) => {
    let port;
    let reqUrl;

    if (broker === "AXIS") {
        port = PORT_AXIS;
        reqUrl = "axis-execute";
    } else if (broker === "IIFL") {
        port = PORT_IIFL;
        reqUrl = "execute";
    }
    
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(`http://${DOMAIN}:${port}/${reqUrl}`, requestOptions);

        const res = await response.text();
        const status = response.status
        return {res, status};

    } catch (error) {
        return {res: "Error executing scheduled tasks", status: 500};
    }
}


// API endpoint to upload the Exchange data to DB
export const callToUploadDoc = async () => {
    try {
      const response = await fetch(`http://${DOMAIN}:${PORT}/excel/update`);

      const res = await response.text();
      const status = response.status
      return {res, status};
  
    } catch (error) {
        return {res: "Error in Uploading file", status: 500};
    }
  };

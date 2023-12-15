// bod- eod => Schedule tasks call
export const executeScheduleTasks = async (broker) => {
    let endpoint;
    let reqUrl;

    if (broker === "AXIS") {
        endpoint = "8090";
        reqUrl = "axis-execute";
    } else if (broker === "IIFL") {
        endpoint = "8085";
        reqUrl = "execute";
    }
    
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(`http://localhost:${endpoint}/${reqUrl}`, requestOptions);

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
      const response = await fetch("http://localhost:8087/excel/update");

      const res = await response.text();
      const status = response.status
      return {res, status};
  
    } catch (error) {
        return {res: "Error in Uploading file", status: 500};
    }
  };
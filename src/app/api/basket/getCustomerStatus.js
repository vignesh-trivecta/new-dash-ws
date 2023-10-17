// API call to get the mapping, weblink status of customers based on baksetName

export const getCustomerStatus = async (basketName) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basketName: basketName,
      }),
    };
    const response = await fetch(
      "http://localhost:8083/mappedstatus",
      requestOptions
    );
    if (response.ok) {
      const responseText = await response.json();
      console.log(responseText);
      return responseText;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

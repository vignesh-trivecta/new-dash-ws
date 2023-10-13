import formatDate from "./format-date";

const stringFormatter = (str, time, param) => {
  if (
    typeof str === "string" &&
    str?.includes("-") &&
    str?.split("-").length === 3 &&
    str
  ) {
    if (str?.includes(" ") || str?.includes("T")) {
      let date;
      if (str.includes(" ")) {
        date = str?.split(" ");
      } else if (str.includes("T")) {
        date = str?.split("T");
      }
      const dateTime = new Date(str);
      let formattedTime;

      if (param !== "ledger") {
        if (time === 12) {
          formattedTime = dateTime?.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
        } else {
          formattedTime = dateTime?.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          formattedTime = formattedTime?.slice(0, -3); // Remove the last colon and seconds;
        }
      } else {
        return formatDate(str);
      }

      return formatDate(date[0]) + " | " + formattedTime;
    }
    return formatDate(str);
  }
  if (str?.length > 50) {
    return str?.slice(0, 50);
  }
  return str;
};

export default stringFormatter;

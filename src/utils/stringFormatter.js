import formatDate from "./format-date";

const stringFormatter = (str) => {
    if (typeof str === 'string' && str?.includes('-') && str?.split('-').length == 3 && str) {
        if (str?.includes('T')) {
            const date = str?.split('T');
            return (formatDate(date[0]) + " | " + new Date (str)?.toLocaleTimeString());
        }
        return formatDate(str);
    }
    if (str?.length > 50) {
        return str?.slice(0,50);
    }
    return str;
}

export default stringFormatter;

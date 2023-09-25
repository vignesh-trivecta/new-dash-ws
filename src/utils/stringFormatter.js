import formatDate from "./format-date";

const stringFormatter = (str) => {
    if (typeof str === 'string' && str.includes('-') && str.split('-').length == 3) {
        if (str.includes('T')) {
            const date = str.split('T');
            return (formatDate(date[0]) + " | " + date[1].slice(0,5));
        }
        return formatDate(str);
    }
    if (str.length > 50) {
        return str.slice(0,50);
    }
    return str;
}

export default stringFormatter;

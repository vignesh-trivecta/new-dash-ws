import formatDate from "./format-date";

const stringFormatter = (str) => {
    console.log('enter')
    if (typeof str === 'string' && str.includes('-') && str.split('-').length == 3) {
        console.log(str)
        if (str.includes('T')) {
            const date = str.split('T');
            console.log(date);
            return (formatDate(date[0]) + " | " + date[1].slice(0,5));
        }
        return formatDate(str);
    }
    return str;
}

export default stringFormatter;
export function amountSplitter(value) {
    if (value === null || value === undefined) return 0;

    let [res1, res2] = value.split(".");
    let amt = res1.split(",").join("");
    let paise;
    if (res2 === '00') {
        paise = '';
    }
    else {
        paise = '.' + res2;
    }

    return Number(amt + paise);
}

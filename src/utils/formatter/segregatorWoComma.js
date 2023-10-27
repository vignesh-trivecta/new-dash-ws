export const segreagatorWoComma = (num) => {
  // checking whether input is empty or undefined
  if (num === "" || num === undefined || num === null) {
    return num;
  }

  // Convert the input to a number (if it's not already)
  // Return the number formatted with commas as thousands separators
  return num.toLocaleString(undefined, { minimumFractionDigits: 2 });
};

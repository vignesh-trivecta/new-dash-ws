export const segregate = (num) => {
    // checking whether input is empty or undefined
    if (num === "" || num === undefined || num === null) {
      return null;
    }
  
    // Convert the input to a number (if it's not already)
    num = parseFloat(num);
  
    // Return the number formatted with commas as thousands separators
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
  
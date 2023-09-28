function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = inputDate.split("-");
  if (dateParts?.length === 3 && dateParts) {
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1; // Subtract 1 because months are zero-based
    const day = dateParts[2].split(' ')[0];

    if (!isNaN(monthIndex)) {
      const month = months[monthIndex];
      return `${day}-${month}-${year}`;
    }
  }

  // If the input date is not in the expected format, return it as is.
  return inputDate;
}

export default formatDate;

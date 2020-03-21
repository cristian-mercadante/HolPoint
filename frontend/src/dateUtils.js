export const dateToString_or_Null = date => {
  if (date !== null) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleString("it-IT", options).split(",")[0];
  } else return date;
};

export const stringToDate_or_Null = string => {
  if (string === null) return null;
  const parts = string.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const validateDates = (first, second, addAlert) => {
  if (first !== null && second !== null && second < first) {
    addAlert("La data di ritorno non può precedere la data di partenza", "warning");
    return false;
  }
  return true;
};

export const differenceInDays = (date1, date2) => {
  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1; // NOTICE: plus one
};

export const incrementDate = (dateInput, increment) => {
  var dateFormatTotime = new Date(dateInput);
  var increasedDate = new Date(dateFormatTotime.getTime() + increment * 86400000);
  return increasedDate;
};

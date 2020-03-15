export const dateToString_or_Null = date => {
  if (date !== null) {
    return date.toLocaleString("it-IT").split(",")[0];
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

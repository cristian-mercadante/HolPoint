import { format, parse } from "date-fns";
import { it } from "date-fns/locale";

export const dateToString_or_Null = (date) => {
  if (date === null) return null;
  return format(date, "dd/MM/yyyy", { locale: it });
};

export const stringToDate_or_Null = (string) => {
  if (string === null) return null;
  return parse(string, "dd/MM/yyyy", { locale: it });
};

export const validateDates = (first, second, addAlert) => {
  if (first !== null && second !== null && second < first) {
    addAlert("La data di ritorno non può precedere la data di partenza", "warning");
    return false;
  }
  return true;
};

export const validateDateInBetween = (date, first, second, addAlert) => {
  if (date !== null && first !== null && second !== null && first < second && (date < first || date > second)) {
    addAlert("La data selezionata non è compresa fra la data di partenza e la data di ritorno", "warning");
    return false;
  } else return true;
};

export const differenceInDays = (date1, date2) => {
  return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1; // NOTICE: plus one
};

export const incrementDate = (dateInput, increment) => {
  var dateFormatTotime = new Date(dateInput);
  var increasedDate = new Date(dateFormatTotime.getTime() + increment * 86400000);
  return increasedDate;
};

export const timeToString_or_Null = (time) => {
  if (time === null) return null;
  return format(time, "HH:mm", { locale: it });
};

export const stringToTime_or_Null = (string) => {
  if (string === null) return null;
  return parse(time, "HH:mm", { locale: it });
};

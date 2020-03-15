import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("it", it);

export default function MyDatePicker(props) {
  return (
    <DatePicker
      selected={props.selected}
      onChange={date => props.onChange(date)}
      className="form-control"
      locale="it"
      dateFormat="dd/MM/yyyy"
    />
  );
}

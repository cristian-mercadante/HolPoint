import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("it", it);

export default function TimePicker(props) {
  return (
    <DatePicker
      className="form-control"
      selected={props.selected}
      onChange={date => props.onChange(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      locale="it"
      timeCaption="Ora"
      dateFormat="HH:mm" //24 hour format
    />
  );
}

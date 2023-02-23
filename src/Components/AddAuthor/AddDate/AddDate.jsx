import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { addAuthorBirthday, addAuthorDeathday } from "../../../actions";

export const AddDate = () => {
  const addData = createSelector(
    (state) => state.add,
    (add) => {
      return {
        add,
      };
    }
  );
  const { add } = useSelector(addData);
  const dispatch = useDispatch();

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

  const onSetStringDate = (e, fn) => {
    console.log(e);
    const date = `${e.$D} ${months[e.$M]} ${e.$y}`;
    console.log(date);
    dispatch(fn(date));
  };

  return (
    <div className="add_date">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Birthday"
          inputFormat="DD/MM/YYYY"
          value={add.birthday}
          onChange={(e) => onSetStringDate(e, addAuthorBirthday)}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Death"
          inputFormat="DD/MM/YYYY"
          value={add.till}
          onChange={(e) => onSetStringDate(e, addAuthorDeathday)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

import TextField from "@mui/material/TextField";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import {
  addAuthorName,
  addAuthorLstName,
  addAuthorMiddleName,
  addAuthorCountry,
} from "../../../actions";

export const AddInfo = () => {
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
  console.log(add);

  const onSetUpperCase = (e, fn) => {
    let input = e.target.value;
    if (input.length !== 0) {
      input = e.target.value[0].toUpperCase() + e.target.value.slice(1);
      dispatch(fn(input));
    } else {
      dispatch(fn(input));
    }
  };

  return (
    <div className="add_info">
      <TextField
        id="author name"
        label="Name"
        required
        value={add.name}
        onChange={(e) => onSetUpperCase(e, addAuthorName)}
        variant="outlined"
      />
      <TextField
        id="last_name"
        label="Last Name"
        required
        value={add.last_name}
        onChange={(e) => onSetUpperCase(e, addAuthorLstName)}
        variant="outlined"
      />
      <TextField
        id="middle_name"
        label="Middle Name"
        value={add.middle_name}
        onChange={(e) => onSetUpperCase(e, addAuthorMiddleName)}
        variant="outlined"
      />
      <TextField
        id="country"
        label="Country"
        required
        variant="outlined"
        value={add.country}
        onChange={(e) => onSetUpperCase(e, addAuthorCountry)}
      />
    </div>
  );
};

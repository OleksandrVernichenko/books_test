import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { addBookName, addBookPages, addBookGenre } from "../../../actions";

export const AddBookInfo = () => {
  const addData = createSelector(
    (state) => state.addBook,
    (state) => state.genres.genres,
    (addBook, genres) => {
      return {
        addBook,
        genres,
      };
    }
  );

  const { addBook, genres } = useSelector(addData);
  const dispatch = useDispatch();


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
        id="book name"
        label="Book Name"
        value={addBook.name}
        onChange={(e) => onSetUpperCase(e, addBookName)}
        required
        variant="outlined"
      />
      <TextField
        id="book pages"
        label="Pages"
        value={addBook.pages}
        onChange={(e) => dispatch(addBookPages(e.target.value))}
        type={"number"}
        required
        variant="outlined"
      />
      <Autocomplete
        multiple
        limitTags={1}
        disablePortal
        value={addBook.genre}
        onChange={(e, v) => dispatch(addBookGenre(v))}
        id="combo-box-demo"
        options={genres.map(item => item.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Genre"
            required={addBook.genre.length === 0 ? true : false}
          />
        )}
      />
    </div>
  );
};

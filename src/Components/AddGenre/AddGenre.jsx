import { TextField } from "@mui/material";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Button } from "@mui/material";
import { v4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";

import { useHttp } from "../../hooks/http.hook";
import { fetchGenre, genreCreated, genreDeleted } from "../../actions";
import "./addGenre.scss";
import { useState } from "react";

export const AddGenre = () => {
  const authorsData = createSelector(
    (state) => state.genres.genres,

    (genres) => {
      return {
        genres,
      };
    }
  );

  const { genres } = useSelector(authorsData);
  const { request } = useHttp();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onDeleteGenre = (value) => {
    request(`/genres/${value}`, "DELETE")
      .then(dispatch(genreDeleted(value)))
      .catch((err) => console.log(err));
    dispatch(fetchGenre(request));
  };

  const onAddNewGenre = (e) => {
    e.preventDefault();
    const genre = {
      name: value,
      id: v4(),
    };

    request("/genres", "POST", JSON.stringify(genre))
      .then(dispatch(genreCreated(genre)))
      .then(dispatch(fetchGenre(request)))
      .catch((err) => console.log(err));
    setValue("");
  };

  const renderGenres = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="genre_item">
          <h5>No Genres at the moment</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="genre_item fade">
          <SingleGenre {...props} onDeleteGenre={() => onDeleteGenre(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderGenres(genres);

  return (
    <main className="add_genre_page">
      <h2>Add Genre</h2>

      <div className="add_genre">
        <form
          name="add_genre"
          onSubmit={(e) => onAddNewGenre(e)}
          onKeyDown={(e) => (e.keyCode === 13 ? onAddNewGenre(e) : null)}
        >
          <TextField
            id="genre item"
            label="Genre"
            required
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="outlined" type="submit">
            Add
          </Button>
        </form>
      </div>
      <div className="genre_list">
        <TransitionGroup component="ul" className="genre_list">
          {elements}
        </TransitionGroup>
      </div>
    </main>
  );
};

const SingleGenre = (props) => {
  const { name, onDeleteGenre } = props;
  return (
    <li className="genre_item">
      {name}
      <button onClick={onDeleteGenre}>
        <ClearIcon sx={{ color: "red" }} />
      </button>
    </li>
  );
};

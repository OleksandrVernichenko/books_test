import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import "./mainPanel.scss";
import { setSearchTerm } from "../../actions";

export const MainPanel = () => {
  const authorsData = createSelector(
    (state) => state.authors.term,
    (term) => {
      return {
        term,
      };
    }
  );
  const { term } = useSelector(authorsData);
  const dispatch = useDispatch();

  return (
    <div className="main_panel">
      <TextField
        id="search"
        label="Search Author"
        variant="outlined"
        value={term}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <div className="main_links">
        <Button variant="outlined" sx={{ height: 55 }}>
          <Link to="/add&edit">Add Author</Link>
        </Button>
        <Button variant="outlined" sx={{ height: 55 }}>
          <Link to={"/add_genre_page"}>Add Genre</Link>
        </Button>
      </div>
    </div>
  );
};

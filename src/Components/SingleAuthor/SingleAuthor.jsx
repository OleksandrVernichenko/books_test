import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { editAuthor, setIdTo } from "../../actions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import "./singleAuthor.scss";
import no_img from "../../assets/no_img.png";

export const SingleAuthor = (props) => {
  const { name, last_name, middle_name, birthday, till, photo, country, id } =
    props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setAuthorToEdit = () => {
    dispatch(editAuthor(JSON.parse(JSON.stringify(props))));
    navigate("/add&edit");
  };

  const [load, setLoad] = useState(true);
  const spinner = load ? <Spinner /> : null;
  return (
    <li className="book_list-book fade">
      <Link to={`/current_author/${id}`} className="to_author"></Link>
      <div className="active_buttons">
        <button className="delete" onClick={props.onDelete}>
          <DeleteForeverIcon fontSize="large" /> Delete
        </button>
        <button className="edit" onClick={() => setAuthorToEdit()}>
          <EditIcon fontSize="large" /> Edit
        </button>
        <button className="add_book" onClick={() => dispatch(setIdTo(id))}>
          <Link to={"/book&add&edit"}>
            <AddBoxIcon fontSize="large" /> Add book
          </Link>
        </button>
      </div>
      <div className="book_list-book-image">
        <figure>
          <img
            style={photo === "" ? { objectFit: "contain" } : {}}
            src={photo ? photo : no_img}
            alt="author"
            onLoad={() => setLoad(false)}
          />
          <div className="spinner">{spinner}</div>
          <figcaption>
            <span>{name}</span>
            <span>{middle_name}</span>
            <span>{last_name}</span>
          </figcaption>
        </figure>
      </div>
      <div className="book_list-book-description">
        <span> Place: {country}</span>
        <div className="book_list-book-description-date">
          <span>{birthday}</span>&nbsp; - &nbsp;
          <span>{till === null ? "Current time" : till}</span>
        </div>
      </div>
    </li>
  );
};

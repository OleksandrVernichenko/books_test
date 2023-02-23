import no_img from "../../assets/no_img.png";
import { v4 } from "uuid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

import "./singleAuthorBook.scss";

export const SingleAuthorBook = (props) => {
  const { image, name, genre, pages, onEdit, onDelete } = props;
  const [load, setLoad] = useState(true);
  const spinner = load ? <Spinner /> : null;
  return (
    <li className="author_books fade">
      <div className="services">
        <button className="delete" onClick={onDelete}>
          <DeleteForeverIcon />
        </button>
        <button className="edit" onClick={onEdit}>
          <ModeEditIcon />
        </button>
      </div>
      <div className="spinner">{spinner}</div>
      <img src={image || no_img} alt="book" onLoad={() => setLoad(false)} />
      <div className="author_books-description">
        <span>{name.length >= 12 ? name.slice(0, 12) + "..." : name}</span>
        <span>{pages} Pages</span>
        <div className="genres">
          Genres:
          {genre.map((item) => (
            <span key={v4()}>{item}</span>
          ))}
        </div>
      </div>
    </li>
  );
};

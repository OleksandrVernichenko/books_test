import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

import "./author.scss";
import { SingleAuthorBook } from "../SingleAuthorBook/SingleAuthorBook";
import { setBookToEdit, setIdTo, fetchAuthors } from "../../actions";

export const Author = () => {
  const authorsData = createSelector(
    (state) => state.authors.authors,
    (authors) => {
      return {
        authors: authors.filter((i) => i.id === authorId)[0],
      };
    }
  );
  const { authorId } = useParams();
  const { authors } = useSelector(authorsData);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const navigate = useNavigate();

  const onSetBookToEdit = (id) => {
    const book = authors.books.filter((book) => book.id === id)[0];
    dispatch(setBookToEdit(book));
    dispatch(setIdTo(authorId));
    navigate("/book&add&edit");
  };

  const onBookDelete = (id) => {
    const booksToPost = authors.books.filter((book) => book.id !== id);
    authors.books = [...booksToPost];

    request(
      `/authors/${authorId}`,
      "PUT",
      JSON.stringify(authors)
    ).catch((err) => console.log(err));
    dispatch(fetchAuthors(request));
  };

  const renderAuthorBooks = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="author_books fade">
          <h5>No books at the moment</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="author_books fade">
          <SingleAuthorBook
            {...props}
            id={id}
            onEdit={() => onSetBookToEdit(id)}
            onDelete={() => onBookDelete(id)}
          />
        </CSSTransition>
      );
    });
  };
  const elements = renderAuthorBooks(authors.books);
  return (
    <main>
      <h2 style={{ textAlign: "center" }}>
        {authors.name} {authors.middle_name} {authors.last_name} books
      </h2>
      <TransitionGroup component="ul" className="author_books_list">
        {elements}
      </TransitionGroup>
    </main>
  );
};

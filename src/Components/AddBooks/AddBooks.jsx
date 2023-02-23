import { AddBookLogo } from "./AddBookLogo/AddBookLogo";
import { Button } from "@mui/material";
import { AddBookInfo } from "./AddBookInfo/AddBookInfo";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 } from "uuid";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthors, bookAddedEdited } from "../../actions";
import "./addBooks.scss";

export const AddBook = () => {
  const addData = createSelector(
    (state) => state.addBook,
    (state) => state.authors.authors,
    (addBook, authors) => {
      return {
        addBook,
        authors,
      };
    }
  );
  const [open, setOpen] = useState(false);

  const { addBook, authors } = useSelector(addData);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const navigate = useNavigate();
  useEffect(() => {
    let timeout;
    if (open) {
      timeout = setInterval(() => {
        navigate("/");
        setOpen(false);
      }, 2000);
    }
    return () => {
      clearInterval(timeout, 2000);
    };
  }, [open]);

  const onAddEditBook = (e) => {
    e.preventDefault();

    let bookId;

    const currentAuthor = authors.filter((item) => item.id === addBook.to)[0];

    const currentBook = currentAuthor.books.filter(
      (book) => book.id === addBook.id
    );

    bookId = currentBook.length !== 0 ? currentBook[0].id : v4();

    const book = {
      name: addBook.name,
      id: bookId,
      genre: addBook.genre,
      pages: addBook.pages,
      image: addBook.image,
    };

    if (currentBook.length === 0) {
      currentAuthor.books = [...currentAuthor.books, book];

      request(
        `/authors/${currentAuthor.id}`,
        "PUT",
        JSON.stringify(currentAuthor)
      ).catch((err) => console.log(err));
    } else {
      const newBooks = currentAuthor.books.filter((book) => book.id !== bookId);
      currentAuthor.books = [...newBooks, book];

      request(
        `/authors/${currentAuthor.id}`,
        "PUT",
        JSON.stringify(currentAuthor)
      ).catch((err) => console.log(err));
    }

    dispatch(fetchAuthors(request));
    dispatch(bookAddedEdited());
    setOpen(true);
  };

  return (
    <main>
      <h2 style={{ textAlign: "center" }}>Add Book</h2>
      <form name="add_book" onSubmit={(e) => onAddEditBook(e)}>
        <div className="form_block">
          <AddBookLogo />
          <div className="input_block">
            <AddBookInfo />
          </div>
        </div>
        <Button type="submit" variant="outlined" sx={{ height: 55 }}>
          Add book
        </Button>
      </form>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        <Collapse in={open}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Book created
          </Alert>
        </Collapse>
      </Box>
    </main>
  );
};

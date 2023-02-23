import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useHttp } from "../../hooks/http.hook";
import { authorDeleted, fetchGenre, fetchAuthorsByTerm } from "../../actions";
import { SingleAuthor } from "../SingleAuthor/SingleAuthor";
import { useCallback } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./authorList.scss";
import { Box } from "@mui/system";

export const AuthorList = () => {
  const authorsData = createSelector(
    (state) => state.authors.authors,
    (state) => state.authors.term,

    (authors, term) => {
      return {
        authors,
        term,
      };
    }
  );

  const [open, setOpen] = useState(false);
  const { authors, term } = useSelector(authorsData);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchAuthorsByTerm(request, term));
    dispatch(fetchGenre(request));
  }, [term]);

  useEffect(() => {
    let timeout;
    if (open) {
      timeout = setInterval(() => setOpen(false), 3000);
    }
    return () => clearInterval(timeout, 2500);
  }, [open]);

  const onDelete = useCallback(
    (id) => {
      request(`/authors/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(authorDeleted(id)))
        .catch((err) => console.log(err));
      setOpen(true);
    },
    [request]
  );

  const renderAuthors = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="book_list-book">
          <h5>No Authors at the moment</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="book_list-book fade">
          <SingleAuthor {...props} id={id} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderAuthors(authors);
  return (
    <>
      <TransitionGroup component="ul" className="book_list">
        {elements}
      </TransitionGroup>
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
            severity="error"
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
            Author Deleted
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

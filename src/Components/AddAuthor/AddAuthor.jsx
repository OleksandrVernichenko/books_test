import { v4 } from "uuid";
import { AddImage } from "./AddImage/AddImage";
import { AddDate } from "./AddDate/AddDate";
import { AddInfo } from "./AddInfo/AddInfo";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import {
  setAuthorId,
  authorCreated,
  fetchAuthors,
  authorEdited,
} from "../../actions";
import "./addAuthor.scss";

export const AddAuthor = () => {
  const addData = createSelector(
    (state) => state.add,
    (state) => state.authors.authors,
    (add, authors) => {
      return {
        add,
        authors,
      };
    }
  );

  const { add, authors } = useSelector(addData);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const authorId = authors.filter((item) => item.id === add.id);

  useEffect(() => {
    let timeout;
    if (open) {
      timeout = setInterval(() => setOpen(false), 3000);
    }
    return () => {
      clearInterval(timeout, 2500);
    };
  }, [open]);

  const onAuthorCreate = (e) => {
    e.preventDefault();
    const id = v4();
    if (authorId.length === 0) {
      dispatch(setAuthorId(id));
    }

    const author = add;

    authorId.length === 0
      ? request("/authors", "POST", JSON.stringify(author))
          .then(dispatch(authorCreated(author)))
          .then(dispatch(fetchAuthors(request)))
          .catch((err) => console.log(err))
      : request(
          `/authors/${authorId[0].id}`,
          "PUT",
          JSON.stringify(author)
        )
          .then(dispatch(authorEdited()))
          .then(dispatch(fetchAuthors(request)))
          .catch((err) => console.log(err));

    setOpen(true);
  };

  return (
    <main>
      <h2 className="add_author">
        {authorId.length === 0 ? "Add Author" : "Edit Author"}{" "}
      </h2>

      <form onSubmit={(e) => onAuthorCreate(e)}>
        <div className="form_block">
          <AddImage />
          <div className="input_block">
            <AddInfo />
            <AddDate />
          </div>
        </div>
        <Button type="submit" variant="outlined" sx={{ height: 55 }}>
          {authorId.length === 0 ? "Add Author" : "Save Changes"}
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
            {authorId.length === 0 ? "Author Created" : "Author Changed"}
          </Alert>
        </Collapse>
      </Box>
    </main>
  );
};

export const fetchAuthors = (request) => (dispatch) => {
  request("/authors")
    .then((authors) => dispatch(authorsFetched(authors)))
    .catch(() => dispatch(authorsFetchingError()));
};

export const fetchAuthorsByTerm =
  (request, termFilter = "") =>
  (dispatch) => {
    request(
      `/authors?${termFilter ? `q=${termFilter}` : ""}`
    )
      .then((authors) => dispatch(authorsFetchedByTerm(authors)))
      .catch(() => dispatch(authorsFetchingError()));
  };

export const fetchGenre = (request) => (dispatch) => {
  request("/genres")
    .then((genre) => dispatch(genresFetched(genre)))
    .catch(() => dispatch(genresFetchingError()));
};

export const authorsFetched = (authors) => {
  return {
    type: "AUTHORS_FETCHED",
    payload: authors,
  };
};

export const authorsFetchedByTerm = (authors) => {
  return {
    type: "AUTHORS_FETCHED_BY_TERM",
    payload: authors,
  };
};

export const setSearchTerm = (term) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: term,
  };
};

export const genresFetched = (genre) => {
  return {
    type: "GENRES_FETCHED",
    payload: genre,
  };
};

export const authorsFetchingError = () => {
  return {
    type: "AUTHORS_FETCHING_ERROR",
  };
};

export const genresFetchingError = () => {
  return {
    type: "GENRES_FETCHING_ERROR",
  };
};
export const authorDeleted = (id) => {
  return {
    type: "AUTHOR_DELETED",
    payload: id,
  };
};

export const addAuthorName = (name) => {
  return {
    type: "ADD_AUTHOR_NAME",
    payload: name,
  };
};

export const addAuthorLstName = (lastName) => {
  return {
    type: "ADD_AUTHOR_LAST_NAME",
    payload: lastName,
  };
};

export const addAuthorMiddleName = (middleName) => {
  return {
    type: "ADD_AUTHOR_MIDDLE_NAME",
    payload: middleName,
  };
};

export const addAuthorCountry = (country) => {
  return {
    type: "ADD_AUTHOR_COUNTRY",
    payload: country,
  };
};

export const addAuthorBirthday = (date) => {
  return {
    type: "ADD_AUTHOR_BIRTHDAY",
    payload: date,
  };
};
export const addAuthorDeathday = (date) => {
  return {
    type: "ADD_AUTHOR_DEATHDAY",
    payload: date,
  };
};

export const setAuthorId = (id) => {
  return {
    type: "SET_AUTHOR_ID",
    payload: id,
  };
};

export const addAuthorPhoto = (photo) => {
  return {
    type: "ADD_AUTHOR_PHOTO",
    payload: photo,
  };
};

export const authorCreated = (author) => {
  return {
    type: "AUTHOR_CREATED",
    payload: author,
  };
};

export const editAuthor = (author) => {
  return {
    type: "EDIT_AUTHOR",
    payload: author,
  };
};

export const authorEdited = () => {
  return {
    type: "AUTHOR_EDITED",
  };
};

export const addBookName = (name) => {
  return {
    type: "ADD_BOOK_NAME",
    payload: name,
  };
};

export const addBookPages = (number) => {
  return {
    type: "ADD_BOOK_PAGES",
    payload: number,
  };
};

export const addBookLogo = (logo) => {
  return {
    type: "ADD_BOOK_LOGO",
    payload: logo,
  };
};

export const addBookGenre = (genre) => {
  return {
    type: "ADD_BOOK_GENRE",
    payload: genre,
  };
};

export const setBookId = (id) => {
  return {
    type: "SET_BOOK_ID",
    payload: id,
  };
};

export const setIdTo = (id) => {
  return {
    type: "SET_ID_TO",
    payload: id,
  };
};

export const bookAddedEdited = () => {
  return {
    type: "BOOK_ADDED_EDITED",
  };
};

export const setBookToEdit = (book) => {
  return {
    type: "SET_BOOK_TO_EDIT",
    payload: book,
  };
};

export const genreDeleted = (id) => {
  return {
    type: "GENRE_DELETED",
    payload: id,
  };
};
export const genreCreated = (genre) => {
  return {
    type: "GENRE_CREATED",
    payload: genre,
  };
};

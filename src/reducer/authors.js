const initialState = {
  authors: [],
  term: "",
};

const authors = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORS_FETCHED":
      return {
        ...state,
        authors: action.payload,
      };
    case "AUTHORS_FETCHED_BY_TERM":
      return {
        ...state,
        authors: action.payload,
      };
    case "AUTHOR_DELETED":
      return {
        ...state,
        authors: state.authors.filter((author) => author.id !== action.payload),
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        term: action.payload,
      };
    case "AUTHOR_CREATED":
      return {
        ...state,
        authors: [...state.authors, action.payload],
      };
    default:
      return state;
  }
};

export default authors;

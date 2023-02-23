const initialState = {
  id: "",
  name: "",
  genre: [],
  pages: "",
  image: "",
  to: "",
};

const addBook = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BOOK_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_BOOK_PAGES":
      return {
        ...state,
        pages: action.payload,
      };
    case "ADD_BOOK_LOGO":
      return {
        ...state,
        image: action.payload,
      };
    case "ADD_BOOK_GENRE":
      return {
        ...state,
        genre: action.payload,
      };
    case "SET_BOOK_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "SET_ID_TO":
      return {
        ...state,
        to: action.payload,
      };
    case "BOOK_ADDED_EDITED":
      return {
        ...initialState,
      };
      case "SET_BOOK_TO_EDIT":
        return {
          ...action.payload,
        };
    default:
      return state;
  }
};

export default addBook;

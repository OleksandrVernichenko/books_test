const initialState = {
  id: "",
  name: "",
  last_name: "",
  middle_name: "",
  birthday: null,
  till: null,
  photo: "",
  country: "",
  books: [],
};

const add = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_AUTHOR_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_AUTHOR_LAST_NAME":
      return {
        ...state,
        last_name: action.payload,
      };
    case "ADD_AUTHOR_MIDDLE_NAME":
      return {
        ...state,
        middle_name: action.payload,
      };
    case "ADD_AUTHOR_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "ADD_AUTHOR_BIRTHDAY":
      return {
        ...state,
        birthday: action.payload,
      };
    case "ADD_AUTHOR_DEATHDAY":
      return {
        ...state,
        till: action.payload,
      };
    case "SET_AUTHOR_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "ADD_AUTHOR_PHOTO":
      return {
        ...state,
        photo: action.payload,
      };
    case "AUTHOR_CREATED":
      return {
        ...initialState,
      };
    case "EDIT_AUTHOR":
      return {
        ...action.payload,
      };
    case "AUTHOR_EDITED":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default add;

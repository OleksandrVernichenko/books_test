const initialState = {
  genres: [],
};

const genres = (state = initialState, action) => {
  switch (action.type) {
    case "GENRES_FETCHED":
      return {
        ...state,
        genres: action.payload,
      };
    case "GENRE_DELETED":
      return {
        ...state,
        genres: state.genres.filter((item) => item.id !== action.payload),
      };
    case "GENRE_CREATED":
      return {
        ...state,
        genres: [...state.genres, action.payload],
      };

    default:
      return state;
  }
};

export default genres;

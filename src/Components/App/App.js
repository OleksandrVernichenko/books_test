import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { Main } from "../Pages";
import { Add } from "../Pages";
import { AddBooks } from "../Pages";
import { AuthorPage } from "../Pages";
import { AddGenrePage } from "../Pages";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import "./app.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Header />
        <ModalWindow />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add&edit" element={<Add />} />
          <Route path="/book&add&edit" element={<AddBooks />} />
          <Route
            path="/current_author/:authorId"
            element={<AuthorPage />}
          ></Route>
          <Route path="/add_genre_page" element={<AddGenrePage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { FeedBackWindow } from "../ModalWindow/ModalWindow";

import "./header.scss";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div
        className="header_wrap"
        style={{
          padding: "10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>Hi, Welcome to Book Shop Admin Panel</h2>

        <nav>
          <Button variant="outlined">
            <Link to={"/"}>Authors</Link>
          </Button>
          <Button variant="outlined" sx={{ justifySelf: "flex-end" }} onClick={() => setOpen(true)}>
            FeedBack
          </Button>
        </nav>
      </div>

      <FeedBackWindow open={open} setOpen={() => setOpen(false)} />
    </header>
  );
};

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import ImageViewer from "react-simple-image-viewer";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";
import img6 from "../../assets/6.png";

export const ModalWindow = () => {
  const [open, setOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const theme = useTheme();
  const images = [img1, img2, img3, img4, img5, img6];
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Hi, have a minute time to see a little guide"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"}>
            I will show you some steps how to use App. Click on image
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <li>* List of Authors</li>
              <li>* Edit Author</li>
              <li>* Author Books List</li>
              <li>* Add & Edit Book</li>
              <li>* Add & Edit Author</li>
              <li>* Genre List Add & Delete</li>
            </ul>
          </DialogContentText>
          <div
            className="images"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {images.map((src, index) => (
              <img
                src={src}
                onClick={() => openImageViewer(index)}
                width="250"
                key={index}
                style={{
                  margin: "2px",
                  objectFit: "cover",
                  borderRadius: "3px",
                }}
                alt=""
              />
            ))}
            {isViewerOpen && (
              <ImageViewer
                src={images}
                currentIndex={currentImage}
                disableScroll={false}
                closeOnClickOutside={true}
                onClose={closeImageViewer}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const FeedBackWindow = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const onSendMessage = (e) => {
    e.preventDefault();
    const key1 = "6150074479:AAEhlOUlSLaBB";
    const key2 = "DEAmoaRZv4iH4vQiaAGbk";
    const user = "599517936";

    const messageToSend = `New Message Test:%0A - Name: ${name} %0A - Message: ${message}`;
    const url = `https://api.telegram.org/bot${key1}-${key2}/sendMessage?chat_id=${user}&text=${messageToSend}/`;

    if (name.length < 3 || message.length < 3) {
      setError(true);
    } else {
      fetch(url);
      setName("");
      setMessage("");
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.setOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Hi, have a minute time to send a feedback?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"}>
            <form
              name="feedback"
              style={{ width: "100%" }}
              onSubmit={(e) => onSendMessage(e)}
            >
              <TextField
                id="outlined-name"
                label="Name"
                variant="outlined"
                required
                error={error}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-message"
                label="Message"
                error={error}
                required
                variant="outlined"
                multiline
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="outlined" type="submit">
                Send{" "}
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.setOpen} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { addBookLogo } from "../../../actions";

export const AddBookLogo = () => {
  const addData = createSelector(
    (state) => state.addBook,
    (addBook) => {
      return {
        addBook,
      };
    }
  );
  const { addBook } = useSelector(addData);
  const dispatch = useDispatch();

  const onSetImages = (img) => {
    dispatch(addBookLogo(img));
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    onSetImages(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        onSetImages();
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="add_photo">
      {addBook.image ? (
        <div className="added_image">
          <button
            onClick={() => {
              dispatch(addBookLogo(""));
            }}
          >
            <DeleteForeverIcon fontSize="large" />
          </button>
          <img src={addBook.image} alt="current" />
        </div>
      ) : (
        <label htmlFor="photo">
          <div>
            <AddPhotoAlternateIcon
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
          </div>
          <input type="file" onChange={(e) => uploadImage(e)} id="photo" />
        </label>
      )}
    </div>
  );
};

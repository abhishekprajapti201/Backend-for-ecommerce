import multer from "multer";
import path from "path";

const assetpath = path.resolve("src/assets/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, assetpath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
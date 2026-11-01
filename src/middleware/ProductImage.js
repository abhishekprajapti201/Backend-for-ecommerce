import multer from "multer";
import path from "path";

const assetpath = path.resolve("src/assets/products");

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

const ProductImgUpload = multer({
  storage: storage,
});

export default ProductImgUpload;
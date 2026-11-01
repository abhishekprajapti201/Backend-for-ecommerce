import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
  ProductsList,
  UpdateProduct,
} from "../controllers/admin/ProductController.js";
import ProductImgUpload from "../middleware/ProductImage.js";
const router = express.Router();

router.get("/products", AuthMiddleware, ProductsList);
router.post(
  "/products",
  AuthMiddleware,
  ProductImgUpload.single("image"),
  CreateProduct,
);
router.get("/products/:id", AuthMiddleware, EditProduct);
router.put(
  "/products/:id",
  AuthMiddleware,
  ProductImgUpload.single("image"),
  UpdateProduct,
);
router.delete("/products/:id", AuthMiddleware, DeleteProduct);

export default router;

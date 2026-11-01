import express from "express";
import {
  Categories,
  Create,
  deleteCategory,
  editCategory,
  updateCategory,
} from "../controllers/admin/CategoryController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/category", AuthMiddleware, Categories);
router.post("/category", AuthMiddleware, Create);
router.put("/category/:id", AuthMiddleware, updateCategory);
router.get("/category/:id", AuthMiddleware, editCategory);
router.delete("/category/:id", AuthMiddleware, deleteCategory);

export default router;

import express from "express";
import {
  AddSubcategory,
  DeleteSubcate,
  SubcateEdit,
  SubCategoryList,
  UpdateSubcate,
} from "../controllers/admin/SubCategoryController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get("/sub-category", AuthMiddleware, SubCategoryList);
router.post("/sub-category", AuthMiddleware, AddSubcategory);
router.put("/sub-category/:id", AuthMiddleware, UpdateSubcate);
router.get("/sub-category/:id", AuthMiddleware, SubcateEdit);
router.delete("/sub-category/:id", AuthMiddleware, DeleteSubcate);

export default router;

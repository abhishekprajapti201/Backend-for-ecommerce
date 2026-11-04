import express from "express";
import UserAuthMiddleware from "../middleware/UserAuthMiddleware.js";
import {
  AddWishList,
  DeleteItem,
  WishList,
} from "../controllers/WishListController.js";
const router = express.Router();
router.post("/wishlist", UserAuthMiddleware, AddWishList);
router.delete("/wishlist/:uuid", UserAuthMiddleware, DeleteItem);
router.get("/wishlist/:user_id", UserAuthMiddleware, WishList);

export default router;

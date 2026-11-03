import express from "express";
import UserAuthMiddleware from "../middleware/UserAuthMiddleware.js";
import { AddToCard, DecrementQut, DeleteCard, IncrementQut,ListCart } from "../controllers/AddToCartController.js";
const router = express.Router();
router.post("/add-to-cart",UserAuthMiddleware,AddToCard);
router.delete("/delete/cart/:uuid",UserAuthMiddleware,DeleteCard);
router.post("/increment",UserAuthMiddleware,IncrementQut);
router.post("/decrement",UserAuthMiddleware,DecrementQut);
router.get("/add-to-cart/:user_id",UserAuthMiddleware,ListCart);

export default router;
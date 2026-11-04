import express from "express";
import UserAuthMiddleware from "../middleware/UserAuthMiddleware.js";
import { ListOrderItems, OrderItemAdd } from "../controllers/OrderItemController.js";
const router = express.Router();

router.post("/orderItem", UserAuthMiddleware, OrderItemAdd);
router.get("/orderItem/:user_id", UserAuthMiddleware,ListOrderItems);

export default router;

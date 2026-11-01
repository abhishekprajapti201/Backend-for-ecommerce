import express from "express";
import {
  AccountDelete,
  Profile,
  UserLogged,
  UserLogin,
  UserRegister,
  UsersList,
} from "../controllers/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import upload from "../middleware/FileUploads.js"
const router = express.Router();

router.post("/users",upload.single("profile_img"), UserRegister);
router.post("/login", UserLogin);
router.get("/logged", AuthMiddleware, UserLogged);
router.get("/users", AuthMiddleware, UsersList);
router.get("/users/profile/:id", AuthMiddleware, Profile);
router.delete("/user/account/delete/:id", AuthMiddleware, AccountDelete);

export default router;

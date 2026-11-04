import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DatabaseConnect from "./src/config/DBConnection.js";
import UserRoute from "./src/routes/UserRoute.js";
import CategoryRoute from "./src/routes/CategoryRoute.js";
import SubCatgoryRoute from "./src/routes/Sub-CategoryRoute.js";
import ProdcutRouter from "./src/routes/ProductRoute.js";
import AddTOCardRoute from "./src/routes/AddToCartRoute.js";
import WishListRoute from "./src/routes/WishListRoute.js";
import OrderItemRoute from "./src/routes/OrderItemRoute.js";
dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "Chal raha hau tum apna kam kar sakte ho ",
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", UserRoute);
app.use("/api", CategoryRoute);
app.use("/api", SubCatgoryRoute);
app.use("/api", ProdcutRouter);
app.use("/api", AddTOCardRoute);
app.use("/api", WishListRoute);
app.use("/api", OrderItemRoute);

app.listen(process.env.PORT, () => {
  DatabaseConnect();
  console.log(`Server runing on port no :${process.env.PORT}`);
});

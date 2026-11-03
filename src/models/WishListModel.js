import mongoose from "mongoose";
import generateID from "../helpers/GenerateID.js";
import mongoosePaginate from "mongoose-paginate-v2";
const WishListSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("wishlist_"),
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
  },
  { timestamps: true },
);

WishListSchema.plugin(mongoosePaginate);

const WishListModel = mongoose.model("WishList", WishListSchema);
export default WishListModel;

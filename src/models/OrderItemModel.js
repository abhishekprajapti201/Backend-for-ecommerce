import mongoose from "mongoose";
import generateID from "../helpers/GenerateID.js";
import mongoosePaginate from "mongoose-paginate-v2";
const OrderItemSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("orderItem_"),
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
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    orderStatus: {
      type: String,
      default:"pending",
      enum: ["pending", "success", "cancel"],
      required: true,
    },
  },
  { timestamps: true },
);
OrderItemSchema.plugin(mongoosePaginate);

const OrderItemModel = mongoose.model("OrderItem", OrderItemSchema);
export default OrderItemModel;

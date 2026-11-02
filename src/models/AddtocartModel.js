import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const CardSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prodcut",
      required: [true, "Prodcut id is required"],
    },

    price: {
      type: String,
      required: [true, "Product price is required in card"],
    },

    quentity: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true },
);

CardSchema.plugin(mongoosePaginate);

const AddToCardModel = mongoose.model("AddToCard", CardSchema);
export default AddToCardModel;

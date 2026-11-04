import mongoose from "mongoose";
import generateID from "../helpers/GenerateID.js";
import mongoosePaginate from "mongoose-paginate-v2";
const CardSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("card_"),
    },
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
      type: Number,
      required: [true, "Product price is required in card"],
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

CardSchema.plugin(mongoosePaginate);

const AddToCardModel = mongoose.model("AddToCard", CardSchema);
export default AddToCardModel;

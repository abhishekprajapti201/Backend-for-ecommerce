import mongoose from "mongoose";
import generateID from "../helpers/GenerateID.js";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";
const ProductSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("product_"),
    },
    product_name: {
      type: String,
      required: [true, "Product name is required"],
    },

    categories_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    slug: {
      type: String,
    },

    description: {
      type: String,
    },

    price: {
      type: String,
    },

    stock: {
      type: String,
    },
    image: {
      type: String,
      required:[true,"Prodcut Image is required"]
    },

    size: {
      type: String,
    },
  },
  { timestamps: true },
);

ProductSchema.pre("save", function () {
  if (this.isModified("product_name")) {
    this.slug = slugify(this.product_name, {
      lower: true,
      strict: true,
      trim:true
    });
  }
});
ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", ProductSchema);

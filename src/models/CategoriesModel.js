import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";
import generateID from "../helpers/GenerateID.js";

const CategorySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("category_"),
    },
    category_name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

CategorySchema.pre("save", function () {
  if (this.isModified("category_name")) {
    this.slug = slugify(this.category_name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});
CategorySchema.plugin(mongoosePaginate);
const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;

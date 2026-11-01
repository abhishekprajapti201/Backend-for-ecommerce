import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slugify from "slugify";
import generateID from "../helpers/GenerateID.js";

const SubCategorySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("subcategory_"),
    },
    subcategory_name: {
      type: String,
      required: [true, "SubCategory name is required"],
      trim: true,
    },
    cate_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timeseries: true },
);

SubCategorySchema.pre("save", function () {
  if (this.isModified("subcategory_name")) {
    this.slug = slugify(this.subcategory_name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});

SubCategorySchema.plugin(mongoosePaginate);
const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategoryModel;

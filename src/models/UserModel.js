import mongoose from "mongoose";
import generateID from "../helpers/GenerateID.js";
import mongoosePaginate from "mongoose-paginate-v2";
const UserSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: generateID("user_"),
    },
    profile_img: {
      type: String,
      required:[true,"Profile images is required"]
    },
    role: {
      type: String,
      required: [true,"Role is required"],
      enum: ["admin", "user"],
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: [true, "Address is requireed"],
    },
  },
  { timestamps: true },
);
UserSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;

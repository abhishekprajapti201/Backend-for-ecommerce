import { ErrorResponse, SuccessResponse } from "../helpers/ResponseHelper.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import WishListModel from "../models/WishListModel.js";

export const AddWishList = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    if (!user_id || !product_id) {
      return ErrorResponse(res, 500, "User ID and Product ID is required");
    }

    const users = await UserModel.findById(user_id);
    if (!users) {
      return ErrorResponse(res, 400, "User not found");
    }

    const products = await ProductModel.findById(product_id);
    if (!products) {
      return ErrorResponse(res, 400, "Product not found");
    }

    const datacreate = await WishListModel.create({
      user_id,
      product_id,
    });

    if (datacreate) {
      return SuccessResponse(res, 200, "Product add to wishlist", datacreate);
    }
    return ErrorResponse(res, 500, "Product add to wishlist procces failed");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const DeleteItem = async (req, res) => {
  try {
    const { uuid } = req.params;

    const data = await WishListModel.findOneAndDelete(uuid);
    if (data) {
      return SuccessResponse(res, 200, "Product deleted in the wishlist", data);
    }
    return ErrorResponse(res, 400, "Product not found");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};
export const WishList = async (req, res) => {
  try {
    const { user_id } = req.params;
    const users = await UserModel.findById(user_id);
    if (!user_id) {
      return ErrorResponse(
        res,
        500,
        "User ID is required in the query perameters",
      );
    }

    const data = await WishListModel.find({ user_id: user_id }).populate();
    if (!data) {
      return ErrorResponse(res, 200, "Wishlists data here", data);
    }
    return SuccessResponse(res, 400, "Wishlist data is empty");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

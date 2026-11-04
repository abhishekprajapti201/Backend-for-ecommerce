import {
  ErrorResponse,
  SuccessResponse,
  ValidationError,
} from "../helpers/ResponseHelper.js";
import OrderItemModel from "../models/OrderItemModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

export const OrderItemAdd = async (req, res) => {
  try {
    const { user_id, product_id, orderStatus, amount } = req.body;

    const checkUser = await UserModel.findById(user_id);
    if (!checkUser) {
      return ErrorResponse(res, 400, "User not found");
    }

    const productCheck = await ProductModel.findById(product_id);

    if (!productCheck) {
      return ErrorResponse(res, 400, "Prodcut not found");
    }

    const createdata = await OrderItemModel.create({
      user_id,
      product_id,
      orderStatus,
      amount,
    });

    if (!createdata) {
      return ErrorResponse(res, 500, "Data creation failed");
    }
    return SuccessResponse(res, 200, "order item created successful");
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        filed: err.path,
        message: err.message,
      }));

      return ValidationError(res, 403, "Validation error", validationerror);
    }
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const ListOrderItems = async (req, res) => {
  try {
    const { user_id } = req.params;

    const checkUser = await UserModel.findOne({ user_id });

    if (!checkUser) {
      return ErrorResponse(res, 400, "User not found");
    }

    const getlist = await OrderItemModel.find({ user_id: checkUser._id });

    if (!getlist) {
      return ErrorResponse(res, 400, "Order Items not found");
    }

    return SuccessResponse(res, 200, "Orders Items List", getlist);
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

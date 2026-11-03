import {
  ErrorResponse,
  SuccessResponse,
  ValidationError,
} from "../helpers/ResponseHelper.js";
import AddToCardModel from "../models/AddtocartModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

export const AddToCard = async (req, res) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;

    if (!user_id || !product_id) {
      return ErrorResponse(res, 400, "User ID and Product ID are required");
    }

    const product = await ProductModel.findById(product_id);

    if (!product) {
      return ErrorResponse(res, 404, "Product not found");
    }

    const user = await UserModel.findById(user_id);

    if (!user) {
      return ErrorResponse(res, 404, "User not found");
    }

    const datacard = await AddToCardModel.findOne({
      user_id,
      product_id,
    });

    if (datacard) {
      datacard.quantity = Number(quantity) + 1;
      datacard.price = product.price * datacard.quantity;

      await datacard.save();

      return SuccessResponse(
        res,
        200,
        "Cart quantity and price updated successfully",
        datacard,
      );
    }

    const createCard = await AddToCardModel.create({
      user_id,
      product_id,
      price: product.price * Number(quantity),
      quantity: Number(quantity),
    });

    return SuccessResponse(
      res,
      201,
      "Product added to cart successfully",
      createCard,
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return ValidationError(res, 422, "Validation error", validationerror);
    }

    return ErrorResponse(res, 500, "Internal Server Error", error.message);
  }
};

export const DeleteCard = async (req, res) => {
  try {
    const { uuid } = req.params;
    const getdelete = await AddToCardModel.findOneAndDelete(uuid);

    if (getdelete) {
      return SuccessResponse(res, 200, "Card deleted successfully", getdelete);
    }
    return ErrorResponse(res, 400, "Data not found related this ID");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const IncrementQut = async (req, res) => {
  try {
    const { uuid, quantity } = req.body;

    if (!uuid || quantity === undefined) {
      return ErrorResponse(res, 400, "UUID and quantity are required");
    }

    const increment = Number(quantity);

    if (!Number.isInteger(increment) || increment < 1) {
      return ErrorResponse(res, 400, "Quantity must be a positive integer");
    }

    const checkdata = await AddToCardModel.findById(uuid);

    if (!checkdata) {
      return ErrorResponse(res, 404, "Cart item not found");
    }

    const product = await ProductModel.findById(checkdata.product_id);

    if (!product) {
      return ErrorResponse(res, 404, "Product not found");
    }

    checkdata.quantity += increment;

    checkdata.price = product.price * checkdata.quantity;

    await checkdata.save();

    return SuccessResponse(
      res,
      200,
      "Quantity and price incremented successfully",
      checkdata,
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return ValidationError(res, 422, "Validation error", validationerror);
    }

    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const DecrementQut = async (req, res) => {
  try {
    const { uuid, quantity } = req.body;

    if (!uuid || quantity === undefined) {
      return ErrorResponse(res, 400, "UUID and quantity are required");
    }

    const decrement = Number(quantity);

    if (!Number.isInteger(decrement) || decrement < 1) {
      return ErrorResponse(res, 400, "Quantity must be a positive integer");
    }

    const checkdata = await AddToCardModel.findById(uuid);

    if (!checkdata) {
      return ErrorResponse(res, 404, "Cart item not found");
    }

    if (checkdata.quantity - decrement < 1) {
      return ErrorResponse(res, 400, "Cart quantity cannot be less than 1");
    }

    const product = await ProductModel.findById(checkdata.product_id);

    if (!product) {
      return ErrorResponse(res, 404, "Product not found");
    }

    checkdata.quantity -= decrement;

    checkdata.price = product.price * checkdata.quantity;

    await checkdata.save();

    return SuccessResponse(
      res,
      200,
      "Quantity and price decremented successfully",
      checkdata,
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return ValidationError(res, 422, "Validation error", validationerror);
    }

    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const ListCart = async (req, res) => {
  try {
    const { user_id } = req.params;

    const users = await UserModel.findById(user_id);

    if (!users) {
      return ErrorResponse(res, 404, "User not found");
    }

    const allcart = await AddToCardModel.find({
      user_id: users._id,
    }).populate("user_id");

    if (allcart.length === 0) {
      return ErrorResponse(res, 404, "Cart is empty");
    }

    const totalAmount = allcart.reduce((total, item) => total + item.price, 0);

    return SuccessResponse(res, 200, "User cart listing successfully", {
      cart: allcart,
      total_items: allcart.length,
      total_amount: totalAmount,
    });
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

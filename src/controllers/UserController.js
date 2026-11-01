import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ErrorResponse,
  SuccessResponse,
  ValidationError,
} from "../helpers/ResponseHelper.js";

export const UsersList = async (req, res) => {
  try {
    const search = req.query.search || "";

    const data = await UserModel.paginate(
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      },

      {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        sort: { createdAt: -1 },
      },
    );
    return SuccessResponse(res, 200, "User Listing Here", data);
  } catch (error) {
    return ErrorResponse(res, 500, "Something went wrong", error.mesaage);
  }
};

export const UserRegister = async (req, res) => {
  try {
    const { username, email, password, phone, address, role} =
      req.body;

    const users = await UserModel.findOne({ email: email });
    if (users) {
      return res.status(500).json({
        message: "User Already Exist",
        data: users,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const profileImage = req.file?.filename;

    const createdata = await UserModel.create({
      username,
      email,
      role,
      password: hashpassword,
      phone,
      profile_img:profileImage,
      address,
    });

    if (createdata) {
      return SuccessResponse(
        res,
        201,
        "User Register SuccessFully",
        createdata,
      );
    }
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return ValidationError(res, 403, "Validation Failed", validationerror);
    }
    return ErrorResponse(res, 500, "Something went wrong", error.message);
  }
};

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await UserModel.findOne({ email: email });
    if (!users) {
      return ErrorResponse(res, 400, "User Not Found");
    }

    const checkPassword = await bcrypt.compare(password, users.password);
    if (checkPassword) {
      const user = {
        id: users._id,
        uuid: users.uuid,
        role: users.role,
        username: users.username,
        email: users.email,
      };
      const token = jwt.sign({ users: user }, process.env.JWT_KEY);
      res.cookie("token", token);
      return SuccessResponse(res, 200, "User Login SuccessFull", token);
    } else {
      return ErrorResponse(res, 500, "Username and Password is Incorrect");
    }
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return ValidationError(res, 403, "Validation Failed", validationerror);
    }
    return ErrorResponse(res, 500, "Something went wrong", error.message);
  }
};

export const UserLogged = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return ErrorResponse(
        res,
        401,
        "Token not found. Please login first.",
        error.message,
      );
    }

    res.clearCookie("token");
    return SuccessResponse(res, 200, "User logged out successfully");
  } catch (error) {
    return ErrorResponse(res, 500, "Something went wrong", error.message);
  }
};

export const Profile = async (req, res) => {
  try {
    const { uuid } = req.params;
    const profile = await UserModel.findOne(uuid);
    if (!profile) {
      return ErrorResponse(res, 400, "User not found");
    }
    return SuccessResponse(res, 200, "User Profile fetch successfully");
  } catch (error) {
    return ErrorResponse(res, 500, "Something went wrong", error.message);
  }
};

export const AccountDelete = async (req, res) => {
  try {
    const { uuid } = req.params;
    const useraccount = await UserModel.findOneAndDelete(uuid);
    if (!useraccount) {
      return ErrorResponse(res, 400, "User Account not found");
    }
    return SuccessResponse(res, 200, "This Account deleted successfully");
  } catch (error) {
    return ErrorResponse(res, 500, "Something went wrong", error.message);
  }
};

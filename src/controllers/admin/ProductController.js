import fs from "fs";
import path from "path";
import ProductModel from "../../models/ProductModel.js";
import {
  ErrorResponse,
  SuccessResponse,
  ValidationError,
} from "../../helpers/ResponseHelper.js";
import CategoryModel from "../../models/CategoriesModel.js";

export const CreateProduct = async (req, res) => {
  try {
    const {
      product_name,
      slug,
      categories_id,
      description,
      price,
      stock,
      size,
      image,
    } = req.body;

    const checkCate = await CategoryModel.findById(categories_id);

    if (!checkCate) {
      return ErrorResponse(res, 400, "Category data not found");
    }

    const datacreat = await ProductModel.create({
      product_name,
      slug,
      categories_id,
      description,
      price,
      stock,
      image: req.file?.filename,
      size,
    });

    if (datacreat) {
      return SuccessResponse(
        res,
        200,
        "Product created successfull",
        datacreat,
      );
    }

    return ErrorResponse(res, 400, "Product Creation Failed");
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return ValidationError(res, 303, "Validation Error", validationerror);
    }
    return ErrorResponse(res, 500, "Intrenal server error", error.message);
  }
};

export const ProductsList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const data = await ProductModel.paginate(
      {
        $or: [{ product_name: { $regex: search, $options: "i" } }],
      },
      {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        populate: "categories_id",
      },
    );
    if (data) {
      return SuccessResponse(res, 200, "Producs Data Found", data);
    }
    return ErrorResponse(res, 400, "Data Not Found");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal server error", error.message);
  }
};

export const EditProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const getdata = await ProductModel.findOne(uuid);

    if (getdata) {
      return SuccessResponse(res, 200, "Single Product data", getdata);
    }
    return ErrorResponse(res, 400, "Data not found");
  } catch (error) {
    return ErrorResponse(res, 500, "Internal Server Error");
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    const {
      product_name,
      slug,
      categories_id,
      description,
      price,
      stock,
      image,
      size,
    } = req.body;

    const updatedata = await ProductModel.findOneAndUpdate(
      uuid,
      {
        product_name,
        slug,
        categories_id,
        description,
        price,
        stock,
        image,
        size,
      },
      { new: true },
    );

    if (updatedata) {
      return SuccessResponse(
        res,
        200,
        "Product Updated Successful",
        updatedata,
      );
    }
    return ErrorResponse(res, 500, "Product Updation Failed");
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err,
        message,
      }));

      return ValidationError(res, 303, "Validation Error", validationerror);
    }
    return ErrorResponse(res, 500, "Internal server error");
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { uuid } = req.params;

    const deldata = await ProductModel.findOne(uuid);

    if (!deldata) {
      return ErrorResponse(res, 404, "Product not found");
    }

    if (deldata.image) {
      const imagePath = path.resolve(
        "src/assets/products",
        path.basename(deldata.image),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await ProductModel.findOneAndDelete(uuid);

    return SuccessResponse(
      res,
      200,
      "Product and image deleted successfully",
      deldata,
    );
  } catch (error) {
    console.log(error);

    return ErrorResponse(res, 500, "Internal Server Error", error.message);
  }
};

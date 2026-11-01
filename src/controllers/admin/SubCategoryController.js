import SubCategoryModel from "../../models/SucategoryModel.js";
import CategoryModel from "../../models/CategoriesModel.js";
import { ErrorResponse } from "../../helpers/ResponseHelper.js";

export const SubCategoryList = async (req, res) => {
  try {
    const Subcatedata = await SubCategoryModel.paginate(
      {},
      {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        populate: "cate_id",

      },
    )

    if (!Subcatedata) {
      return res.status(500).json({
        message: "Data Fetching failed",
        success: false,
        data: [{}],
      });
    }

    return res.status(200).json({
      message: "Subcategory List Here",
      data: Subcatedata,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wwrong",
      success: false,
    });
  }
};

export const AddSubcategory = async (req, res) => {
  try {
    const { subcategory_name, slug, cate_id, status } = req.body;

    const checkCate = await CategoryModel.findById({ _id: cate_id });
    if (!checkCate) {
      return ErrorResponse(res, 400, "Invalide Category ID");
    }

    const createdata = await SubCategoryModel.create({
      subcategory_name,
      cate_id,
      slug,
      status,
    });

    if (!createdata) {
      return res.status(500).json({
        message: "Data Creation Failed",
        success: false,
        data: [{}],
      });
    }

    return res.status(200).json({
      message: "Subcategory Created Succusful",
      success: true,
      data: createdata,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationError = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(403).json({
        message: "Validation Error",
        success: false,
        validationError,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const SubcateEdit = async (req, res) => {
  try {
    const { uuid } = req.params;
    const getdata = await SubCategoryModel.findOne(uuid);
    if (!getdata) {
      return res.status(400).json({
        message: "Data not found",
        success: false,
        data: [{}],
      });
    }

    return res.status(200).json({
      message: "Single Subcategory data",
      success: true,
      data: getdata,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const UpdateSubcate = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { subcategory_name, slug, status, cate_id } = req.body;

    const updatedata = await SubCategoryModel.findOneAndUpdate(
      uuid,
      { subcategory_name, slug, cate_id, status },
      { new: true },
    );
    if (!updatedata) {
      return res.status(500).json({
        message: "Data Updation Failed",
        success: false,
        data: [{}],
      });
    }

    return res.status(200).json({
      message: "Subcategory Updated SuccessFully",
      success: true,
      data: updatedata,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationError = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(403).json({
        message: "Validation Error",
        success: false,
        validationError,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const DeleteSubcate = async (req, res) => {
  try {
    const { uuid } = req.params;

    const deletedata = await SubCategoryModel.findOneAndDelete(uuid);
    if (!deletedata) {
      return res.status(400).json({
        message: "Data not found",
        success: false,
        data: [{}],
      });
    }

    return res.status(200).json({
      message: "Data deleted successful",
      success: true,
      data: deletedata,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

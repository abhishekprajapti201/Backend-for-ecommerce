import CategoryModel from "../../models/CategoriesModel.js";

export const Categories = async (req, res) => {
  const search = req.query.search || "";
  const data = await CategoryModel.paginate(
    {},
    {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    },
  );

  if (!data) {
    return res.status(400).json({
      message: "Data not found",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Categories lists",
    success: true,
    data: data,
  });
};

export const Create = async (req, res) => {
  try {
    const { category_name, slug, status } = req.body;

    const datacreate = await CategoryModel.create({
      category_name,
      slug,
      status,
    });

    if (!datacreate) {
      return res.status(500).json({
        message: "Category Creation Failed",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Create Category data SuccessFull",
      data: datacreate,
      success: true,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        filed: err.path,
        message: err.message,
      }));

      return res.status(403).json({
        message: "Valiadtion error",
        success: false,
        validationerror,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { uuid } = req.params;
    const editdata = await CategoryModel.findOne(uuid);
    if (!editdata) {
      return res.status(400).json({
        message: "Data not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category data here",
      data: editdata,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { uuid } = req.params;
    const deletedata = await CategoryModel.findOneAndDelete(uuid);
    if (!deletedata) {
      return res.status(400).json({
        message: "Data not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category data deleted",
      data: deletedata,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { category_name, slug, status } = req.body;

    const getcate = await CategoryModel.findOne(uuid);
    if (!getcate) {
      return res.status(400).json({
        message: "Data not found",
        success: false,
      });
    }

    const updatedata = await CategoryModel.findOneAndUpdate(
      uuid,
      { category_name, slug, status },
      { new: true },
    );

    if (!updatedata) {
      return res.status(400).json({
        message: "Data updation failed",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category data updated successfull",
      data: updatedata,
      success: true,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const validationerror = Object.values(error.errors).map((err) => ({
        filed: err.path,
        message: err.message,
      }));

      return res.status(403).json({
        message: "Valiadtion error",
        success: false,
        validationerror,
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

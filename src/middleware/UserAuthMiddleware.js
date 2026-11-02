import jwt from "jsonwebtoken";
const UserAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login first.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    if (decode.users.role == "user") {
      return next();
    }

    return res.status(500).json({
      success: false,
      message: "Your role is invalide",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default UserAuthMiddleware;

import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  try {
    const authtoken = req.cookies?.token;

    if (!authtoken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login first.",
      });
    }

    req.token = authtoken;

    const decode = jwt.verify(authtoken, process.env.JWT_KEY);
    req.users = JSON.stringify(decode);

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default AuthMiddleware;

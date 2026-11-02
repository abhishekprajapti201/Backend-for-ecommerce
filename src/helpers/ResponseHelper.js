export const SuccessResponse = (res, code, message, data = null) => {
  res.status(code).json({
    message: message,
    success: true,
    data: data,
  });
};

export const ErrorResponse = (res, code, message, error=null) => {
  return res.status(code).json({
    message: message,
    success: true,
    error: error,
  });
};

export const ValidationError = (res, code, message, validateerror) => {
  res.status(code).json({
    message: message,
    success: false,
    error: validateerror,
  });
};

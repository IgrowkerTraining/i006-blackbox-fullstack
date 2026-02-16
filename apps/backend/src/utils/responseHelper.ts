import { Response } from "express";

class ResponseHelper {
  static success(res: Response, data: any, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(
    res: Response,
    message = "Internal Server Error",
    statusCode = 500,
    error = null,
  ) {
    return res.status(statusCode).json({
      success: false,
      // message,
      // ...(error && { error }),
    });
  }

  static validationError(res: Response, errors: any) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
}

export default ResponseHelper;

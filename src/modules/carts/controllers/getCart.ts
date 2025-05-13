import { Request, Response, NextFunction } from "express";

// @ts-ignore
export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new Error("Uncaught authentication error");
    }

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: req.user.cart,
    });
  } catch (error) {
    next(error);
  }
};

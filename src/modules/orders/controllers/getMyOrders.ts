import { Request, Response, NextFunction } from "express";

// Services
import { findByUser } from "@/modules/orders/services";

export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new Error("Uncaught authentication error");
    }

    const orders = await findByUser(req.user.id);

    if (!orders) {
      throw new Error("Orders not found");
    }

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: orders,
    });
  } catch (error) {
    next();
  }
};

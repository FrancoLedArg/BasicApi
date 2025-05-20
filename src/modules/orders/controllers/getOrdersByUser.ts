import { Request, Response, NextFunction } from "express";

// Services
import { findByUser } from "@/modules/orders/services";

export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body;

    const orders = await findByUser(userId);

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

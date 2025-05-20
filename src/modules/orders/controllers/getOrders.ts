import { Request, Response, NextFunction } from "express";

// Services
import { findMany } from "@/modules/orders/services";

export const getOrders = async (
  // @ts-ignore
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await findMany();

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

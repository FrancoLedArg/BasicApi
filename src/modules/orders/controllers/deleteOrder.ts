import { Request, Response, NextFunction } from "express";

// DTOs
import { GetOrderDTO } from "@/lib/validation/orders";

// Services
import { remove } from "@/modules/orders/services";

export const deleteOrder = async (
  req: Request<GetOrderDTO["params"]>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const orders = await remove(id);

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

import { Request, Response, NextFunction } from "express";

// Services
import { clearRelations } from "@/modules/carts/services";

// @ts-ignore
export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new Error("Uncaught authentication error");
    }

    const cart = await clearRelations(req.user.cart.id);

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

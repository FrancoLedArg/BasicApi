import { Request, Response, NextFunction } from "express";

// DTOs
import { UpdateQuantityDTO } from "@/lib/validation/carts";

// Services
import { updateRelation } from "@/modules/carts/services";

export const updateQuantity = async (
  req: Request<UpdateQuantityDTO["params"], unknown, UpdateQuantityDTO["body"]>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = req.user;

    if (!session) {
      throw new Error("Unauthorized");
    }

    const { product_id } = req.params;
    const { quantity } = req.body;

    const updatedQuantity = await updateRelation(
      session.cart.id,
      product_id,
      quantity,
    );

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully.",
      data: updatedQuantity,
    });
  } catch (error) {
    next(error);
  }
};

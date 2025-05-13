import { Request, Response, NextFunction } from "express";

// DTOs
import { RemoveProductDTO } from "@/lib/validation/carts";

// Services
import { removeRelation } from "@/modules/carts/services";

// @ts-ignore
export const removeProduct = async (
  req: Request<RemoveProductDTO["params"]>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = req.user;

    if (!session) {
      throw new Error("Unauthorized");
    }

    const { product_id } = req.params;

    const removedProduct = await removeRelation(session.cart.id, product_id);

    res.status(200).json({
      success: true,
      message: "Product removed successfully.",
      data: removedProduct,
    });
  } catch (error) {
    next(error);
  }
};

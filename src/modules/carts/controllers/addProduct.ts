import { Request, Response } from "express";

// DTOs
import { AddProductDTO } from "@/lib/validation/carts";

// Services
import { insertRelation } from "@/modules/carts/services";

// @ts-ignore
export const addProduct = async (
  req: Request<unknown, unknown, AddProductDTO["body"]>,
  res: Response,
) => {
  try {
    const session = req.user;

    if (!session) {
      throw new Error("Unauthorized");
    }

    const { product_id, quantity } = req.body;

    const addedProduct = await insertRelation(
      session.cart.id,
      product_id,
      quantity,
    );

    res.status(200).json({
      success: true,
      message: "Product added successfully.",
      data: addedProduct,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

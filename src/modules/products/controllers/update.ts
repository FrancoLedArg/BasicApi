import { Request, Response } from "express";

// Services
import { findById, update } from "@/modules/products/services";

// DTOs
import { UpdateProductDTO } from "@/lib/validation/products";

export const updateProduct = async (
  req: Request<UpdateProductDTO["params"], unknown, UpdateProductDTO["body"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const product = await findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await update(product.id, changes);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

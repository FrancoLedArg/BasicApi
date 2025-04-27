import { Request, Response } from "express";

// Services
import { findById } from "@/modules/products/services";

// DTOs
import { GetProductDTO } from "@/lib/validation/products";

export const getProductById = async (
  req: Request<GetProductDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const product = await findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

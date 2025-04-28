import { Request, Response } from "express";

// Validation Types
import { CreateProductDTO } from "@/lib/validation/products";

// Services
import { insert } from "@/modules/products/services";

export const createProduct = async (
  req: Request<unknown, unknown, CreateProductDTO["body"]>,
  res: Response,
) => {
  try {
    const product = req.body;

    const newProduct = await insert(product);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

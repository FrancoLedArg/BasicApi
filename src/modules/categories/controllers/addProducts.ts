import { Request, Response } from "express";

// Services
import { insert } from "@/modules/productCategories/services";

// DTOs
import { AddProductsDTO } from "@/lib/validation/products";

export const addProductsToCategory = async (
  req: Request<AddProductsDTO["params"], unknown, AddProductsDTO["body"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const products = req.body;

    const newProductCategory = await insert(products, id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newProductCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

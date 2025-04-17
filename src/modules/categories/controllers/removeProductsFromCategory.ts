import { Request, Response } from "express";

// Services
import { removeProducts } from "@/modules/productCategories/services";

// DTOs
import { ProductsToCategoryDTO } from "@/lib/validation/products";

export const removeProductsFromCategory = async (
  req: Request<
    ProductsToCategoryDTO["params"],
    unknown,
    ProductsToCategoryDTO["body"]
  >,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const products = req.body;

    const newProductCategory = await removeProducts(id, products);

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

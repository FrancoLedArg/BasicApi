import { Request, Response } from "express";

// Services
import { insert, remove } from "@/services/productCategories";

export const createProductCategory = async (req: Request, res: Response) => {
  try {
    const { product_id, category_id } = req.body;

    const newProductCategory = await insert(product_id, category_id);

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

export const deleteProductCategory = async (req: Request, res: Response) => {
  try {
    const { product_id, category_id } = req.params;

    const deletedUser = await remove(product_id, category_id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

import { Request, Response } from "express";

// Services
import { insert } from "@/modules/categories/services";

// DTOs
import { CreateCategoryDTO } from "@/lib/validation/categories";

export const createCategory = async (
  req: Request<unknown, unknown, CreateCategoryDTO["body"]>,
  res: Response,
) => {
  try {
    const category = req.body;

    const newCategory = await insert(category);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

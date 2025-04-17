import { Request, Response } from "express";

// Services
import { findById } from "@/modules/categories/services";

// DTOs
import { GetCategoryDTO } from "@/lib/validation/categories";

export const getCategoryById = async (
  req: Request<GetCategoryDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const category = await findById(id);
    if (!category) {
      throw new Error("Category not found.");
    }

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: category,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

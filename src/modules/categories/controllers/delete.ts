import { Request, Response } from "express";

// Services
import { remove } from "@/modules/categories/services/remove";

// DTOs
import { GetCategoryDTO } from "@/lib/validation/categories";

export const deleteCategory = async (
  req: Request<GetCategoryDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const deletedCategory = await remove(id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

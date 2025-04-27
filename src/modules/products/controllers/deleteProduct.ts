import { Request, Response } from "express";

// Services
import { remove } from "@/modules/products/services";

// DTOs
import { GetProductDTO } from "@/lib/validation/products";

export const deleteProduct = async (
  req: Request<GetProductDTO["params"]>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const deletedProduct = await remove(id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

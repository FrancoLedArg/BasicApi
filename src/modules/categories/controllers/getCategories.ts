import { Request, Response } from "express";

// Services
import { findAll } from "@/modules/categories/services";

// @ts-ignore
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await findAll();

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: categories,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

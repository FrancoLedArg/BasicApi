import { /*Request*/ Response } from "express";

// Services
import { findAll } from "@/modules/products/services";

export const getProducts = async (/*req: Request*/ res: Response) => {
  try {
    const products = await findAll();

    if (!products) {
      throw new Error("Products not found");
    }

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: products,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

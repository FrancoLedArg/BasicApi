import { Request, Response } from "express";

// Services
// import { insertProduct } from "@/modules/carts/services";

// @ts-ignore
export const addProduct = async (req: Request, res: Response) => {
  try {
    const carts = { name: true };

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: carts,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

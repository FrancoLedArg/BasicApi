import { Request, Response } from "express";

// Services
import { findAll } from "@/modules/carts/services";

// @ts-ignore
export const getCart = async (req: Request, res: Response) => {
  try {
    const carts = await findAll();

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

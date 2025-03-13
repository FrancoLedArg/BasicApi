import { Request, Response } from "express";

// Services
import { findAll } from "@/services/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      res.status(400).json({
        success: false,
        message: "Invalid limit or offset",
      });
    }

    const products = await findAll(limit, offset);

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: products,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: {
        id: id,
        name: "Sandalias",
        price: 1200,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

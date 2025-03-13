import { Request, Response } from "express";

// Services
import { findAll } from "@/services/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    /*
    const { limit, offset } = req.query;

    if (limit != undefined && offset != undefined) {
      res.json({
        success: true,
        message: "I'm an endpoint",
        limit,
        offset,
      });
    }
      */

    const products = await findAll();

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

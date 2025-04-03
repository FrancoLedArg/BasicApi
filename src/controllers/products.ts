import { Request, Response } from "express";

// Validation Types
import { ProductFilterDTO } from "@/lib/validation/products";

// Services
import { findAll, findById, insert, update, remove } from "@/services/products";

export const getProducts = async (
  req: Request<unknown, unknown, unknown, ProductFilterDTO>,
  res: Response,
) => {
  try {
    const { limit, offset } = req.query;

    const products = await findAll(limit, offset);

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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await insert(req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await remove(req.params.id);

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

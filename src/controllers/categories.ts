import { Request, Response } from "express";

// Services
import {
  findAll,
  findById,
  insert,
  update,
  remove,
} from "@/services/categories";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      res.status(400).json({
        success: false,
        message: "Invalid limit or offset",
      });
    }

    const categories = await findAll(limit, offset);

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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await findById(req.params.id);

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

export const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const products = await findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await insert(req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedCategory,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await remove(req.params.id);

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

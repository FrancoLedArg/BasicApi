import { Request, Response } from "express";

// Services
import { findAll, findById, insert, update, remove } from "@/services/carts";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      res.status(400).json({
        success: false,
        message: "Invalid limit or offset",
      });
    }

    const carts = await findAll(limit, offset);

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

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: cart,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const newCart = await insert(user_id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const deletedCart = await remove(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

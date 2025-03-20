import { Request, Response } from "express";

// Services
import { findAll, findById, insert, update, remove } from "@/services/orders";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      res.status(400).json({
        success: false,
        message: "Invalid limit or offset",
      });
    }

    const orders = await findAll(limit, offset);

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: orders,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: order,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user_id, products } = req.body;

    const newOrder = await insert(user_id, products);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await remove(req.params.id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedOrder,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

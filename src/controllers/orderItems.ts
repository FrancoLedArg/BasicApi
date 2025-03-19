import { Request, Response } from "express";

// Services
import { insert, update, remove } from "@/services/orderItems";

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const newOrder = await insert(req.body);

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

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const updatedOrder = await update(order_id, item_id, req.body);

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

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const deletedOrder = await remove(order_id, item_id);

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

import { Request, Response } from "express";

// Services
import { insert, update, remove } from "@/services/orderProducts";

export const createOrderProduct = async (req: Request, res: Response) => {
  try {
    const newOrderProduct = await insert(req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newOrderProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const updatedOrderProduct = await update(order_id, item_id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedOrderProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const deletedOrderProduct = await remove(order_id, item_id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedOrderProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

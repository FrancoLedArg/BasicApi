import { Request, Response } from "express";

// Services
import { insert, update, remove } from "@/services/cartProducts";

export const createCartProduct = async (req: Request, res: Response) => {
  try {
    const { product_id, cart_id, quantity } = req.body;

    const newCartProduct = await insert(product_id, cart_id, quantity);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newCartProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateCartProduct = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const updatedCartProduct = await update(order_id, item_id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedCartProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteCartProduct = async (req: Request, res: Response) => {
  try {
    const { order_id, item_id } = req.params;

    const deletedCartProduct = await remove(order_id, item_id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedCartProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

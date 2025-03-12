import { Request, Response } from "express";

// Services

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, message: "I'm an endpoint" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

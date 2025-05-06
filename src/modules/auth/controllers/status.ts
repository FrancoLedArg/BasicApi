import { Request, Response } from "express";

// @ts-ignore
export const status = async (req: Request, res: Response) => {
  try {
    const session = req.user;

    if (!session) {
      throw new Error("Unauthenticated");
    }

    res.status(200).json({
      success: true,
      message: "Status.",
      user: session,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

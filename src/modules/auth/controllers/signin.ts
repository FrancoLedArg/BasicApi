import { Request, Response } from "express";

// @ts-ignore
export const signin = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Successfully signed in.",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

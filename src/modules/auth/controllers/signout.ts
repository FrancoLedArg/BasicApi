import { Request, Response } from "express";

// @ts-ignore
export const signout = async (req: Request, res: Response) => {
  try {
    const session = req.user;

    if (!session) {
      throw new Error("Unauthorized");
    }

    req.logout((err) => {
      if (err) {
        throw new Error("Error signing out.");
      }

      res.clearCookie("connect.sid");

      res.status(200).json({
        success: true,
        message: "Logged out successfully.",
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error." });
  }
};

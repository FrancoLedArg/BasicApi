import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction,
): void => {
  if (error instanceof Error) {
    res.status(400).json({ success: false, message: error.message });
    return;
  }

  res.status(500).json({ success: false, message: "Internal server error" });
};

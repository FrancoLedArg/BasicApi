import { Request, Response, NextFunction, RequestHandler } from "express";
import { config } from "@/config/env";

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== config.API_KEY) {
    res.status(403).json({
      success: false,
      message: "Forbidden: Invalid API Key.",
    });
  }

  next();
};

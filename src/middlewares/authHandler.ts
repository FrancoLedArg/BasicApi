import { Request, Response, NextFunction, RequestHandler } from "express";

// Middleware to check authentication
export const authHandler =
  (roles?: string[]): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("Unauthenticated");
      }

      if (roles && roles.length > 0) {
        // Here we pass the roles logic
      }

      next();
    } catch (error) {
      res.status(404).json({ message: "Unauthenticated" });
    }
  };

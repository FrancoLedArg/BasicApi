import { Request, Response, NextFunction, RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateSchema =
  (schema: AnyZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          type: "ZodError",
          data: error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          })),
        });
        return;
      } else {
        next(error);
      }
    }
  };

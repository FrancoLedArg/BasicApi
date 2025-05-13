import { ParamsDictionary } from "express-serve-static-core";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      cart: {
        id: string;
      };
    }
  }
}

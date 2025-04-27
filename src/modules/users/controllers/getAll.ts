import { Request, Response } from "express";

// Services
import { findAll } from "@/modules/users/services";

/*

There is an error to compile here with the req if i don't use it in the controller
i'll left it with the ts-ignore for now, i'll come back to it.

*/

// @ts-ignore
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAll();

    if (!users) {
      throw new Error("Users not found");
    }

    res.status(200).json({
      success: true,
      message: "I'm an endpoint",
      data: users,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

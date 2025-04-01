import { Request, Response } from "express";

// Validation Types
import { UserFilterDTO } from "@/lib/validation/users";

// Services
import { findAll, findById, insert, update, remove } from "@/services/users";

export const getUsers = async (
  req: Request<unknown, unknown, unknown, UserFilterDTO>,
  res: Response,
) => {
  try {
    const users = await findAll(req.query);

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findById(id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await insert(req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: newUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUser = await update(id, req.body);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await remove(id);

    res.status(200).json({
      success: true,
      message: "I'm another endpoint",
      data: deletedUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ success: false, message: error.message });
      return;
    }

    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

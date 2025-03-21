import { Router } from "express";

// Controllers
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "@/controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

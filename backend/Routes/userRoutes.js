// routes/userRoutes.js
import { Router } from "express";
import UserController from "../Controller/UserController.js";

const router = Router();

router.get("/", UserController.getUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id',UserController.deleteUser)
export default router;

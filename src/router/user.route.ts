import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  login,
  logout,
  signup,
  verifyAuth,
} from "../controller/user.controller";

const router = Router();

router.route("/auth").get(authMiddleware, verifyAuth);
router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);
router.route("/auth/logout").post(authMiddleware, logout);

export default router;

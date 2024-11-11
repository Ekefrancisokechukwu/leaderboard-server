import { Router } from "express";
import passport from "passport";
import {
  getLoggedInUser,
  googleCallback,
  logout,
} from "../controllers/authController";
import { ensureAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

router.get("/user", ensureAuthenticated, getLoggedInUser);

router.get("/logout", logout);

export default router;

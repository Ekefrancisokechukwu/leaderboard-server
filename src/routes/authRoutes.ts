import { Router } from "express";
import passport from "passport";
import { googleCallback, logout } from "../controllers/authController";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3001",
  }),
  googleCallback
);

router.get("/logout", logout);

export default router;

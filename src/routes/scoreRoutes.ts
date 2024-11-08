import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authMiddleware";
import { submitScore } from "../controllers/scoreController";

const router = Router();

router.route("/").post(ensureAuthenticated, submitScore);

export default router;

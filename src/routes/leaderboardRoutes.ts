import { Router } from "express";
import {
  getGlobalTopPlayers,
  getTopPlayers,
} from "../controllers/leaderboadController";

const router = Router();

router.route("/").get(getGlobalTopPlayers);
router.route("/:gameId").get(getTopPlayers);

export default router;

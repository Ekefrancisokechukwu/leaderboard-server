import { Request, Response } from "express";
import redisClient from "../config/redis";
import BadRequestError from "../errors/badRequest";

export async function getGlobalTopPlayers(req: Request, res: Response) {
  const { limit = 1, period } = req.query;

  // 1. Retrieve the top scores from Redis sorted set
  const topPlayers = await redisClient.zRangeWithScores(
    "global:leaderboard",
    Number(-limit),
    -1,
    {
      REV: true,
    }
  );

  const leaderboard = topPlayers.map((player, index) => ({
    rank: index + 1,
    userId: player.value,
    score: player.score,
  }));

  res.status(200).json({ leaderboard });
}

export async function getTopPlayers(req: Request, res: Response) {
  const { gameId } = req.params;
  const limit = Number(req.query.limit) || 1;

  if (!gameId) {
    throw new BadRequestError("Game ID is required");
  }

  // 1. Retrieve the top scores from Redis sorted set
  const topPlayers = await redisClient.zRangeWithScores(
    `leaderboard:${gameId}`,
    -limit,
    -1,
    {
      REV: true,
    }
  );

  const leaderboard = topPlayers.map((player, index) => ({
    rank: index + 1,
    userId: player.value,
    score: player.score,
  }));

  res.status(200).json({ leaderboard });
}

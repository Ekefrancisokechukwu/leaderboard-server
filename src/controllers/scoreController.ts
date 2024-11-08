import { Request, Response } from "express";
import { IUser } from "../models/User";
import Score from "../models/ScoreHistory";
import BadRequestError from "../errors/badRequest";
import redisClient from "../config/redis";

export async function submitScore(req: Request, res: Response) {
  const { gameId, score } = req.body;
  const user = req.user as IUser;

  if (!gameId || !score) {
    throw new BadRequestError("gameId and score are required");
  }

  if (score > 100) {
    throw new BadRequestError("score can't be more than 100");
  }

  const existingScore = await Score.findOne({ gameId, userId: user.googleId });
  let scoreDiff = score;

  // 1. check if the user has already submitted a score for the game. update the score
  if (existingScore) {
    scoreDiff = score - existingScore.score;
    existingScore.score = score;
    existingScore.save();

    res
      .status(200)
      .json({ message: "Score updated successfully", score: existingScore });
  } else {
    // 2. Save new score history in MongoDB
    const newScore = await Score.create({
      gameId,
      userId: user.googleId,
      score,
    });

    res
      .status(201)
      .json({ message: "Score submitted successfully", score: newScore });
  }

  // Update  the specific game
  await redisClient.zAdd(`leaderboard:${gameId}`, {
    score: score,
    value: user.googleId,
  });

  // Update the gobal leadership
  console.log("score", scoreDiff);
  await redisClient.zIncrBy("global:leaderboard", scoreDiff, user.googleId);
}

import mongoose, { Document, Schema } from "mongoose";

interface IScore extends Document {
  userId: string; // id of the player
  gameId: string; // id To track each game played
  score: number;
}

const ScoreSchema = new Schema<IScore>(
  {
    userId: { type: String, required: true },
    gameId: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true } // createdAt and UpdatedAt
);

export default mongoose.model<IScore>("Score", ScoreSchema);

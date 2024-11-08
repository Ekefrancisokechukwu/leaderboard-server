import { Document } from "mongoose";

interface IGame extends Document {
  name: string;
  description: string;
}

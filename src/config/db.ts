import { connect } from "mongoose";

export default function connectDB(uri: string) {
  return connect(uri);
}

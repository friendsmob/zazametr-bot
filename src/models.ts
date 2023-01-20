import mongoose, { Schema } from "mongoose";

const OccasionSchema = new Schema({
  chat_id: Number,
  user_id: Number,
  username: String,
  result: Number,
  timestamp: Date,
});

export const Occasion = mongoose.model("Occasion", OccasionSchema);

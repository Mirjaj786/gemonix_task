import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  logo: string;
  banner: string;
  modes: string[];
  maps: string[];
}

const gamesSchema = new Schema<IGame>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    modes: {
      type: [String],
      required: true,
    },
    maps: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const GamesModel = mongoose.model<IGame>("Game", gamesSchema);
export default GamesModel;

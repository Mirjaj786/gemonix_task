import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  ign: string;
  igId: string;
  game: mongoose.Types.ObjectId;
}

const playerSchema = new Schema<IPlayer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ign: {
      type: String,
      required: true,
    },
    igId: {
      type: String,
      required: true,
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
  },
  { timestamps: true }
);

const PlayerModel = mongoose.model<IPlayer>("Player", playerSchema);
export default PlayerModel;

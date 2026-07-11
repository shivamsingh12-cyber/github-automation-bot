import mongoose from "mongoose";
import User from "./userSchema.js"


const repositorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    repoId: {
      type: Number,
      required: true,
      unique: true,
    },

    repoName: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    private: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Repository = mongoose.model('repos',repositorySchema);

export default Repository;
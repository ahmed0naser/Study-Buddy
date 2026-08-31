import mongoose from "mongoose";

interface IChunk {
  document: mongoose.Types.ObjectId;
  text: string;
  embedding: number[];
  chunkIndex: number;
}

const chunkSchema = new mongoose.Schema<IChunk>(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Chunk = mongoose.model<IChunk>("Chunk", chunkSchema);

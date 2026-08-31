import mongoose from "mongoose";
interface IDocument {
  user: mongoose.Types.ObjectId;
  title: string;
  originalName: string;
  path: string;
  extractedText: string;
  status: "Processing" | "Ready" | "Failed";
}
const documentSchema = new mongoose.Schema<IDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "Provide a title for the document"],
    },
    originalName: {
      type: String,
      required: [true, "File must have an original name"],
    },
    path: { type: String, required: [true, "File must have a path"] },
    extractedText: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Processing", "Ready", "Failed"],
      default: "Processing",
    },
  },
  { timestamps: true },
);
export const Document = mongoose.model<IDocument>("Document", documentSchema);

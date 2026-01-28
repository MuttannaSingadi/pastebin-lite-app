import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema({
  _id: { type: String },
  content: { type: String, required: true },
  expires_at: { type: Date, default: null },
  max_views: { type: Number, default: null },
  views: { type: Number, default: 0 }
});

export default mongoose.models.Paste || mongoose.model("Paste", PasteSchema);

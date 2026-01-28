import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
}

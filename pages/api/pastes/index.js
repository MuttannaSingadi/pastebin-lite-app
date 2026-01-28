import { connectDB } from "@/lib/db";
import Paste from "@/models/Paste";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string")
    return res.status(400).json({ error: "Invalid content" });

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1))
    return res.status(400).json({ error: "Invalid ttl_seconds" });

  if (max_views && (!Number.isInteger(max_views) || max_views < 1))
    return res.status(400).json({ error: "Invalid max_views" });

  await connectDB();

  const now = Date.now();
  const expires_at = ttl_seconds ? new Date(now + ttl_seconds * 1000) : null;

  const paste = await Paste.create({
    _id: uuidv4(),
    content,
    expires_at,
    max_views,
    views: 0
  });

  res.status(201).json({
    id: paste._id,
    url: `${process.env.BASE_URL}/p/${paste._id}`
  });
}

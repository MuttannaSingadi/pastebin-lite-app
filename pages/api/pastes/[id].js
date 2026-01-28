import { connectDB } from "@/lib/db";
import Paste from "@/models/Paste";

function getNow(req) {
  if (process.env.TEST_MODE === "1" && req.headers["x-test-now-ms"]) {
    return Number(req.headers["x-test-now-ms"]);
  }
  return Date.now();
}

export default async function handler(req, res) {
  await connectDB();
  const paste = await Paste.findById(req.query.id);

  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expires_at && now > paste.expires_at.getTime())
    return res.status(404).json({ error: "Expired" });

  if (paste.max_views && paste.views >= paste.max_views)
    return res.status(404).json({ error: "View limit exceeded" });

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.max_views
      ? paste.max_views - paste.views
      : null,
    expires_at: paste.expires_at
  });
}

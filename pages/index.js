import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Paste</h2>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <input placeholder="TTL seconds" onChange={(e) => setTtl(e.target.value)} />
      <br />
      <input placeholder="Max views" onChange={(e) => setViews(e.target.value)} />
      <br />

      <button onClick={submit}>Create</button>

      {url && (
        <p>
          Link: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}

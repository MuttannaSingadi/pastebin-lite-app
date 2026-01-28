# Pastebin-Lite

A small Pastebin-like web application where users can create text pastes and share a link to view them.  
Pastes can optionally expire based on time (TTL) or number of views.

## Features
- Create a paste with optional:
  - Time-to-live (TTL)
  - Maximum view count
- Fetch paste via API
- View paste via browser
- Automatic expiration when constraints are reached
- Safe rendering (no script execution)

## Tech Stack
- Next.js (Node.js)
- MongoDB (MongoDB Atlas)
- Mongoose

## API Endpoints

### Health Check
GET /api/healthz  
Response:
```json
{ "ok": true }

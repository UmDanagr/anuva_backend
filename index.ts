import express from "express";
import dotenv from "dotenv";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import all_routers from "./src/routes/all_routers.js";
import "./src/utils/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // your frontend URL
    credentials: true, // <--- this is required!
  })
);
app.use(cookieParser());
app.use(express.json());

// Session configuration - simplified with automatic expiration
app.use(session({
  secret: process.env.SESSION_SECRET || "anuva-session-secret-key-2024",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 1000, // 2 minutes in milliseconds (shorter for security)
    secure: process.env.NODE_ENV === 'production', // set to true in production
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    httpOnly: true
  },
  name: 'anuva.sid' // Custom session cookie name
}));

app.use("/api", all_routers);

// (async () => {
//   const server = await registerRoutes(app);

//   app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
//     const status = err.status || err.statusCode || 500;
//     const message = err.message || "Internal Server Error";

//     res.status(status).json({ message });
//     throw err;
//   });

// importantly only setup vite in development and after
// setting up all the other routes so the catch-all route
// doesn't interfere with the other routes
// if (app.get("env") === "development") {
//   await setupVite(app, server);
// } else {
//   serveStatic(app);
// }

// ALWAYS serve the app on port 5000
// this serves both the API and the client.
// It is the only port that is not firewalled.

// })();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

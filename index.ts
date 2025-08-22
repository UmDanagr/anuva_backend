import express from "express";
import dotenv from "dotenv";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.get("/",(req,res)=>{
  return res.send("Server Is Hosted")
})
// app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   const start = Date.now();
//   const path = req.path;
//   let capturedJsonResponse: Record<string, any> | undefined = undefined;

//   const originalResJson = res.json;
//   res.json = function (bodyJson, ...args) {
//     capturedJsonResponse = bodyJson;
//     return originalResJson.apply(res, [bodyJson, ...args]);
//   };

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     if (path.startsWith("/api")) {
//       let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
//       if (capturedJsonResponse) {
//         logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
//       }

//       if (logLine.length > 80) {
//         logLine = logLine.slice(0, 79) + "…";
//       }

//       log(logLine);
//     }
//   });

//   next();
// });

// app.use(session({
//   secret: process.env.SESSION_SECRET || "your-session-secret",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//     secure: true, // set to false if not using HTTPS in development
//     sameSite: "none"
//   }
// }));

app.use("/api", all_routers);
app.get("/",(req,res)=>{
  return res.send("Server Is Hosted")
})

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

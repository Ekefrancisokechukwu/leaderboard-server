import "express-async-errors";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/passport";
import authRouter from "./routes/authRoutes";
import scoreRouter from "./routes/scoreRoutes";
import leaderboardRouter from "./routes/leaderboardRoutes";
import errorsMiddleware from "./middlewares/errorsMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1D
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/api/v1/score", scoreRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);

app.get("/", (req, res) => {
  console.log("session:", req.session);

  res.status(200).send(`
   <h1>Real Time Leaderbaord</h1>
   <a href="/auth/google">Login with google</a>
    `);
});

// middleware error
app.use(notFoundMiddleware);
app.use(errorsMiddleware);

export default app;

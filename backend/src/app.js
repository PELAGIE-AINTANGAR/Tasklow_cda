const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const columnRoutes = require("./routes/columnRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dorRoutes = require("./routes/dorRoutes");
const dodRoutes = require("./routes/dodRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const analyticRoutes = require("./routes/analyticRoutes");
const userRoutes = require(
  "./routes/userRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);

app.use(
  "/api/analytics",
  analyticRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use("/api", dorRoutes);
app.use("/api", dodRoutes);

app.get("/health", (req, res) => {

  res.status(200).json({

    status: "ok",

    service: "taskflow-backend"

  });

});
app.use(errorMiddleware);

module.exports = app;
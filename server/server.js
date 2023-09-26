const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
const app = express();

const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/uploadVideo.routes");
const avatarRoutes = require("./routes/uploadAvatar.routes");
const videosrRoutes = require("./routes/videos.routes");
const usersRoutes = require("./routes/users.routes");
const ChannelRoutes = require("./routes/channel.routes");
const commentsRoutes = require("./routes/comment.routes");
const subscriptionsRoutes = require("./routes/subscription.routes");
const searchRoutes = require("./routes/search.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("uploads"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/uploads", avatarRoutes);
app.use("/api/v1/videos", videosrRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/channel", ChannelRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/subscriptions", subscriptionsRoutes);
app.use("/api/v1/search", searchRoutes);

app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});

import express = require("express");
import { api } from "./routes/api";
import { latestApi } from "./routes/latestApi";
import { PostObject } from './types/post';
import { createPost,  } from './controllers/mysql/queries';
import { authRouter } from "./routes/auth";
import bodyParser = require("body-parser");
import { postRouter } from "./routes/post";
const { rabbitReceive } = require('./controllers/rabbitmq');
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set('json spaces', 40); // Pretify

rabbitReceive((obj: PostObject) => {
  createPost(obj);
});

// Routes
app.use('/', api);
app.use(bodyParser.json());
app.use('/latest', latestApi);
app.use('/auth', authRouter);
app.use('/post', postRouter)

const server = app.listen(app.get("port"), () => {
  console.log(`App is running on http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

export default app;

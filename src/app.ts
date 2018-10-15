import express = require("express");
import { api } from "./routes/api";
import { latestApi } from "./routes/latestApi";
import {status} from "./routes/statusApi";
import {userApi} from './routes/userApi';
import { PostObject } from './types/post';
import { createPost,  } from './controllers/mysql/queries/queries';
import { authRouter } from "./routes/auth";
import {postsAndCommentsApi} from './routes/postAndCommentsApi';
import {commentsApi} from './routes/commentsApi';
import bodyParser = require("body-parser");
import { postRouter } from "./routes/post";
const { rabbitReceive } = require('./controllers/rabbitmq');
const app = express();
import { SetServerStatus } from './controllers/serverstatus';

// Settings
app.set("port", process.env.PORT || 3000);
app.set('json spaces', 40); // Pretify

rabbitReceive((obj: PostObject) => {
  createPost(obj);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', api);
app.use(bodyParser.json());
app.use('/latest', latestApi);
app.use('/auth', authRouter);
app.use('/post', postRouter)
app.use('/status', status);
app.use('/user', userApi);
app.use('/postandcomments', postsAndCommentsApi);
app.use('/comment', commentsApi);

//Set Server status upon startup
SetServerStatus("Alive");


const server = app.listen(app.get("port"), () => {
  console.log(`App is running on http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

export default app;

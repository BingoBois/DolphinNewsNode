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
const app = express();
import { SetServerStatus } from './controllers/serverstatus';
import { logError } from './controllers/elastic/logger';
import cors from 'cors';

// Settings
app.set("port", process.env.PORT || 3000);
app.set('json spaces', 40); // Pretify

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(function (error: any, req: any, res: any, next: any) {
  if (error) {
    logError(error, 500);
    res.status(500).json({ message: error, error: 500 });
  } else {
    next();
  }
});


// Routes
app.use('/', api);
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

import express = require("express");
import { api } from "./routes/api";
import { latestApi } from "./routes/latestApi";
import { PostObject } from './types/post';
import { createPost,  } from './controllers/mysql/queries';
const bodyParser = require('body-parser'); 
const { rabbitReceive } = require('./controllers/rabbitmq');
const app = express();

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
app.use('/latest', latestApi);


const server = app.listen(app.get("port"), () => {
  console.log(`App is running on http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

export default app;

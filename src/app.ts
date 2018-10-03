import express = require("express");
import { Api } from "./routes/api";
const { rabbitReceive } = require('./controllers/rabbitmq');
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set('json spaces', 40); // Pretify

rabbitReceive(() => {
  console.log('received stuff');
});
// Routes
app.use('/', Api);

const server = app.listen(app.get("port"), () => {
  console.log(`App is running on http://localhost:${app.get("port")} in ${app.get("env")} mode`);
});

export default app;

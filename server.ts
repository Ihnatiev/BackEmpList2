import fs from "fs";
import https from "https";
import express from "express";
import routes from "./backend/routes/routes";
import middleware from "./backend/middleware";
import { applyMiddleware, applyRoutes } from "./backend/utils";
import errorHandlers from "./backend/middleware/errorHandlers";

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const app = express();

const httpsOptions = {
  key: fs.readFileSync('./backend/config/key.pem'),
  cert: fs.readFileSync('./backend/config/cert.pem')
};

applyMiddleware(middleware, app);
applyRoutes(routes, app);
applyMiddleware(errorHandlers, app);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

const { PORT = 8888 } = process.env;
const server = https.createServer(httpsOptions, app);

server.listen(PORT, () =>
  console.log(`Server is running https://localhost:${PORT}...`)
);

export default app;


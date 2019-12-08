import fs from "fs";
import https from "https";
import express from "express";
import routes from "./api/routes/routes";
import middleware from "./api/middleware";
import * as SwaggerExpress from 'swagger-express-mw';
// import createMiddleware from 'swagger-express-middleware';
import { applyMiddleware, applyRoutes } from "./api/utils";
import errorHandlers from "./api/middleware/errorHandlers";

const app = express();

// const config: SwaggerExpress.Config = {
//   appRoot: __dirname
// };

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
// applyRoutes(routes, app);
// app.use("/api/auth", userRoutes)

// SwaggerExpress.create(config, (err, swaggerExpress) => {
//   if (err) { throw err; }

//   swaggerExpress.register(app);

  applyMiddleware(middleware, app);
  applyRoutes(routes, app);
  applyMiddleware(errorHandlers, app);

  const httpsOptions = {
    key: fs.readFileSync('./api/config/key.pem'),
    cert: fs.readFileSync('./api/config/cert.pem')
  };

  const { PORT = 5555 } = process.env;
  const server = https.createServer(httpsOptions, app);

  server.listen(PORT, () =>
    console.log(`Server is running https://localhost:${PORT}...`)
  );
// });

// createMiddleware('swagger.json', app, function(err, midd) {
//     // Add all the Swagger Express Middleware, or just the ones you need.
//     // NOTE: Some of these accept optional options (omitted here for brevity)
//     app.use(
//         midd.metadata(),
//         midd.CORS(),
//         midd.files(),
//         midd.parseRequest(),
//         midd.validateRequest(),
//         midd.mock()
//     );
// });

// const httpsOptions = {
//   key: fs.readFileSync('./api/config/key.pem'),
//   cert: fs.readFileSync('./api/config/cert.pem')
// };

// applyMiddleware(middleware, app);
// applyRoutes(routes, app);
// applyMiddleware(errorHandlers, app);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token , Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

// const { PORT = 5555 } = process.env;
// const server = https.createServer(httpsOptions, app);

// server.listen(PORT, () =>
//   console.log(`Server is running https://localhost:${PORT}...`)
// );

export default app;


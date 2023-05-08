const express = require("express");
const routerConfig = require("./routes/index.routes");
const globalConstants = require("./const/globalConstants.js");

const configurationApi = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return;
};

configurationRouter = (app) => {
  app.use("/api/", routerConfig.routes_init());
};

const init = () => {
  const app = express();
  configurationApi(app); //Api config

  configurationRouter(app); //Router config

  app.listen(globalConstants.PORT);
  console.log("Runing app in port: ", globalConstants.PORT);
};
init();

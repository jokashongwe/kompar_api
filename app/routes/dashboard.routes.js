module.exports = app => {
    const dashboard = require("../controllers/dashboard.controller.js");
  
    var router = require("express").Router();
  
    router.get("/", dashboard.findAll);  
  
    app.use("/api/dashboard", router);
  };
  
module.exports = app => {
    const cities = require("../controllers/city.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", cities.create);
  
    // Retrieve all cities
    router.get("/", cities.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", cities.findOne);
  
    // Update a Basket with id
    router.put("/:id", cities.update);
  
    // Delete a Basket with id
    router.delete("/:id", cities.delete);
  
  
    app.use("/api/cities", router);
  };
  
module.exports = app => {
    const prices = require("../controllers/price.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Price
    router.post("/", prices.create);
  
    // Retrieve all prices
    router.get("/", prices.findAll);
  
  
    // Retrieve a single Price with id
    router.get("/:id", prices.findOne);
  
    // Update a Price with id
    router.put("/:id", prices.update);
  
    // Delete a Price with id
    router.delete("/:id", prices.delete);
  
    // Create a new Price
    router.delete("/", prices.deleteAll);
  
    app.use("/api/prices", router);
  };
  
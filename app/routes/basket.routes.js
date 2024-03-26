module.exports = app => {
    const baskets = require("../controllers/basket.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", baskets.create);
  
    // Retrieve all baskets
    router.get("/", baskets.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", baskets.findOne);
  
    // Update a Basket with id
    router.put("/:id", baskets.update);
  
    // Delete a Basket with id
    router.delete("/:id", baskets.delete);
  
    // Create a new Basket
    router.delete("/", baskets.deleteAll);
  
    app.use("/api/baskets", router);
  };
  
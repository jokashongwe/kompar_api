module.exports = app => {
    const markets = require("../controllers/market.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", markets.create);
  
    // Retrieve all markets
    router.get("/", markets.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", markets.findOne);
  
    // Update a Basket with id
    router.put("/:id", markets.update);
  
    // Delete a Basket with id
    router.delete("/:id", markets.delete);

  
    app.use("/api/markets", router);
  };
  
module.exports = app => {
    const provinces = require("../controllers/province.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Basket
    router.post("/", provinces.create);
  
    // Retrieve all provinces
    router.get("/", provinces.findAll);  
  
    // Retrieve a single Basket with id
    router.get("/:id", provinces.findOne);
  
    // Update a Basket with id
    router.put("/:id", provinces.update);
  
    // Delete a Basket with id
    router.delete("/:id", provinces.delete);
  
    app.use("/api/provinces", router);
  };
  